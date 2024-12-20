import axios from 'axios';

const API_URL = 'http://localhost:5000/api/FuelManager';
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getAllFuels = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error fetching all fuels:', error);
      throw error;
    }
  }

  export const getByFuelId= async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error(`Error fetching fuel with id ${id}:`, error);
      throw error;
    }
  }

  export const CreateFuel = async (fuelData) => {
    try {
      const response = await axios.post(API_URL, fuelData, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error creating new fuel:', error);
      throw error;
    }
  }

  export const updateFuel = async (id, fuelData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, fuelData, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error(`Error updating fuel with id ${id}:`, error);
      throw error;
    }
  }

  export const deleteFuel = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting fuel with id ${id}:`, error);
      throw error;
    }
  }
