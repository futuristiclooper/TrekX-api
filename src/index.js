import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
const connectDatabases = async () => {
  try {
    // MySQL Connection Pool
    const mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'healthcare',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // MongoDB Connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    return { mysqlPool };
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', authMiddleware, patientRoutes);

// Initialize and Start Server
const startServer = async () => {
  const { mysqlPool } = await connectDatabases();
  
  app.locals = {
    mysqlPool,
    mongoDB: mongoose.connection
  };

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});