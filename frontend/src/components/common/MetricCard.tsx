import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatCurrency, formatNumber, formatPercentage } from '@utils/formatters';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  changePercent?: number;
  format?: 'currency' | 'number' | 'percentage';
  icon?: string;
  color?: 'purple' | 'blue' | 'pink' | 'emerald';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changePercent,
  format = 'number',
  icon = '📊',
  color = 'purple',
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      default:
        return formatNumber(val);
    }
  };

  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <Box className="metric-card-wrapper">
      <Box className="metric-card-inner">
        <Box className={`metric-icon ${color}`}>
          {icon}
        </Box>
        
        <Typography className="metric-label">
          {title}
        </Typography>
        
        <Typography className="metric-value">
          {formatValue(value)}
        </Typography>
        
        {changePercent !== undefined && (
          <Box className={`metric-change ${isPositive ? 'up' : 'down'}`}>
            {isPositive ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
            <span>{isPositive ? '+' : ''}{formatPercentage(changePercent)}</span>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MetricCard;