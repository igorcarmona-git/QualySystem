import axios from 'axios';
const BASE_URL = 'http://192.168.100.60:3000';
const BASE_URL_LOCAL = 'http://192.168.100.68:3000';

// Cria a instância do Axios
export const api = axios.create({
  baseURL: BASE_URL, // URL do backend
  timeout: 5000,
  withCredentials: true, // ⚠️ Permite enviar cookies nas requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Requisição: Adiciona o token do cookie no cabeçalho
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authToken='))
        ?.split('=')[1];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Resposta: Redireciona para o login se o token for inválido
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
        window.location.href = `${BASE_URL_LOCAL}/auth/login`;
    }
    return Promise.reject(error);
  }
);
