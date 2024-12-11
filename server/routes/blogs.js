const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// Add a new blog
router.post('/', async (req, res) => {
  const { title, description, author, time, imgUrl } = req.body;
  
  try {
    const newBlog = new Blog({ title, description, author, time, imgUrl });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog' });
  }
});

module.exports = router;
