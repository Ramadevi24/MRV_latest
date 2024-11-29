import React, { useContext } from "react";
import FacilityInfo from "./EntityComponents/FacilityInfo";
import CategoryDetails from "./EntityComponents/CategoryDetails";
import SubPlantDetails from "./EntityComponents/SubPlantDetails";
import EmissionSourceDetails from "./EntityComponents/EmissionSourceDetails";
import ContactDetails from "./EntityComponents/ContactDetails";
import ToggleSwitch from "../../Components/CommonComponents/ToggleSwitch";
import "../../assets/scss/CSS/EntityComponents.css";
import { Container, Card,
  CardBody,
  CardHeader, Row, Col, Button} from "reactstrap";
  import { useLocation } from "react-router-dom";

function AddFacility() {
  const [isContactDetailsVisible, setContactDetailsVisible] = React.useState(true);

  const handleToggle = (isChecked) => {
    setContactDetailsVisible(isChecked);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0 cardTitle">Facility Information</h4>
              </CardHeader>
              <CardBody>
                <FacilityInfo />
                <Col md={4}>
                <ToggleSwitch label="Contact Person is same as Entity" onToggle={handleToggle} toggleDivClassName="toggle-switch" toggleLabelClassName="toggle-label" isCheckedData = {true}/>
                </Col>
                {!isContactDetailsVisible && <ContactDetails />}
                <CategoryDetails />
                <SubPlantDetails />
                <EmissionSourceDetails />
                <div className="d-flex justify-content-end mt-3" style={{ marginRight: '4rem' }}>
                  <Button type="submit" color="success" className=" me-2">
                    Save
                  </Button>
                  <Button
                    type="button"
                    color="danger"
                    className=""
                    onClick={() => history.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddFacility;
