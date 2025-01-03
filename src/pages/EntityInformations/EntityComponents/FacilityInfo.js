import React, {useContext, useEffect} from "react";
import FormField from "../../../Components/CommonComponents/FormField";
import { Col, Row } from "reactstrap";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";
import { EmiratesContext } from "../../../contexts/EmiratesContext";
import { EntityContext } from "../../../contexts/EntityContext";
import { CoverageAreaContext } from "../../../contexts/CoverageAreaContext";

const FacilityInfo = ({onInputChange, formData, errors }) => {
  const {emirates} = useContext(EmiratesContext)
  const {entity} = useContext(EntityContext)
  const {coverageArea} = useContext(CoverageAreaContext)

  const handleChange = (field) => (event) => {
    onInputChange(field, event.target.value);
  };

  return (
    <div>
      <Row>
        <Col md={3}>
     <FormField label="Emirate" isDropdown options={emirates || []} valueKey="emiratesID" labelKey="name"  onChange={handleChange("emiratesID")}  error={errors.emiratesID} value={formData.emiratesID || ''}/>
     </Col>
     <Col md={3}>
      <FormField label="Reporting Entity" isDropdown options={entity || []} valueKey="entityId" labelKey="entityName" onChange={handleChange("entityID")}  error={errors.entityID} value={formData.entityID || ''}/>
      </Col>
      <Col md={3}>
      <FormField label="Site Operator" placeholder="Name" type="text" onChange={handleChange("siteOperatorName")} error={errors.siteOperatorName} value={formData.siteOperatorName || ''}/>
      </Col>
      <Col md={3}>
      <FormField label="Facility" placeholder="IB11/Taweelah" type="text" onChange={handleChange("facilityName")} error={errors.facilityName} value={formData.facilityName || ''}/>
      </Col>
      </Row>
      <Row>
      <Col md={3}>
      <FormField label="Coverage Area of the Data" isDropdown options={coverageArea} valueKey="coverageAreaOfTheDataID" labelKey="name" onChange={handleChange("coverageAreaOfTheDataID")} error={errors.coverageAreaOfTheDataID} value={formData.coverageAreaOfTheDataID || ''}/>
      </Col>
      <Col md={3}>
      <FormField label="longitude Coordinates" placeholder="23.44, 56.37" icon={locationIcon} type="number" onChange={handleChange("longitude")} error={errors.longitude} value={formData.longitude || ''}/>
      </Col>
      <Col md={3}>
      <FormField label="latitude Coordinates" placeholder="23.44, 56.37" icon={locationIcon} type="number" onChange={handleChange("latitude")} error={errors.latitude} value={formData.latitude || ''}/>
      </Col>
      <Col md={3}>
      <FormField label="Street Address" placeholder="Sultan Bin Zayed Street" type="text" onChange={handleChange("streetAddress")} error={errors.streetAddress} value={formData.streetAddress || ''}/>
      </Col>
      </Row>
    </div>
    
  );
};

export default FacilityInfo;
