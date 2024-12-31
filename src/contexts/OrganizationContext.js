// context/OrganizationContext.js
import React, { createContext, useState, useEffect } from 'react';
import {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  fetchCategories,
} from '../services/OrganizationService';
import { toast } from 'react-toastify';

// Create context
export const OrganizationContext = createContext();

// Provider component
export const OrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);


  const fetchAllOrganizations = async (tenantID = null) => {
    try {
      const data = await getOrganizations(tenantID);
      setOrganizations(data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching organizations');
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  const fetchOrganizationById = async (id) => {
    try {
      return await getOrganizationById(id);
    } catch (error) {
      toast.error('Error fetching organization');
      throw error;
    }
  };

  const addOrganization = async (organizationData) => {
    try {
      const newOrganization = await createOrganization(organizationData);
      setOrganizations((prevOrganizations) => [...prevOrganizations, newOrganization]);
      toast.success('Organization created successfully');
    } catch (error) {
      toast.error('Error creating organization');
      throw error;
    }
  };

  const updateOrganizationProfile = async (id, organizationData) => {
    try {
      const updatedOrganization = await updateOrganization(id, organizationData);
      setOrganizations((prevOrganizations) =>
        prevOrganizations.map((org) => (org.organizationId === id ? updatedOrganization : org))
      );
      toast.success('Organization updated successfully');
    } catch (error) {
      toast.error('Error updating organization');
      throw error;
    }
  };

  const removeOrganization = async (id) => {
    try {
      await deleteOrganization(id);
      setOrganizations((prevOrganizations) =>
        prevOrganizations.filter((org) => org.organizationId !== id)
      );
      toast.success('Organization deleted successfully');
    } catch (error) {
      toast.error('Error deleting organization');
      throw error;
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        categories,
        loading,
        fetchAllOrganizations,
        fetchAllCategories,
        fetchOrganizationById,
        addOrganization,
        updateOrganizationProfile,
        removeOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
