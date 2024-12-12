import React, { createContext, useEffect, useState } from "react";
import {getEntities, getEntitiesById} from "../services/EntityService";
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

  return (
    <EntityContext.Provider value={{ entity, fetchAllEntity, fetchEntityById }}>
      {children}
    </EntityContext.Provider>
  );
};
