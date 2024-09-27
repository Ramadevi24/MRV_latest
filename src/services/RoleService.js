import axios from "axios";

const API_URL = "https://atlas.smartgeoapps.com/MRVAPI/api/Role/Roles";
const baseURL = 'https://atlas.smartgeoapps.com/MRVAPI/api/Role/';
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


// export const getRoleById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//     return response;
//   } catch (error) {
//     throw new Error("Error fetching Role");
//   }
// };

// Create a new Role
export const createRole = async (RoleData) => {
  try {
    const response = await axios.post(`https://atlas.smartgeoapps.com/MRVAPI/api/Role`, RoleData, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    throw new Error("Error create Role");
  }
};

// export const updateRole = async (id, RoleData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, RoleData, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//     return response;
//   } catch (error) {
//     throw new Error("Error Updating Role");
//   }
// };

// export const deleteRole = async (id) => {
//   try {
//     await axios.delete(`https://atlas.smartgeoapps.com/MRVAPI/api/Role/${id}`, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//   } catch (error) {
//     throw new Error("Error deleting Role");
//   }
// };

export const getRoleById = async (id, tenantId = null) => {
  try {
    const url = tenantId ? `${baseURL}${id}?tenantId=${tenantId}` : `${baseURL}${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return response; // Return the response data
  } catch (error) {
    console.error('Error fetching role:', error);
    throw error;
  }
};

// Update (PUT) function
export const updateRole = async (id, tenantId = null, data) => {
  try {
    const url = tenantId ? `${baseURL}${id}?tenantId=${tenantId}` : `${baseURL}${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return response; // Return the updated data
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

// Delete function
export const deleteRole = async (id, tenantId = null) => {
  try {
    const url = tenantId ? `${baseURL}${id}?tenantId=${tenantId}` : `${baseURL}${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return response; // Return the result of deletion
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};
