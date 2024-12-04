import React from "react";
import FormField from "../../../Components/CommonComponents/FormField";
import { Col, Row } from "reactstrap";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";

const FacilityInfo = () => {
  return (
    <div>
      <Row>
        <Col md={3}>
     <FormField label="Emirate" isDropdown options={[{ label: "Abu Dhabi", value: "Abu Dhabi" }]} />
     </Col>
     <Col md={3}>
      <FormField label="Entity" isDropdown options={[{ label: "DOE", value: "DOE" }]}/>
      </Col>
      <Col md={3}>
      <FormField label="Facility" placeholder="IB11/Taweelah"/>
      </Col>
      <Col md={3}>
      <FormField label="Coverage Area of the Data" isDropdown options={[{ label: "Central Abu Dhabi", value: "Central Abu Dhabi" }]} />
      </Col>
      </Row>
      <Row>
      <Col md={3}>
      <FormField label="Location Coordinates" placeholder="23.44, 56.37" icon={locationIcon}/>
      </Col>
      <Col md={3}>
      <FormField label="Street Address" placeholder="Sultan Bin Zayed Street"/>
      </Col>
      </Row>
    </div>
    
  );
};

export default FacilityInfo;
