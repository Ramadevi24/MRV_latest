import React, { useState } from "react";
import FacilityInfo from "../EntityInformations/EntityComponents/FacilityInfo";
import CategoryDetails from "../EntityInformations/EntityComponents/CategoryDetails";
import SubPlantDetails from "../EntityInformations/EntityComponents/SubPlantDetails";
import EmissionSourceDetails from "../EntityInformations/EntityComponents/EmissionSourceDetails";
import ContactDetails from "../EntityInformations/EntityComponents/ContactDetails";
import ToggleSwitch from "../../Components/CommonComponents/ToggleSwitch";
import "../../assets/scss/CSS/EntityComponents.css";
import { Container, Card, CardBody, CardHeader, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function AddFacilityDetail() {
  const [isContactDetailsVisible, setContactDetailsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Navigate = useNavigate();

  const tabs = [
    "Facility Configuration",
    "Power Generation Details",
    "Road Transportation Details",
    "View Details",
  ];

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
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

  const handleToggle = (isChecked) => {
    setContactDetailsVisible(isChecked);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0 cardTitle">Facility Information</h4>
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
                        backgroundColor: activeTab === index ? "#0066A4" : "#E9EDF5",
                        color: activeTab === index ? "#fff" : "#000",
                        border: activeTab === index ? "1px solid #0066A4" : "1px solid #E9EDF5",
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
                    <FacilityInfo />
                    <Col md={4}>
                      <ToggleSwitch
                        label="Contact Person is same as Entity"
                        onToggle={handleToggle}
                        toggleDivClassName="toggle-switch"
                        toggleLabelClassName="toggle-label"
                        isCheckedData={true}
                      />
                    </Col>
                    {!isContactDetailsVisible && <ContactDetails />}
                    <CategoryDetails />
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <SubPlantDetails />
                    <EmissionSourceDetails />
                  </>
                )}
                {activeTab === 2 && <div>Content for Road Transportation Details</div>}
                {activeTab === 3 && <div>Content for View Details</div>}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-end mt-3" style={{ marginRight: "4rem" }}>
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
                      onClick ={handleCancel}
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
