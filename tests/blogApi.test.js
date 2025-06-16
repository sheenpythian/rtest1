const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('../src/routes/apiRoutes');
const { sequelize, Blog } = require('../src/models/db');

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
  let blogId;

  test('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        blog_title: 'Test Blog',
        blog_body: 'Test body',
        blog_date: '2025-06-16',
        blog_author: 'Tester',
        blog_category: 'UnitTest'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.blog_title).toBe('Test Blog');
    blogId = res.body.id;
  });

  test('should get all blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should get a blog by id', async () => {
    const res = await request(app).get(`/api/blogs/${blogId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(blogId);
  });

  test('should update a blog', async () => {
    const res = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send({
        blog_title: 'Updated Blog',
        blog_body: 'Updated body',
        blog_date: '2025-06-17',
        blog_author: 'Tester',
        blog_category: 'UnitTest'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.blog_title).toBe('Updated Blog');
  });

  test('should search blog by title', async () => {
    const res = await request(app).get('/api/blogs/search/title?title=Updated');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
