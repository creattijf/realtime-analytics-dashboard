import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import metricsService from '../services/metricsService';
import { FilterParams } from '../types';
import logger from '../config/logger';
import pool from '../config/database';

export class MetricsController {
  async getDashboard(req: AuthRequest, res: Response): Promise<void> {
    try {
      const filters: FilterParams = {
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        region: req.query.region as string,
        product: req.query.product as string,
        source: req.query.source as string,
      };

      const metrics = await metricsService.getDashboardMetrics(filters);

      res.json({
        status: 'success',
        data: metrics,
      });
    } catch (error) {
      logger.error('Error in getDashboard:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch dashboard metrics',
      });
    }
  }

  async getRegions(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await pool.query('SELECT DISTINCT region FROM sales ORDER BY region');
      
      res.json({
        status: 'success',
        data: result.rows.map(row => row.region),
      });
    } catch (error) {
      logger.error('Error in getRegions:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch regions',
      });
    }
  }

  async getProducts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await pool.query('SELECT DISTINCT product FROM sales ORDER BY product');
      
      res.json({
        status: 'success',
        data: result.rows.map(row => row.product),
      });
    } catch (error) {
      logger.error('Error in getProducts:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch products',
      });
    }
  }
}

export default new MetricsController();