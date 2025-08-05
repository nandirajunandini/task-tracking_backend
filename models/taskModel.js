const pool = require('../db');

// ✅ Create a new task
exports.createTask = async (title, description, assigned_to, status) => {
  try {
    console.log('📌 [DB] Inserting Task:', { title, description, assigned_to, status });

    const res = await pool.query(
      `INSERT INTO tasks (title, description, assigned_to, status, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [title, description, assigned_to, status]
    );

    console.log('✅ [DB] Task created:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('❌ FULL DB ERROR in createTask():', err);
    throw new Error(`DB error in createTask(): ${err.message}`);
  }
};

// ✅ Get all tasks
exports.getAllTasks = async () => {
  try {
    const res = await pool.query(`SELECT * FROM tasks ORDER BY created_at DESC`);
    return res.rows;
  } catch (err) {
    console.error('❌ Error in getAllTasks:', err.message);
    throw new Error(`DB error in getAllTasks(): ${err.message}`);
  }
};

// ✅ Update task status
exports.updateTaskStatus = async (id, status) => {
  try {
    const res = await pool.query(
      `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return res.rows[0];
  } catch (err) {
    console.error('❌ Error in updateTaskStatus:', err.message);
    throw new Error(`DB error in updateTaskStatus(): ${err.message}`);
  }
};

// ✅ Get task statistics
exports.getTaskStats = async () => {
  try {
    const res = await pool.query(`
      SELECT status, COUNT(*) AS count FROM tasks GROUP BY status
    `);
    return res.rows;
  } catch (err) {
    console.error('❌ Error in getTaskStats:', err.message);
    throw new Error(`DB error in getTaskStats(): ${err.message}`);
  }
};
