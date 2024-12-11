const express = require("express");
const Blog = require("../models/Blog");
const upload = require("../utils/multer.utils");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Fetch all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blogs" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blog" });
    }
});

// Add a new blog
router.post("/", upload.single("file"), async (req, res) => {
    const { title, description, author } = req.body;

    console.log("title", title);
    console.log("description", description);
    console.log("author", author);

    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "Image is required" });
    }

    try {
        console.log("file", file);

        const newBlog = new Blog({
            title,
            description,
            author,
        });

        newBlog.imgUrl = file.filename.split(" ").join("%20");

        console.log("newBlog", newBlog);

        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Error creating blog", error });
    }
});

router.put("/:id", upload.single("file"), async (req, res) => {
    const { title, description, author } = req.body;

    console.log("title", title);
    console.log("description", description);
    console.log("author", author);

    const file = req.file;

    try {
        console.log("file", file);

        const updatedBlog = {
            title,
            description,
            author,
        };

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (file) {
            const oldFile = blog.imgUrl;

            const pathToFile = path.join(__dirname, "../uploads", oldFile);

            if (oldFile) {
                console.log("oldFile", oldFile);

                fs.rmSync(pathToFile);
                blog.imgUrl = file.filename.split(" ").join("%20");
            }
        }

        console.log("Updated Blog", blog);

        await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Error updating blog" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const file = blog.imgUrl.split("%20").join(" ");

        const pathToFile = path.join(__dirname, "../uploads", file);

        fs.rmSync(pathToFile);

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Error deleting blog" });
    }
});

module.exports = router;
