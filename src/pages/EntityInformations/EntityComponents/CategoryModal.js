import React, { useState } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import FileUpload from "../../../Components/CommonComponents/FileUpload";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";

const CategoryModal = ({open, onClose}) => {
  const [Uncertainty, setUncertainty] = useState(false);
  const [QAQC, setQAQC] = useState(false);
  const [ActivityQAQC, setActivityQAQC] = useState(false);

  const handleUncertainty = () => {
    setUncertainty(!Uncertainty);
  }
  const handleQAQC = () => {
    setQAQC(!QAQC);
  }
  const handleActivityQAQC = () => {
    setActivityQAQC(!ActivityQAQC);
  }

  return (
    <React.Fragment>
      <div className="page-content">
    <Container fluid>
      <Modal size="lg" 
        title="Category Details"
        isOpen={open}
        onClose={onClose}
      >
        <form>
            <Row>
            <Col md={6}>
            <FormField label="Sector" isDropdown options={[{ name: "1. Energy", value: "1"}]} valueKey="value" labelKey="name"/>
            </Col>
            <Col md={6}>
            <FormField label="Sub Sector / Category" isDropdown options={[{ name: "1.A Fuel Combustion Activities", value: "1" }]} valueKey="value" labelKey="name"/>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormField label="Emission Source Type" placeholder="Steam Turbine" type="text"/>
            </Col>
            <Col md={6}>
            <FormField label="Calculation Approach" isDropdown options={[{ name: "T1,T2,T3", value: "T1,T2,T3" }]} valueKey="value" labelKey="name"/>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormField label="GHG Gases Covered" placeholder="N2O, CH4" type="text"/>
            </Col>
            </Row>
            <div className="category-sub-modal">
            <h4 className="category-sub-title">Upload Documents</h4>
            <Col md={12}>
          <FileUpload label="Uncertainty Guidance?" toggleClick={handleUncertainty} conditionData={Uncertainty}/>
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for emission data?" toggleClick={handleQAQC} conditionData={QAQC}/>
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for activity data?" toggleClick={handleActivityQAQC} conditionData={ActivityQAQC}/>
          </Col>
          </div>
          <div className="d-flex justify-content-end mt-3" style={{ marginRight: '4rem' }}>
          <button type="submit"  className="add-details-btn  me-2" > Add Details
    </button>
    <button type="submit" color="danger" className="cancel-details-btn "  onClick={() => history.back()}>Cancel
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
