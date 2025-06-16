const { Sequelize, DataTypes } = require('sequelize');

// Update these values with your PostgreSQL credentials
const dbUser = process.env.PGUSER || 'postgres';
const dbPassword = process.env.PGPASSWORD || 'password';
const dbHost = process.env.PGHOST || 'localhost';
const dbName = process.env.PGDATABASE || 'blogdb';
const dbPort = process.env.PGPORT || '5432';

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, {
  dialect: 'postgres',
});

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

module.exports = { sequelize, Blog };
