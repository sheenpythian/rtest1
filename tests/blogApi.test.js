const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('../src/routes/apiRoutes');
const { sequelize, Blog } = require('../src/models/apiModel');

const app = express();
app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Blog API', () => {
  test('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        blog_title: 'Test Blog',
        blog_body: 'Test body',
        blog_date: '2025-06-17',
        blog_author: 'Tester',
        blog_category: 'UnitTest'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.blog_title).toBe('Test Blog');
  });

  test('should get all blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should get a blog by id', async () => {
    const blog = await Blog.create({
      blog_title: 'Find Me',
      blog_body: 'Find this blog',
      blog_date: '2025-06-17',
      blog_author: 'Finder',
      blog_category: 'UnitTest'
    });
    const res = await request(app).get(`/api/blogs/${blog.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.blog_title).toBe('Find Me');
  });

  test('should update a blog', async () => {
    const blog = await Blog.create({
      blog_title: 'Update Me',
      blog_body: 'Old body',
      blog_date: '2025-06-17',
      blog_author: 'Updater',
      blog_category: 'UnitTest'
    });
    const res = await request(app)
      .put(`/api/blogs/${blog.id}`)
      .send({
        blog_title: 'Updated',
        blog_body: 'New body',
        blog_date: '2025-06-18',
        blog_author: 'Updater',
        blog_category: 'UnitTest'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.blog_title).toBe('Updated');
  });

  test('should search blogs by title', async () => {
    await Blog.create({
      blog_title: 'Unique Search Title',
      blog_body: 'Search body',
      blog_date: '2025-06-17',
      blog_author: 'Searcher',
      blog_category: 'UnitTest'
    });
    const res = await request(app).get('/api/blogs/search/title?title=Unique');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(b => b.blog_title === 'Unique Search Title')).toBe(true);
  });
});
