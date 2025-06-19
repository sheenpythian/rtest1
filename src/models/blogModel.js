import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  blog_title: {
    type: DataTypes.STRING(255),
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
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  blog_category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'blogs',
  timestamps: false,
});

export default Blog;
