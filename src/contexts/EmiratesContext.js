import React, { createContext, useEffect, useState } from "react";
import {getEmirates, getEmiratesById, addEmirates, updateEmirates, deleteEmirates} from "../services/EmirateService";
import { toast } from 'react-toastify';

export const EmiratesContext = createContext();

export const EmiratesProvider = ({ children }) => {
  const [emirates, setEmirates] = useState([]);


  useEffect(() => {
    fetchAllEmirates();
  }, [])

  const fetchAllEmirates = async () => {
    try {
      const data = await getEmirates();
      setEmirates(data);
    } catch (error) {
      console.error('Error fetching Locations');
    }
  };

  const fetchEmirateById = async (id) => {
    try {
      return await getEmiratesById(id);
    } catch (error) {
      console.error('Error fetching Location');
      throw error;
    }
  };

  const createEmirate = async (newEmirate) => {
    try {
      const createdEmirate = await addEmirates(newEmirate);
      setEmirates((prevEmirates) => [...prevEmirates, createdEmirate]);
    } catch (error) {
    }
  };

  // Update Emirates
  const updateEmirate = async (id, updatedEmirate) => {
    try {
      const updatedData = await updateEmirates(id, updatedEmirate);
      setEmirates((prevEmirates) => 
        prevEmirates.map((emirate) => 
          emirate.gasid === id ? { ...emirate, ...updatedData } : emirate
        )
      );

    } catch (error) {
    }
  };

  // Delete Emirates
  const deleteEmirate = async (id) => {
    try {
      await deleteEmirates(id);
      setEmirates((prevEmirates) => prevEmirates.filter((emirate) => emirate.gasid !== id));
      toast.success('Location deleted successfully');
    } catch (error) {
      toast.error('Error deleting Location');
    }
  };


  return (
    <EmiratesContext.Provider value={{ emirates, fetchAllEmirates, fetchEmirateById, createEmirate, updateEmirate, deleteEmirate }}>
      {children}
    </EmiratesContext.Provider>
  );
};
