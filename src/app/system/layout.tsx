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

// Interface para descrever as propriedades do layout
interface LayoutProps {
  children: React.ReactNode; // Conteúdo dinâmico renderizado na área principal
}

// Interface para representar cada página no menu lateral
interface Page {
  id: number; // Identificador único da página
  title: string; // Título da página
  icon?: React.ReactNode; // Ícone associado à página (opcional)
}

// Largura fixa do drawer (menu lateral)
const drawerWidth = 240;

const SistemaLayout: React.FC<LayoutProps> = ({ children }) => {
  // Estado para controlar se o menu lateral está aberto em dispositivos móveis
  const [mobileOpen, setMobileOpen] = useState(false);

  // Estado para controlar o elemento ancorado do menu suspenso (dropdown) na AppBar
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Alterna a abertura/fechamento do menu lateral
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Abre o menu suspenso na barra superior
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Fecha o menu suspenso na barra superior
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Definição das páginas e seus ícones no menu lateral
  const pages: Record<string, Page> = {
    Documentos: {
      id: 1,
      title: 'Documentos',
      icon: <FolderIcon />, // Ícone personalizado
    },
    Indicadores: {
      id: 2,
      title: 'Indicadores',
      icon: <SpaceDashboardOutlined />, // Ícone personalizado
    },
    Notificações: {
      id: 3,
      title: 'Notificações',
      icon: <CircleNotificationsIcon />, // Ícone personalizado
    },
    Tarefas: {
      id: 4,
      title: 'Tarefas',
      icon: <TaskIcon />, // Ícone personalizado
    },
  };

  // Conteúdo do menu lateral
  const drawer = (
    <div>
      <Toolbar /> {/* Espaço para alinhar o conteúdo abaixo da AppBar */}
      <List>
        {Object.keys(pages).map((key) => (
          <ListItem key={pages[key].id}>
            <ListItemButton>
              <ListItemIcon>{pages[key].icon}</ListItemIcon> {/* Ícone da página */}
              <ListItemText primary={pages[key].title} /> {/* Título da página */}
              <ExpandMoreIcon /> {/* Ícone de expansão */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Reseta estilos padrões do navegador */}
      <CssBaseline />

      {/* Barra superior fixa */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: '100%' }, // Largura total em telas pequenas
          zIndex: (theme) => theme.zIndex.drawer + 1, // Garantir que a AppBar fique acima do drawer
          ml: { sm: `${drawerWidth}px` }, // Margem esquerda em telas maiores
        }}
      >
        <Toolbar>
          {/* Botão para abrir/fechar o menu lateral (visível em dispositivos móveis) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título da barra superior */}
          <Typography variant="h5" noWrap component="div">
            Sistema de Qualidade
          </Typography>

          {/* Espaço flexível para empurrar o ícone de perfil para a direita */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Ícone de perfil que abre o menu suspenso */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

          {/* Menu suspenso com opções de perfil */}
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

      {/* Menu lateral */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Drawer temporário para dispositivos móveis */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Melhora a performance ao manter o drawer no DOM
          }}
          sx={{
            display: { xs: 'block', sm: 'none' }, // Visível apenas em telas pequenas
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer permanente para telas maiores */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, // Visível apenas em telas grandes
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Ocupa o espaço restante
          p: 3, // Padding
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Ajusta a largura
        }}
      >
        <Toolbar /> {/* Espaçamento abaixo da AppBar */}
        {children} {/* Conteúdo dinâmico renderizado aqui */}
      </Box>
    </Box>
  );
};

export default SistemaLayout;
