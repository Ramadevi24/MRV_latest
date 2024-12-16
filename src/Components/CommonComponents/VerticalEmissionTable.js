import React, { useState } from "react";

const VerticalEmissionTable = ({
  headers,
  parameters,
  title,
  showParametersRow,
  subHead,
  showHeaderRow,
  subHeaders,
}) => {
    const [tableData, setTableData] = useState(parameters);

    const handleInputChange = (rowIndex, field, value) => {
      const updatedData = [...tableData];
      updatedData[rowIndex][field] = value;
      setTableData(updatedData);
    };

    const renderInputField = (value, rowIndex, row, key) => {
        // Dropdown for Fuel Purpose
        if (key === "Fuel Purpose") {
          return (
            <select
              value={value}
              onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
              className="form-control"
              style={{ appearance: "auto" }}
            >
              <option value="Energy">Energy</option>
              <option value="Non Energy">Non Energy</option>
            </select>
          );
        }
    
        // Dropdown for Is N2O Monitored?
        if (key === "Is N2O Monitored ?") {
          return (
            <select
              value={value}
              onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
              className="form-control"
              style={{ appearance: "auto" }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          );
        }
    
        // Disable N2O Emission (Tonnes) if Is N2O Monitored? is No
        if (key === "N2O Emission (Tonnes)" && isN2OMonitored === "No") {
          return (
            <input
              type="number"
              value={value}
              className="form-control"
              disabled
            />
          );
        }
    
        // Disable N2O Emission factor and Source of Emission factor if Is N2O Monitored? is Yes
        if (
          (key === "N2O Emission factor (g/GJ)" ||
            key === "N2O Source of Emission factor") &&
          isN2OMonitored === "Yes"
        ) {
          return (
            <input
              type="number"
              value={value}
              className="form-control"
              disabled
            />
          );
        }
    
        // Editable N2O Emission factor and Source of Emission factor if Is N2O Monitored? is No
        if (
          (key === "N2O Emission factor (g/GJ)" ||
            key === "N2O Source of Emission factor") &&
          isN2OMonitored === "No"
        ) {
          return (
            <input
              type="number"
              value={value}
              placeholder="24"
              onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
              className="form-control"
            />
          );
        }
    
        // Dropdown for Fuel Unit
        if (key === "Fuel Unit") {
          return (
            <select
              value={value}
              onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
              className="form-control"
              style={{ appearance: "auto" }}
            >
              <option value="m³">m³</option>
              <option value="liters">liters</option>
              <option value="gallons">gallons</option>
            </select>
          );
        }
    
        // Number input
        if (typeof value === "number") {
          return (
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(rowIndex, e.target.value)}
              className="form-control"
            />
          );
        }
    
        // Default text input for other strings
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(rowIndex, e.target.value)}
            className="form-control"
          />
        );
      };
    
      const isN2OMonitoredRow = tableData.find((row) => row.type === "Is N2O Monitored ?");

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
                >
                  {subHead}
                </th>
              </tr>
            )}
            {showHeaderRow && (
              <tr style={{
                backgroundColor: "rgba(235, 247, 255, 1)",
                height: "34px",
              }}>
                {subHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            )}
          <tr style={{
                    backgroundColor: "rgba(235, 247, 255, 1)",
                    height: "34px",
                  }}>
            {headers.map((header, index) => (
              <th
                key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {tableData.map((group, groupIndex) =>
            group.rows.map((row, rowIndex) => (
              <tr key={`${groupIndex}-${rowIndex}`}>
                {rowIndex === 0 && (
                  <th rowSpan={group.rows.length} style={{ textAlign: "center" }}>
                    {group.group}
                  </th>
                )}
                <td>{row.parameter}</td>
                {row.values.map((value, colIndex) => (
          <td key={colIndex}>
            {console.log(
              value,
              row)}
            {renderInputField(
              value,
              rowIndex,
              row // Pass the "Is N2O Monitored ?" value if available
            )}
          </td>
        ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default VerticalEmissionTable;
