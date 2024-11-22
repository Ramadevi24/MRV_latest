import React, { useState } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import ToggleSwitch from "../../../Components/CommonComponents/ToggleSwitch";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";

const SubPlantModal = ({ open, onClose }) => {
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
              </Row>
              <Col md={12}>
                <ToggleSwitch
                  label="Location Coordinates is same as facility "
                  toggleDivClassName="toggle-switch-modal"
                  toggleLabelClassName="toggle-label-modal"
                  onToggle={handleLocation}
                  isCheckedData={true}
                />
                {!isLocation && (<Row>
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
              <Col md={12}>
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
                  className="add-details-btn rounded-pill me-2"
                >
                  {" "}
                  Add Details
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn rounded-pill"
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
