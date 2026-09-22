import axios from 'axios';

const configuredApiUrl = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).trim();

const apiUrl = (
  configuredApiUrl.startsWith('http://') ||
  configuredApiUrl.startsWith('https://')
    ? configuredApiUrl
    : `https://${configuredApiUrl}`
).replace(/\/$/, '');

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;