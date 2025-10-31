import api from './api';
import { DashboardMetrics, FilterParams } from '@models/index';

class MetricsService {
  async getDashboardMetrics(filters: FilterParams): Promise<DashboardMetrics> {
    const response = await api.get<{ status: string; data: DashboardMetrics }>(
      '/metrics/dashboard',
      filters
    );
    return response.data;
  }

  async getRegions(): Promise<string[]> {
    const response = await api.get<{ status: string; data: string[] }>('/metrics/regions');
    return response.data;
  }

  async getProducts(): Promise<string[]> {
    const response = await api.get<{ status: string; data: string[] }>('/metrics/products');
    return response.data;
  }
}

export default new MetricsService();