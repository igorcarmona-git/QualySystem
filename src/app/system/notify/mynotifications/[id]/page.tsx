'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { Notification } from '@/types/notification';

export default function NotificationDetails() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Para capturar parâmetros na URL
  const id = searchParams.get('id'); // Obter o ID da notificação
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulação de um banco de dados (substitua por sua API se necessário)
  const notifications: Notification[] = Array.from({ length: 20 }, (_, index) => ({
    id: `${index + 1}`,
    title: `Título da notificação ${index + 1}`,
    description: `Descrição detalhada da notificação ${index + 1}`,
    status: ['Enviado à qualidade', 'Em análise', 'Concluído'],
  }));

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!notification) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Notificação não encontrada.
        </Typography>
        <Button variant="contained" onClick={() => router.push('/system/notify/mynotifications')}>
          Voltar
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Botão para voltar */}
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/system/notify/mynotifications')}
        >
          SAIR DETALHES
        </Button>
      </Box>

      {/* Detalhes da notificação */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Detalhes da notificação: {notification.title}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Título da notificação: {notification.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {notification.description}
        </Typography>
        <Typography variant="body1" paragraph>
          Status atual: {notification.status[notification.status.length - 1]}
        </Typography>
      </Paper>
    </Container>
  );
}
