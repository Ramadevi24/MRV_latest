import axios from 'axios';
import config from '../config';
import { onCLS } from 'web-vitals';

const API_BASE_URL =`${config.api.API_URL}/Entity`;
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getEntities = async () => {
    try {
        const response = await axios.get(API_BASE_URL, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        return response.$values;
      } catch (error) {
        throw new Error("Error fetching Entities");
      }
};

export const getEntitiesById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error fetching Entity");
  }
};

export const createEntity = async (newEntity) => {
  try {
    const response = await axios.post(API_BASE_URL, newEntity, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values; 
  } catch (error) {
    console.log(error, 'error')
    if (error = "Request failed with status code 409 error") {
      toast.warn("Entity already exists");
    } else {
      throw new Error("Error fetching Entity");
    }
  }
};

export const updateEntity = async (id, updatedEntity) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedEntity, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error updating Entity");
  }
};

export const deleteEntity = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values; 
  } catch (error) {
    throw new Error("Error deleting Entity");
  }
};