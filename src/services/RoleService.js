import axios from "axios";

const API_URL = "https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles";
const AUTH_TOKEN = localStorage.getItem("AuthToken");

// Get all Roles
export const getRoles =async (tenantID = null) => {
  const url = tenantID ? `${API_URL}?tenantId=${tenantID}` : API_URL;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;
  } catch (error) {
    throw new Error("Error fetching Roles");
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching Role");
  }
};

// Create a new Role
export const createRole = async (RoleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, RoleData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error create Role");
  }
};

// Update a Role
export const updateRole = async (id, RoleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, RoleData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error Updating Role");
  }
};

// Delete Role
export const deleteRole = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
  } catch (error) {
    throw new Error("Error deleting Role");
  }
};
