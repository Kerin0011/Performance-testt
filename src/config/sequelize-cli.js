require('dotenv').config();

module.exports = {
  "development": {
    "url": process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/riwi',
    "dialect": "postgres"
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres"
  }
};
