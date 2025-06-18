import express from 'express';
import { getAllBlogs, createBlog, updateBlog, searchBlogByTitle, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.get('/blogs/search', searchBlogByTitle);
router.get('/blogs/:id', getBlogById);

export default router;
