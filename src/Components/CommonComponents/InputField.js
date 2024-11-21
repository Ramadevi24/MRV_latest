import React from "react";

const InputField = ({ label, placeholder }) => {
  return (
    <div className="col-md-4 mb-3">
      <label>{label}</label>
      <input type="text" className="form-control" placeholder={placeholder} />
    </div>
  );
};

export default InputField;
