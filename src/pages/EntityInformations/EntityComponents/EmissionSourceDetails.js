import React from "react";
import { useTranslation } from "react-i18next";
import DataTable from '../../../Components/CommonComponents/DataTable';
import Button from '../../../Components/CommonComponents/Button';
import addIcon from '../../../assets/images/Power Sector--- Data Entry/Plus.png'

const EmissionSourceDetails = () => {
  const { t } = useTranslation();
  const columns = [
    { key: "Sub Plant", label: t("Sub Plant"), sortable: true },
    { key: "Stack ID", label: "Stack ID", sortable: true },
    { key: "Stack Diameter", label: "Stack Diameter", sortable: true },
    { key: "Stack Height", label: "Stack Height", sortable: true },
    { key: "Exit Velocity", label: "Exit Velocity", sortable: true },
    { key: "Exit Temperature", label: "Exit Temperature", sortable: true },
    { key: "Actions", label: "Action", render: (val, item) => (
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-info" onClick={() => navigate(`/edit-role/${item.roleID}`)}>
          <i className="ri-pencil-line" />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.roleID)}>
          <i className="ri-delete-bin-line" />
        </button>
      </div>
    ) },
  ];
  const data = [
    {
      "Sub Plant": "GT/HRSG 41",
      "Stack ID": "ST-01",
      "Stack Diameter": "1.5 m",
      "Stack Height": "50 m",
      "Exit Velocity": "20 m/s",
      "Exit Temperature": "100 C"
    }
  ];
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  }
  return (
    <div className="emission-details">
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Emission Source Details</h2>
        <Button label="Add Emission" width="12.5" height="12.5"
        icon={addIcon} onClick={() => {}} className="category-button">
        </Button>
      </div>
      <DataTable
        data={data}
        columns={columns}
        onSort={handleSort}
        onAction={(action, item) => {
          if (action === "edit") navigate(`/edit-role/${item.roleID}`);
          if (action === "delete") handleDelete(item.roleID);
        }}
      />
    </div>
  );
};

export default EmissionSourceDetails;