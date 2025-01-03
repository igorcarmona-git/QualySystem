'use client';

import React from 'react';
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
import CustomizedSteppers from '@/components/Stepper';
import Link from 'next/link';
import { Notification } from '@/types/notification';

const notifications: Notification[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Título da notificação ${index + 1}`,
  description: `Descrição da notificação ${index + 1}`,
  status: ['Enviado à qualidade', 'Em análise', 'Concluído'],
}));

export default function NotificationsList() {
  const itemsPerPage = 8;

  const { currentItems: paginatedNotifications, currentPage, totalPages, handlePageChange } =
    usePagination(notifications, itemsPerPage);

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
                  sx={{ backgroundColor: 'grey.100', px: 1, borderRadius: 1, fontSize: 16, fontWeight: 'bold', marginBottom: 2}}
                >
                  {notification.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                >
                  {notification.description}
                </Typography>
                <Box mt={2}>
                  <CustomizedSteppers
                    steps={notification.status}
                    activeStep={0} // Exemplo de passo ativo (ajustável dinamicamente)
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Link href={`/system/notify/mynotifications/${notification.id}`}>
                    <Button size='small' variant='contained' color='primary'>
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
