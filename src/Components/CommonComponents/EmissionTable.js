import React, { useState } from "react";

const EmissionTable = ({ headers, parameters, title, showParametersRow, subHead, showHeaderRow, subHeaders}) => {
  const [tableData, setTableData] = useState(parameters);

  const handleInputChange = (rowIndex, field, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][field] = value;
    setTableData(updatedData);
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
                  backgroundColor: "rgba(235, 235, 235, 0.4)",
                  height: "34px",
                }}
              >
                {subHead}
              </th>
            </tr>)}
            {showHeaderRow && (<tr>
            {subHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>)}
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(parameters[0]).map((key, rowIndex) => {
              if (key === "type") return null; // Skip the type column for rows
              return (
                <tr key={rowIndex}>
                  <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  {tableData.map((row, colIndex) => (
                    <td key={colIndex}>
                      {typeof row[key] === "number" ? (
                        <input
                          type="number"
                          value={row[key]}
                          onChange={(e) =>
                            handleInputChange(colIndex, key, e.target.value)
                          }
                        />
                      ) :  (typeof row[key] === "string" )? (
                        // Render text input for string fields except "purpose"
                        <input
                          type="text"
                          value={row[key]}
                          onChange={(e) => handleInputChange(colIndex, key, e.target.value)}
                        />
                      ) :(
                        <select
                          value={row[key]}
                          onChange={(e) =>
                            handleInputChange(colIndex, key, e.target.value)
                          }
                        >
                          <option value="Energy">Energy</option>
                          <option value="Non Energy">Non Energy</option>
                        </select>
                      )}
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
