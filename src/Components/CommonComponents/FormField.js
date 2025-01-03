import React from 'react';

const FormField = ({ label, type, value, onChange, options, isDropdown,  placeholder = "Select an option" , icon, error, valueKey,  labelKey, rows, isMultiSelect}) => {
  const handleMultiSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    onChange(selectedOptions.join(','));
  };

  return (
    <div className="form-field">
      <label>{label}</label>
      {isDropdown ? (
        <div>
        <select value={isMultiSelect ? value?.split(',') : value} 
         onChange={isMultiSelect ? handleMultiSelectChange : onChange}
           multiple={isMultiSelect}>

      {/* Add a placeholder option */}
        {!isMultiSelect && (
                 <option value="" disabled>
                {placeholder}
                 </option>
                )}


          {options?.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
          </div>
      ) : (
        <div className="input-with-icon">
          <input type={type} value={value} onChange={onChange} placeholder={placeholder} rows={rows}/>
          {icon && <img src={icon} alt="icon" className="input-icon" />}
        </div>
      )}
       {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default FormField;
