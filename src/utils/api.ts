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

// Interceptor used to add the token to the request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const authRequestToken = token ? token : null;
  config.headers.Authorization = authRequestToken;
  return config;
}, 
    (error) => Promise.reject(error)
);

// Interceptor used to remove the token to the response
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
    const originalConfig = error.config;
    console.log(error.response.status);

    if(error.response.status == 401){
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = '/auth/login';
    }
    return Promise.reject(error);
}
);


