// context/TenantContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTenants, deleteTenant } from '../services/TenantService';
import { toast } from 'react-toastify';

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTenants();
  }, []);

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
    <TenantContext.Provider value={{ tenants, loading, fetchAllTenants, removeTenant }}>
      {children}
    </TenantContext.Provider>
  );
};
