const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({
  user: 'postgres',
  password: process.env.POSTGRESQL,
  database: 'devos-bot',
  host: 'localhost',
  port: 5432 // Default port
});

module.exports = pool;