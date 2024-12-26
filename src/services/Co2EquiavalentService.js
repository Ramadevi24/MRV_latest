import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Co2EquiGases';
const API_type_URL = 'http://localhost:5000/api/Co2Equivalent';
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getAllEquivalents = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error fetching equivalents:', error);
      throw error;
    }
  }

  export const getEquivalentById= async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching equivalent with id ${id}:`, error);
      throw error;
    }
  }

  export const CreateEquivalent = async (data) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error creating new equivalent:', error);
      throw error;
    }
  }

  export const updateEquivalent = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error(`Error updating equivalent with id ${id}:`, error);
      throw error;
    }
  }

  export const deleteEquivalent = async (id) => {
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

  export const getAllCo2EquivalentTypes = async () => {
    try {
      const response = await axios.get(API_type_URL, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error fetching equivalents:', error);
      throw error;
    }
  }

  export const getCo2EquivalentTypeById= async (id) => {
    try {
      const response = await axios.get(`${API_type_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching equivalent with id ${id}:`, error);
      throw error;
    }
  }

  export const CreateEquivalentType = async (data) => {
    try {
      const response = await axios.post(API_type_URL, data, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error('Error creating new equivalent:', error);
      throw error;
    }
  }

  export const updateEquivalentType = async (id, data) => {
    try {
      const response = await axios.put(`${API_type_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      return response.$values;
    } catch (error) {
      console.error(`Error updating equivalent with id ${id}:`, error);
      throw error;
    }
  }


