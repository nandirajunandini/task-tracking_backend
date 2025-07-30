require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { Pool } = require('pg'); // ✅ include pg
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route prefix
app.use('/api', taskRoutes);

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

// Create tasks table if not exists
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      assigned_to VARCHAR(100),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ 'tasks' table is ready.");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

createTable(); // 👈 make sure to call it

// Basic root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Make pool available to other files
module.exports = { pool };
