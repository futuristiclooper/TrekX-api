import mysql from 'mysql2/promise';

const createPool = () => {
  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'healthcare',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

// Get patient by ID
export const getPatientById = async (id) => {
  const pool = createPool();
  const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
  await pool.end();
  return rows[0];
};

// Search patients by name
export const searchPatientsByName = async (name) => {
  const pool = createPool();
  const [rows] = await pool.query('SELECT * FROM patients WHERE name LIKE ?', [`%${name}%`]);
  await pool.end();
  return rows;
};

// Add a new patient
export const addPatient = async (name, age, medicalHistory) => {
  const pool = createPool();
  const [result] = await pool.query(
    'INSERT INTO patients (name, age, medical_history) VALUES (?, ?, ?)',
    [name, age, medicalHistory]
  );
  await pool.end();
  return { id: result.insertId, name, age, medicalHistory };
};

// Update patient data
export const updatePatient = async (id, name, age, medicalHistory) => {
  const pool = createPool();
  const [result] = await pool.query(
    'UPDATE patients SET name = ?, age = ?, medical_history = ? WHERE id = ?',
    [name, age, medicalHistory, id]
  );
  await pool.end();
  return result.affectedRows > 0 ? { id, name, age, medicalHistory } : null;
};

// Delete a patient
export const deletePatient = async (id) => {
  const pool = createPool();
  const [result] = await pool.query('DELETE FROM patients WHERE id = ?', [id]);
  await pool.end();
  return result.affectedRows > 0 ? { id } : null;
};