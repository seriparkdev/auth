import axios from 'axios';
import { getJwtRequestHeader } from 'src/helpers/setting-interceptor-helper';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(
  (config) => {
    return getJwtRequestHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
