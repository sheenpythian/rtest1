// PostgreSQL connection using Sequelize
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/blogdb',
  {
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
