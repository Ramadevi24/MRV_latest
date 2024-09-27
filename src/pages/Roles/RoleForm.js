import React, { useState, useContext, useEffect } from 'react'
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, FormGroup, FormFeedback, Table,Form } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import { TenantContext } from '../../contexts/TenantContext';
import {PermissionContext} from '../../contexts/PermissionContext';

const RoleForm = () => {
  const { t } = useTranslation();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllPermissions } = useContext(PermissionContext);
  const userPermissions = JSON.parse(localStorage.getItem("permissions"));
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
      roleName: "",
      description: "",
      permissionIds: [],
      tenantID:""


    },
    validationSchema: Yup.object({
      roleName: Yup.string().required("Please Enter Role Name"),
      description: Yup.string().required("Please Enter Role Description"),
      tenantinput: Yup.string().required("Please Enter Tenant"),
      permissionIds: Yup.array().required("Please Select Permissions"),

    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  useEffect(() => {
    fetchAllTenants();
    fetchAllPermissions();
  }, []);

  // const togglePermission = (index, type) => {
  //   const updatedPermissions = permissions.map((perm, idx) =>
  //     idx === index ? { ...perm, [type]: !perm[type] } : perm
  //   );
  //   setPermissions(updatedPermissions);
  // };

    const groupedPermissions = permissions?.reduce((grouped, permission) => {
      const group = permission.permissionGroup;
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(permission);
      return grouped;
    }, {});

  return (
    <div className="page-content">
      <Container fluid>
        <Form   className="needs-validation "
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}>
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

                <Row  style={{marginTop:'3.5rem'}}>
                  <Col md={12}>
                    <FormGroup className="mb-3">
                      <Label htmlFor="roleName">Role Name</Label>
                      <Input
                        name="roleName"
                        placeholder="Enter Role Name"
                        type="text"
                        className="form-control"
                        id="roleName"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.roleName || ""}
                        invalid={
                          validation.touched.roleName &&
                            validation.errors.roleName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.roleName &&
                        validation.errors.roleName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.roleName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup className="mb-3">
                      <Label htmlFor="firstnameinput">Role Description</Label>
                      <Input
                        name="description"
                        placeholder="Enter Role Discription"
                        type="text"
                        className="form-control"
                        id="description"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                        invalid={
                          validation.touched.description &&
                            validation.errors.description
                            ? true
                            : false
                        }
                      />
                      {validation.touched.description &&
                        validation.errors.description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.description}
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
                   {userPermissions && userPermissions.tenantID === null && (
                  <Col md={12}>
                  <Label>Tenant ID</Label>
                      <select  aria-label="Default select example" className={`form-select mb-3 ${
                            validation.touched.tenantID &&
                            validation.errors.tenantID
                              ? "is-invalid"
                              : ""
                          }`} // Add red border class if error
                          id="tenantID"
                          name="tenantID"
                          value={validation.values.tenantID} // Formik-controlled value
                          onChange={validation.handleChange} // Formik change handler
                          onBlur={validation.handleBlur} // Formik blur handler
                     
                          invalid={
                            validation.touched.tenantID &&
                            validation.errors.tenantID
                              ? true
                              : false
                          }>
       <option value="">{t("selectTenant")}</option>
       {tenants.map((tenant) => (
                    <option key={tenant.tenantID} value={tenant.tenantID}>
                      {tenant.name}
                    </option>
                  ))}
    </select>
    {validation.touched.tenantID &&
                        validation.errors.tenantID ? (
                          <FormFeedback className="d-block">
                            {validation.errors.tenantID}
                          </FormFeedback>
                        ) : null}
    </Col>
                   )}
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
                  <a href="#">Show 7 sub-categories</a>
                </div>
              </td>
              <td className="role-table">
                {/* <Button
                  color={permission.read ? "success" : "secondary"}
                  onClick={() => togglePermission(index, "read")}
                >
                  {permission.read ? "On" : "Off"}
                </Button> */}
                 <Label className="form-check-label" for="Readswitch">Read</Label>
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
                <Label className="form-check-label" >Write</Label>
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
                 <Label className="form-check-label" >Edit</Label>          
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
                      <Label className="form-check-label" >Delete</Label>          
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

export default RoleForm;

export default RoleForm