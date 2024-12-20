import React from 'react';

const FormField = ({ label, type, value, onChange, options, isDropdown, placeholder, icon, error }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      {isDropdown ? (
        <div>
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
          </div>
      ) : (
        <div className="input-with-icon">
          <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
          {icon && <img src={icon} alt="icon" className="input-icon" />}
        </div>
      )}
       {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default FormField;
