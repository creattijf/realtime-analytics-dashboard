import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="fixed" className="stunning-header" elevation={0}>
      <Toolbar sx={{ px: 3 }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box className="logo-container">
          <Box className="logo-icon">
            ✨
          </Box>
          <Typography className="logo-text">
            Analytics Pro
          </Typography>
        </Box>

        <Box className="live-badge" sx={{ ml: 2 }}>
          LIVE
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton 
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.05)',
              '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Box textAlign="right">
              <Typography variant="body2" fontWeight={600}>
                {user?.email}
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                {user?.role}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleMenuOpen}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                background: 'var(--gradient-cosmic)',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {user?.email?.[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            className: 'glass-card',
            sx: { mt: 1.5, minWidth: 200 }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircleIcon sx={{ mr: 1.5 }} fontSize="small" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon sx={{ mr: 1.5 }} fontSize="small" />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1.5 }} fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;