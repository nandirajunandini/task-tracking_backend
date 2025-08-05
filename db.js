const { Pool } = require('pg');

// Direct config (no dotenv)
const pool = new Pool({
  user: 'postgres',
  password: 'Nandini@12',
  host: 'localhost',
  database: 'HRMS',
  port: 5432,
});

// Test connection
pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL database');
    client.release(); // release the connection back to pool
  })
  .catch(err => {
    console.error('❌ Failed to connect to the database:', err.message);
  });

module.exports = pool;
