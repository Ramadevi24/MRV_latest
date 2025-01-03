import React, { useContext, useState } from "react";
import FacilityInfo from "../EntityInformations/EntityComponents/FacilityInfo";
import CategoryDetails from "../EntityInformations/EntityComponents/CategoryDetails";
import SubPlantDetails from "../EntityInformations/EntityComponents/SubPlantDetails";
import EmissionSourceDetails from "../EntityInformations/EntityComponents/EmissionSourceDetails";
import ContactDetails from "../EntityInformations/EntityComponents/ContactDetails";
import ToggleSwitch from "../../Components/CommonComponents/ToggleSwitch";
import "../../assets/scss/CSS/EntityComponents.css";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {FacilityContext} from "../../contexts/FacilityContext";
import { useTranslation } from "react-i18next";
import ViewFacility from "./ViewFacility";
import { toast } from "react-toastify";

function AddFacilityDetail() {
  const { t } = useTranslation();
  const {addFacility, fetchAllFacilityWithDetailsByFacilityID, updateFacilitySubmitData} = useContext(FacilityContext);
  const [isContactDetailsVisible, setContactDetailsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Navigate = useNavigate();
  const categoriesData = localStorage.getItem('submittedData') ? JSON.parse(localStorage.getItem('submittedData')) : [];
  const facilityStoredData = JSON.parse(localStorage.getItem("facilityData"));

  const [formData, setFormData] = useState({
    facilityName: "",
    siteOperatorName: "",
    emiratesID:0,
    entityID:0,
    coverageAreaOfTheDataID:0,
    longitude: 0,
    latitude: 0,
    streetAddress: "",
    isContactPersonSameAsEntity: isContactDetailsVisible,
    contactDetails: {
    name: "",
    title: "",
    email: "",
    phoneNumber: 0
  },
  facilitySectorDetails: categoriesData
  });

  const [errors, setErrors] = useState({ });

  const validateField = (field, value) => {
    let errorMessage = "";
  
    if (["contactDetails", "isSubmitted", "isDelete", "isContactPersonSameAsEntity"].includes(field)) {
      return errorMessage;
    }
    if (field === "contactDetails") {
      if (!isContactDetailsVisible) {
        if (!value.contactDetails.name) {
          return "Contact name is required.";
        }
        if (!value.contactDetails.title) {
          return "Contact title is required.";
        }
        if (!value.contactDetails.email) {
          return "Contact email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
          return "Please provide a valid email address.";
        }
        if (!value.contactDetails.phoneNumber) {
          return "Contact phone number is required.";
        } else if (!/^\+?[0-9]{7,15}$/.test(value.phoneNumber)) {
          return "Please provide a valid phone number.";
        }
      }
      return errorMessage; // No errors for visible contactDetails
    }

    if (!value) {
      errorMessage = `${field} field is required.`;
    } else if (field === "longitude" || field === "latitude") {
      if (isNaN(value) || value < -180 || value > 180) {
        errorMessage = `Please provide a valid ${field} coordinate.`;
      }
    }
  
    return errorMessage;
  };

  const handleToggle = (isChecked) => {
    setContactDetailsVisible(isChecked);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      if (field === "contactDetails") {
        return {
          ...prevData,
          contactDetails: {
            ...prevData.contactDetails,
            ...value,
          },
        };
      }
      return {
        ...prevData,
        [field]: value,
      };
    });

    const error = validateField(field, value, isContactDetailsVisible);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };
  

  const tabs = [
    "Facility Configuration",
    "Sub Plant Details (Power)",
    "View Details",
  ];


  const addFacilityWithTimeout = (facilityData, timeout = 10000) => {
    return Promise.race([
      addFacility(facilityData), // Original API call
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  }

  const handleNext = async () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field === "contactDetails") {
        const contactError = validateField(
          "contactDetails",
          formData.contactDetails,
          isContactDetailsVisible
        );
        if (contactError) {
          newErrors[field] = contactError;
        }
      } else {
        const error = validateField(field, formData[field], isContactDetailsVisible);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      console.warn("Validation errors detected:", newErrors);
      return;
    }
    if (activeTab === 0) {
     await handleFirstTabSubmission();
    }
    else if (activeTab === 1) {
      await handleSecondTabSubmission();
      }
      else if (activeTab === 2) {
        await handleFinalSubmission();
      }
    }

    const handleFirstTabSubmission = async () => {
      const updatedData = {
        ...formData,
        isContactPersonSameAsEntity: isContactDetailsVisible,
        contactDetails: isContactDetailsVisible ? null : formData.contactDetails,
        facilitySectorDetails: categoriesData,
        isSubmitted: false,
        isDelete: false,
      };
    
      try {
        const newFacility = await addFacilityWithTimeout(updatedData);
        if (newFacility) {
          localStorage.setItem("facilityData", JSON.stringify(newFacility.facility));
          setActiveTab(activeTab + 1);
        } else {
          console.error("Failed to submit data: No response received.");
        }
      } catch (error) {
        console.error("Error during first tab submission:", error);
      }
    };

    const handleSecondTabSubmission = async () => {
      try {
        const facilityStoredData = JSON.parse(localStorage.getItem("facilityData"));
        const getFacilityDataById = await fetchAllFacilityWithDetailsByFacilityID(
          facilityStoredData.facilityID
        );
    
        if (getFacilityDataById) {
          setFormData(getFacilityDataById);
          setActiveTab(activeTab + 1);
        } else {
          console.error("Failed to fetch facility data by ID.");
        }
      } catch (error) {
        console.error("Error during second tab submission:", error);
      }
    };

    const handleFinalSubmission = async () => {
      try {
        const facilityStoredData = JSON.parse(localStorage.getItem("facilityData"));
        const updatedSubmitData = { ...formData, isSubmitted: true, isDelete: false };
        const response = await updateFacilitySubmitData(facilityStoredData.facilityID, updatedSubmitData);
        if (response) {
          Navigate("/FacilityDetailsGrid/:component");
          toast.success("Facility added successfully");
        } else {
          console.error("Failed to update facility data.");
        }
        localStorage.removeItem("facilityData");
      } catch (error) {
        console.error("Error during final submission:", error);
      }
    };

  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("facilityData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setContactDetailsVisible(parsedData.isContactPersonSameAsEntity);
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      loadDataFromLocalStorage();
      setActiveTab(activeTab - 1);
    }
  };

  const handleCancel = () => {
    Navigate("/FacilityDetailsGrid/:component");
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0 cardTitle">
                  Facility Information
                </h4>
              </CardHeader>
              <CardBody>
                {/* Tabs */}
                <div style={{ display: "flex", marginBottom: "40px" }}>
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      onClick={() => handleTabClick(index)}
                      style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          activeTab === index ? "#0066A4" : "#E9EDF5",
                        color: activeTab === index ? "#fff" : "#000",
                        border:
                          activeTab === index
                            ? "1px solid #0066A4"
                            : "1px solid #E9EDF5",
                        borderRadius: "5px",
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 0 && (
                  <>
                   <FacilityInfo onInputChange={handleInputChange} formData={formData} errors={errors}/>
                    <Col md={4}>
                      <ToggleSwitch
                        label="Contact Person is same as Entity"
                        onToggle={handleToggle}
                        toggleDivClassName="toggle-switch"
                        toggleLabelClassName="toggle-label"
                        isCheckedData={isContactDetailsVisible}
                      />
                    </Col>
                    {!isContactDetailsVisible && <ContactDetails onInputChange={handleInputChange} formData={formData.contactDetails} errors={errors}/>}
                    <CategoryDetails />
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <SubPlantDetails formData={formData}/>
                    <EmissionSourceDetails formData={formData}/>
                  </>
                )}
                {activeTab === 2 && (
                  <ViewFacility formData={formData} onInputChange={handleInputChange} errors={errors}/>
                )}

                {/* Navigation Buttons */}
                <div
                  className="d-flex justify-content-end mt-3"
                  style={{ marginRight: "4rem" }}
                >
                  {activeTab > 0 && (
                    <Button
                      type="button"
                      color="danger"
                      className="me-2"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  {activeTab === 0 && (
                    <Button
                      type="button"
                      color="danger"
                      className="me-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  )}
                  {activeTab < tabs.length - 1 && (
                    <Button
                      type="button"
                      color="success"
                      className="add-details-btn"
                      onClick={handleNext}
                      style={{ width: "77px" }}
                    >
                      Next
                    </Button>
                  )}
                  {activeTab == tabs.length - 1 && (
                    <Button
                      type="button"
                      color="success"
                      className="add-details-btn"
                      onClick={handleNext}
                      style={{ width: "77px" }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddFacilityDetail;
