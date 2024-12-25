import axios from "axios";
const API_URL = "http://localhost:5000/api/GasInformation";  // Replace with actual API URL
const AUTH_TOKEN = localStorage.getItem("AuthToken");

// Get all gases
export const getGases = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;  // Assuming the data is in the `data` property
  } catch (error) {
    // throw new Error("Error fetching gases");
  }
};

// Get a specific gas by ID
export const getGasById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error fetching gas");
  }
};

// Create a new gas
export const createGas = async (gasData) => {
  try {
    const response = await axios.post(API_URL, gasData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error creating gas");
  }
};

// Update a gas
export const updateGas = async (id, gasData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, gasData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating gas");
  }
};

// Delete a gas
export const deleteGas = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error deleting gas");
  }
};
