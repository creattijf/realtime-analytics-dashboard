import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { ConversionData } from '@models/index';
import { formatNumber, formatPercentage } from '@utils/formatters';

interface FunnelChartProps {
  title: string;
  data: ConversionData[];
}

const FunnelChart: React.FC<FunnelChartProps> = ({ title, data }) => {
  const maxCount = data[0]?.count || 1;

  const stageLabels: Record<string, string> = {
    visited: 'Visited Site',
    viewed_product: 'Viewed Product',
    added_to_cart: 'Added to Cart',
    checkout: 'Checkout',
    purchased: 'Purchased',
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box mt={3}>
          {data.map((stage, index) => {
            const widthPercent = (stage.count / maxCount) * 100;
            const dropoff = index > 0 ? data[index - 1].count - stage.count : 0;
            const dropoffPercent = index > 0 ? (dropoff / data[index - 1].count) * 100 : 0;

            return (
              <Box key={stage.stage} mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" fontWeight="medium">
                    {stageLabels[stage.stage] || stage.stage}
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Typography variant="body2" color="primary">
                      {formatNumber(stage.count)} ({formatPercentage(stage.percentage)})
                    </Typography>
                    {index > 0 && dropoffPercent > 0 && (
                      <Typography variant="body2" color="error">
                        -{formatPercentage(dropoffPercent)} dropoff
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box position="relative">
                  <LinearProgress
                    variant="determinate"
                    value={widthPercent}
                    sx={{
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 1,
                        background: `linear-gradient(90deg, #0088FE ${index * 20}%, #00C49F ${100 - index * 20}%)`,
                      },
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;