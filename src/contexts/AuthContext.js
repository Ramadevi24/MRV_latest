import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const tokenData = localStorage.getItem('AuthToken');
    if (tokenData) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
    setLoading(false); // Token check is complete
  }, []);

  const login = (token) => {
    localStorage.setItem('AuthToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('UserPermissions');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
