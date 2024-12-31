// context/FacilityContext.js
import React, { createContext, useState, useEffect } from 'react';
import {getFacility} from '../services/FacilityService';
import { toast } from 'react-toastify';

export const FacilityContext = createContext();

export const FacilityProvider = ({ children }) => {
  const [facility, setFacility] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllFacility();
  }, []);

  const fetchAllFacility = async () => {
    try {
      const data = await getFacility();
      setFacility(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facility', error);
      setLoading(false);
    }
  };

 /* const fetchTenantById = async (id) => {
    try {
      setLoading(true);
      const tenant = await getTenantById(id);
      return tenant;
    } catch (error) {
      console.error('Error fetching tenant by id', error);
    } finally {
      setLoading(false);
    }
  };

  const addTenant = async (tenantData) => {
    try {
      setLoading(true);
      const newTenant = await createTenant(tenantData);
      setTenants((prevTenants) => [...prevTenants, newTenant]);
      return newTenant;
    } catch (error) {
      throw new Error("Error creating tenant");
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
      );
    } catch (error) {
      throw new Error("Error updating tenant");
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
*/
  return (
    <FacilityContext.Provider value={{ facility, loading, fetchAllFacility}}>
      {children}
    </FacilityContext.Provider>
  );
};
