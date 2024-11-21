import React, { useState } from "react";
import "../../assets/scss/CSS/ToggleSwitch.css";

const ToggleSwitch = ({ label, onToggle }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <div className="toggle-switch">
      <span className="toggle-label">{label}</span>
      <div className="switch-container">
      <span className={`switch-label ${isChecked ? "active" : ""}`}>Yes</span>
        <div className={`switch ${isChecked ? "checked" : ""}`} onClick={handleToggle}>
          <div className="toggle-circle"></div>
        </div>
        <span className={`switch-label ${!isChecked ? "active" : ""}`}>No</span>
      </div>
      </div>
  );
};

export default ToggleSwitch;
