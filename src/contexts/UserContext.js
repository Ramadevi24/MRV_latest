// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/UserService";
import { toast } from "react-toastify";

// Create the UserContext
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async (userID) => {
    try {
      const data = await getUsers(userID);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching users");
      setLoading(false);
    }
  };

  const fetchUserById = async (id) => {
    try {
      return await getUserById(id);
    } catch (error) {
      toast.error("Error fetching user");
      throw error;
    }
  };

  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Error creating user");
      throw error;
    }
  };

  const updateUserProfile = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.userId === id ? updatedUser : user))
      );
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Error updating user");
      throw error;
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        fetchAllUsers,
        fetchUserById,
        addUser,
        updateUserProfile,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
