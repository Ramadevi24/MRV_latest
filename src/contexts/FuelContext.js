import React, { createContext, useState, useEffect } from 'react';
import { getAllFuels, getByFuelId, CreateFuel, updateFuel, deleteFuel } from '../services/FuelManagerService';
import { toast } from 'react-toastify';

export const FuelContext = createContext();

export const FuelProvider = ({ children }) => {
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFuels();
  }, []);


    const fetchFuels = async () => {
      setLoading(true);
      try {
        const fuelData = await getAllFuels();
        setFuels(fuelData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };


  const fetchFuelById = async (id) => {
    setLoading(true);
    try {
      const fuel = await getByFuelId(id);
      return fuel;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addFuel = async (fuelData) => {
    setLoading(true);
    try {
      const newFuel = await CreateFuel(fuelData);
      setFuels([...fuels, newFuel]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateExistingFuel = async (id, fuelData) => {
    setLoading(true);
    try {
      const updatedFuel = await updateFuel(id, fuelData);
      setFuels(fuels.map(fuel => (fuel.id === id ? updatedFuel : fuel)));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFuel = async (id) => {
    setLoading(true);
    try {
      await deleteFuel(id);
      setFuels(fuels.filter(fuel => fuel.id !== id));
       toast.success('Fuel deleted successfully');
    } catch (err) {
      toast.error('Error deleting Fuel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FuelContext.Provider
      value={{
        fuels,
        loading,
        error,
        fetchFuelById,
        addFuel,
        updateExistingFuel,
        removeFuel,
        setFuels,
        fetchFuels
      }}
    >
      {children}
    </FuelContext.Provider>
  );
};
