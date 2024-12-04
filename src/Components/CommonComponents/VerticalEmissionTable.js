import React, { useState } from "react";

const VerticalEmissionTable = ({ headers, parameters, title, showParametersRow, subHead, showHeaderRow, subHeaders }) => {
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
            {/* Optional Sub-Head */}
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
              </tr>
            )}
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
            {/* Dynamic Rows */}
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* First Column: Parameters */}
                <td>{row.type}</td>
                {/* Remaining Columns */}
                {headers.slice(1).map((header, colIndex) => (
                  <td key={colIndex}>
                    {typeof row[header] === "number" ? (
                      <input
                        type="number"
                        value={row[header]}
                        onChange={(e) =>
                          handleInputChange(rowIndex, header, e.target.value)
                        }
                      />
                    ) : typeof row[header] === "string" && header !== "type" ? (
                      <input
                        type="text"
                        value={row[header]}
                        onChange={(e) =>
                          handleInputChange(rowIndex, header, e.target.value)
                        }
                      />
                    ) : (
                      <select
                        value={row[header]}
                        onChange={(e) =>
                          handleInputChange(rowIndex, header, e.target.value)
                        }
                      >
                        <option value="Energy">Energy</option>
                        <option value="Non Energy">Non Energy</option>
                      </select>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerticalEmissionTable;
