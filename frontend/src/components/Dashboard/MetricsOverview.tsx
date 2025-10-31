import React from 'react';
import { Grid } from '@mui/material';
import MetricCard from '@components/common/MetricCard';
import { DashboardMetrics } from '@models/index';

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const totalSales = metrics.salesByRegion.reduce((sum, region) => sum + region.sales, 0);
  const totalRevenue = metrics.revenue.total;
  const conversionRate = metrics.conversionFunnel[metrics.conversionFunnel.length - 1]?.percentage || 0;

  return (
    <Grid container spacing={3} className="stagger-children">
      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Total Revenue"
          value={totalRevenue}
          changePercent={metrics.revenue.changePercent}
          format="currency"
          icon="💰"
          color="purple"
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          format="number"
          icon="👥"
          color="blue"
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Total Sales"
          value={totalSales}
          format="number"
          icon="🛒"
          color="pink"
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Conversion Rate"
          value={conversionRate}
          format="percentage"
          icon="📈"
          color="emerald"
        />
      </Grid>
    </Grid>
  );
};

export default MetricsOverview;