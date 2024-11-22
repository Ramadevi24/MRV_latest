import React,{useState} from 'react';
import { useTranslation } from "react-i18next";
import DataTable from '../../../Components/CommonComponents/DataTable';
import Button from '../../../Components/CommonComponents/Button';
import addIcon from '../../../assets/images/Power Sector--- Data Entry/Plus.png'
import SubPlantModal from './SubPlantModal';

const SubPlantDetails = () => {
  const { t } = useTranslation();
  const [isSubPlantOpen, setIsSubPlantOpen] = useState(false);

  const handleSubPlantClick = () => {
    setIsSubPlantOpen(true);
  };

  const handleSubPlantCloseModal = () => {
    setIsSubPlantOpen(false);
  };
  // const headers = ["Sub Plant", "Location Coordinates", "Technology", "Configuration", "Fuel Type"];
  const columns = [
    { key: "Sub Plant", label: t("Sub Plant"), sortable: true },
    { key: "Location Coordinates", label: t("Location Coordinates"), sortable: true },
    { key: "Technology", label: t("Technology"), sortable: true },
    { key: "Configuration", label: t("Configuration"), sortable: true },
    { key: "Fuel Type", label: t("Fuel Type"), sortable: true },
    { key: "Actions", label: t("Action"), render: (val, item) => (
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
      "Location Coordinates": "23.44, 56.37",
      Technology: "Stream Turbine",
      Configuration: "Combined Cycle",
      "Fuel Type": "Natural Gas, Diesel"
    }
  ];

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  return (
    <div className="sub-plant-details">
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Sub Plant Details</h2>
        <Button label="Add Sub Plants" width="12.5" height="12.5"
        icon={addIcon} onClick={handleSubPlantClick} className="category-button">
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
      {isSubPlantOpen && (
        <SubPlantModal open={isSubPlantOpen} onClose={handleSubPlantCloseModal} />
      )}
    </div>
  );
};

export default SubPlantDetails;
