import React, { useState } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import FileUpload from "../../../Components/CommonComponents/FileUpload";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";

const CategoryModal = ({open, onClose}) => {
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
            <FormField label="Sector" isDropdown options={[{ label: "1. Energy", value: "1. Energy"}]} />
            </Col>
            <Col md={6}>
            <FormField label="Sub Sector / Category" isDropdown options={[{ label: "1.A Fuel Combustion Activities", value: "1.A Fuel Combustion Activities" }]} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormField label="Emission Source Type" placeholder="Steam Turbine"/>
            </Col>
            <Col md={6}>
            <FormField label="Calculation Approach" isDropdown options={[{ label: "T1,T2,T3", value: "T1,T2,T3" }]}/>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormField label="GHG Gases Covered" placeholder="N2O, CH4"/>
            </Col>
            </Row>
            <div className="category-sub-modal">
            <h4 className="category-sub-title">Upload Documents</h4>
            <Col md={12}>
          <FileUpload label="Uncertainty Guidance?" />
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for emission data?" />
            </Col>
            <Col md={12}>
          <FileUpload label="Is QA/QC for activity data?" />
          </Col>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add Details</button>
          </div>
        </form>
      </Modal>
      </Container>
    </div>
    </React.Fragment>
  );
};

export default CategoryModal;
