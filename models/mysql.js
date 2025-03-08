import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'healthcare'
});

async function fetchMySQLData(table, conditions) {
  const [rows] = await pool.query(
    `SELECT * FROM ${table} WHERE ?`,
    [conditions]
  );
  return rows;
}

async function addMySQLPatient(name, age) {
  const [result] = await pool.query(
    `INSERT INTO patients (name, age) VALUES (?, ?)`,
    [name, age]
  );
  return { id: result.insertId, name, age };
}

const connectMySQL = async () => pool;

export { connectMySQL, fetchMySQLData, addMySQLPatient };
