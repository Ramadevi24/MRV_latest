import React, { useContext } from "react";
import FacilityInfo from "../EntityInformations/EntityComponents/FacilityInfo";
import CategoryDetails from "../EntityInformations/EntityComponents/CategoryDetails";
import SubPlantDetails from "../EntityInformations/EntityComponents/SubPlantDetails";
import EmissionSourceDetails from "../EntityInformations/EntityComponents/EmissionSourceDetails";
import ContactDetails from "../EntityInformations/EntityComponents/ContactDetails";
import ToggleSwitch from "../../Components/CommonComponents/ToggleSwitch";
import "../../assets/scss/CSS/EntityComponents.css";
import { Container, Card,
  CardBody,
  CardHeader, Row, Col, Button} from "reactstrap";
  import { useLocation } from "react-router-dom";

function ViewFacility({formData, onInputChange, errors}) {
  const [isContactDetailsVisible, setContactDetailsVisible] = React.useState(true);

  const handleToggle = (isChecked) => {
    setContactDetailsVisible(isChecked);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg={12}>
              <div>
                <FacilityInfo formData={formData} onInputChange={onInputChange} errors={errors}/>
                <Col md={4}>
                <ToggleSwitch label="Contact Person is same as Entity" onToggle={handleToggle} toggleDivClassName="toggle-switch" toggleLabelClassName="toggle-label" isCheckedData = {true}/>
                </Col>
                {!isContactDetailsVisible && <ContactDetails />}
                <CategoryDetails />
                <SubPlantDetails />
                <EmissionSourceDetails />
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewFacility;
