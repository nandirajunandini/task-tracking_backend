
const pool = require('../db'); 

exports.createTask = async (title, description, assignedTo) => {
  const res = await pool.query(
    `INSERT INTO tasks (title, description, assigned_to) VALUES ($1, $2, $3) RETURNING *`,
    [title, description, assignedTo]
  );
  return res.rows[0];
};

exports.getAllTasks = async () => {
  const res = await pool.query(`SELECT * FROM tasks ORDER BY created_at DESC`);
  return res.rows;
};

exports.getTaskStats = async () => {
  const res = await pool.query(`
    SELECT status, COUNT(*) AS count FROM tasks GROUP BY status
  `);
  return res.rows;
};
