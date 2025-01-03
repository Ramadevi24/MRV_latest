import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

const API_URL = `${config.api.API_URL}/Emission`;
const AUTH_TOKEN = localStorage.getItem("AuthToken");

export const getEmissionSources = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error Fetching Emission Sources");
  }
};

export const getEmissionSourceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error Fetching Emission Source");
  }
};

export const createEmissionSource = async (emmisionSourceData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      emmisionSourceData,
      {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      }
    );
    return response;
  } catch (error) {
    if ((error = "Request failed with status code 409")) {
      toast.warn("Emission Source already exists");
    } else {
      throw new Error("Error Creating Emission Source");
    }
  }
};

export const updateEmissionSource = async (id, emissionSourceData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, emissionSourceData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.value.$values;
  } catch (error) {
    throw new Error("Error Updating Emission Source");
  }
};

export const deleteEmissionSource = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error Deleting Emission Source");
  }
};
