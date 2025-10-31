import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import MainLayout from '@components/Layout/MainLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AnalyticsPage: React.FC = () => {
  const analyticsCards = [
    {
      title: 'Revenue Analytics',
      subtitle: 'Deep dive into revenue streams',
      icon: '💰',
      color: '#8b5cf6',
      metrics: [
        { label: 'Monthly Recurring Revenue', value: '$45,231', trend: '+12.5%' },
        { label: 'Average Revenue Per User', value: '$127', trend: '+8.3%' },
        { label: 'Revenue Growth Rate', value: '23%', trend: '+5.2%' },
      ],
      progress: 85,
    },
    {
      title: 'User Engagement',
      subtitle: 'Customer behavior insights',
      icon: '👥',
      color: '#3b82f6',
      metrics: [
        { label: 'Daily Active Users', value: '8,420', trend: '+15.8%' },
        { label: 'Average Session Duration', value: '8m 42s', trend: '+22.1%' },
        { label: 'User Retention Rate', value: '94%', trend: '+3.5%' },
      ],
      progress: 94,
    },
    {
      title: 'Conversion Metrics',
      subtitle: 'Funnel optimization data',
      icon: '📈',
      color: '#10b981',
      metrics: [
        { label: 'Overall Conversion Rate', value: '3.42%', trend: '+0.8%' },
        { label: 'Cart Abandonment', value: '38%', trend: '-5.2%' },
        { label: 'Checkout Success', value: '92%', trend: '+4.1%' },
      ],
      progress: 72,
    },
    {
      title: 'Performance',
      subtitle: 'System health metrics',
      icon: '⚡',
      color: '#f59e0b',
      metrics: [
        { label: 'Average Load Time', value: '1.2s', trend: '-0.3s' },
        { label: 'System Uptime', value: '99.9%', trend: '+0.1%' },
        { label: 'Error Rate', value: '0.02%', trend: '-0.01%' },
      ],
      progress: 99,
    },
  ];

  const detailedStats = [
    { icon: <VisibilityIcon />, label: 'Page Views', value: '2.4M', change: '+18.2%', color: '#8b5cf6' },
    { icon: <TouchAppIcon />, label: 'Interactions', value: '892K', change: '+24.5%', color: '#3b82f6' },
    { icon: <PeopleIcon />, label: 'New Users', value: '12.4K', change: '+31.8%', color: '#10b981' },
    { icon: <ShoppingCartIcon />, label: 'Transactions', value: '8.2K', change: '+12.3%', color: '#ec4899' },
  ];

  const upcomingFeatures = [
    { title: 'Predictive Analytics', description: 'AI-powered forecasting', icon: '🤖', status: 'Coming Soon' },
    { title: 'Cohort Analysis', description: 'Advanced user segmentation', icon: '📊', status: 'In Development' },
    { title: 'A/B Testing Suite', description: 'Experiment management', icon: '🧪', status: 'Beta' },
    { title: 'Custom Reports', description: 'Build your own dashboards', icon: '📝', status: 'Planning' },
    { title: 'API Analytics', description: 'Track API performance', icon: '🔌', status: 'Coming Soon' },
    { title: 'Real-time Alerts', description: 'Custom notification rules', icon: '🔔', status: 'Beta' },
  ];

  return (
    <MainLayout>
      <Box className="fade-in-up">
        {/* Header - ЯРКИЙ И ЧИТАЕМЫЙ */}
        <Box mb={5}>
          <Typography 
            variant="h3" 
            fontWeight={800}
            sx={{
              color: '#ffffff',
              mb: 1,
              textShadow: '0 2px 10px rgba(59, 130, 246, 0.5)',
            }}
          >
            📈 Advanced Analytics
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            Comprehensive insights for data-driven decisions
          </Typography>
        </Box>

        {/* Detailed Stats */}
        <Grid container spacing={3} className="stagger-children" sx={{ mb: 4 }}>
          {detailedStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="glass-card" sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'white',
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="body2" sx={{ color: '#d1d5db', mb: 1, fontWeight: 600 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#f9fafb', mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                    fontWeight: 600,
                  }}
                >
                  {stat.change} vs last period
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Analytics Cards */}
        <Grid container spacing={3} className="stagger-children" sx={{ mb: 4 }}>
          {analyticsCards.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box className="feature-card" sx={{ height: '100%' }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Box
                    className="feature-icon"
                    sx={{
                      background: card.color,
                      mb: 0,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      fontWeight={700}
                      sx={{ color: '#f9fafb', mb: 0.5 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ color: '#d1d5db' }}
                    >
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={3}>
                  {card.metrics.map((metric, idx) => (
                    <Box key={idx} mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="body2" sx={{ color: '#d1d5db', fontWeight: 600 }}>
                          {metric.label}
                        </Typography>
                        <Box display="flex" gap={2}>
                          <Typography variant="body2" fontWeight={700} sx={{ color: '#f9fafb' }}>
                            {metric.value}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            fontWeight={700}
                            sx={{ color: metric.trend.startsWith('+') ? '#10b981' : '#ef4444' }}
                          >
                            {metric.trend}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600 }}>
                      Overall Performance
                    </Typography>
                    <Typography variant="caption" fontWeight={700} sx={{ color: card.color }}>
                      {card.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(75, 85, 99, 0.3)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: card.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Upcoming Features */}
        <Box className="glass-card" sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#f9fafb', mb: 3 }}>
            🚀 Coming Soon
          </Typography>
          <Grid container spacing={2}>
            {upcomingFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(139, 92, 246, 0.15)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box fontSize={32} mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#f9fafb', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#d1d5db', mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Box
                    component="span"
                    className="badge info"
                    sx={{ fontSize: 11 }}
                  >
                    {feature.status}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AnalyticsPage;