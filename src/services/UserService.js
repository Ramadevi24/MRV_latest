import axios from "axios";

const API_URL = "https://atlas.smartgeoapps.com/MRVAPI/api/User";
const AUTH_TOKEN = localStorage.getItem("AuthToken");

// Get all Users
export const getUsers = async (tenantID) => {
  const userUrl = tenantID ? `${API_URL}?tenantId=${tenantID}` : API_URL;
  try {
    const response = await axios.get(userUrl, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error fetching Users");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching User");
  }
};

// Create a new User
export const createUser = async (UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, UserData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error create User");
  }
};

// Update a User
export const updateUser = async (id, UserData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, UserData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error Updating User");
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error deleting User");
  }
};
