import axios from 'axios';
import config from '../config';

const API_BASE_URL = `${config.api.API_URL}/Emirates`;
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getEmirates = async () => {
    try {
        const response = await axios.get(API_BASE_URL, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        return response.$values;
      } catch (error) {
        throw new Error("Error fetching Emirates");
      }
};

export const getEmiratesById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error fetching Emirate");
  }
};

export const addEmirates = async (newEmirate) => {
  try {
    const response = await axios.post(API_BASE_URL, newEmirate, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error adding Emirates");
  }
};

export const updateEmirates = async (id, updatedEmirate) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedEmirate, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error updating Emirates");
  }
};

export const deleteEmirates = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error deleting Emirates");
  }
};