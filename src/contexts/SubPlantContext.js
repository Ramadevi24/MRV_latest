import React, { createContext, useState, useEffect } from "react";
import {
  getSubPlant,
  getSubPlantById,
  createSubPlant,
  updateSubPlant,
  deleteSubPlant,
} from "../services/SubPlantService";

import { toast } from "react-toastify";

export const SubPlantContext = createContext();

export const SubPlantProvider = ({ children }) => {
  const [subPlants, setSubPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSubPlants();
  }, []);

  const fetchAllSubPlants = async () => {
    try {
      const data = await getSubPlant();
      setSubPlants(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching sub-plants", error);
      setLoading(false);
    }
  };

  const fetchSubPlantById = async (id) => {
    try {
      setLoading(true);
      const subPlant = await getSubPlantById(id);
      return subPlant;
    } catch (error) {
      console.log("Error fetching sub-plant by id", error);
    } finally {
      setLoading(false);
    }
  };

  const addSubPlant = async (subPlantData) => {
    try {
      const newSubPlant = await createSubPlant(subPlantData);
      setSubPlants((prevSubPlants) => [...prevSubPlants, newSubPlant]);
      return newSubPlant;
    } catch (error) {
      throw new Error("Error creating sub-plant");
    } finally {
      setLoading(false);
    }
  };

  const editSubPlant = async (id, subPlantData) => {
    try {
      const updatedSubPlant = await updateSubPlant(id, subPlantData);
      setSubPlants(
        subPlants.map((subPlant) =>
          subPlant.id === id ? updatedSubPlant : subPlant
        )
      );
    } catch (error) {
      throw new Error("Error updating sub-plant");
    } finally {
      setLoading(false);
    }
  };

  const removeSubPlant = async (id) => {
    try {
      await deleteSubPlant(id);
      setSubPlants(subPlants.filter((subPlant) => subPlant.id !== id));
      toast.success("SubPlant removed successfully");
    } catch (error) {
      toast.error("Error removing sub-plant");
    }
  };

  return (
    <SubPlantContext.Provider
      value={{
        subPlants,
        loading,
        fetchAllSubPlants,
        fetchSubPlantById,
        addSubPlant,
        editSubPlant,
        removeSubPlant,
      }}
    >
      {" "}
      {children}{" "}
    </SubPlantContext.Provider>
  );
};
