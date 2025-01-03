import React from "react";

const DataTable = ({ data, onSort, onAction, columns }) => {
  return (
    <div className="table-responsive  mt-3 mb-1">
    <table className="table align-middle table-nowrap custom-table" id="customerTable">
      <thead className="table-light">
        <tr>
          {columns?.map(({ key, label, sortable }) => (
            <th
              key={key}
              onClick={sortable ? () => onSort(key) : null}
              className={sortable ? "sort" : ""}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.roleID}>
              {columns.map(({ key, render }) => (
                <td key={key}>
                  {render ? render(item[key], item) : item[key]}
                </td>
              ))}
              
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default DataTable;
