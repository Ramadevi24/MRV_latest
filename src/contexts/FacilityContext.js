// context/FacilityContext.js
import React, { createContext, useState, useEffect } from 'react';
import {getFacility, createFacility} from '../services/FacilityService';
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

  // const fetchTenantById = async (id) => {
  //   try {
  //     setLoading(true);
  //     const tenant = await getTenantById(id);
  //     return tenant;
  //   } catch (error) {
  //     console.error('Error fetching tenant by id', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addFacility = async (data) => {
    try {
      setLoading(true);
      const newFacility = await createFacility(data);
      setFacility((prevData) => [...prevData, newFacility]);
      return newFacility;
    } catch (error) {
      throw new Error("Error creating Facility");
    } finally {
      setLoading(false);
    }
  };

  // const editTenant = async (id, tenantData) => {
  //   try {
  //     setLoading(true);
  //     const updatedTenant = await updateTenant(id, tenantData);
  //     setTenants(
  //       tenants.map((tenant) =>
  //         tenant.id === id ? updatedTenant : tenant
  //       )
  //     );
  //   } catch (error) {
  //     throw new Error("Error updating tenant");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const removeTenant = async (id) => {
  //   try {
  //     await deleteTenant(id);
  //     setTenants(tenants.filter((tenant) => tenant.tenantID !== id));
  //     toast.success('Tenant deleted successfully');
  //   } catch (error) {
  //     toast.error('Error deleting tenant');
  //   }
  // };

  return (
    <FacilityContext.Provider value={{ facility, loading, fetchAllFacility, addFacility}}>
      {children}
    </FacilityContext.Provider>
  );
};
