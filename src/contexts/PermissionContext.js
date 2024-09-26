// context/PermissionContext.js
import React, { createContext, useState, useEffect } from "react";
import {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from "../services/PermissionService";
import { toast } from "react-toastify";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching permissions");
      setLoading(false);
    }
  };

  const fetchPermissionById = async (id) => {
    try {
      return await getPermissionById(id);
    } catch (error) {
      toast.error("Error fetching permission");
      throw error;
    }
  };

  const addPermission = async (permissionData) => {
    try {
      const newPermission = await createPermission(permissionData);
      setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
      toast.success("Permission created successfully");
      fetchAllPermissions();
    } catch (error) {
      toast.error("Error creating permission");
      throw error;
    }
  };

  const updatePermissionProfile = async (id, permissionData) => {
    try {
      const updatedPermission = await updatePermission(id, permissionData);
      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission.permissionId === id ? updatedPermission : permission
        )
      );
      toast.success("Permission updated successfully", { autoClose: 3000 });
      fetchAllPermissions();
    } catch (error) {
      toast.error("Error updating permission");
      throw error;
    }
  };

  const removePermission = async (id) => {
    try {
      await deletePermission(id);
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission.permissionId !== id)
      );
      toast.success("Permission deleted successfully");
    } catch (error) {
      toast.error("Error deleting permission");
      throw error;
    }
  };

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        loading,
        fetchAllPermissions,
        fetchPermissionById,
        addPermission,
        updatePermissionProfile,
        removePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
