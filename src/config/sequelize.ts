import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/riwi';
const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  ? new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false } as any)
  : new Sequelize(databaseUrl, { dialect: databaseUrl.startsWith('postgres') ? 'postgres' : 'sqlite', logging: false });

export default sequelize;
