import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4

import Modal from "../../../Components/CommonComponents/Modal";
import FileUpload from "../../../Components/CommonComponents/FileUpload";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { CalculationApproach } from "../../../utils/FuelData";
import { GasContext } from "../../../contexts/GasContext";
import { useCategories } from "../../../contexts/CategoriesContext";

const CategoryModal = ({ open, onClose, data }) => {
  const { gases } = useContext(GasContext);

  const storedData = localStorage.getItem("submittedData");
  let storedData1 = storedData ? JSON.parse(storedData) : [];
  const [submittedData, setSubmittedData] = useState(storedData1);

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

  const [errors, setErrors] = useState({});

  const handleChange =
    (field, isNested = false) =>
    (event) => {
      const value = event.target.value;
      setFormData((prevData) => {
        if (isNested) {
          const updatedFacilityDetails = [...prevData.facilitySectorDetails];
          updatedFacilityDetails[0][field] = value;
          return { ...prevData, facilitySectorDetails: updatedFacilityDetails };
        } else {
          return { ...prevData, [field]: value };
        }
      });

      if (errors[field]) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
      }
    };

  const validate = () => {
    const newErrors = {};

    formData.facilitySectorDetails.forEach((detail, index) => {
      if (!detail.sector_ID) {
        newErrors[`sector_ID_${index}`] = `Please select a Sector`;
      }
      if (!detail.sub_sectorID) {
        newErrors[
          `sub_sectorID_${index}`
        ] = `Please select a Sub-Sector`;
      }
      if (!detail.category_ID) {
        newErrors[`category_ID_${index}`] = `Please select a Category`;
      }
      if (!detail.emission_source_type) {
        newErrors[
          `emission_source_type_${index}`
        ] = `Please enter an Emission Source Type`;
      }
      if (!detail.calculation_approach) {
        newErrors[
          `calculation_approach_${index}`
        ] = `Please select a Calculation Approach`;
      }
      if (!detail.ghg_gases_covered) {
        newErrors[
          `ghg_gases_covered_${index}`
        ] = `Please select GHG gases covered`;
      }
      if (!detail.precursors_gases_covered) {
        newErrors[
          `precursors_gases_covered_${index}`
        ] = `Please select Precursors gases`;
      }
    });

    return newErrors;
  };

  useEffect(() => {
    if (data) {
      handleLevel1Change(data.sector_ID);
      handleLevel2Change(data.sub_sectorID);

      setFormData({
        facilitySectorDetails: [
          {
            id: data.id,
            sector_ID: data.sector_ID || "",
            sub_sectorID: data.sub_sectorID || "",
            category_ID: data.category_ID || "",
            emission_source_type: data.emission_source_type || "",
            calculation_approach: data.calculation_approach || "",
            ghg_gases_covered: data.ghg_gases_covered || "",
            precursors_gases_covered: data.precursors_gases_covered || "",
            qA_QC_for_activity_data: data.qA_QC_for_activity_data || false,
            qA_QC_for_emission: data.qA_QC_for_emission || false,
            uncertainty_guidance: data.uncertainty_guidance || false,
            uploadedDocuments: data.uploadedDocuments || [],
          },
        ],
      });
    }
  }, [data]);

  
    useEffect(() => {console.log(submittedData);
      if (submittedData.length > 0) {
        localStorage.setItem("submittedData", JSON.stringify(submittedData));
        if(localStorage.getItem("close") == "true") {
                onClose();
                localStorage.setItem("close", "false");
        }
      }
    }, [submittedData]);
    
  
  const {
    level1Categories,
    level2Categories,
    level3Categories,
    handleLevel1Change,
    handleLevel2Change,
  } = useCategories();

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({ ...formData, id: data.id });
  };

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

    if (errors[`${field}_${index}`]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[`${field}_${index}`];
        return updatedErrors;
      });
    }

    if (field === "sector_ID") {
      handleLevel1Change(value);
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
      handleLevel2Change(value);
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
      file_Name: file[0].name,
      file: file
    };

    setFormData((prevData) => {
      const updatedFacilityDetails = [...prevData.facilitySectorDetails];
      const existingDocuments =
        updatedFacilityDetails[index].uploadedDocuments || [];
      updatedFacilityDetails[index] = {
        ...updatedFacilityDetails[index],
        uploadedDocuments: [
          ...existingDocuments.filter(
            (doc) => doc.document_Type && doc.file_Name
          ),
          newDocument,
        ],
      };
      return {
        ...prevData,
        facilitySectorDetails: updatedFacilityDetails,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("close", "true");

    const isValid = formData.facilitySectorDetails.every(
      (detail) => detail.sector_ID && detail.sub_sectorID && detail.category_ID
    );

    if (!isValid) {
      alert("Please fill all required fields in all facility sector details.");
      return;
    }
    const updatedData = formData.facilitySectorDetails.map((detail) => ({
      ...detail,
      uploadedDocuments: detail.uploadedDocuments.filter(
        (doc) => doc.document_Type && doc.file_Name// Remove invalid documents
      ),
    }));
    if (updatedData.length > 0) {
        const mergedData = updatedData.map((item) => {
          const existingItem = submittedData.find(
            (data) => data.id === item.id
          );
          return {
            ...item,
            id: existingItem ? existingItem.id : uuidv4(), // Keep the same ID or assign a new one
          };
        });

        // Update submittedData with merged data
        
      setSubmittedData((prevData) => {
        const idsToUpdate = mergedData.map((item) => item.id);
        const filteredData = prevData.filter(
          (data) => !idsToUpdate.includes(data.id)
        );

        return [...filteredData, ...mergedData];
      });
    }


      
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
                  <div className="form-field">
                    <label htmlFor="level1">Sector</label>
                    <select
                      value={detail.sector_ID}
                      onChange={(e) =>
                        handleInputChange(index, "sector_ID", parseInt(e.target.value, 10))
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
                      value={detail.sub_sectorID}
                      onChange={(e) =>
                        handleInputChange(index, "sub_sectorID", parseInt(e.target.value, 10))
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
                    {errors[`sub_sectorID_${index}`] && (
                          <p className="error" style={{ color: "red" }}>
                            {errors[`sub_sectorID_${index}`]}
                          </p>
                        )}
                      
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-field">
                    <label htmlFor="level3">Category</label>
                    <select
                      id="category"
                      value={detail.category_ID}
                      onChange={(e) =>
                        handleInputChange(index, "category_ID", parseInt(e.target.value, 10))
                      }
                      disabled={!level3Categories.length}
                    >
                      <option value="">Select Category</option>
                      {level3Categories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.code} - {subCategory.name}
                        </option>
                      ))}
                    </select>
                    {errors[`category_ID_${index}`] && (
                          <p className="error" style={{ color: "red" }}>
                            {errors[`category_ID_${index}`]}
                          </p>
                        )}
                      
                  </div>
                </Col>
                <Col md={6}>
                  <FormField
                    label="Emission Source Type"
                    placeholder="Steam Turbine"
                    type="text"
                    value={detail.emission_source_type}
                    onChange={(e) =>
                      handleInputChange(index, "emission_source_type", e.target.value)
                    }
                  />
                   {errors[`emission_source_type_${index}`] && (
                        <p className="error" style={{ color: "red" }}>
                          {errors[`emission_source_type_${index}`]}
                        </p>
                      )}
                    
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
                   {errors[`calculation_approach_${index}`] && (
                        <p className="error" style={{ color: "red" }}>
                          {errors[`calculation_approach_${index}`]}
                        </p>
                      )}
                </Col>
                <Col md={6}>
                  <FormField
                    label="GHG Gases Covered"
                    placeholder="N2O, CH4"
                    isDropdown
                    isMultiSelect="true"

                    options={gases}
                    valueKey="gasName"
                    labelKey="gasName"
                    value={detail?.ghg_gases_covered}
                   /* onChange={(e) =>
                      handleInputChange(index, "ghg_gases_covered", e.target.value)
                    }*/
                    onChange={(selectedOptions) =>
                      handleInputChange(index, "ghg_gases_covered", selectedOptions)
                    }
                  />
                   {errors[`ghg_gases_covered_${index}`] && (
                        <p className="error" style={{ color: "red" }}>
                          {errors[`ghg_gases_covered_${index}`]}
                        </p>
                      )}

                </Col>
              </Row>
              <Row>
                <Col md={6}>
                
                  <FormField
                    label="Precursors Gases Covered"
                    placeholder="N2O, CH4"
                    isDropdown
                    isMultiSelect="true"
                    options={gases}
                    valueKey="gasName"
                    labelKey="gasName"
                    value={detail?.precursors_gases_covered}
                   /* onChange={(e) =>
                      handleInputChange(index, "precursors_gases_covered", e.target.value)
                    }*/
                    onChange={(selectedOptions) =>
                      handleInputChange(index, "precursors_gases_covered", selectedOptions)
                    }
                  
                  />
                   {errors[`precursors_gases_covered_${index}`] && (
                        <p className="error" style={{ color: "red" }}>
                          {errors[`precursors_gases_covered_${index}`]}
                        </p>
                      )}
                    
                </Col>
              </Row>
                  
                  <div className="category-sub-modal">
                    <h4 className="category-sub-title">
                      Upload Documents
                    </h4>
                    <Col md={12}>
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
                        className={`toggle-switch-modal ${
                          detail.uncertainty_guidance ? "active" : ""
                        }`}
                      />

                      {detail.uploadedDocuments
                        .filter(
                          (doc) => doc.document_Type === "Uncertainty Guidance"
                        )
                        .map((doc, docIndex) => (
                          <div  key={docIndex}
                          className="uploaded-files"><div className="uploaded-file">
                            <span className="file-name">{doc.file_Name}</span>
                            </div></div>
                          
                        ))}
                    </Col>
                    <Col md={12}>
                      <FileUpload
                        label="Is QA/QC for emission data?"
                        toggleClick={() =>
                          handleInputChange(
                            index,
                            "qA_QC_for_emission",
                            !detail.qA_QC_for_emission
                          )
                        }
                        conditionData={detail.qA_QC_for_emission}
                        onFileUpload={(file) =>
                          handleFileUpload(
                            index,
                            "QA/QC for Emission Data",
                            file
                          )
                        }
                      />
                      {detail.uploadedDocuments
                        .filter(
                          (doc) =>
                            doc.document_Type === "QA/QC for Emission Data"
                        )
                        .map((doc, docIndex) => (
                          <div  key={docIndex}
                          className="uploaded-files"><div className="uploaded-file">
                            <span className="file-name">{doc.file_Name}</span>
                            </div></div>
                         
                        ))}
                    </Col>
                    <Col md={12}>
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
                          handleFileUpload(
                            index,
                            "QA/QC for Activity Data",
                            file
                          )
                        }
                      />
                      {detail.uploadedDocuments
                        .filter(
                          (doc) =>
                            doc.document_Type === "QA/QC for Activity Data"
                        )
                        .map((doc, docIndex) => (
                          <div  key={docIndex}
                          className="uploaded-files"><div className="uploaded-file">
                            <span className="file-name">{doc.file_Name}</span>
                            </div></div>
                      ))}
                    </Col>
                  </div>
                </div>
              ))}
              <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button type="submit" className="add-details-btn  me-2">
                  {" "}
                  Add Details
                </button>
                <button
                  color="danger"
                  className="cancel-details-btn "
                  onClick={onClose}
                >
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
