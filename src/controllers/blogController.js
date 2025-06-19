import Blog from '../models/blogModel.js';
import { Op } from 'sequelize';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
};

export const createBlog = async (req, res) => {
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  if (!blog_title || !blog_body || !blog_date || !blog_author || !blog_category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const blog = await Blog.create({ blog_title, blog_body, blog_date, blog_author, blog_category });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog.' });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { blog_title, blog_body, blog_date, blog_author, blog_category } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    blog.blog_title = blog_title ?? blog.blog_title;
    blog.blog_body = blog_body ?? blog.blog_body;
    blog.blog_date = blog_date ?? blog.blog_date;
    blog.blog_author = blog_author ?? blog.blog_author;
    blog.blog_category = blog_category ?? blog.blog_category;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog.' });
  }
};

export const searchBlogByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required.' });
  }
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
    res.status(500).json({ error: 'Failed to search blogs.' });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog.' });
  }
};
