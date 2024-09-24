
import React from 'react';
import { Col, Label, Input, Row, FormGroup, Form, FormFeedback, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';


const OrganizationForm = () => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      organizationname: '',
      description: '',
      establishedDate: '',
      Emailaddress: '',
      phonenumber: '',
      address: '',
      lattitudevalidation: '',
      Longittudevalidation: '',
      locationvalidation: ''
    },
    validationSchema: Yup.object({
      organizationname: Yup.string().required('Please enter organization name'),
      description: Yup.string().required('Please enter a description'),
      establishedDate: Yup.string().required('Please enter the established date'),
      Emailaddress: Yup.string().email('Invalid email format').required('Please enter an email address'),
      phonenumber: Yup.string().required('Please enter a phone number'),
      lattitudevalidation: Yup.string().required('Please enter latitude'),
      Longittudevalidation: Yup.string().required('Please enter longitude'),
      locationvalidation: Yup.string().required('Please enter location'),
      address: Yup.string().required('Please enter your address'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    }
  });

  return (
    <div style={{ margin: '5rem 1rem' }} className='oraganizationform-container'>
      <h2 className="form-heading" >Add Organization</h2>
      <Form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        <Row>
          <Col lg={6}>
            <Label htmlFor="validationtenantid">Tenant ID</Label>
            <select className="form-select rounded-pill mb-3" aria-label="Default select example">
              <option>Search for services</option>
              <option defaultValue="1">Information Architecture</option>
              <option defaultValue="2">UI/UX Design</option>
              <option defaultValue="3">Back End Development</option>
            </select>
          </Col>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="validationorganizationname">Organization Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Enter Organization Name"
                  id="validationorganizationname"
                  name="organizationname"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.organizationname || ""}
                  invalid={validation.touched.organizationname && validation.errors.organizationname ? true : false}
                />
                {validation.touched.organizationname && validation.errors.organizationname ? (
                  <FormFeedback>{validation.errors.organizationname}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="Textarea">Description</Label>
                <Input
                  type="textarea"
                  className="form-control"
                  id="Textarea"
                  rows="3"
                  name="description"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={validation.touched.description && validation.errors.description ? true : false}
                />
                {validation.touched.description && validation.errors.description ? (
                  <FormFeedback>{validation.errors.description}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="establishdate">Established Date</Label>
                <Input
                  type="date"
                  name="establishedDate"
                  id="establishdate"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.establishedDate || ""}
                  invalid={validation.touched.establishedDate && validation.errors.establishedDate ? true : false}
                />
                {validation.touched.establishedDate && validation.errors.establishedDate ? (
                  <FormFeedback>{validation.errors.establishedDate}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="emailadress">Email Address</Label>
                <Input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  id="emailadress"
                  name="Emailaddress"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Emailaddress || ""}
                  invalid={validation.touched.Emailaddress && validation.errors.Emailaddress ? true : false}
                />
                {validation.touched.Emailaddress && validation.errors.Emailaddress ? (
                  <FormFeedback>{validation.errors.Emailaddress}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="phonenumberInput">Phone Number</Label>
                <Input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  id="phonenumberInput"
                  name="phonenumber"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phonenumber || ""}
                  invalid={validation.touched.phonenumber && validation.errors.phonenumber ? true : false}
                />
                {validation.touched.phonenumber && validation.errors.phonenumber ? (
                  <FormFeedback>{validation.errors.phonenumber}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label className="form-label" htmlFor='addressinput'>Address</Label>
                <Input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  id="addressinput"
                  name="address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={validation.touched.address && validation.errors.address ? true : false}
                />
                {validation.touched.address &&
                  validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
          <Col lg={6}>
            <Label>
              categoryIDs
            </Label>
            <select className="form-select rounded-pill mb-3" aria-label="Default select example" >
              <option >Select categoryIDs</option>
              <option defaultValue="1">Information Architecture</option>
              <option defaultValue="2">UI/UX Design</option>
              <option defaultValue="3">Back End Development</option>
            </select>
          </Col>
        </Row>
        <Row>
        <Col md={3}>
          <Label style={{marginTop:'20px'}}>Location:</Label>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <Label for="lattitudeInput" className="form-label">Latitude
              </Label>
              <Input type="email" className="form-control" placeholder="Enter your Latitude 
 " id="lattitudeInput"

                onChange={validation.handleChange}
                name='lattitudevalidation'
                onBlur={validation.handleBlur}
                value={validation.values.lattitudevalidation || ""}
                invalid={
                  validation.touched.lattitudevalidation &&
                    validation.errors.lattitudevalidation
                    ? true
                    : false
                } />
              {validation.touched.lattitudevalidation &&
                validation.errors.lattitudevalidation ? (
                <FormFeedback type="invalid">
                  {validation.errors.lattitudevalidation}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <Label className="form-label" htmlFor='longittudeInput'>Longittude
              </Label>
              <Input type="email" className="form-control" placeholder="Enter your Longittude" id="longittudeInput" onChange={validation.handleChange}
                name='Longittudevalidation'
                onBlur={validation.handleBlur}
                value={validation.values.Longittudevalidation || ""}
                invalid={
                  validation.touched.Longittudevalidation &&
                    validation.errors.Longittudevalidation
                    ? true
                    : false
                } />
              {validation.touched.Longittudevalidation &&
                validation.errors.Longittudevalidation ? (
                <FormFeedback type="invalid">
                  {validation.errors.Longittudevalidation}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <Label htmlFor="locationaddressinput" className="form-label">Location Address
              </Label>
              <Input type="email" className="form-control" placeholder="Enter Location Address" id="locationaddressinput"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                name='locationvalidation'
                value={validation.values.locationvalidation || ""}
                invalid={
                  validation.touched.locationvalidation &&
                    validation.errors.locationvalidation
                    ? true
                    : false
                } />
              {validation.touched.locationvalidation &&
                validation.errors.locationvalidation ? (
                <FormFeedback type="invalid">
                  {validation.errors.locationvalidation}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
        <Col md={12}>
          <div className="text-end">
            <Button type="submit" color="success" className="rounded-pill"> Submit </Button>
          </div>
        </Col>


      </Form>

    </div>
  );
};

export default OrganizationForm;
