import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

// const API_URL = "https://atlas.smartgeoapps.com/MRVAPI/api/Tenant";
const API_URL = `${config.api.API_URL}/Facility`;
const AUTH_TOKEN = localStorage.getItem("AuthToken");

// Get all tenants
export const getFacility = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllFacilitiesWithDetails`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response.$values;;
  } catch (error) {
    throw new Error("Error fetching facility");
  }
};

// export const getTenantById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//     return response;
//   } catch (error) {
//     throw new Error("Error fetching tenant");
//   }
// };

// Create a new tenant
export const createFacility = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/CreateFacilityWithDetails`, data, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    return response;
  } catch (error) {
    if ((error = "Request failed with status code 409")) {
      toast.warn("Facility already exists");
    } else {
      throw new Error("Error fetching facility");
    }
  }
};

// Update a tenant
// export const updateTenant = async (id, tenantData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, tenantData, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//     return response.value.$values;
//   } catch (error) {
//     throw new Error("Error Updating tenant");
//   }
// };

// Delete tenant
// export const deleteTenant = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`, {
//       headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
//     });
//   } catch (error) {
//     throw new Error("Error deleting tenant");
//   }
// };