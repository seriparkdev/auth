import { getAccessToken } from 'src/helpers/storage-helper';
import { InternalAxiosRequestConfig } from 'axios/index';

export const getJwtRequestHeader = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
};
