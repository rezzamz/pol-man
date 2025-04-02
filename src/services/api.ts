import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = async <T>(endpoint: string): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(endpoint);
  return response.data;
};

export const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(endpoint, data);
  return response.data;
};

export default api;