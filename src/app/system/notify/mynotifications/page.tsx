'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Container,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CustomizedSteppers from '@/_components/Stepper';
import Link from 'next/link';
import LoadingPage from '@/_components/errors/LoadingPage';
import { Notification } from '@/types/notifications';
import { api } from '@/utils/api';

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch notifications from the API
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await api.get('buscaNotificacoes');

        // Mapeando a resposta para o formato Notification
        const formattedNotifications = response.data.map((item: any) => ({
          id: item.id,
          title: item.titulo || '',
          description: item.descricao || '',
          status: ['Enviado à qualidade', 'Em análise', 'Concluído'],
        }));

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

// Calculate the total number of pages
// Math.ceil() is used to round up to ensure all items are paginated correctly
const totalPages = Math.ceil(notifications.length / itemsPerPage);

// ----------------Filter notifications based on the current page

// notifications.slice(start, end) returns a shallow copy of a portion of the array without modifying the original array.

// Calculation of the starting index:
// If currentPage = 1 and itemsPerPage = 8:
// (1 - 1) * 8 = 0 → Starts from index 0.
// If currentPage = 2:
// (2 - 1) * 8 = 8 → Starts from index 8. 
const paginatedNotifications = notifications.slice(
  (currentPage - 1) * itemsPerPage,  // Start index for slicing
  currentPage * itemsPerPage         // End index (exclusive)
);

// Handle page change when the user interacts with pagination
const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
  // Update the current page state to the selected page number
  setCurrentPage(page);

  // Smoothly scroll the window to the top after changing the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  if (loading) {
    return <LoadingPage message="Carregando notificações..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Título e Filtro */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">
          Minhas notificações
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button startIcon={<FilterAltOutlinedIcon />} variant="outlined" color="primary">
            FILTRO
          </Button>
          <TextField size="small" placeholder="Pesquisar" variant="outlined" />
        </Box>
      </Box>

      {/* Cards de Notificações */}
      <Grid container spacing={3}>
        {paginatedNotifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={notification.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    backgroundColor: 'grey.100',
                    px: 1,
                    borderRadius: 1,
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 2,
                  }}
                >
                  {notification.title.length > 30
                    ? `${notification.title.substring(0, 30)}...`
                    : notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {notification.description.length > 150
                    ? `${notification.description.substring(0, 150)}...`
                    : notification.description}
                </Typography>
                <Box mt={2}>
                  <CustomizedSteppers steps={notification.status} activeStep={0} />
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Link href={`/system/notify/mynotifications/${notification.id}`}>
                  <Button size="small" variant="contained" color="primary">
                    Detalhes
                  </Button>
                </Link>
                <Button size="small" variant="contained" color="primary" startIcon={<EditIcon />}>
                  EDITAR
                </Button>
                <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />}>
                  EXCLUIR
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Box>
    </Container>
  );
}
