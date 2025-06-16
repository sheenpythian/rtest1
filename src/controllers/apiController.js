const { Blog } = require('../models/db');
const { Op } = require('sequelize');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
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
    const newBlog = await Blog.create({ blog_title, blog_body, blog_date, blog_author, blog_category });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    await blog.update({ blog_title, blog_body, blog_date, blog_author, blog_category });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};

exports.searchBlogByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Title query parameter is required.' });
  try {
    const blogs = await Blog.findAll({
      where: {
        blog_title: {
          [Op.iLike]: `%${title}%`
        }
      }
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
};
