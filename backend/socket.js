io.on('connection', socket => {
  console.log('🔌 New client connected');

  socket.on('join_presentation', (presentationId) => {
    socket.join(presentationId);
  });

  socket.on('update_block', ({ presentationId, slideId, block }) => {
    socket.to(presentationId).emit('block_updated', { slideId, block });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});
