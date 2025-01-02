import React, { useState, useContext } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import FileUpload from "../../../Components/CommonComponents/FileUpload";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { CalculationApproach } from "../../../utils/FuelData";
import { GasContext } from "../../../contexts/GasContext";
import { useCategories } from "../../../contexts/CategoriesContext";

const CategoryModal = ({ open, onClose }) => {
  const { gases } = useContext(GasContext);
  const [submittedData, setSubmittedData] = useState([]);
  const [formData, setFormData] = useState({
    facilitySectorDetails: [
      {
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
        uploadedDocuments: [],
      },
    ],
  });

  const {
    level1Categories,
    level2Categories,
    level3Categories,
    handleLevel1Change,
    handleLevel2Change,
  } = useCategories();

  const handleInputChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedFacilityDetails = [...prevData.facilitySectorDetails];
      updatedFacilityDetails[index] = {
        ...updatedFacilityDetails[index],
        [field]: value,
      };
      return {
        ...prevData,
        facilitySectorDetails: updatedFacilityDetails,
      };
    });

    if (field === "sector_ID") {
      handleLevel1Change(value); // Update subsectors
      setFormData((prevData) => {
        const updatedFacilityDetails = [...prevData.facilitySectorDetails];
        updatedFacilityDetails[index].sub_sectorID = "";
        updatedFacilityDetails[index].category_ID = "";
        return {
          ...prevData,
          facilitySectorDetails: updatedFacilityDetails,
        };
      });
    } else if (field === "sub_sectorID") {
      handleLevel2Change(value); // Update categories
      setFormData((prevData) => {
        const updatedFacilityDetails = [...prevData.facilitySectorDetails];
        updatedFacilityDetails[index].category_ID = "";
        return {
          ...prevData,
          facilitySectorDetails: updatedFacilityDetails,
        };
      });
    }
  };

  const handleFileUpload = (index, documentType, file) => {
    const newDocument = {
      document_Type: documentType,
      file_Name: file.name,
      file_path: file.path || "",
      file_size: file.size || 0,
    };

    setFormData((prevData) => {
      const updatedFacilityDetails = [...prevData.facilitySectorDetails];
      updatedFacilityDetails[index].uploadedDocuments.push(newDocument);
      return {
        ...prevData,
        facilitySectorDetails: updatedFacilityDetails,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formData.facilitySectorDetails.every(
      (detail) => detail.sector_ID && detail.sub_sectorID && detail.category_ID
    );

    if (!isValid) {
      alert("Please fill all required fields in all facility sector details.");
      return;
    }

    const updatedData = [...submittedData, formData];
    setSubmittedData(updatedData);
    localStorage.setItem("submittedData", JSON.stringify(updatedData));

    setFormData({
      facilitySectorDetails: [
        {
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
          uploadedDocuments: [],
        },
      ],
    });

    onClose();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title="Category Details"
            isOpen={open}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit}>
              {formData.facilitySectorDetails.map((detail, index) => (
                <div key={index} className="sector-detail">
                  <Row>
                    <Col md={6}>
                      <label>Sector</label>
                      <select
                        value={detail.sector_ID}
                        onChange={(e) =>
                          handleInputChange(index, "sector_ID", parseInt(e.target.value, 10))
                        }
                      >
                        <option value="">Select Sector</option>
                        {level1Categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.code} - {category.name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label>Sub Sector</label>
                      <select
                        value={detail.sub_sectorID}
                        onChange={(e) =>
                          handleInputChange(index, "sub_sectorID", parseInt(e.target.value, 10))
                        }
                        disabled={!level2Categories.length}
                      >
                        <option value="">Select Sub Sector</option>
                        {level2Categories.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.code} - {subCategory.name}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Category</label>
                      <select
                        value={detail.category_ID}
                        onChange={(e) =>
                          handleInputChange(index, "category_ID", parseInt(e.target.value, 10))
                        }
                        disabled={!level3Categories.length}
                      >
                        <option value="">Select Category</option>
                        {level3Categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.code} - {category.name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <FormField
                        label="Emission Source Type"
                        placeholder="Enter Emission Source Type"
                        type="text"
                        value={detail.emission_source_type}
                        onChange={(e) =>
                          handleInputChange(index, "emission_source_type", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormField
                        label="Calculation Approach"
                        isDropdown
                        options={CalculationApproach}
                        valueKey="value"
                        labelKey="name"
                        value={detail.calculation_approach}
                        onChange={(e) =>
                          handleInputChange(index, "calculation_approach", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <FormField
                        label="GHG Gases Covered"
                        placeholder="N2O, CH4"
                        isDropdown
                        options={gases}
                        valueKey="gasGroupID"
                        labelKey="gasName"
                        value={detail.ghg_gases_covered}
                        onChange={(e) =>
                          handleInputChange(index, "ghg_gases_covered", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormField
                        label="Precursors Gases Covered"
                        placeholder="N2O, CH4"
                        isDropdown
                        options={gases}
                        valueKey="gasGroupID"
                        labelKey="gasName"
                        value={detail.precursors_gases_covered}
                        onChange={(e) =>
                          handleInputChange(index, "precursors_gases_covered", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <FileUpload
                        label="Uncertainty Guidance?"
                        toggleClick={() =>
                          handleInputChange(
                            index,
                            "uncertainty_guidance",
                            !detail.uncertainty_guidance
                          )
                        }
                        conditionData={detail.uncertainty_guidance}
                        onFileUpload={(file) =>
                          handleFileUpload(index, "Uncertainty Guidance", file)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FileUpload
                        label="Is QA/QC for emission data?"
                        toggleClick={() =>
                          handleInputChange(index, "qA_QC_for_emission", !detail.qA_QC_for_emission)
                        }
                        conditionData={detail.qA_QC_for_emission}
                        onFileUpload={(file) =>
                          handleFileUpload(index, "QA/QC for Emission Data", file)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <FileUpload
                        label="Is QA/QC for activity data?"
                        toggleClick={() =>
                          handleInputChange(
                            index,
                            "qA_QC_for_activity_data",
                            !detail.qA_QC_for_activity_data
                          )
                        }
                        conditionData={detail.qA_QC_for_activity_data}
                        onFileUpload={(file) =>
                          handleFileUpload(index, "QA/QC for Activity Data", file)
                        }
                      />
                    </Col>
                  </Row>
                </div>
              ))}
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="add-details-btn me-2">
                  Add Details
                </button>
                <button type="button" className="cancel-details-btn" onClick={onClose}>
                  Cancel
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
