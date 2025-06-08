const mongoose = require("mongoose");

const textBlockSchema = new mongoose.Schema({
  id: String,
  content: String,
  x: Number,
  y: Number,
  editorId: String,
});

const slideSchema = new mongoose.Schema({
  id: String,
  blocks: [textBlockSchema],
});

const presentationSchema = new mongoose.Schema({
  title: String,
  creator: String,
  slides: [slideSchema],
  users: [
    {
      nickname: String,
      role: { type: String, enum: ["viewer", "editor"], default: "viewer" },
      socketId: String,
    },
  ],
});

module.exports = mongoose.model("Presentation", presentationSchema);
