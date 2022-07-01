const Posts = require("../models/postModel");

module.exports.addPost = async (req, res, next) => {
  try {
    const { studentId, title, content, photo } = req.body;
    const data = await Posts.create({
        studentId: studentId,
        title: title,
        content: content,
        photo: photo
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (e) {
    next(e);
  }
};

module.exports.getAllPosts= async (req, res, next) => {
  try {

    const posts = await Posts.find({_id:{$ne:req.params.id}}).select(["title", "content", "photo"])

    return res.json(posts);
  } catch (ex) {
    next(ex);
  }
};
