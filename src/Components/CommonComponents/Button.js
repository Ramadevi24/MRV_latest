import React from 'react';

const Button = ({ label, onClick, type = "button", className, icon, width, height, categoryClassButton }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      <img src={icon} alt="Add" width={width} height={height} className={categoryClassButton} style={{marginRight:'10px'}}/>{label}
    </button>
  );
};

export default Button;
