import React, { useState } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import ToggleSwitch from "../../../Components/CommonComponents/ToggleSwitch";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";
import Button from "../../../Components/CommonComponents/Button";
import addIcon from "../../../assets/images/Power Sector--- Data Entry/Plus.png";
import { useParams } from "react-router-dom";

const SubPlantModal = ({ open, onClose }) => {
  const {power} = useParams();
  const [isLocation, setIsLocation] = useState(true);
  const [isContact, setIsContact] = useState(true);

  const handleLocation = () => {
    setIsLocation(!isLocation);
  };

  const handleContact = () => {
    setIsContact(!isContact);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title="Sub Plant Details"
            isOpen={open}
            onClose={onClose}
          >
            <form>
              <Row>
                <Col md={6}>
                  <FormField label="Sub Plant Name" placeholder="GT/HRSG 41" />
                </Col>
                {power === ":construction" && (<Col md={6}>
                  <FormField label="Technology" placeholder="Secondary Aluminium" />
                </Col>
                )}
              </Row>
              {power === ":construction" && (
                <>
              <Row>
                <Col md={6}>
                  <FormField label="Configuration" placeholder="Normal Firing" />
                </Col>
                <Col md={6}>
                <FormField label="Fuel Type" isDropdown options={[{ label: "Natural Gas, Diesel, Gas Oil", value: "Natural Gas, Diesel, Gas Oil" }]}/>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormField label="Raw Materials" placeholder="Bauxite" />
                </Col>
              </Row>
             
                    <div className="category-sub-modal" style={{marginTop:'10px'}}>
                   <Row>
                            <Col md={6}>
                            <h4 className="modal-subhead">Product Details</h4>
                            </Col>
                        </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="Product Type" placeholder="Aluminium" />
                  </Col>
                  <Col md={4}>
                    <FormField label="Product Rate (Daily)" placeholder="24" />
                  </Col>
                  <Col md={4}>
                  <Button label="Add" width="12.5" height="12.5"
        icon={addIcon} onClick={()=>{}} className="category-button">
        </Button>
                  </Col>
                </Row>
                </div>
                </>)}
              <Col md={12} className="mt-3">
                <ToggleSwitch
                  label="Location Coordinates is same as facility "
                  toggleDivClassName="toggle-switch-modal"
                  toggleLabelClassName="toggle-label-modal"
                  onToggle={handleLocation}
                  isCheckedData={true}
                />
                {!isLocation && (<Row className="mt-2">
                  <Col md={6}>
                    <FormField
                      label="Location Coordinates"
                      placeholder="23.44, 56.37"
                      icon={locationIcon}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Street Address"
                      placeholder="Sultan Bin Zayed Street"
                    />
                  </Col>
                </Row>)}
              </Col>
              <Col md={12} className="mt-3">
                <ToggleSwitch
                  label="Contact Details is same as facility"
                  toggleDivClassName="toggle-switch-modal"
                  toggleLabelClassName="toggle-label-modal"
                  onToggle={handleContact}
                  isCheckedData={true}
                />
                {!isContact && (
                    <div className="category-sub-modal" style={{marginTop:'10px'}}>
                   <Row>
                            <Col md={6}>
                            <h4 className="modal-subhead">Contact Details</h4>
                            </Col>
                        </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Name" placeholder="Abdul" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Title" placeholder="Plant Operator" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Email" placeholder="abdul@gmail.com" />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Phone Number"
                      placeholder="+971 123456789"
                    />
                  </Col>
                </Row>
                </div>
                )}
              </Col>
              <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button
                  type="submit"
                  className="add-details-btn  me-2"
                >
                  {" "}
                  Add Details
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn "
                  onClick={() => history.back()}
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

export default SubPlantModal;
