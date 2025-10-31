import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { redisPub, redisSub } from '../config/redis';
import authService from '../services/authService';
import metricsService from '../services/metricsService';
import logger from '../config/logger';

export class WebSocketHandler {
  private io: SocketServer;

  constructor(server: HTTPServer) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
      },
    });

    this.initialize();
  }

  private initialize(): void {
    // Authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        
        if (!token) {
          return next(new Error('Authentication required'));
        }

        const payload = await authService.verifyToken(token);
        socket.data.user = payload;
        next();
      } catch (error) {
        next(new Error('Invalid token'));
      }
    });

    // Connection handler
    this.io.on('connection', (socket) => {
      logger.info(`Client connected: ${socket.id}`);

      socket.on('subscribe:metrics', async (filters) => {
        try {
          socket.join('metrics');
          
          // Send initial data
          const metrics = await metricsService.getDashboardMetrics(filters);
          socket.emit('metrics:update', metrics);
          
          logger.info(`Client ${socket.id} subscribed to metrics`);
        } catch (error) {
          logger.error('Error subscribing to metrics:', error);
          socket.emit('error', { message: 'Failed to subscribe to metrics' });
        }
      });

      socket.on('unsubscribe:metrics', () => {
        socket.leave('metrics');
        logger.info(`Client ${socket.id} unsubscribed from metrics`);
      });

      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });

    // Subscribe to Redis pub/sub for real-time updates
    redisSub.subscribe('metrics:update', (err) => {
      if (err) {
        logger.error('Redis subscription error:', err);
      } else {
        logger.info('Subscribed to Redis metrics:update channel');
      }
    });

    redisSub.on('message', async (channel, message) => {
      if (channel === 'metrics:update') {
        try {
          const data = JSON.parse(message);
          this.io.to('metrics').emit('metrics:update', data);
        } catch (error) {
          logger.error('Error broadcasting metrics:', error);
        }
      }
    });

    // Start real-time data generation
    this.startRealtimeUpdates();
  }

  private startRealtimeUpdates(): void {
    setInterval(async () => {
      try {
        await metricsService.generateRealtimeData();
        
        const metrics = await metricsService.getDashboardMetrics({});
        
        // Publish to Redis for all instances
        await redisPub.publish('metrics:update', JSON.stringify(metrics));
      } catch (error) {
        logger.error('Error in real-time update:', error);
      }
    }, 5000); // Every 5 seconds
  }

  getIO(): SocketServer {
    return this.io;
  }
}