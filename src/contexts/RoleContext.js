// context/RoleContext.js
import React, { createContext, useState, useEffect } from "react";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../services/RoleService";
import { toast } from "react-toastify";

// Create Role context
export const RoleContext = createContext();

// Provider component
export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllRoles = async (tenantID = null) => {
    try {
      const data = await getRoles(tenantID);
      setRoles(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching roles");
      setLoading(false);
    }
  };

  const fetchRoleById = async (id) => {
    try {
      return await getRoleById(id);
    } catch (error) {
      toast.error("Error fetching role");
      throw error;
    }
  };

  const addRole = async (roleData) => {
    try {
      const newRole = await createRole(roleData);
      setRoles((prevRoles) => [...prevRoles, newRole]);
      toast.success("Role created successfully");
    } catch (error) {
      toast.error("Error creating role");
      throw error;
    }
  };

  const updateRoleProfile = async (id, roleData) => {
    try {
      const updatedRole = await updateRole(id, roleData);
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.roleId === id ? updatedRole : role))
      );
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Error updating role");
      throw error;
    }
  };

  const removeRole = async (id) => {
    try {
      await deleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.roleId !== id));
      toast.success("Role deleted successfully");
    } catch (error) {
      toast.error("Error deleting role");
      throw error;
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        fetchAllRoles,
        fetchRoleById,
        addRole,
        updateRoleProfile,
        removeRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
