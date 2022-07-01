const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);
const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;