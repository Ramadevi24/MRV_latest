import React from "react";

const Dropdown = ({ label, options }) => {
  return (
    <div className="col-md-3 mb-3">
      <label>{label}</label>
      <select className="form-select">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
