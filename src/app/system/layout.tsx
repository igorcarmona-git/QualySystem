'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
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
  Collapse,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  SpaceDashboardOutlined,
} from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import TaskIcon from '@mui/icons-material/Task';

// Interface para descrever as propriedades do layout
interface LayoutProps {
  children: React.ReactNode;
}

// Interface para representar cada página no menu lateral
interface Page {
  id: number;
  title: string;
  icon?: React.ReactNode;
  subPages?: Page[];
}

// Largura fixa do drawer
const drawerWidth = 240;

const SistemaLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuToggle = (id: number) => {
    setOpenSubMenu((prevOpen) => (prevOpen === id ? null : id));
  };

  const pages: Page[] = [
    {
      id: 1,
      title: 'Notificações',
      icon: <CircleNotificationsIcon />,
      subPages: [
        { id: 11, title: 'Registrar' },
        { id: 12, title: 'Minhas notificações' },
        { id: 13, title: 'Plano de Ação' },
      ],
    },
    {
      id: 2,
      title: 'Tarefas',
      icon: <TaskIcon />,
      subPages: [
        { id: 21, title: 'Controle de Atividades' },
        { id: 22, title: 'Prazos' },
      ],
    },
    {
      id: 3,
      title: 'Documentos',
      icon: <FolderIcon />,
      subPages: [
        { id: 31, title: 'Upload' },
        { id: 32, title: 'Consultar' },
        { id: 33, title: 'Relatórios' },
      ],
    },
    {
      id: 4,
      title: 'Indicadores',
      icon: <SpaceDashboardOutlined />,
      subPages: [
        { id: 41, title: 'Gráficos' },
        { id: 42, title: 'Relatórios' },
      ],
    },
  ];  

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {pages.map((page) => (
          <div key={page.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSubMenuToggle(page.id)}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.title} />
                {page.subPages ? (
                  openSubMenu === page.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
            {page.subPages && (
              <Collapse in={openSubMenu === page.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {page.subPages.map((subPage) => (
                    <ListItem key={subPage.id} disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>{subPage.icon}</ListItemIcon>
                        <ListItemText primary={subPage.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
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
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
            <AccountCircleIcon fontSize='large' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <div className='flex p-2 items-center justify-center'>
              <span>Nome do Usuário</span>
            </div>
            <Divider variant="fullWidth" color='blue' />
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
