import React, { useState } from 'react';
import { Box, Alert, Snackbar, Typography } from '@mui/material';
import MainLayout from '@components/Layout/MainLayout';
import DashboardFilters from '@components/Filters/DashboardFilters';
import MetricsOverview from '@components/Dashboard/MetricsOverview';
import DashboardCharts from '@components/Dashboard/DashboardCharts';
import SalesTable from '@components/Dashboard/SalesTable';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ErrorAlert from '@components/common/ErrorAlert';
import { useDashboard } from '@contexts/DashboardContext';
import { exportToPDF } from '@utils/exportUtils';

const DashboardPage: React.FC = () => {
  const {
    metrics,
    filters,
    loading,
    error,
    updateFilters,
    refreshMetrics,
    regions,
    products,
  } = useDashboard();

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleExport = async () => {
    try {
      await exportToPDF('dashboard-content', 'analytics-dashboard.pdf');
      setSnackbar({ open: true, message: 'Dashboard exported successfully!' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Export failed. Please try again.' });
    }
  };

  return (
    <MainLayout>
      <Box id="dashboard-content" className="fade-in-up">
        {/* Header */}
        <Box mb={4}>
          <Typography 
            variant="h3" 
            fontWeight={800}
            sx={{
              color: '#ffffff',
              mb: 1,
              textShadow: '0 2px 10px rgba(139, 92, 246, 0.5)',
            }}
          >
            📊 Dashboard
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            Real-time business intelligence and analytics
          </Typography>
        </Box>

        {/* Filters */}
        <DashboardFilters
          filters={filters}
          regions={regions}
          products={products}
          onFiltersChange={updateFilters}
          onRefresh={refreshMetrics}
          onExport={handleExport}
        />

        {/* Loading State */}
        {loading && <LoadingSpinner message="Loading dashboard metrics..." />}

        {/* Error State */}
        {error && <ErrorAlert message={error} onRetry={refreshMetrics} />}

        {/* Dashboard Content */}
        {!loading && !error && metrics && (
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Metrics Overview */}
            <Box>
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{ color: '#f9fafb', mb: 3 }}
              >
                Key Metrics
              </Typography>
              <MetricsOverview metrics={metrics} />
            </Box>

            {/* Charts */}
            <Box>
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{ color: '#f9fafb', mb: 3 }}
              >
                Analytics Overview
              </Typography>
              <DashboardCharts metrics={metrics} />
            </Box>

            {/* Sales Table */}
            <Box>
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{ color: '#f9fafb', mb: 3 }}
              >
                Recent Activity
              </Typography>
              <SalesTable sales={metrics.recentSales} />
            </Box>
          </Box>
        )}
      </Box>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            background: 'rgba(16, 185, 129, 0.9)',
            color: 'white',
            fontWeight: 600,
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default DashboardPage;