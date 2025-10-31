import React from 'react';
import { Grid } from '@mui/material';
import BarChart from '@components/Charts/BarChart';
import PieChart from '@components/Charts/PieChart';
import FunnelChart from '@components/Charts/FunnelChart';
import HeatMap from '@components/Charts/HeatMap';
import { DashboardMetrics } from '@models/index';

interface DashboardChartsProps {
  metrics: DashboardMetrics;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ metrics }) => {
  // Prepare data for charts
  const salesByRegionData = metrics.salesByRegion.map((region) => ({
    name: region.region,
    value: region.revenue,
    sales: region.sales,
    users: region.users,
  }));

  const revenueByRegionData = metrics.salesByRegion.map((region) => ({
    name: region.region,
    value: region.revenue,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <BarChart
          title="Revenue by Region"
          data={salesByRegionData}
          dataKey="value"
          xAxisKey="name"
          height={350}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <PieChart
          title="Sales Distribution"
          data={revenueByRegionData}
          dataKey="value"
          nameKey="name"
          height={350}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <FunnelChart title="Conversion Funnel" data={metrics.conversionFunnel} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <HeatMap title="Regional Performance Heat Map" data={metrics.salesByRegion} />
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;