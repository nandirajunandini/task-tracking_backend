const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const pool = require('./db'); // PostgreSQL connection pool

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

const PORT = 5000; // Hardcoded since no .env

// Start server and ensure DB table exists
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        assigned_to VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ 'tasks' table is ready.");
  } catch (err) {
    console.error('❌ Error initializing DB:', err.message);
  }
});
