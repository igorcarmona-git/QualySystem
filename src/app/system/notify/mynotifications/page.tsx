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
import { usePagination } from '@/utils/common/pagination/usePagination';
import CustomizedSteppers from '@/_components/Stepper';
import Link from 'next/link';
import axios from 'axios';
import LoadingPage from '@/_components/errors/LoadingPage';
import { ApiNotification, Notification } from '@/types/notifications';

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const itemsPerPage = 8;

  // Função para buscar notificações da API
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get<ApiNotification[]>(
          'https://jsonplaceholder.typicode.com/posts'
        );

        // Mapeia os dados retornados da API para o formato usado no componente
        const formattedNotifications: Notification[] = response.data.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.body,
          status: ['Enviado à qualidade', 'Em análise', 'Concluído'], // Exemplo de status fixo
        }));

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    }

    fetchNotifications();
  }, []);

  // Hook de paginação
  const { currentItems: paginatedNotifications, currentPage, totalPages, handlePageChange } =
    usePagination<Notification>(notifications, itemsPerPage);

  // Exibir indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <LoadingPage message="Carregando notificações..." />;
  }

  return (
    <Container maxWidth="xl">
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
                  <CustomizedSteppers
                    steps={notification.status}
                    activeStep={0} // Exemplo de passo ativo
                  />
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

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}