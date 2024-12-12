import React, { createContext, useEffect, useState } from "react";
import {getEmirates, getEmiratesById} from "../services/EmirateService";
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
      toast.error('Error fetching Emirates');
    }
  };

  const fetchEmirateById = async (id) => {
    try {
      return await getEmiratesById(id);
    } catch (error) {
      toast.error('Error fetching Emirate');
      throw error;
    }
  };

  return (
    <EmiratesContext.Provider value={{ emirates, fetchAllEmirates, fetchEmirateById }}>
      {children}
    </EmiratesContext.Provider>
  );
};
