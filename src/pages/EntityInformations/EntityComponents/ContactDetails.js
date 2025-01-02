import React from "react";
import FormField from "../../../Components/CommonComponents/FormField";
import { Col, Row } from "reactstrap";

const ContactDetails = ({onInputChange}) => {

    const handleChange = (field) => (event) => {
      // Pass the field and value for the contactDetails object
      onInputChange("contactDetails", {
        [field]: event.target.value,
      });
  };

  return (
    <div>
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Contact Details</h2>
      </div>
      <Row>
     <Col md={3}>
      <FormField label="Name" placeholder="Enter Name" type="text" onChange={handleChange("name")}/>
      </Col>
      <Col md={3}>
      <FormField label="Title" placeholder="Enter Title" type="text" onChange={handleChange("title")}/>
      </Col>
      <Col md={3}>
      <FormField label="Email" placeholder="Enter Email" type="email" onChange={handleChange("email")}/>
      </Col>
      <Col md={3}>
      <FormField label="Phone Number" placeholder="Enter Phone number" type="number" onChange={handleChange("phoneNumber")}/>
      </Col>
      </Row>
    </div>
    
  );
};

export default ContactDetails;
