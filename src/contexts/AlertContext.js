// AlertContext.js
import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    color: '',
    message: '',
    iconClass: '',
  });

  // Function to trigger a success alert
  const triggerSuccessAlert = (message) => {
    setAlert({
      show: true,
      color: 'success',
      message,
      iconClass: 'ri-notification-off-line',
    });
    setTimeout(() => setAlert((prevAlert) => ({ ...prevAlert, show: false })), 3000);
  };

  // Function to trigger an error alert
  const triggerErrorAlert = (message) => {
    setAlert({
      show: true,
      color: 'danger',
      message,
      iconClass: 'ri-error-warning-line',
    });
    setTimeout(() => setAlert((prevAlert) => ({ ...prevAlert, show: false })), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, triggerSuccessAlert, triggerErrorAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
