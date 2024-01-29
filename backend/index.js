const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/post");
const User = require("./models/users");
const Comment = require("./models/comments");

const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://leojoy62:8Ms9vFTzle5BmZbB@cluster0.zwoxsnt.mongodb.net/blogapp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting Database", err);
  });

//Middleware
app.use(cors());
app.use(express.json());

//User
app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json("Error creating user");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

//get blog
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

//get a single blog
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving blog" });
  }
});

//post blog
app.post("/blogs", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    res.status(500).json("Error creating blog");
  }
});

//Update blog
app.put("/blogs/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json("Error updating blog");
  }
});

// Delete a blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog" });
  }
});

// Comments Api

//post comment
app.post("/comments", async (req, res) => {
  try {
    console.log("new comment", req.body);
    const newComment = await Comment.create(req.body);
    res.json(newComment);
  } catch (error) {
    res.status(500).json("Error creating comment");
  }
});

//get comment
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

//get a single comment
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving comment" });
  }
});

//Update comment
app.put("/comments/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json("Error updating comment");
  }
});

// Delete a comment
app.delete("/comments/:id", async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
