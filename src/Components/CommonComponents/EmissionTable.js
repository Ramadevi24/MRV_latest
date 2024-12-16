import React, { useState } from "react";

const EmissionTable = ({ headers, parameters, title, showParametersRow, subHead, showHeaderRow, subHeaders}) => {
  const [tableData, setTableData] = useState(parameters);

  const handleInputChange = (rowIndex, field, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][field] = value;
    setTableData(updatedData);
  };

  const renderInputField = (key, value, rowIndex) => {
    const getDefaultValue = (value, options) => {
      return options.includes(value) ? value : options[0];
    };

    // Dropdown for Fuel Purpose
    if (key === "Fuel Purpose") {
      const options = ["Energy", "Non Energy"];
      const selectedValue = getDefaultValue(value, options);
      return (
        <select
          value={selectedValue}
          onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          className="form-control"
          style={{ appearance: 'auto' }}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    // Dropdown for Is N2O Monitored?
    if (key === "Is N2O Monitored?") {
      const options = ["Yes", "No"];
      const selectedValue = getDefaultValue(value, options);
      return (
        <select
          value={selectedValue}
          onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          className="form-control"
          style={{ appearance: 'auto' }}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    // Dropdown for Fuel Unit
    if (key === "Fuel Unit") {
      const options = ["m³", "liters", "gallons"];
      const selectedValue = getDefaultValue(value, options);
      return (
        <select
          value={selectedValue}
          onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          className="form-control"
          style={{ appearance: 'auto' }}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    // Number input
    if (typeof value === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          className="form-control"
        />
      );
    }

    // Default text input for other strings
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
        className="form-control"
      />
    );
  };

  return (
    <div className="fuel-details">
      <h3 className="modal-subhead">{title}</h3>
      <div className="table-responsive">
        <table
          className="table align-middle table-nowrap custom-table emission-table"
          id="customerTable"
        >
          <thead className="emission-thead">
            {showParametersRow && (
              <tr>
                <th
                  colSpan={headers.length}
                  style={{
                    backgroundColor: "rgba(235, 247, 255, 1)",
                    height: "34px",
                  }}
                  // onClick={() => handleSort("name")}
                  className="sort"
                  data-sort="parameters">
                  {subHead}
                </th>
              </tr>
            )}
            {showHeaderRow && (
              <tr>
                {subHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            )}
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(parameters[0]).map((key, rowIndex) => {
              if (key === "type") return null;
              return (
                <tr key={rowIndex}>
                  <td style={{color:'rgba(102, 112, 133, 1)', fontWeight:'600'}}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  {tableData.map((row, colIndex) => (
                    <td key={colIndex}>
                      {renderInputField(key, row[key], colIndex, rowIndex)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmissionTable;