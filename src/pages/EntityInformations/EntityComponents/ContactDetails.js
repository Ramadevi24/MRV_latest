import React from "react";
import FormField from "../../../Components/CommonComponents/FormField";
import { Col, Row } from "reactstrap";

const ContactDetails = () => {
  return (
    <div>
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Contact Details</h2>
      </div>
      <Row>
     <Col md={3}>
      <FormField label="Name" placeholder="Enter Name"/>
      </Col>
      <Col md={3}>
      <FormField label="Title" placeholder="Enter Title"/>
      </Col>
      <Col md={3}>
      <FormField label="Email" placeholder="Enter Email"/>
      </Col>
      <Col md={3}>
      <FormField label="Phone Number" placeholder="Enter Phone number"/>
      </Col>
      </Row>
    </div>
    
  );
};

export default ContactDetails;
