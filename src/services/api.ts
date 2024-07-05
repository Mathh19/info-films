import axios from "axios";

const baseURL = import.meta.env.VITE_API;
const token = import.meta.env.VITE_API_TOKEN;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${token}`
  },
});

api.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    language: 'pt-BR'
  };
  return config;
});
