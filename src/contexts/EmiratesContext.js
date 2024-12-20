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
      console.error('Error fetching Emirates');
    }
  };

  const fetchEmirateById = async (id) => {
    try {
      return await getEmiratesById(id);
    } catch (error) {
      console.error('Error fetching Emirate');
      throw error;
    }
  };

  const createEmirate = async (newEmirate) => {
    try {
      const createdEmirate = await addEmirates(newEmirate);
      setEmirates((prevEmirates) => [...prevEmirates, createdEmirate]);
      toast.success('Emirate added successfully');
    } catch (error) {
      toast.error('Error adding Emirate');
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
      toast.success('Emirate updated successfully');
    } catch (error) {
      toast.error('Error updating Emirate');
    }
  };

  // Delete Emirates
  const deleteEmirate = async (id) => {
    try {
      await deleteEmirates(id);
      setEmirates((prevEmirates) => prevEmirates.filter((emirate) => emirate.gasid !== id));
      toast.success('Emirate deleted successfully');
    } catch (error) {
      toast.error('Error deleting Emirate');
    }
  };


  return (
    <EmiratesContext.Provider value={{ emirates, fetchAllEmirates, fetchEmirateById, createEmirate, updateEmirate, deleteEmirate }}>
      {children}
    </EmiratesContext.Provider>
  );
};
