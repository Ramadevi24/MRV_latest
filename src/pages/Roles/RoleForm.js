import React,{useState} from 'react'
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader,FormGroup,FormFeedback } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
const RoleForm = () => {
  const {t}=useTranslation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      rolenameinput: "",
      Descriptioninput:"",
      tenantid: '', 
  
    },
    validationSchema: Yup.object({
      rolenameinput: Yup.string().required("Please Enter Role Name"),
      tenantid: Yup.string().required('Please select a Tenant ID'), 
      Descriptioninput:Yup.string().required("Please Enter Role Description"),
 
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const [permissions, setPermissions] = useState({
    catalogue: { read: true, write: true, edit: false },
    orders: { read: true, write: false, edit: false },
    brands: { read: true, write: true, edit: false },
    b2b: { read: true, write: true, edit: false },
    inventory: { read: true, write: true, edit: false },
    reports: { read: true, write: false, edit: false },
  });

  const handleToggle = (category, permissionType) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [category]: {
        ...prevPermissions[category],
        [permissionType]: !prevPermissions[category][permissionType],
      },
    }));
  };

  // Render a permission row for each category
  const renderPermissionRow = (category, label) => (
    <Card className="mb-2" key={category}>
      <CardBody>
        <Row className="align-items-center">
          <Col xs="4" className="d-flex align-items-center">
            <Input type="checkbox" checked={true} readOnly />{" "}
            <Label className="ml-2">{label}</Label>
          </Col>
          <Col xs="2" className="text-center">
            <Label>Read</Label>
            <Input
              type="switch"
              checked={permissions[category].read}
              onChange={() => handleToggle(category, "read")}
            />
          </Col>
          <Col xs="2" className="text-center">
            <Label>Write</Label>
            <Input
              type="switch"
              checked={permissions[category].write}
              onChange={() => handleToggle(category, "write")}
            />
          </Col>
          <Col xs="2" className="text-center">
            <Label>Edit</Label>
            <Input
              type="switch"
              checked={permissions[category].edit}
              onChange={() => handleToggle(category, "edit")}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
  return (
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
     Add Role
              </h4>
            </CardHeader>

            <CardBody>
      
      <Row>
      <Col md={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="firstnameinput">Role Name</Label>
                            <Input
                              name="roletnameinput"
                              placeholder="Enter Role Name"
                              type="text"
                              className="form-control"
                              id="rolenameinput"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.rolenameinput || ""}
                              invalid={
                                validation.touched.rolenameinput &&
                                  validation.errors.rolenameinput
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.rolenameinput &&
                              validation.errors.rolenameinput ? (
                              <FormFeedback type="invalid">
                                {validation.errors.rolenameinput}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="firstnameinput">Role Description</Label>
                            <Input
                              name="Descriptioninput"
                              placeholder="Enter Role Discription"
                              type="text"
                              className="form-control"
                              id="Descriptioninput"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Descriptioninput || ""}
                              invalid={
                                validation.touched.Descriptioninput &&
                                  validation.errors.Descriptioninput
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Descriptioninput &&
                              validation.errors.Descriptioninput ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Descriptioninput}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
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
          <Col lg={12}>

          {/* <div className=' mt-3'>
          <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck1">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div >
          <Label className="form-check-label" for="SwitchCheck2">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck2" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck3">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck3" defaultChecked/>
        </div>
        </div>

         <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck4">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck5">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck5" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck6">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck6" defaultChecked/>
        </div>
        </div>
        <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck4">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
        </div>
        <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck4">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
        </div>
        <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck4">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
        </div>
        <div className='d-flex align-items-center justify-content-around'>
          <div>
            <input type='checkbox' />
            User
          </div>
         
          <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <div>
          <Label className="form-check-label" for="SwitchCheck4">Read</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
          
        </div>
               
        <div className="form-check form-switch form-switch-success mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Write</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
               
        <div className="form-check form-switch form-switch-secondary mb-2 mb-md-0">
        <div>
          <Label className="form-check-label" for="SwitchCheck4">Edit</Label>
          </div>
            <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
        </div>
        </div>
          </div> */}
       
      <h2>Permissions</h2>
      {renderPermissionRow("catalogue", "Catalogue")}
      {renderPermissionRow("orders", "Orders")}
      {renderPermissionRow("brands", "Brands")}
      {renderPermissionRow("b2b", "B2B")}
      {renderPermissionRow("inventory", "Inventory")}
      {renderPermissionRow("reports", "Reports")}
   
          </Col>
 
      </Row>
      </CardBody>
      </Card>
      </Col>
      </Row>
    </Container>
    </div>
  );
};



export default RoleForm