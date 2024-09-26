// context/TenantContext.js
import React, { createContext, useState, useEffect } from 'react';
import {getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant, } from '../services/TenantService';
import { toast } from 'react-toastify';

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllTenants = async () => {
    try {
      const data = await getTenants();
      setTenants(data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching tenants');
      setLoading(false);
    }
  };

  const fetchTenantById = async (id) => {
    try {
      setLoading(true);
      const tenant = await getTenantById(id);
      return tenant;
    } catch (error) {
      setError("Error fetching tenant");
    } finally {
      setLoading(false);
    }
  };

  const addTenant = async (tenantData) => {
    try {
      setLoading(true);
      const newTenant = await createTenant(tenantData);
      setTenants((prevTenants) => [...prevTenants, newTenant]); // Update tenants list with new tenant
    } catch (error) {
      setError("Error creating tenant");
    } finally {
      setLoading(false);
    }
  };

  const editTenant = async (id, tenantData) => {
    try {
      setLoading(true);
      const updatedTenant = await updateTenant(id, tenantData);
      setTenants(
        tenants.map((tenant) =>
          tenant.id === id ? updatedTenant : tenant
        )
      ); // Update tenants list with the modified tenant
    } catch (error) {
      setError("Error updating tenant");
    } finally {
      setLoading(false);
    }
  };

  const removeTenant = async (id) => {
    try {
      await deleteTenant(id);
      setTenants(tenants.filter((tenant) => tenant.tenantID !== id));
      toast.success('Tenant deleted successfully');
    } catch (error) {
      toast.error('Error deleting tenant');
    }
  };

  return (
    <TenantContext.Provider value={{ tenants, loading, fetchAllTenants, fetchTenantById,
      addTenant,
      editTenant,
      removeTenant,
}}>
      {children}
    </TenantContext.Provider>
  );
};
