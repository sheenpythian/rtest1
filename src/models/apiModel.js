const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE || 'blogdb',
  process.env.PGUSER || 'postgres',
  process.env.PGPASSWORD || 'password',
  {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blog_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blog_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  blog_author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'blogs',
  timestamps: false,
});

async function getAllBlogs() {
  return await Blog.findAll({ order: [['id', 'DESC']] });
}

async function createBlog(data) {
  return await Blog.create(data);
}

async function getBlogById(id) {
  return await Blog.findByPk(id);
}

async function updateBlog(id, data) {
  const blog = await Blog.findByPk(id);
  if (!blog) return null;
  await blog.update(data);
  return blog;
}

async function searchBlogByTitle(title) {
  return await Blog.findAll({
    where: {
      blog_title: { [Sequelize.Op.iLike]: `%${title}%` }
    },
    order: [['id', 'DESC']]
  });
}

module.exports = { sequelize, Blog, getAllBlogs, createBlog, getBlogById, updateBlog, searchBlogByTitle };
