import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
