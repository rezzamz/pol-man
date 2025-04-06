import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // تغییر آدرس به آدرس محلی شما

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const fetchHalls = async () => {
  try {
    const response = await api.get('/halls');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const fetchHallDetail = async (id: string) => {
  try {
    const response = await api.get(`/hallDetail/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateHallDetail = async (id: string, data: unknown) => {
  try {
    const response = await api.put(`/hallDetail/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createHall = async (hallData: any) => {
  try {
    const response = await api.post('/halls', hallData);
    return response.data;
  } catch (error) {
    console.error('Error creating hall:', error);
    throw error;
  }
};

const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error) && error.response) {
    console.error(`API Error: ${error.response.status} ${error.response.statusText}`);
  } else {
    console.error('Unexpected error', error);
  }
};

export default api;