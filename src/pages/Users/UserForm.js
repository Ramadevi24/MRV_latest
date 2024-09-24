import React from 'react'
import { Col, Label, Input, Row, FormGroup, Form, FormFeedback, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const UserForm = () => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstnameinput: "",
      lastnameinput: "",
      Emailaddress: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: Yup.object({
      firstnameinput: Yup.string().required("Please Enter Your First Name"),
      lastnameinput: Yup.string().required("Please Enter Your Last Name"),
      Emailaddress: Yup.string().required("Please Enter Your User Name"),
      city: Yup.string().required("Please Enter Your City"),
      state: Yup.string().required("Please Enter Your State"),
      zip: Yup.string().required("Please Enter Your Zip"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return (
    <div>
      <div style={{ margin: '5rem 1rem' }} className='oraganizationform-container'>
        <div className="live-preview">
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                    <Row>
                        <Col md={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="firstnameinput">First name</Label>
                            <Input
                              name="firstnameinput"
                              placeholder="Enter FirstName"
                              type="text"
                              className="form-control"
                              id="firstnameinput"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstnameinput || ""}
                              invalid={
                                validation.touched.firstnameinput &&
                                  validation.errors.firstnameinput
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.firstnameinput &&
                              validation.errors.firstnameinput ? (
                              <FormFeedback type="invalid">
                                {validation.errors.firstnameinput}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="lastnameinput">Last Name</Label>
                            <Input
                              name="lastnameinput"
                              placeholder="Enter Lastname"
                              type="text"
                              className="form-control"
                              id="lastnameinput"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lastnameinput || ""}
                              invalid={
                                validation.touched.lastnameinput &&
                                  validation.errors.lastnameinput
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.lastnameinput &&
                              validation.errors.lastnameinput ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lastnameinput}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      
                      
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
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom03">Password</Label>
                            <Input
                              name="city"
                              placeholder="Enter Password"
                              type="text"
                              className="form-control"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.city || ""}
                              invalid={
                                validation.touched.city && validation.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.city && validation.errors.city ? (
                              <FormFeedback type="invalid">
                                {validation.errors.city}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                    
                     
                        <Col md={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom04">State</Label>
                            <Input
                              name="state"
                              placeholder="State"
                              type="text"
                              className="form-control"
                              id="validationCustom04"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.state || ""}
                              invalid={
                                validation.touched.state &&
                                  validation.errors.state
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.state &&
                              validation.errors.state ? (
                              <FormFeedback type="invalid">
                                {validation.errors.state}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom05">Zip</Label>
                            <Input
                              name="zip"
                              placeholder="Zip"
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.zip || ""}
                              invalid={
                                validation.touched.zip && validation.errors.zip
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.zip && validation.errors.zip ? (
                              <FormFeedback type="invalid">
                                {validation.errors.zip}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                   
                 
                        <Col lg="12">
                          <FormGroup className="mb-3">
                            <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="invalidCheck"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="invalidCheck"
                              >
                                {" "}
                                Agree to terms and conditions
                              </Label>
                            </div>
                          </FormGroup>
                        </Col>
                     <Col md='6'>
                      <Button color="primary" type="submit">
                        Submit form
                      </Button>
                      </Col>
                      </Row>
                    </Form>
                  </div>

    </div>
    </div>
  )
}

export default UserForm