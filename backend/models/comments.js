const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: Number,
  id: Number,
  userUid: String,
  name: String,
  email: String,
  body: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
