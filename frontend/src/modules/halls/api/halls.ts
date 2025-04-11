import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';


export interface Hall {
  id: string;
  hallName: string;
  importerName: string;
  numberOfChickens: number;
  initialWeight: number;
  budgetType: string;
  createdAt: string;
}

export type BudgetType = 'Standard' | 'Premium' | 'Economy';

// Get all halls
export const getHalls = async (): Promise<Hall[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/halls`);
    return response.data;
  } catch (error) {
    console.error('Error fetching halls:', error);
    throw error;
  }
};

// Create new hall
export const createHall = async (hallData: Omit<Hall, 'id' | 'createdAt'>): Promise<Hall> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/halls`, hallData);
    return response.data;
  } catch (error) {
    console.error('Error creating hall:', error);
    throw error;
  }
};

// Update hall
export const updateHall = async (id: string, hallData: Partial<Hall>): Promise<Hall> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/halls/${id}`, hallData);
    return response.data;
  } catch (error) {
    console.error('Error updating hall:', error);
    throw error;
  }
};

// Delete hall
export const deleteHall = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/halls/${id}`);
  } catch (error) {
    console.error('Error deleting hall:', error);
    throw error;
  }
};