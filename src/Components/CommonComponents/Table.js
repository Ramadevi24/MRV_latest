import React from 'react';

const Table = ({ headers, data, actions }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
            {actions && (
              <td>
                {actions.map((action, actionIndex) => (
                  <button key={actionIndex} onClick={() => action.onClick(row)}>
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
