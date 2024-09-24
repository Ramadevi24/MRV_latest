import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Access loading state

  if (loading) {
    // While loading, render a spinner or a loading screen
    return <div>Loading...</div>; // You can replace this with a loading component
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
