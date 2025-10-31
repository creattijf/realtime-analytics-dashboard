export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
}

export interface AuthResponse {
  status: string;
  data: {
    token: string;
  };
}

export interface MetricData {
  timestamp: Date;
  value: number;
  metadata?: Record<string, any>;
}

export interface SalesData {
  id: string;
  region: string;
  product: string;
  amount: number;
  quantity: number;
  source: string;
  timestamp: Date;
}

export interface RevenueMetric {
  total: number;
  change: number;
  changePercent: number;
  period: string;
}

export interface RegionData {
  region: string;
  sales: number;
  users: number;
  revenue: number;
}

export interface ConversionData {
  stage: string;
  count: number;
  percentage: number;
}

export interface DashboardMetrics {
  revenue: RevenueMetric;
  activeUsers: number;
  salesByRegion: RegionData[];
  conversionFunnel: ConversionData[];
  recentSales: SalesData[];
}

export interface FilterParams {
  startDate?: Date;
  endDate?: Date;
  region?: string;
  product?: string;
  source?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export type DatePreset = 'today' | 'week' | 'month' | 'quarter' | 'custom';

export interface DashboardFilters extends FilterParams {
  preset: DatePreset;
}
