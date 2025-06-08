const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPresentation = async (req, res) => {
  const { title, creator } = req.body;
  const presentation = await prisma.presentation.create({
    data: {
      title,
      creator,
      slides: { create: [{}] },
    },
    include: { slides: true },
  });
  res.status(201).json(presentation);
};

exports.getPresentations = async (req, res) => {
  const presentations = await prisma.presentation.findMany({
    select: { id: true, title: true },
  });
  res.json(presentations);
};
