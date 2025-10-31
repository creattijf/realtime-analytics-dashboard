import { createServer } from 'http';
import app from './app';
import { WebSocketHandler } from './websocket/socketHandler';
import pool from './config/database';
import redis from './config/redis';
import logger from './config/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Initialize WebSocket
new WebSocketHandler(server);

// Database initialization
async function initializeDatabase() {
  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS sales (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        region VARCHAR(100) NOT NULL,
        product VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL,
        source VARCHAR(100) NOT NULL,
        user_id VARCHAR(255),
        timestamp TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_sales_timestamp ON sales(timestamp);
      CREATE INDEX IF NOT EXISTS idx_sales_region ON sales(region);
      CREATE INDEX IF NOT EXISTS idx_sales_product ON sales(product);

      CREATE TABLE IF NOT EXISTS user_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        metadata JSONB,
        timestamp TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_events_timestamp ON user_events(timestamp);
      CREATE INDEX IF NOT EXISTS idx_events_type ON user_events(event_type);
    `);

    logger.info('✅ Database tables initialized');
  } catch (error) {
    logger.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  
  server.close(async () => {
    await pool.end();
    await redis.quit();
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Start server
async function start() {
  try {
    await initializeDatabase();
    
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();