import React, { useState } from 'react';
import { Box, Typography, Grid, Switch, Button, Avatar, Chip } from '@mui/material';
import MainLayout from '@components/Layout/MainLayout';
import { useAuth } from '@contexts/AuthContext';
import SecurityIcon from '@mui/icons-material/Security';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';

interface Setting {
  label: string;
  value: string | boolean;
  type: 'text' | 'badge' | 'switch' | 'select';
  onChange?: (value: boolean) => void;
  description?: string;
  badgeColor?: 'success' | 'info' | 'warning' | 'danger';
  unit?: string;
}

interface SettingsCategory {
  title: string;
  icon: string;
  color: string;
  settings: Setting[];
}

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [realtimeAlerts, setRealtimeAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const settingsCategories: SettingsCategory[] = [
    {
      title: 'Profile Settings',
      icon: '👤',
      color: '#a855f7',
      settings: [
        { label: 'Email', value: user?.email || '', type: 'text' },
        { label: 'Role', value: user?.role || '', type: 'badge' },
        { label: 'Account Status', value: 'Active', type: 'badge', badgeColor: 'success' },
      ],
    },
    {
      title: 'Notifications',
      icon: '🔔',
      color: '#3b82f6',
      settings: [
        { 
          label: 'Email Notifications', 
          value: emailNotifications, 
          type: 'switch',
          onChange: setEmailNotifications,
          description: 'Receive email updates about your analytics'
        },
        { 
          label: 'Real-time Alerts', 
          value: realtimeAlerts, 
          type: 'switch',
          onChange: setRealtimeAlerts,
          description: 'Get instant notifications for important events'
        },
        { 
          label: 'Weekly Reports', 
          value: weeklyReports, 
          type: 'switch',
          onChange: setWeeklyReports,
          description: 'Weekly summary of your analytics data'
        },
      ],
    },
    {
      title: 'Appearance',
      icon: '🎨',
      color: '#ec4899',
      settings: [
        { 
          label: 'Dark Mode', 
          value: darkMode, 
          type: 'switch',
          onChange: setDarkMode,
          description: 'Toggle between light and dark theme'
        },
      ],
    },
    {
      title: 'Performance',
      icon: '⚡',
      color: '#f59e0b',
      settings: [
        { label: 'Refresh Interval', value: '5 seconds', type: 'text' },
        { label: 'Data Cache', value: 'Enabled', type: 'badge', badgeColor: 'success' },
      ],
    },
  ];

  const quickActions = [
    { icon: <CloudDownloadIcon />, label: 'Export Data', color: '#a855f7' },
    { icon: <SecurityIcon />, label: 'Security', color: '#3b82f6' },
    { icon: <VerifiedUserIcon />, label: 'Privacy', color: '#10b981' },
    { icon: <SpeedIcon />, label: 'Performance', color: '#f59e0b' },
  ];

  return (
    <MainLayout>
      <Box className="fade-in-up">
        {/* Header - ЯРКИЙ И ЧИТАЕМЫЙ */}
<Box mb={4}>
  <Typography 
    variant="h3" 
    fontWeight={800}
    sx={{
      color: '#ffffff',
      mb: 1,
      textShadow: '0 2px 10px rgba(168, 85, 247, 0.5)',
    }}
  >
    ⚙️ Settings
  </Typography>
  <Typography 
    variant="h6" 
    sx={{ 
      color: '#e5e7eb',
      fontWeight: 500,
    }}
  >
    Customize your dashboard experience
  </Typography>
</Box>

        {/* User Profile Card */}
        <Box className="glass-card" sx={{ p: 4, mb: 4 }}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: 'var(--gradient-primary)',
                fontSize: 36,
                fontWeight: 700,
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5)',
              }}
            >
              {user?.email?.[0].toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" fontWeight={700} sx={{ color: 'var(--text-bright)', mb: 1 }}>
                {user?.email}
              </Typography>
              <Box display="flex" gap={1}>
                <Chip
                  label={user?.role}
                  sx={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                />
                <Chip
                  label="Premium"
                  sx={{
                    background: 'var(--gradient-fire)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                />
              </Box>
            </Box>
            <Button className="btn-primary">
              Edit Profile
            </Button>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Grid container spacing={3} className="stagger-children" sx={{ mb: 4 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                className="feature-card"
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .action-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                <Box
                  className="action-icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 10px 30px ${action.color}66`,
                    color: 'white',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'var(--text-bright)' }}>
                  {action.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Settings Categories */}
        <Grid container spacing={3} className="stagger-children">
          {settingsCategories.map((category, categoryIndex) => (
            <Grid item xs={12} md={6} key={categoryIndex}>
              <Box className="glass-card" sx={{ p: 4, height: '100%' }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      boxShadow: `0 8px 25px ${category.color}66`,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: 'var(--text-bright)' }}>
                    {category.title}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={3}>
                  {category.settings.map((setting, settingIndex) => (
                    <Box key={settingIndex}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box flex={1}>
                          <Typography 
                            variant="body1" 
                            fontWeight={600} 
                            sx={{ color: 'var(--text-bright)', mb: 0.5 }}
                          >
                            {setting.label}
                          </Typography>
                          {setting.description && (
                            <Typography 
                              variant="caption" 
                              sx={{ color: 'var(--text-medium)' }}
                            >
                              {setting.description}
                            </Typography>
                          )}
                        </Box>

                        <Box>
                          {setting.type === 'switch' && (
                            <Switch
                              checked={setting.value as boolean}
                              onChange={(e) => setting.onChange && setting.onChange(e.target.checked)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: category.color,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: category.color,
                                },
                              }}
                            />
                          )}
                          {setting.type === 'text' && (
                            <Typography 
                              variant="body2" 
                              sx={{ color: 'var(--text-medium)' }}
                            >
                              {setting.value as string}
                            </Typography>
                          )}
                          {setting.type === 'badge' && (
                            <Chip
                              label={setting.value as string}
                              size="small"
                              className={`badge ${setting.badgeColor || 'info'}`}
                            />
                          )}
                        </Box>
                      </Box>
                      {settingIndex < category.settings.length - 1 && (
                        <Box 
                          sx={{ 
                            height: 1, 
                            background: 'rgba(168, 85, 247, 0.1)', 
                            mt: 2 
                          }} 
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Save Button */}
        <Box mt={4} textAlign="center">
          <Button 
            className="btn-primary" 
            size="large"
            sx={{ px: 6, py: 2 }}
          >
            Save All Settings
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default SettingsPage;