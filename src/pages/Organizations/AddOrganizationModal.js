import React from 'react'
import { Col, Container, Row, Card } from "reactstrap";
import Modal from "../../Components/CommonComponents/Modal";
import FormField from "../../Components/CommonComponents/FormField";
import locationIcon from "../../assets/images/Power Sector--- Data Entry/pin 1.png";

const AddOrganizationModal = ({open, onClose}) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title="Add Organization"
            isOpen={open}
            onClose={onClose}
          >
            <form>
            <Row>
                  <Col md={6}>
                    <FormField
                      label="Site Operator / Company Name"
                      placeholder="ADNOC"
                       type="text"
                    />
                  </Col>

                  <Col md={6}>
                    <FormField
                      label="Established Date"
                      placeholder="18/12/2024"
                        type="date"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField
                      label="Location Coordinates"
                      placeholder="23.44, 56.37"
                      icon={locationIcon}
                       type="text"
                    />
                  </Col>

                  <Col md={6}>
                    <FormField
                      label="Location Address"
                      placeholder="Sultan Bin Zayed Street"
                       type="text"
                    />
                  </Col>
                </Row>
                <div>
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Contact Details</h2>
      </div>
      <Row>
     <Col md={6}>
      <FormField label="Name" placeholder="Enter Name"  type="text"/>
      </Col>
      <Col md={6}>
      <FormField label="Title" placeholder="Enter Title"  type="text"/>
      </Col>
      <Col md={6}>
      <FormField label="Email" placeholder="Enter Email"  type="email"/>
      </Col>
      <Col md={6}>
      <FormField label="Phone Number" placeholder="Enter Phone number"  type="number"/>
      </Col>
      </Row>
    </div>

    <div>
        <div className='facility-subheadings'>
        <h2 className='add_facility_subtitle'>Category Details</h2>
      </div>
      <Row>
     <Col md={6}>
     <FormField
                    label="Sector"
                    isDropdown
                    options={[{ name: "GT/HRSG 41", value: "GT/HRSG 41" }]}
                  />
      </Col>
      <Col md={6}>
      <FormField
                    label="Category"
                    isDropdown
                    options={[{ name: "GT/HRSG 41", value: "GT/HRSG 41" }]}
                  />
      </Col>
      <Col md={6}>
      <FormField
                    label="Sub Sector"
                    isDropdown
                    options={[{ name: "GT/HRSG 41", value: "GT/HRSG 41" }]}
                  />
      </Col>
      <Col md={12} className="mt-3">
                       <label className="modal-subhead">Description</label>
                       <textarea
                         className="form-control"
                         placeholder="Write here..."
                         rows="3"
                       ></textarea>
                     </Col>
      </Row>
    </div>
            <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button type="submit" className="add-details-btn  me-2">
                  {" "}
                  Add Details
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn "
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
  )
}

export default AddOrganizationModal