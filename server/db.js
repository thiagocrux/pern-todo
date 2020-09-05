const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '@33ntfs#',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

module.exports = pool;
