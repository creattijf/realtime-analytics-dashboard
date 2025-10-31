import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip } from '@mui/material';
import { RegionData } from '@models/index';
import { formatCurrency, formatNumber } from '@utils/formatters';

interface HeatMapProps {
  title: string;
  data: RegionData[];
}

const HeatMap: React.FC<HeatMapProps> = ({ title, data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  const getColor = (revenue: number): string => {
    const intensity = revenue / maxRevenue;
    
    if (intensity > 0.8) return '#0d47a1';
    if (intensity > 0.6) return '#1976d2';
    if (intensity > 0.4) return '#42a5f5';
    if (intensity > 0.2) return '#90caf9';
    return '#e3f2fd';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box mt={2}>
          {data.map((region) => (
            <Tooltip
              key={region.region}
              title={
                <Box>
                  <Typography variant="body2">
                    Revenue: {formatCurrency(region.revenue)}
                  </Typography>
                  <Typography variant="body2">
                    Sales: {formatNumber(region.sales)}
                  </Typography>
                  <Typography variant="body2">
                    Users: {formatNumber(region.users)}
                  </Typography>
                </Box>
              }
            >
              <Box
                mb={1}
                p={2}
                sx={{
                  backgroundColor: getColor(region.revenue),
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    color={region.revenue / maxRevenue > 0.5 ? 'white' : 'text.primary'}
                  >
                    {region.region}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={region.revenue / maxRevenue > 0.5 ? 'white' : 'text.secondary'}
                  >
                    {formatCurrency(region.revenue)}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Low
          </Typography>
          <Box
            width="60%"
            height={20}
            sx={{
              background: 'linear-gradient(90deg, #e3f2fd, #90caf9, #42a5f5, #1976d2, #0d47a1)',
              borderRadius: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            High
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HeatMap;