'use client';

import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    router.push('/system');
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'white',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 400,
          border: '1px solid #fff4e3',
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          Login
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Bem-vindo ao Sistema de Qualidade
        </Typography>

        <TextField
          fullWidth
          label="Usuário"
          placeholder="Entre com seu usuário"
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Senha"
          placeholder="Entre com a sua senha"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            bgcolor: '#1976d2',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            py: 1.5,
            mb: 2,
            ':hover': { bgcolor: '#115293' },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Não tem uma conta?{' '}
            <Link href="#" underline="hover" onClick={() => router.push('/auth/register')} sx={{ 
              color: '#1976d2', fontWeight: 'bold' 
              }}>
              Registre-se
            </Link>
          </Typography>
          <Link href="#" underline="hover" sx={{ 
            color: '#1976d2', 
            fontWeight: 'thin',
            display: 'block', 
            mt: 2 
            }}>
            Esqueci minha senha
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
