import React, { useState } from "react";

const VerticalEmissionTable3 = ({
  headers,
  parameters,
  title,
  showParametersRow,
  subHead,
  showHeaderRow,
  subHeaders,
}) => {
  const [tableData, setTableData] = useState(parameters);
  const [tableData1, setTableData1] = useState(parameters);

  const handleInputChange = (rowIndex, field, value) => { 
    const updatedData = [...tableData];
    updatedData[rowIndex][field] = value;
    setTableData(updatedData);
    
  };

  const handleInputChange1 = (rowIndex, field, value) => { 
    const updatedData1 = [...tableData1];
    updatedData1[rowIndex][field] = value;
    setTableData1(updatedData1);
    
  };


  const renderInputField = (key, value, rowIndex, row) => {
    const getDefaultValue = (value, options) => {
        return options.includes(value) ? value : options[0];
      };
      let disabledVal = "";

    // Dropdown for Fuel Purpose
    if (key == "Is Monitored") {
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

    
    if (key == "Emission (Tonnes)" && tableData[rowIndex]["Is Monitored"] == "No") {
         disabledVal = "disabled";
         value = "";
    } else if(key != "Emission (Tonnes)" && tableData[rowIndex]["Is Monitored"] == "Yes"){
        disabledVal = "disabled";
        value = "";
    }
    // Default text input for other strings
    return (
      <input disabled={disabledVal}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
        className="form-control"                      

      />
    );
  };

  const renderInputField1 = (key, value, rowIndex, row) => {
    const getDefaultValue = (value, options) => {
        return options.includes(value) ? value : options[0];
      };
      let disabledVal = "";

    // Dropdown for Fuel Purpose
    if (key == "Is Monitored") {
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

    
    if (key == "Emission (Tonnes)" && tableData[rowIndex]["Is Monitored"] == "No") {
         disabledVal = "disabled";
         value = "";
    } else if(key != "Emission (Tonnes)" && tableData[rowIndex]["Is Monitored"] == "Yes"){
        disabledVal = "disabled";
        value = "";

    }
    // Default text input for other strings
    return (
      <input disabled={disabledVal}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(rowIndex, column, e.target.value)}
        className="form-control"                      

      />
    );
  };


  return (
    <div className="fuel-details">
      <h3 className="modal-subhead">{title}</h3>
      <div className="table-responsive">
        <table
          className="table align-middle table-nowrap custom-table"
          id="customerTable" style={{
            width: "80%",
          }}
        >
          <thead className="emission-thead">
            {/* Optional Sub-Head */}
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
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>

          {Object.keys(parameters[0]).map((key, rowIndex) => {
               
              if (key === "type") return null;
              return (
                <tr key={rowIndex}> 
                    {rowIndex === 1 && (
                    <td rowSpan="4">
                        ST12345
                    </td>
                    )}
                 
                  <td style={{color:'rgba(102, 112, 133, 1)', fontWeight:'600'}}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  {tableData.map((row, colIndex) => (
                    <td key={colIndex}>
                      {renderInputField(key, row[key], colIndex, rowIndex)}
                    </td>
                  ))}
                </tr>
              );
            })}
           {Object.keys(parameters[0]).map((key, rowIndex) => {
               
               if (key === "type") return null;
               return (
                 <tr key={rowIndex}> 
                     {rowIndex === 1 && (
                     <td rowSpan={tableData1.length+1}>
                         ST22345
                     </td>
                     )}
                  
                   <td style={{color:'rgba(102, 112, 133, 1)', fontWeight:'600'}}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                   {tableData.map((row, colIndex) => (
                     <td key={colIndex}>
                       {renderInputField1(key, row[key], colIndex, rowIndex)}
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

export default VerticalEmissionTable3;
