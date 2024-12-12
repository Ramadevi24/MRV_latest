import React from 'react';

const FormField = ({ label, type = "text", value, onChange, options, isDropdown, placeholder, icon }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      {isDropdown ? (
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="input-with-icon">
          <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
          {icon && <img src={icon} alt="icon" className="input-icon" />}
        </div>
      )}
    </div>
  );
};

export default FormField;
