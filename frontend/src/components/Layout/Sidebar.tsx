import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard',
    emoji: '📊'
  },
  { 
    text: 'Analytics', 
    icon: <BarChartIcon />, 
    path: '/analytics',
    emoji: '📈'
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings',
    emoji: '⚙️'
  },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawer = (
    <>
      <Toolbar />
      <Box sx={{ px: 2, py: 3 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600,
            fontSize: 11
          }}
        >
          Navigation
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <Box sx={{ fontSize: 24 }}>{item.emoji}</Box>
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 15
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <Box 
          className="glass-card"
          sx={{ p: 2, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
            Version 1.0.0
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            className: 'stunning-sidebar'
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        className="stunning-sidebar"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            background: 'rgba(13, 13, 18, 0.95)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;