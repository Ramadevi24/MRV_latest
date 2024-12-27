import axios from "axios";
import config from "../config";

const API_URL = `${config.api.API_URL}/Permissions`;
const AUTH_TOKEN = localStorage.getItem("AuthToken");

// Get all Permissions
export const getPermissions = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error fetching Permissions");
  }
};

export const getPermissionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching Permission");
  }
};

// Create a new Permission
export const createPermission = async (PermissionData) => {
  try {
    const response = await axios.post(`${API_URL}`, PermissionData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error create Permission");
  }
};

// Update a Permission
export const updatePermission = async (id, PermissionData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, PermissionData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error Updating Permission");
  }
};

// Delete Permission
export const deletePermission = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error deleting Permission");
  }
};
