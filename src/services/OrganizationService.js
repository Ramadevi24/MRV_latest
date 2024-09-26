import axios from 'axios';

const API_BASE_URL = 'https://atlas.smartgeoapps.com/MRVAPI/api/Organization';
const CATEGORIES_URL = 'https://atlas.smartgeoapps.com/MRVAPI/api/Categories/level1and2';
const AUTH_TOKEN = localStorage.getItem('AuthToken');

export const getOrganizations = async (tenantID = null) => {
    const organizationUrl = tenantID? `${API_BASE_URL}/getOrganizations/${tenantID}`: API_BASE_URL;
    try {
        const response = await axios.get(organizationUrl, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        console.log(response, 'response');
        return response.$values;
      } catch (error) {
        throw new Error("Error fetching Organizations");
      }
};

export const getOrganizationById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error fetching Organization");
  }
};

export const createOrganization = async (organizationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, organizationData, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error create Organization");
  }
};

export const updateOrganization = async (id, organizationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, organizationData, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response;
  } catch (error) {
    throw new Error("Error update Organization");
  }
};

export const deleteOrganization = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
    return response.data;
  } catch (error) {
    throw new Error("Error delete Organization");
  }
};

export const fetchCategories = async () => {
  try {
  const response = await  axios.get(CATEGORIES_URL, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return response.$values;
  } catch (error) {
    throw new Error("Error fetching categories");;
  }
};