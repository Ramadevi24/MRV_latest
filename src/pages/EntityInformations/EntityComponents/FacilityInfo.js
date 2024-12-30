import React, {useContext, useEffect} from "react";
import FormField from "../../../Components/CommonComponents/FormField";
import { Col, Row } from "reactstrap";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";
import { EmiratesContext } from "../../../contexts/EmiratesContext";
import { EntityContext } from "../../../contexts/EntityContext";
import { CoverageAreaContext } from "../../../contexts/CoverageAreaContext";

const FacilityInfo = () => {
  const {emirates} = useContext(EmiratesContext)
  const {entity} = useContext(EntityContext)
  const {coverageArea} = useContext(CoverageAreaContext)
  return (
    <div>
      <Row>
        <Col md={3}>
     <FormField label="Emirate" isDropdown options={emirates} valueKey="emiratesID" labelKey="name"/>
     </Col>
     <Col md={3}>
      <FormField label="Entity" isDropdown options={entity} valueKey="entityId" labelKey="entityName"/>
      </Col>
      <Col md={3}>
      <FormField label="Facility" placeholder="IB11/Taweelah" type="text"/>
      </Col>
      <Col md={3}>
      <FormField label="Coverage Area of the Data" isDropdown options={coverageArea} valueKey="coverageAreaOfTheDataID" labelKey="name"/>
      </Col>
      </Row>
      <Row>
      <Col md={3}>
      <FormField label="Location Coordinates" placeholder="23.44, 56.37" icon={locationIcon} type="number"/>
      </Col>
      <Col md={3}>
      <FormField label="Street Address" placeholder="Sultan Bin Zayed Street" type="text"/>
      </Col>
      </Row>
    </div>
    
  );
};

export default FacilityInfo;
