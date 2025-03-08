import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import cors from 'cors';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import authMiddleware from './auth/middleware.js';

// Database Connections
async function connectDatabases() {
  try {
    // Connect to MySQL
    const mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'healthcare',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MySQL and MongoDB successfully!');
    return mysqlPool;
  } catch (error) {
    console.error('Failed to connect to databases:', error);
    process.exit(1);
  }
}

// Initialize Express and Apollo Server
async function startServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);

  // Connect to Databases
  const mysqlPool = await connectDatabases();

  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
      mysqlPool, // Pass MySQL connection pool to resolvers
    }),
  });

  // Start Apollo Server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Start Express Server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
});
