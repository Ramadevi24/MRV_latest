import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

const API_URL = `${config.api.API_URL}/SubPlant`;
const AUTH_TOKEN = localStorage.getItem("AuthToken");

export const getSubPlant = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error fetching sub-plants");
  }
};

export const getSubPlantById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error fetching sub-plant");
  }
};

export const createSubPlant = async (subPlantData) => {
  try {
    const response = await axios.post(`${API_URL}`, subPlantData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    if ((error = "Request failed with status code 409")) {
      toast.warn("SubPlant already exists");
    } else {
      throw new Error("Error creating sub-plant");
    }
  }
};

export const updateSubPlant = async (id, subPlantData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, subPlantData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.value.$values;
  } catch (error) {
    throw new Error("Error updating sub-plant");
  }
};

export const deleteSubPlant = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error deleting sub-plant");
  }
};
