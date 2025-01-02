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

function AddFacilityDetail() {
  const {addFacility} = useContext(FacilityContext);
  const [isContactDetailsVisible, setContactDetailsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Navigate = useNavigate();
  const categoriesData = localStorage.getItem('submittedData') ? JSON.parse(localStorage.getItem('submittedData')) : [];

  console.log("categoriesData", categoriesData);

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
            ...value, // Merge the new values into the contactDetails object
          },
        };
      }
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const tabs = [
    "Facility Configuration",
    "Sub Plant Details (Power)",
    "Road Transportation Details",
    "View Details",
  ];

  // const handleNext = () => {
  //   if (activeTab < tabs.length - 1) {
  //     console.log("Submitted Data:", formData);
  //     setActiveTab(activeTab + 1);
  //   }
  // };

  const handleNext = async () => {
    if (activeTab < tabs.length - 1) {
      try {
        const updatedData = { ...formData, isContactPersonSameAsEntity: isContactDetailsVisible, 
          contactDetails: isContactDetailsVisible ? null : formData.contactDetails, 
          facilitySectorDetails: categoriesData, isSubmitted: false , "isDelete": true};
        console.log("Submitting Data:", formData);
        const newFacility = await addFacility(updatedData); // Call the context function
        if (newFacility) {
          console.log("API Response:", newFacility);
            setActiveTab(activeTab + 1);
        } else {
          console.error("Failed to submit data:", response.statusText);
        }
      } catch (error) {
        console.error("Error while submitting data:", error);
      }
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
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
                   <FacilityInfo onInputChange={handleInputChange}/>
                    <Col md={4}>
                      <ToggleSwitch
                        label="Contact Person is same as Entity"
                        onToggle={handleToggle}
                        toggleDivClassName="toggle-switch"
                        toggleLabelClassName="toggle-label"
                        isCheckedData={isContactDetailsVisible}
                      />
                    </Col>
                    {!isContactDetailsVisible && <ContactDetails onInputChange={handleInputChange}/>}
                    <CategoryDetails />
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <SubPlantDetails />
                    <EmissionSourceDetails />
                  </>
                )}
                {activeTab === 2 && (
                  <div>Content for Road Transportation Details</div>
                )}
                {activeTab === 3 && <div>Content for View Details</div>}

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
