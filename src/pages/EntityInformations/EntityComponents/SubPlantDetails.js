import React,{useContext, useState} from 'react';
import { useTranslation } from "react-i18next";
import DataTable from '../../../Components/CommonComponents/DataTable';
import Button from '../../../Components/CommonComponents/Button';
import addIcon from '../../../assets/images/Power Sector--- Data Entry/Plus.png'
import SubPlantModal from './SubPlantModal';
import { SubPlantContext } from '../../../contexts/SubPlantContext';

const SubPlantDetails = () => {
  const { t } = useTranslation();
  const [isSubPlantOpen, setIsSubPlantOpen] = useState(false);
  const {subPlants, removeSubPlant, fetchAllSubPlants} = useContext(SubPlantContext);

  const handleSubPlantClick = () => {
    setIsSubPlantOpen(true);
  };

  const handleSubPlantCloseModal = () => {
    setIsSubPlantOpen(false);
  };

  const handleDelete = async(id) => {
    await removeSubPlant(id);
    fetchAllSubPlants()
  };

  const columns = [
    { key: "subPlantName", label: t("Sub Plant"), sortable: true },
    { key: "technology", label: t("Technology"), sortable: true },
    { key: "configuration", label: t("Configuration"), sortable: true },
    { key: "fuelTypeId", label: t("Fuel Type"), sortable: true },
    { key: "Actions", label: t("Action"), render: (val, item) => (
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-info" onClick={() => navigate(`/edit-role/${item.subPlantID}`)}>
          <i className="ri-pencil-line" />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.subPlantID)}>
          <i className="ri-delete-bin-line" />
        </button>
      </div>
    ) },
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
        data={subPlants}
        columns={columns}
        onSort={handleSort}
        onAction={(action, item) => {
          if (action === "edit") navigate(`/edit-role/${item.subPlantID}`);
          if (action === "delete") handleDelete(item.subPlantID);
        }}
      />
      {isSubPlantOpen && (
        <SubPlantModal open={isSubPlantOpen} onClose={handleSubPlantCloseModal} />
      )}
    </div>
  );
};

export default SubPlantDetails;
