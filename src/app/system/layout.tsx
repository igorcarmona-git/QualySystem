'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  SpaceDashboardOutlined,
} from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import TaskIcon from '@mui/icons-material/Task';

interface LayoutProps {
  children: React.ReactNode;
}

interface Page {
    id: number;
    title: string;
    icon?: React.ReactNode;
}

const drawerWidth = 240;

const SistemaLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const pages: Record<string, Page> = {
    Documentos: {
      id: 1,
      title: 'Documentos',
      icon: <FolderIcon />,
    },
    Indicadores: {
      id: 2,
      title: 'Indicadores',
      icon: <SpaceDashboardOutlined />,
    },
    Notificações: {
      id: 3,
      title: 'Notificações',
      icon: <CircleNotificationsIcon />,
    },
    Tarefas: {
      id: 4,
      title: 'Tarefas',
      icon: <TaskIcon />,
    },
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.keys(pages).map((key) => (
          <ListItem key={pages[key].id}>
            <ListItemButton>
              <ListItemIcon>
                {pages[key].icon}
              </ListItemIcon>
              <ListItemText primary={pages[key].title} />
              <ExpandMoreIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: '100%' },
          zIndex: ( theme ) => theme.zIndex.drawer + 1,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Sistema de Qualidade
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <SettingsIcon sx={{ mr: 1 }} />
              Configurações
            </MenuItem>
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Perfil
            </MenuItem>
            <MenuItem>
              <LogoutIcon sx={{ mr: 1 }} />
              Sair do sistema
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default SistemaLayout;
