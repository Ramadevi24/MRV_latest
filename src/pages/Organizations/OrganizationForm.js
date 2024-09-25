
import React,{useState}from 'react';
import { Col, Label, Input, Row, FormGroup, Form, FormFeedback, Button,   Card,
  CardBody,
  CardHeader, Container, InputGroup,
  CardFooter} from 'reactstrap';
  import Cleave from "cleave.js/react";
  import Select from "react-select";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import "cleave.js/dist/addons/cleave-phone.in";

const customStyles = (hasError) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: hasError ? 'red' : provided.borderColor, // Change border color to red if there's an error
    // '&:hover': {
    //   borderColor: hasError ? 'red' : provided.borderColor // Red border on hover if error exists
    // }
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: 'white', // Text color of the selected item
  }),
});

const SingleOptions = [
  { value: 'Choices 1', label: 'Choices 1' },
  { value: 'Choices 2', label: 'Choices 2' },
  { value: 'Choices 3', label: 'Choices 3' },
  { value: 'Choices 4', label: 'Choices 4' }
];


const OrganizationForm = () => {
  const [selectedMulti, setselectedMulti] = useState(null);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenantid: '', // Initial value for tenant ID dropdown
      organizationname: '',
      description: '',
      establishedDate: '',
      Emailaddress: '',
      phonenumber: '',
      address: '',
      lattitudevalidation: '',
      Longittudevalidation: '',
      locationvalidation: '',
      categoryIDs: [],  // Add initial value for category dropdown
    },
    validationSchema: Yup.object({
      tenantid: Yup.string().required('Please select a Tenant ID'), 
      organizationname: Yup.string().required('Please enter organization name'),
      description: Yup.string().required('Please enter a description'),
      establishedDate: Yup.string().required('Please enter the established date'),
      Emailaddress: Yup.string().email('Invalid email format').required('Please enter an email address'),
      phonenumber: Yup.string().required('Please enter a phone number'),
      lattitudevalidation: Yup.string().required('Please enter latitude'),
      Longittudevalidation: Yup.string().required('Please enter longitude'),
      locationvalidation: Yup.string().required('Please enter location'),
      address: Yup.string().required('Please enter your address'),
      categoryIDs: Yup.array().min(1, 'Please select at least one category'),  // Validation rule for multi-select
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    }
  });
  const handleMultiSelectChange = (selectedOptions) => {
    validation.setFieldValue('categoryIDs', selectedOptions);  // Update the form value for multi-select
  };

//   function handleMulti(selectedMulti) {
//     setselectedMulti(selectedMulti);
// }

  return (
    <Container fluid>
    <div style={{ margin: '5rem 1rem' }}>
    <Card>
                <CardHeader className="ribbon-box" style={{padding:"2rem"}}>
                <h2 className="ribbon ribbon-success ribbon-shape" style={{fontSize:'20px', padding:"10px"}}>Add Organization</h2>
                </CardHeader>

                <CardBody>
      
      <Form 
        className="needs-validation "
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        <Row>
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
            <option defaultValue="1">Declined Payment</option>
            <option defaultValue="2">Delivery Error</option>
            <option defaultValue="3">Wrong Amount</option>
        </select>
        {validation.touched.tenantid && validation.errors.tenantid ? (
                    <FormFeedback className="d-block">{validation.errors.tenantid}</FormFeedback>
                  ) : null}
      
          </Col>
       
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="validationorganizationname">Organization Name<span className="text-danger">*</span></Label>
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
          <Col md={12}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="Textarea">Description<span className="text-danger">*</span></Label>
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
          </Row>
          <Row>
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="establishdate">Established Date<span className="text-danger">*</span></Label>
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
       

{/*       
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="emailadress">Email Address<span className="text-danger">*</span></Label>
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
          </Col> */}
          <Col md={6}>
    <label htmlFor="validationDefaultUsername" className="form-label">Email Address<span className="text-danger">*</span></label>
    <InputGroup>
        <span className="input-group-text" id="inputGroupPrepend2">@</span>
        <Input type="email" className="form-control"  id="emailadress" name="Emailaddress"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Emailaddress || ""}
                  invalid={validation.touched.Emailaddress && validation.errors.Emailaddress ? true : false}
        />
    </InputGroup>
    {validation.touched.Emailaddress && validation.errors.Emailaddress ? (
                  <FormFeedback>{validation.errors.Emailaddress}</FormFeedback>
                ) : null}
</Col>
          </Row>
<Row>
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

{/* <Col xl={6}>
                          <div className="mb-3 mb-xl-0">
                            <label htmlFor="cleave-phone" className="form-label">Phone Number<span className="text-danger">*</span></label>
                            <Cleave
                              placeholder="xxxx xxx xxx"
                              options={{
                                phone: true,
                                phoneRegionCode: "IN"
                              }}
                              value={phone}
                              onChange={onPhoneChange}
                              className="form-control"
                            />
                          </div>
                        </Col> */}
                        <Col lg={6} md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="choices-multiple-default" className="form-label ">categoryIDs<span className="text-danger">*</span></Label>                                                        
                                                        <Select
                                                             value={validation.values.categoryIDs}
                                                            isMulti={true}                                                            
                                                            onChange={handleMultiSelectChange}
                                                            options={SingleOptions}
                                                            styles={customStyles(!!validation.errors.categoryIDs && validation.touched.categoryIDs)} // Dynamically set border color
                                                            onBlur={() => validation.setFieldTouched('categoryIDs', true)}  // Mark the field as touched on blur
                                                        />
                                                              {validation.touched.categoryIDs && validation.errors.categoryIDs ? (
                        <FormFeedback className="d-block">{validation.errors.categoryIDs}</FormFeedback>
                      ) : null}
                                                    </div>
                                                </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <div className="mb-3">
                <Label className="form-label" htmlFor='addressinput'>Address<span className="text-danger">*</span></Label>
                <Input
                  type="tel"
                  className="form-control"
                  placeholder="Enter Your Address"
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
          {/* <Col lg={6}>
            <Label>
              categoryIDs
            </Label>
            <select className="form-select mb-3" aria-label="Default select example">
            <option >Select your categoryIDs </option>
            <option defaultValue="1">Declined Payment</option>
            <option defaultValue="2">Delivery Error</option>
            <option defaultValue="3">Wrong Amount</option>
        </select>
          </Col> */}
                  {/* <Col lg={6} md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="choices-multiple-default" className="form-label ">categoryIDs<span className="text-danger">*</span></Label>                                                        
                                                        <Select
                                                             value={validation.values.categoryIDs}
                                                            isMulti={true}                                                            
                                                            onChange={handleMultiSelectChange}
                                                            options={SingleOptions}
                                                            styles={customStyles(!!validation.errors.categoryIDs && validation.touched.categoryIDs)} // Dynamically set border color
                                                            onBlur={() => validation.setFieldTouched('categoryIDs', true)}  // Mark the field as touched on blur
                                                        />
                                                              {validation.touched.categoryIDs && validation.errors.categoryIDs ? (
                        <FormFeedback className="d-block">{validation.errors.categoryIDs}</FormFeedback>
                      ) : null}
                                                    </div>
                                                </Col> */}
        </Row>
        <Col md={4}>
          <Label>Location:</Label>
          </Col>
        <Row>
          <Col md={4}>
            <div className="mb-3">
              <Label for="lattitudeInput" className="form-label">Latitude<span className="text-danger">*</span>
              </Label>
              <Input type="text" className="form-control" placeholder="Enter your Latitude 
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
          <Col md={4}>
            <div className="mb-3">
              <Label className="form-label" htmlFor='longittudeInput'>Longittude<span className="text-danger">*</span>
              </Label>
              <Input type="text" className="form-control" placeholder="Enter your Longittude" id="longittudeInput" onChange={validation.handleChange}
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
          <Col md={4}>
            <div className="mb-3">
              <Label htmlFor="locationaddressinput" className="form-label">Location Address<span className="text-danger">*</span>
              </Label>
              <Input type="text" className="form-control" placeholder="Enter Location Address" id="locationaddressinput"
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
        <div className="d-flex justify-content-end">
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
      </CardBody>
</Card>
    
    </div>
    </Container>
  );
};

export default OrganizationForm;
