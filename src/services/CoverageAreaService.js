import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/CoverageAreaOfTheData';
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getCoverageArea = async () => {
    try {
        const response = await axios.get(API_BASE_URL, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        return response.$values;
      } catch (error) {
        throw new Error("Error fetching CoverageArea");
      }
};

export const getCoveargeAreaById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error fetching CoverageArea");
  }
};