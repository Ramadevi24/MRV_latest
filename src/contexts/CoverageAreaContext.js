import React, { createContext, useEffect, useState } from "react";
import {getCoverageArea, getCoveargeAreaById} from "../services/CoverageAreaService";
import { toast } from 'react-toastify';

export const CoverageAreaContext = createContext();

export const CoverageAreaProvider = ({ children }) => {
  const [coverageArea, setCoverageArea] = useState([]);

  useEffect(() => {
    fetchAllCoverages();
  }, [])

  const fetchAllCoverages = async () => {
    try {
      const data = await getCoverageArea();
      setCoverageArea(data);
    } catch (error) {
      console.error('Error fetching CoverageAreas');
    }
  };

  const fetchCoverageById = async (id) => {
    try {
      return await getCoveargeAreaById(id);
    } catch (error) {
      console.error('Error fetching CoverageArea');
      throw error;
    }
  };

  return (
    <CoverageAreaContext.Provider value={{ coverageArea, fetchAllCoverages, fetchCoverageById }}>
      {children}
    </CoverageAreaContext.Provider>
  );
};
