import { io, Socket } from 'socket.io-client';
import { DashboardMetrics, FilterParams } from '@models/index';
import authService from './authService';

type MetricsCallback = (data: DashboardMetrics) => void;
type ErrorCallback = (error: Error) => void;

class WebSocketService {
  private socket: Socket | null = null;
  private metricsCallback: MetricsCallback | null = null;
  private errorCallback: ErrorCallback | null = null;

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    const token = authService.getToken();
    
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    this.socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
    });

    this.socket.on('metrics:update', (data: DashboardMetrics) => {
      if (this.metricsCallback) {
        this.metricsCallback(data);
      }
    });

    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      if (this.errorCallback) {
        this.errorCallback(new Error(error.message || 'WebSocket error'));
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribeToMetrics(filters: FilterParams, callback: MetricsCallback): void {
    this.metricsCallback = callback;
    
    if (this.socket?.connected) {
      this.socket.emit('subscribe:metrics', filters);
    }
  }

  unsubscribeFromMetrics(): void {
    if (this.socket?.connected) {
      this.socket.emit('unsubscribe:metrics');
    }
    this.metricsCallback = null;
  }

  onError(callback: ErrorCallback): void {
    this.errorCallback = callback;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default new WebSocketService();