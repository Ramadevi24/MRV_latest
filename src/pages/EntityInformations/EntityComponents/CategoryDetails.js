import React,{useState} from 'react';
import DataTable from '../../../Components/CommonComponents/DataTable';
import Button from '../../../Components/CommonComponents/Button';
import { useTranslation } from "react-i18next";
import addIcon from '../../../assets/images/Power Sector--- Data Entry/Plus.png'
import CategoryModal from './CategoryModal';
import { useParams } from 'react-router-dom';

const CategoryDetails = () => {
  const {power, transport} = useParams();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { key: "Sector", label: t("Sector"), sortable: true },
    { key: "Sub Sector / Category", label: t("Sub Sector / Category"), sortable: true },
    { key: "Emission Source Type", label: t("Emission Source Type"), sortable: true },
    { key: "Calculation Approach", label: t("Calculation Approach"), sortable: true },
    { key: "GHG Gases Covered", label: t("GHG Gases Covered"), sortable: true },
    { key: "Precursors Gases Covered", label: t("Precursors Gases Covered"), sortable: true },
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

  const Aviationcolumns = [
    { key: "Aircraft Category", label: t("Aircraft Category"), sortable: true },
    { key: "Aircraft Type-Model", label: t("Aircraft Type-Model"), sortable: true },
    { key: "Configuration", label: t("Configuration"), sortable: true },
    { key: "Estimation Approach", label: t("Estimation Approach"), sortable: true },
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
      Sector: "Energy",
      "Sub Sector / Category": "1.A Fuel Combustion Activities / 1.A.1 Energy Industries",
      "Emission Source Type": "Steam Turbine",
      "Calculation Approach": "T1, T2, T3",
      "GHG Gases Covered": "N2O, CH4"
    }
  ];

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  return (
    <div className="category-details">
      <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle mt-4'>Category Details</h2>
        <Button label="Add Categories" width="12.5" height="12.5"
        icon={addIcon} onClick={handleButtonClick} className="category-button">
        </Button>
      </div>
      {(power !== "undefined" && transport !== ":aviation") &&(<DataTable
        data={data}
        columns={columns}
        onSort={handleSort}
        onAction={(action, item) => {
          if (action === "edit") navigate(`/edit-role/${item.roleID}`);
          if (action === "delete") handleDelete(item.roleID);
        }}
      />)}

{transport === ":aviation" && ( <DataTable
        data={data}
        columns={Aviationcolumns}
        onSort={handleSort}
        onAction={(action, item) => {
          if (action === "edit") navigate(`/edit-role/${item.roleID}`);
          if (action === "delete") handleDelete(item.roleID);
        }}
      />)}
      {isModalOpen && (
        <CategoryModal open={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CategoryDetails;
