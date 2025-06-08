const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create new presentation
router.post('/', async (req, res) => {
  const { title, nickname } = req.body;
  try {
    const presentation = await prisma.presentation.create({
      data: {
        title,
        users: {
          create: {
            nickname,
            role: 'CREATOR',
          },
        },
      },
      include: { users: true }
    });
    res.json(presentation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create presentation' });
  }
});

router.get('/', async (req, res) => {
  const presentations = await prisma.presentation.findMany({
    include: {
      slides: true,
      users: true,
    }
  });
  res.json(presentations);
});

// Join a presentation
router.post('/:id/join', async (req, res) => {
  const { nickname } = req.body;
  const { id } = req.params;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        nickname,
        presentationId: id
      }
    });

    if (existingUser) {
      return res.json(existingUser);  
    }

    const newUser = await prisma.user.create({
      data: {
        nickname,
        role: 'VIEWER',
        presentationId: id,
      }
    });

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join presentation' });
  }
});

// Get presentation details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const presentation = await prisma.presentation.findUnique({
    where: { id },
    include: {
      slides: {
        include: { blocks: true }
      },
      users: true
    }
  });
  res.json(presentation);
});

// Add slide (creator only)
router.post('/:id/slides', async (req, res) => {
  const { id } = req.params;
  const { index } = req.body;
  try {
    const slide = await prisma.slide.create({
      data: {
        index,
        presentationId: id
      }
    });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create slide' });
  }
});

// Delete slide
router.delete('/:id/slides/:slideId', async (req, res) => {
  const { slideId } = req.params;
  try {
    await prisma.block.deleteMany({ where: { slideId }});
    await prisma.slide.delete({ where: { id: slideId }});
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete slide' });
  }
});

router.put('/:id/role', async (req, res) => {
  const { userId, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role }
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

module.exports = router;
