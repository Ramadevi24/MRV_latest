import React, { createContext, useEffect, useState } from "react";
import {getAllEquivalents, getEquivalentById, CreateEquivalent, updateEquivalent, deleteEquivalent, getCo2EquivalentTypeById, getAllCo2EquivalentTypes, CreateEquivalentType, updateEquivalentType} from "../services/Co2EquiavalentService";
import { toast } from 'react-toastify';

export const Co2EquivalentContext = createContext();

export const Co2EquivalentProvider = ({ children }) => {
  const [co2Equivalents, setCo2Equivalents] = useState([]);
  const [co2EquivalentsTypes, setCo2EquivalentsTypes] = useState([]);
    const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllEquivalents();
    fetchAllEquivalentsTypes();
  }, [])

  const fetchAllEquivalents = async () => {
    try {
      const data = await getAllEquivalents();
      setCo2Equivalents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Equivalents');
      setLoading(false);
    }
  };

  const fetchEquivalentyById = async (id) => {
    try {
      return await getEquivalentById(id);
    } catch (error) {
      console.error('Error fetching Equivalent');
      throw error;
    }
    finally {
        setLoading(false);
      }
  };

  const createNewEquivalent = async (newEquivalent) => {
    try {
        setLoading(true);
      const createdEquivalent = await CreateEquivalent(newEquivalent);
      setCo2Equivalents((prevEquivalents) => [...prevEquivalents, createdEquivalent]); // Update the state with the new entity
    } catch (error) {
      console.error('Error creating Equivalent');
} finally {
    setLoading(false);
  }
  };

  const updateExistingEquivalent = async (id, updatedEquivalent) => {
    try {
        setLoading(true);
      const updated = await updateEquivalent(id, updatedEquivalent);
      setCo2Equivalents((prevEquivalents) =>
        prevEquivalents.map((item) => (item.id === id ? updated : item))
      );
    } catch (error) {
      console.error('Error updating Equivalent');
    }
    finally {
        setLoading(false);
      }
  };

  const removeEquivalent = async (id) => {
    try {
      await deleteEquivalent(id);  
      setCo2Equivalents((prevEquivalents) => prevEquivalents.filter((item) => item.id !== id)); 
      toast.success('Equivalent removed successfully');
    } catch (error) {
      console.error('Error removing Equivalent');
    }
  };

  const fetchAllEquivalentsTypes = async () => {
    try {
      const data = await getAllCo2EquivalentTypes();
      setCo2EquivalentsTypes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Equivalents');
      setLoading(false);
    }
  };

  const fetchEquivalentTypeById = async (id) => {
    try {
      return await getCo2EquivalentTypeById(id);
    } catch (error) {
      console.error('Error fetching Equivalent');
      throw error;
    }
    finally {
        setLoading(false);
      }
  };

  const createNewEquivalentType = async (newEquivalent) => {
    try {
        setLoading(true);
      const createdEquivalentType = await CreateEquivalentType(newEquivalent);
      setCo2EquivalentsTypes((prevEquivalents) => [...prevEquivalents, createdEquivalentType]); // Update the state with the new entity
    } catch (error) {
      toast.error('Error creating Equivalent');
} finally {
    setLoading(false);
  }
  };

  const updateExistingEquivalentType = async (id, updatedEquivalent) => {
    try {
        setLoading(true);
      const updated = await updateEquivalentType(id, updatedEquivalent);
      setCo2EquivalentsTypes((prevEquivalents) =>
        prevEquivalents.map((item) => (item.id === id ? updated : item))
      );
    } catch (error) {
      console.error('Error updating Equivalent');
    }
    finally {
        setLoading(false);
      }
  };

  return (
    <Co2EquivalentContext.Provider value={{ co2Equivalents, loading, fetchAllEquivalents, fetchEquivalentyById, createNewEquivalent, updateExistingEquivalent, removeEquivalent, fetchAllEquivalentsTypes, co2EquivalentsTypes, fetchEquivalentTypeById, 
    createNewEquivalentType , updateExistingEquivalentType}}>
      {children}
    </Co2EquivalentContext.Provider>
  );
};
