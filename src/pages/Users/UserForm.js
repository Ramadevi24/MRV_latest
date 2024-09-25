import React from 'react'
import { Col, Label, Input, Row, FormGroup, Form, FormFeedback, Button, CardBody ,Container,Card,CardHeader} from 'reactstrap';
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
      phonenumber: '',
      password:'',
      tenantid: '', 
      organizationid:'',
    userrole:''
    },
    validationSchema: Yup.object({
      firstnameinput: Yup.string().required("Please Enter Your First Name"),
      tenantid: Yup.string().required('Please select a Tenant ID'), 
      organizationid: Yup.string().required('Please select a Organization Id'), 
      lastnameinput: Yup.string().required("Please Enter Your Last Name"),
      Emailaddress: Yup.string().required("Please Enter Your User Name"),
      phonenumber: Yup.string().required('Please enter a phone number'),
      password: Yup.string().required('Please enter a password'),
      userrole: Yup.string().required('Please select a User Role'), 
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4
                  className="card-title mb-0"
                  style={{
                    color: "#45CB85",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                Add User
                </h4>
              </CardHeader>

              <CardBody>

 
                {/* <div className="ribbon-box" style={{padding:"2rem"}}>
                <h2 className="ribbon ribbon-success ribbon-shape" style={{fontSize:'20px', padding:"10px"}}>Add Users</h2>
               </div> */}

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
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="phonenumberInput">Phone Number<span className="text-danger">*</span></Label>
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

          <Col lg={6}>
            <Label htmlFor="validationtenantid">Tenant ID <span className="text-danger">*</span></Label>
            <select          className={`form-select  ${validation.touched.tenantid && validation.errors.tenantid ? 'is-invalid' : ''}`}  // Add red border class if error
                    id="validationtenantid"
                    name="tenantid"
                    value={validation.values.tenantid}  // Formik-controlled value
                    onChange={validation.handleChange}  // Formik change handler
                    onBlur={validation.handleBlur}  // Formik blur handler
                    aria-label="Default select example"
                    invalid={validation.touched.tenantid && validation.errors.tenantid ? true : false}  // Validation state
                  >
            <option >Select your Status </option>
            <option defaultValue="1">IST</option>
            <option defaultValue="2">Tenant 1</option>
            <option defaultValue="3">Tenant 2</option>
            <option defaultValue="3">Tenant 4 data</option>
        </select>
        {validation.touched.tenantid && validation.errors.tenantid ? (
                    <FormFeedback className="d-block">{validation.errors.tenantid}</FormFeedback>
                  ) : null}
      
          </Col>
                    
                     
          <Col lg={6}>
            <Label htmlFor="validationtenantid">Organization ID<span className="text-danger">*</span></Label>
            <select          className={`form-select  ${validation.touched.tenantid && validation.errors.tenantid ? 'is-invalid' : ''}`}  // Add red border class if error
                    id="validationtenantid"
                    name="tenantid"
                    value={validation.values.organizationid}  // Formik-controlled value
                    onChange={validation.handleChange}  // Formik change handler
                    onBlur={validation.handleBlur}  // Formik blur handler
                    aria-label="Default select example"
                    invalid={validation.touched.organizationid && validation.errors.organizationid ? true : false}  // Validation state
                  >
            <option >Select your Status </option>
            <option defaultValue="1">Select Organization</option>
            <option defaultValue="2">Delivery Error</option>
            <option defaultValue="3">Wrong Amount</option>
        </select>
        {validation.touched.tenantid && validation.errors.organizationid ? (
                    <FormFeedback className="d-block">{validation.errors.organizationid}</FormFeedback>
                  ) : null}
      
          </Col>
          <Col lg={6}>
            <Label htmlFor="validationtenantid">User Role<span className="text-danger">*</span></Label>
            <select          className={`form-select  ${validation.touched.tenantid && validation.errors.tenantid ? 'is-invalid' : ''}`}  // Add red border class if error
                    id="validationtenantid"
                    name="tenantid"
                    value={validation.values.userrole}  // Formik-controlled value
                    onChange={validation.handleChange}  // Formik change handler
                    onBlur={validation.handleBlur}  // Formik blur handler
                    aria-label="Default select example"
                    invalid={validation.touched.userrole && validation.errors.userrole ? true : false}  // Validation state
                  >
            <option >Select your Status </option>
            <option defaultValue="1">Select User Role</option>
            <option defaultValue="2">Delivery Error</option>
            <option defaultValue="3">Wrong Amount</option>
        </select>
        {validation.touched.tenantid && validation.errors.userrole ? (
                    <FormFeedback className="d-block">{validation.errors.userrole}</FormFeedback>
                  ) : null}
      
          </Col>
          </Row>
                
          <div className="d-flex justify-content-end mt-3">
                <Button type="submit" color="success" className="rounded-pill me-2">
                  Submit
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="rounded-pill"
                  onClick={() => history.back()}
                >
                  Cancel
                </Button>
              </div>
                   
                    </Form>
                    
                  </div>


 
    </CardBody>
    </Card>
    </Col>
    </Row>
    </Container>
    </div>
    </React.Fragment>
  )
}

export default UserForm