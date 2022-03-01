const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({
  user: 'squarfiuz',
  password: process.env.POSTGRESQL,
  database: 'devosbot',
  host: 'localhost',
  port: 5432 // Default port
});

module.exports = pool;