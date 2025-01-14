import axios from 'axios';
const BASE_URL = 'http://192.168.100.60:3000';
import Cookies from 'js-cookie';

// Cria a instância do Axios
export const api = axios.create({
  baseURL: BASE_URL, // URL do backend
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// I use this interceptor to add the token to the request to send to the backend and not to manipulate the routes in frontend.
// To validate token and return to loginPage if not authenticated is in middleware.ts file.
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});