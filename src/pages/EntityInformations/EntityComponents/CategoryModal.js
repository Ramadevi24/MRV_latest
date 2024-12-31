import React, { useState, useContext } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import FileUpload from "../../../Components/CommonComponents/FileUpload";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { CalculationApproach } from "../../../utils/FuelData";
import { GasContext } from "../../../contexts/GasContext";
import { useCategories } from "../../../contexts/CategoriesContext";


const CategoryModal = ({open, onClose}) => {
  const { gases } = useContext(GasContext);
  const [formData, setFormData] = useState([{
    sector_ID: "",
    sub_sectorID: "",
    category_ID: "",
    emission_source_type: "",
    calculation_approach: "",
    ghg_gases_covered: "",
    precursors_gases_covered: "",
    uncertainty_guidance: false,
    qA_QC_for_emission: false,
    qA_QC_for_activity_data: false,
    uploadedDocuments: [
      {
        document_Type: "",
        file_Name: "",
        file_path: "",
        file_size: 0
      }
    ]
  }],
  );

  const {
    level1Categories,
    level2Categories,
    level3Categories,
    handleLevel1Change,
    handleLevel2Change,
  } = useCategories();


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  
    if (field === "sector_ID") {
      handleLevel1Change(value); 
      setFormData((prevData) => ({
        ...prevData,
        sub_sectorID: "",
        category_ID: "",
      }));
    } else if (field === "sub_sectorID") {
      handleLevel2Change(value); 
      setFormData((prevData) => ({
        ...prevData,
        category_ID: "",
      })); 
    }
  };

  const handleFileUpload = (documentType, file) => {
    const newDocument = {
      document_Type: documentType,
      file_Name: file.name,
      file_path: file.path || "",
      file_size: file.size || 0,
    };

    setFormData((prevData) => ({
      ...prevData,
      uploadedDocuments: [...prevData.uploadedDocuments, newDocument],
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!formData.sector_ID || !formData.sub_sectorID || !formData.category_ID) {
      alert("Please fill all required fields");
      return;
    }

    // Log the data (or send to an API)
    console.log("Submitted Form Data:", formData);

    // Close the modal or reset the form
    onClose();
  };

  return (
    <React.Fragment>
      <div className="page-content">
    <Container fluid>
      <Modal size="lg" 
        title="Category Details"
        isOpen={open}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
           <Row>
           <Col md={6}>
        <div className="form-field">
          <label htmlFor="level1">Sector</label>
          <select
            value={formData.sector_ID}
            onChange={(e) =>
              handleInputChange("sector_ID", parseInt(e.target.value, 10))
            }
            // onChange={(e) => handleLevel1Change(parseInt(e.target.value, 10))}
          >
            <option value="">Select Sector</option>
            {level1Categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.code} - {category.name}
              </option>
            ))}
          </select>
        </div>
      </Col>
          
      <Col md={6}>
        <div className="form-field">
          <label htmlFor="level2">Sub Sector</label>
          <select
          id="subSector"
          value={formData.sub_sectorID}
          onChange={(e) =>
            handleInputChange("sub_sectorID", parseInt(e.target.value, 10))
          }
            // onChange={(e) => handleLevel2Change(parseInt(e.target.value, 10))}
            disabled={!level2Categories.length}
          >
            <option value="">Select Sub Sector</option>
            {level2Categories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.code} - {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      </Col>
          
                
              </Row>
          <Row>
          <Col md={6}>
        <div className="form-field">
          <label htmlFor="level3">Category</label>
          <select  id="category"
                      value={formData.category_ID}
                      onChange={(e) =>
                        handleInputChange("category_ID", parseInt(e.target.value, 10))
                      } disabled={!level3Categories.length}>
            <option value="">Select Category</option>
            {level3Categories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.code} - {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      </Col>
            <Col md={6}>
            <FormField label="Emission Source Type" placeholder="Steam Turbine" type="text"  value={formData.emission_source_type}
                    onChange={(e) =>
                      handleInputChange("emission_source_type", e.target.value)
                    }/>
            </Col>
          
            </Row>
            <Row>
            <Col md={6}>
            <FormField label="Calculation Approach" isDropdown options={CalculationApproach} valueKey="value" labelKey="name"  value={formData.calculation_approach}
                    onChange={(e) =>
                      handleInputChange("calculation_approach", e.target.value)
                    }/>
            </Col>
            <Col md={6}>
            <FormField label="GHG Gases Covered"   placeholder="N2O, CH4"  isDropdown options={gases} valueKey="gasGroupID" labelKey="gasName" value={formData.ghg_gases_covered}
                    onChange={(e) =>
                      handleInputChange("ghg_gases_covered", e.target.value)
                    }/>
            </Col>
           
            </Row>
            <Row>
            <Col md={6}>
            <FormField label="Precursors Gases Covered"  placeholder="N2O, CH4"  isDropdown options={gases} valueKey="gasGroupID" labelKey="gasName" value={formData.precursors_gases_covered}
                    onChange={(e) =>
                      handleInputChange("precursors_gases_covered", e.target.value)
                    }/>
            </Col>
            </Row>
            <div className="category-sub-modal">
            <h4 className="category-sub-title">Upload Documents</h4>
            <Col md={12}>
          <FileUpload label="Uncertainty Guidance?" toggleClick={() =>
                      handleInputChange(
                        "uncertainty_guidance",
                        !formData.uncertainty_guidance
                      )}  conditionData={formData.uncertainty_guidance}
                      onFileUpload={(file) =>
                        handleFileUpload("Uncertainty Guidance", file)
                      }/>
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for emission data?"  toggleClick={() =>
                      handleInputChange("qA_QC_for_emission", !formData.qA_QC_for_emission)
                    }
                    conditionData={formData.qA_QC_for_emission}
                    onFileUpload={(file) =>
                      handleFileUpload("QA/QC for Emission Data", file)
                    }/>
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for activity data?" toggleClick={() =>
                      handleInputChange(
                        "qA_QC_for_activity_data",
                        !formData.qA_QC_for_activity_data
                      )
                    }
                    conditionData={formData.qA_QC_for_activity_data}
                    onFileUpload={(file) =>
                      handleFileUpload("QA/QC for Activity Data", file)
                    }/>
          </Col>
          </div>
          <div className="d-flex justify-content-end mt-3" style={{ marginRight: '4rem' }}>
          <button type="submit"  className="add-details-btn  me-2" > Add Details
    </button>
    <button color="danger" className="cancel-details-btn "  onClick={onClose}>Cancel
    </button>
                 
                </div>
        </form>
      </Modal>
      </Container>
    </div>
    </React.Fragment>
  );
};

export default CategoryModal;
