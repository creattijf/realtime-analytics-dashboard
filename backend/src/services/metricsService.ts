import pool from '../config/database';
import redis from '../config/redis';
import { 
  DashboardMetrics, 
  FilterParams, 
  SalesData, 
  RegionData,
  ConversionData,
  RevenueMetric 
} from '../types';
import logger from '../config/logger';

export class MetricsService {
  private readonly CACHE_TTL = 5;

  async getDashboardMetrics(filters: FilterParams): Promise<DashboardMetrics> {
    const cacheKey = `metrics:${JSON.stringify(filters)}`;
    
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }

      const [revenue, activeUsers, salesByRegion, conversionFunnel, recentSales] = 
        await Promise.all([
          this.getRevenueMetrics(filters),
          this.getActiveUsers(),
          this.getSalesByRegion(filters),
          this.getConversionFunnel(filters),
          this.getRecentSales(filters),
        ]);

      const metrics: DashboardMetrics = {
        revenue,
        activeUsers,
        salesByRegion,
        conversionFunnel,
        recentSales,
      };

      await redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(metrics));

      return metrics;
    } catch (error) {
      logger.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  private async getRevenueMetrics(filters: FilterParams): Promise<RevenueMetric> {
    const whereClause = this.buildWhereClause(filters);
    
    const query = `
      SELECT 
        COALESCE(SUM(amount), 0) as total,
        COUNT(*) as count
      FROM sales
      ${whereClause}
    `;

    const previousQuery = `
      SELECT 
        COALESCE(SUM(amount), 0) as previous_total
      FROM sales
      WHERE timestamp >= NOW() - INTERVAL '2 days'
        AND timestamp < NOW() - INTERVAL '1 day'
    `;

    const [currentResult, previousResult] = await Promise.all([
      pool.query(query),
      pool.query(previousQuery),
    ]);

    const total = parseFloat(currentResult.rows[0]?.total || '0');
    const previousTotal = parseFloat(previousResult.rows[0]?.previous_total || '0');
    const change = total - previousTotal;
    const changePercent = previousTotal > 0 ? (change / previousTotal) * 100 : 0;

    return {
      total,
      change,
      changePercent,
      period: 'today',
    };
  }

  private async getActiveUsers(): Promise<number> {
    const activeUsers = await redis.get('metrics:active_users');
    return parseInt(activeUsers || '0');
  }

  private async getSalesByRegion(filters: FilterParams): Promise<RegionData[]> {
    const whereClause = this.buildWhereClause(filters);
    
    const query = `
      SELECT 
        region,
        COUNT(*) as sales,
        COUNT(DISTINCT user_id) as users,
        COALESCE(SUM(amount), 0) as revenue
      FROM sales
      ${whereClause}
      GROUP BY region
      ORDER BY revenue DESC
    `;

    const result = await pool.query(query);
    
    return result.rows.map(row => ({
      region: row.region,
      sales: parseInt(row.sales),
      users: parseInt(row.users),
      revenue: parseFloat(row.revenue),
    }));
  }

  private async getConversionFunnel(filters: FilterParams): Promise<ConversionData[]> {
    const stages = ['visited', 'viewed_product', 'added_to_cart', 'checkout', 'purchased'];
    const results: ConversionData[] = [];

    for (const stage of stages) {
      const query = `
        SELECT COUNT(*) as count
        FROM user_events
        WHERE event_type = $1
          AND timestamp >= NOW() - INTERVAL '1 day'
      `;
      
      const result = await pool.query(query, [stage]);
      const count = parseInt(result.rows[0]?.count || '0');
      
      results.push({
        stage,
        count,
        percentage: 0,
      });
    }

    const total = results[0]?.count || 1;
    results.forEach(item => {
      item.percentage = (item.count / total) * 100;
    });

    return results;
  }

  private async getRecentSales(filters: FilterParams, limit: number = 10): Promise<SalesData[]> {
    const whereClause = this.buildWhereClause(filters);
    
    const query = `
      SELECT 
        id,
        region,
        product,
        amount,
        quantity,
        source,
        timestamp
      FROM sales
      ${whereClause}
      ORDER BY timestamp DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    
    return result.rows.map(row => ({
      id: row.id,
      region: row.region,
      product: row.product,
      amount: parseFloat(row.amount),
      quantity: parseInt(row.quantity),
      source: row.source,
      timestamp: row.timestamp,
    }));
  }

  private buildWhereClause(filters: FilterParams): string {
    const conditions: string[] = [];
    
    // Обработка startDate - принимаем и Date и string
    if (filters.startDate) {
      let dateStr: string;
      if (typeof filters.startDate === 'string') {
        dateStr = filters.startDate;
      } else if (filters.startDate instanceof Date) {
        dateStr = filters.startDate.toISOString();
      } else {
        // На случай если это объект но не Date
        dateStr = new Date(filters.startDate as any).toISOString();
      }
      conditions.push(`timestamp >= '${dateStr}'`);
    }
    
    // Обработка endDate - принимаем и Date и string
    if (filters.endDate) {
      let dateStr: string;
      if (typeof filters.endDate === 'string') {
        dateStr = filters.endDate;
      } else if (filters.endDate instanceof Date) {
        dateStr = filters.endDate.toISOString();
      } else {
        dateStr = new Date(filters.endDate as any).toISOString();
      }
      conditions.push(`timestamp <= '${dateStr}'`);
    }
    
    if (filters.region) {
      conditions.push(`region = '${filters.region}'`);
    }
    
    if (filters.product) {
      conditions.push(`product = '${filters.product}'`);
    }
    
    if (filters.source) {
      conditions.push(`source = '${filters.source}'`);
    }

    return conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  }

  async generateRealtimeData(): Promise<void> {
    try {
      const activeUsers = Math.floor(Math.random() * 1000) + 500;
      await redis.setex('metrics:active_users', 10, activeUsers.toString());

      const regions = ['North America', 'Europe', 'Asia', 'South America'];
      const products = ['Product A', 'Product B', 'Product C', 'Product D'];
      const sources = ['organic', 'paid', 'referral', 'direct'];

      const sale = {
        region: regions[Math.floor(Math.random() * regions.length)],
        product: products[Math.floor(Math.random() * products.length)],
        amount: Math.floor(Math.random() * 1000) + 100,
        quantity: Math.floor(Math.random() * 5) + 1,
        source: sources[Math.floor(Math.random() * sources.length)],
        user_id: `user_${Math.floor(Math.random() * 1000)}`,
      };

      await pool.query(
        `INSERT INTO sales (region, product, amount, quantity, source, user_id, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [sale.region, sale.product, sale.amount, sale.quantity, sale.source, sale.user_id]
      );

      logger.info('Generated real-time data');
    } catch (error) {
      logger.error('Error generating real-time data:', error);
    }
  }
}

export default new MetricsService();