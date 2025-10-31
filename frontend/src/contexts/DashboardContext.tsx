import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardMetrics, DashboardFilters, DatePreset } from '@models/index';
import metricsService from '@services/metricsService';
import websocketService from '@services/websocketService';
import { getDateRange } from '@utils/dateUtils';

interface DashboardContextType {
  metrics: DashboardMetrics | null;
  filters: DashboardFilters;
  loading: boolean;
  error: string | null;
  updateFilters: (filters: Partial<DashboardFilters>) => void;
  refreshMetrics: () => Promise<void>;
  regions: string[];
  products: string[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

const initialFilters: DashboardFilters = {
  preset: 'today',
  ...getDateRange('today'),
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    loadInitialData();
    setupWebSocket();

    return () => {
      websocketService.unsubscribeFromMetrics();
      websocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    refreshMetrics();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const [regionsData, productsData] = await Promise.all([
        metricsService.getRegions(),
        metricsService.getProducts(),
      ]);

      setRegions(regionsData);
      setProducts(productsData);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const setupWebSocket = () => {
    websocketService.connect();

    websocketService.onError((err) => {
      console.error('WebSocket error:', err);
      setError('Real-time connection error');
    });

    websocketService.subscribeToMetrics(filters, (data) => {
      setMetrics(data);
      setLoading(false);
    });
  };

  const refreshMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await metricsService.getDashboardMetrics(filters);
      setMetrics(data);

      // Update WebSocket subscription
      websocketService.subscribeToMetrics(filters, (data) => {
        setMetrics(data);
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };

      // Update date range if preset changed
      if (newFilters.preset && newFilters.preset !== 'custom') {
        const dateRange = getDateRange(newFilters.preset);
        return { ...updated, ...dateRange };
      }

      return updated;
    });
  };

  const value: DashboardContextType = {
    metrics,
    filters,
    loading,
    error,
    updateFilters,
    refreshMetrics,
    regions,
    products,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};