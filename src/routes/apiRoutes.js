const express = require('express');
const router = express.Router();
const blogController = require('../controllers/apiController');

router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/:id', blogController.updateBlog);
router.get('/search/title', blogController.searchBlogByTitle);

module.exports = router;
