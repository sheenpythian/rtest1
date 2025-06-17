const { getAllBlogs, createBlog, getBlogById, updateBlog, searchBlogByTitle } = require('../models/apiModel');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.createBlog = async (req, res) => {
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  if (!blog_title || !blog_body || !blog_date || !blog_author || !blog_category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const newBlog = await createBlog({ blog_title, blog_body, blog_date, blog_author, blog_category });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.updateBlog = async (req, res) => {
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  try {
    const updated = await updateBlog(req.params.id, { blog_title, blog_body, blog_date, blog_author, blog_category });
    if (!updated) return res.status(404).json({ error: 'Blog not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.searchBlogByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Title query parameter is required.' });
  try {
    const blogs = await searchBlogByTitle(title);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};
