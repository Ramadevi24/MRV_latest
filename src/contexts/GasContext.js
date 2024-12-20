import React, { createContext, useState, useEffect } from 'react';
import {getGases,
  getGasById,
  createGas,
  updateGas,
  deleteGas, } from '../services/GasService';
import { toast } from 'react-toastify';

export const GasContext = createContext();

export const GasProvider = ({ children }) => {
  const [gases, setGases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllGases();
    }, [])

  const fetchAllGases = async () => {
    try {
      const data = await getGases();
      setGases(data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching gases');
      setLoading(false);
    }
  };

  const fetchGasById = async (id) => {
    try {
      setLoading(true);
      const gas = await getGasById(id);
      return gas;
    } catch (error) {
      setError("Error fetching gases");
    } finally {
      setLoading(false);
    }
  };

  const addGas = async (gasData) => {
    try {
      setLoading(true);
      const newGas = await createGas(gasData);
      setGases((prevGases) => [...prevGases, newGas]); 
      setError("Error creating gas");
    } finally {
      setLoading(false);
    }
  };

  const editGas = async (id, gasData) => {
    try {
      setLoading(true);
      const updatedGas = await updateGas(id, gasData);
      setGases(
        gases.map((gas) =>
          gas.id === id ? updatedGas : gas
        )
      ); // Update tenants list with the modified tenant
    } catch (error) {
      setError("Error updating gas");
    } finally {
      setLoading(false);
    }
  };

  const removegas = async (id) => {
    try {
      await deleteGas(id);
      setGases(gases.filter((gas) => gas.id !== id));
      toast.success('Gas deleted successfully');
    } catch (error) {
      toast.error('Error deleting gas');
    }
  };

  return (
    <GasContext.Provider value={{ gases, loading, fetchAllGases, fetchGasById,
      addGas,
      editGas,
      removegas,
}}>
      {children}
    </GasContext.Provider>
  );
};
