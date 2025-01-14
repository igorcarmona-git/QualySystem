import axios from 'axios';
const BASE_URL = 'http://192.168.100.60:3000';
const BASE_URL_LOCAL = 'http://192.168.100.68:3000';

// Cria a instância do Axios
export const api = axios.create({
  baseURL: BASE_URL, // URL do backend
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


