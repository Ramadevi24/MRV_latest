// CustomAlert.js
import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import { useAlert } from '../../contexts/AlertContext';

const CustomAlert = () => {
  const { alert } = useAlert();
  if (!alert.show) return null;

  const alertStyles = {
    position: 'fixed',
    top: '20px', // Adjust this value to position the alert higher or lower
    right: '50%',
    transform: 'translateY(50%)',
    width: '80%', // Adjust width as needed
    maxWidth: '600px',
    zIndex: 1000, // Ensure the alert stays above other components
  };

  return (
    <div style={alertStyles}>
    <UncontrolledAlert color={alert.color} className="alert-label-icon label-arrow">
      <i className={`${alert.iconClass} label-icon`}></i>
      <strong>{alert.color.charAt(0).toUpperCase() + alert.color.slice(1)}</strong> {alert.message}
    </UncontrolledAlert>
    </div>
  );
};

export default CustomAlert;
