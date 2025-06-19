import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import blogRoutes from '../src/routes/blogRoutes.js';
import sequelize from '../src/models/db.js';
import Blog from '../src/models/blogModel.js';

const app = express();
app.use(bodyParser.json());
app.use('/api', blogRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Blog API', () => {
  let blogId;

  test('POST /api/blogs - create blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        blog_title: 'Test Blog',
        blog_body: 'Test body',
        blog_date: '2024-06-18',
        blog_author: 'Tester',
        blog_category: 'UnitTest'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.blog_title).toBe('Test Blog');
    blogId = res.body.id;
  });

  test('GET /api/blogs - get all blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/blogs/:id - get blog by id', async () => {
    const res = await request(app).get(`/api/blogs/${blogId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(blogId);
  });

  test('PUT /api/blogs/:id - update blog', async () => {
    const res = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send({ blog_title: 'Updated Blog' });
    expect(res.statusCode).toBe(200);
    expect(res.body.blog_title).toBe('Updated Blog');
  });

  test('GET /api/blogs/search?title=Updated - search blog by title', async () => {
    const res = await request(app).get('/api/blogs/search?title=Updated');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].blog_title).toBe('Updated Blog');
  });
});
