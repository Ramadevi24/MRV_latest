// context/FacilityContext.js
import React, { createContext, useState, useEffect } from 'react';
import {getGetAllFacilitiesNamesByUser, createFacility, getAllFacilityWithDetailsByFacilityID} from '../services/FacilityService';
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
      const data = await getGetAllFacilitiesNamesByUser();
      setFacility(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facility', error);
      setLoading(false);
    }
  };

  const fetchAllFacilityWithDetailsByFacilityID = async (id) => {
    try {
      setLoading(true);
      const facilityUser = await getAllFacilityWithDetailsByFacilityID(id);
      return facilityUser;
    } catch (error) {
      console.error('Error fetching facilityUser by id', error);
    } finally {
      setLoading(false);
    }
  };

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
    <FacilityContext.Provider value={{ facility, loading, fetchAllFacility, addFacility, fetchAllFacilityWithDetailsByFacilityID}}>
      {children}
    </FacilityContext.Provider>
  );
};
