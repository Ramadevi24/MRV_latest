import React,{useState, useEffect} from 'react';
import DataTable from '../../../Components/CommonComponents/DataTable';
import Button from '../../../Components/CommonComponents/Button';
import { useTranslation } from "react-i18next";
import addIcon from '../../../assets/images/Power Sector--- Data Entry/Plus.png'
import CategoryModal from './CategoryModal';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useCategories } from "../../../contexts/CategoriesContext";

const CategoryDetails = () => {
  const {power, transport} = useParams();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // State to store the item being edited
const {
    level1Categories,
    level2Categories,
    level3Categories,
    handleLevel1Change,
    handleLevel2Change,
  } = useCategories();

 const  categoriesData = localStorage.getItem('submittedData') ? JSON.parse(localStorage.getItem('submittedData')) : [];
   const storedData = localStorage.getItem('submittedData');
   let storedData1 = storedData ? JSON.parse(storedData) : [];
   const [submittedData, setSubmittedData] = useState(categoriesData);
   const navigate = useNavigate();  // Initialize navigate function from React Router


  const handleButtonClick = () => {
    setIsModalOpen(true);
    setCurrentItem(null); // When adding a new item, currentItem is null

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (item) => {
    setIsModalOpen(true);
    setCurrentItem(item); // Set the data to be edited in the modal
  };
  useEffect(() => {
    localStorage.setItem('submittedData', JSON.stringify(submittedData));
  }, [submittedData]); // Sync localStorage whenever state changes
  
  const handleDelete = (id) => { 
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
    // Filter out the item with the specified id
  // Filter out the item with the specified id
    setSubmittedData((prevData) => {

    // Filter the item to delete and return the updated list
    const updatedData = prevData.filter((item) => item.id !== id);
    // Persist the updated data to localStorage
    localStorage.setItem('submittedData', JSON.stringify(updatedData));
    setSubmittedData(updatedData);

    return updatedData;
  });
  };
  
  const columns = [
    { key: "sector_ID", label: t("Sector"), sortable: true, render: (val) => {
      const sectorName = level1Categories.find((sector) => sector.id === val)?.name || "Unknown Sector";
      return sectorName;
    }, },
    { key: "sub_sectorID", label: t("Sub Sector"), sortable: true ,    render: (val) => {
      const subSectorName = level2Categories.find((sub) => sub.id === val)?.name || "Unknown Sub-Sector";
      return subSectorName;
    },
},
    { key: "category_ID", label: t("Category"), sortable: true,    render: (val) => {
      const categoryName = level3Categories.find((cat) => cat.id === val)?.name || "Unknown Category";
      return categoryName;
    },
 },
    { key: "emission_source_type", label: t("Emission Source Type"), sortable: true },
    { key: "calculation_approach", label: t("Calculation Approach"), sortable: true },
    { key: "ghg_gases_covered", label: t("GHG Gases Covered"), sortable: true },
    { key: "precursors_gases_covered", label: t("Precursors Gases Covered"), sortable: true },
    { key: "Actions", label: t("Action"), render: (val, item) => (
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-info" onClick={() => handleEdit(item)}>
          <i className="ri-pencil-line" />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
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
        data={categoriesData}
        columns={columns}
        onSort={handleSort}
        onAction={(action, item) => {
          if (action === "edit") handleEdit();
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
        <CategoryModal open={isModalOpen} onClose={handleCloseModal} data={currentItem} />
      )}
    </div>
  );
};

export default CategoryDetails;
