const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  userId: String,
  id: Number,
  title: String,
  body: String,
  isFavorite: Boolean,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
