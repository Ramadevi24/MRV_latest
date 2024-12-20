import React, { createContext, useEffect, useState } from "react";
import {getEntities, getEntitiesById, createEntity, updateEntity, deleteEntity} from "../services/EntityService";
import { toast } from 'react-toastify';

export const EntityContext = createContext();

export const EntityProvider = ({ children }) => {
  const [entity, setEntity] = useState([]);

  useEffect(() => {
    fetchAllEntity();
  }, [])

  const fetchAllEntity = async () => {
    try {
      const data = await getEntities();
      setEntity(data);
    } catch (error) {
      toast.error('Error fetching Entities');
    }
  };

  const fetchEntityById = async (id) => {
    try {
      return await getEntitiesById(id);
    } catch (error) {
      toast.error('Error fetching Entity');
      throw error;
    }
  };

  const createNewEntity = async (newEntity) => {
    try {
      const createdEntity = await createEntity(newEntity);
      setEntity((prevEntities) => [...prevEntities, createdEntity]); // Update the state with the new entity
      toast.success('Entity created successfully');
    } catch (error) {
      toast.error('Error creating Entity');
    }
  };

  const updateExistingEntity = async (id, updatedEntity) => {
    try {
      const updated = await updateEntity(id, updatedEntity);
      setEntity((prevEntities) =>
        prevEntities.map((item) => (item.id === id ? updated : item))
      );
      toast.success('Entity updated successfully');
    } catch (error) {
      toast.error('Error updating Entity');
    }
  };

  const removeEntity = async (id) => {
    try {
      await deleteEntity(id);  
      setEntity((prevEntities) => prevEntities.filter((item) => item.id !== id)); 
      toast.success('Entity removed successfully');
    } catch (error) {
      toast.error('Error removing Entity');
    }
  };

  return (
    <EntityContext.Provider value={{ entity, fetchAllEntity, fetchEntityById, createNewEntity, updateExistingEntity, removeEntity }}>
      {children}
    </EntityContext.Provider>
  );
};
