import React, { useState } from 'react'
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, FormGroup, FormFeedback, Table,Form } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import '../../App.css';

const EditRole = () => {
  const { t } = useTranslation();

  const [permissions, setPermissions] = useState([
    { name: "CATALOGUE", read: true, write: true, edit: false },
    { name: "ORDERS", read: true, write: true, edit: false },
    { name: "BRANDS", read: true, write: true, edit: false },
    { name: "B2B", read: true, write: false, edit: false },
    { name: "INVENTORY", read: true, write: true, edit: false },
    { name: "REPORTS", read: true, write: true, edit: false }
  ]);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      rolenameinput: "",
      Descriptioninput: "",
      tenantinput:""


    },
    validationSchema: Yup.object({
      rolenameinput: Yup.string().required("Please Enter Role Name"),
      Descriptioninput: Yup.string().required("Please Enter Role Description"),
      tenantinput: Yup.string().required("Please Enter Tenant Description"),

    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const togglePermission = (index, type) => {
    const updatedPermissions = permissions.map((perm, idx) =>
      idx === index ? { ...perm, [type]: !perm[type] } : perm
    );
    setPermissions(updatedPermissions);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Form   className="needs-validation "
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }} >
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
                 {t('Edit Role')}
                </h4>
              </CardHeader>

              <CardBody>

                <Row  style={{marginTop:'3.5rem'}}>
                  <Col md={12}>
                    <FormGroup className="mb-3">
                      <Label htmlFor="firstnameinput">{t('Role Name')}</Label>
                      <Input
                        name="rolenameinput"
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
                      <Label htmlFor="firstnameinput">{t('Role Description')}</Label>
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

{/* 
 <Col md={12}>
                    <FormGroup className="mb-3">
                      <Label htmlFor="firstnameinput">Tenant ID</Label>
                      <Input
                        name="tenantinput"
                        placeholder="Enter Role Discription"
                        type="text"
                        className="form-control"
                        id="tenantinput"
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
                  </Col> */}
                  <Col md={12}>
                  <Label>{t('Tenant ID')}</Label>
                      <select  aria-label="Default select example" className={`form-select mb-3 ${
                            validation.touched.tenantinput &&
                            validation.errors.tenantinput
                              ? "is-invalid"
                              : ""
                          }`} // Add red border class if error
                          id="tenantinput"
                          name="tenantinput"
                          value={validation.values.tenantinput} // Formik-controlled value
                          onChange={validation.handleChange} // Formik change handler
                          onBlur={validation.handleBlur} // Formik blur handler
                     
                          invalid={
                            validation.touched.tenantinput &&
                            validation.errors.tenantinput
                              ? true
                              : false
                          }>
        <option >Select your Status </option>
        <option defaultValue="1">Declined Payment</option>
        <option defaultValue="2">Delivery Error</option>
        <option defaultValue="3">Wrong Amount</option>
    </select>
    {validation.touched.tenantinput &&
                        validation.errors.tenantinput ? (
                          <FormFeedback className="d-block">
                            {validation.errors.tenantinput}
                          </FormFeedback>
                        ) : null}
    </Col>
 <Col>
              
      <Table style={{marginTop:'30px'}}>
        <thead>
          {/* <tr>
            <th>Module</th>
            <th>Read</th>
            <th>Write</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr> */}
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index} className="role-table-tr">
              <td style={{padding:'10px'}}>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" defaultChecked /> {permission.name}
                  </Label>
                </FormGroup>
                <div>
                  <a href="#">{t('Show 7 sub-categories')}</a>
                </div>
              </td>
              <td className="role-table">
                {/* <Button
                  color={permission.read ? "success" : "secondary"}
                  onClick={() => togglePermission(index, "read")}
                >
                  {permission.read ? "On" : "Off"}
                </Button> */}
                 <Label className="form-check-label" for="Readswitch">{t('Read')}</Label>
                  <div className="form-check form-switch form-switch-md mb-3 form-switch-success" dir="ltr">
            <Input type="checkbox" className="form-check-input" id="Readswitch"/>
           
        </div>
              </td>
              <td className="role-table">
                {/* <Button
                  color={permission.write ? "warning" : "secondary"}
                  onClick={() => togglePermission(index, "write")}
                >
                  {permission.write ? "On" : "Off"}
                </Button> */}
                <Label className="form-check-label" >{t('Write')}</Label>
                            <div className="form-check form-switch form-switch-md mb-3 form-switch-warning" dir="ltr">
            <Input type="checkbox" className="form-check-input" id="writeswitch"/>
            
        </div>
              </td>
              <td className="role-table">
                {/* <Button
                  color={permission.edit ? "success" : "secondary"}
                  onClick={() => togglePermission(index, "edit")}
                >
                  {permission.edit ? "On" : "Off"}
                </Button> */}
                 <Label className="form-check-label" >{t('Edit')}</Label>          
        <div className="form-check form-switch form-switch-md mb-3" dir="ltr">
            <Input type="checkbox" className="form-check-input" id="Editswitch"/>
            
        </div>
              </td>

              <td className="role-table">
                {/* <Button
                  color={permission.edit ? "success" : "secondary"}
                  onClick={() => togglePermission(index, "edit")}
                >
                  {permission.edit ? "On" : "Off"}
                </Button> */}
                      <Label className="form-check-label" >{t('Delete')}</Label>          
        <div className="form-check form-switch form-switch-md mb-3 form-switch-danger" dir="ltr">
            <Input type="checkbox" className="form-check-input" id="Deletswitch"/>
       
        </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Col>
    <div className="d-flex mt-3">
                      <Button
                        type="submit"
                        color="success"
                        className="rounded-pill me-2"
                      >
                        {t('Submit')}
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="rounded-pill"
                        onClick={() => history.back()}
                      >
                        {t('Cancel')}
                      </Button>
                    </div>


                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </Form>
      </Container>
    </div>
  );
};



export default EditRole