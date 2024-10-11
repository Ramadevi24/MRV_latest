import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Button,
  CardBody,
  Container,
  Card,
  CardHeader,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { RoleContext } from "../../contexts/RoleContext";
import { UserContext } from "../../contexts/UserContext";

const EditUser = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllOrganizations, organizations } =
    useContext(OrganizationContext);
  const { fetchAllRoles, roles } = useContext(RoleContext);
  const { updateUserProfile, fetchUserById } = useContext(UserContext);
  const userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
    // const [loading, setLoading] = useState(true);

    const validation = useFormik({
      enableReinitialize: true,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        tenantID: userPermissions.tenantID || "", // Default to userPermissions.tenantID if available
        organizationID: "",
        roleID: "",
        userRole: "",
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required(t("Please Enter Your First Name")),
        lastName: Yup.string().required(t("Please Enter Your Last Name")),
        email: Yup.string().required(t("Please Enter Your Email")),
        phone: Yup.string().required(t("Please enter a Phone Number")),
        userRole: Yup.string().required(t("Please select a User Role")),
      }),
      onSubmit: async (values) => {
        const roleID = findRoleIdByRoleName();
        if (!roleID) {
          toast.error(t("Please select a valid user role"));
          return;
        }
        const updateFormData = { ...values, loginType: "custom", roleID: roleID,  organizationID: values.organizationID || null };
        try {
          await updateUserProfile(id, updateFormData);
          toast.success(t("User Updated successfully"), { autoClose: 3000 });
          navigate("/users");
        } catch (error) {
          toast.error(t("Error Updating user"));
        }
      },
    });

    useEffect(() => {
      fetchAllTenants();
      const selectedTenantID = validation.values?.tenantID;
      const tenantIdToUse = userPermissions.tenantID || selectedTenantID;
      if (tenantIdToUse) {
        fetchAllOrganizations(tenantIdToUse);
        fetchAllRoles(tenantIdToUse);
      }
    }, [userPermissions.tenantID, validation.values?.tenantID]);

    const fetchData = async () => {
      try {
        // if (organizations.length > 0 && tenants.length > 0 && roles.length > 0) {
          const user = await fetchUserById(id);
  
          const initialTenant = tenants.find(
            (tenant) => tenant.name === user.tenantName
          );
          const tenantID = initialTenant ? initialTenant.tenantID : "";
  
          const initialOrganization = organizations.find(
            (org) => org.organizationName === user.organizationName
          );
          const organizationID = initialOrganization
            ? initialOrganization.organizationID
            : "";
  
          const initialUserRole = roles.find(
            (role) => role.roleName === user.userRole
          );
          const tenantRoleID = initialUserRole ? initialUserRole.roleID : "";
          validation.setValues({
            ...validation.values,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone,
            tenantID: userPermissions.tenantID || tenantID,
            organizationID: organizationID || "",
            roleID: user.roleID || "",
            userRole: user.userRole || "",
            tenantRoleID: tenantRoleID || "",
          });
            // }
      } catch (error) {
        toast.error(t("Error fetching user data"));
      }

    };
    
    useEffect(() => {
      if (tenants && organizations && roles) {
        fetchData();
      } else {
        console.log("Required data not available yet");
      }
    }, [id, tenants, organizations, roles]);


    

  const findRoleIdByRoleName = () => {
    const role = roles?.find(
      (role) => role.roleName === validation.values.userRole
    );
    return role ? role.roleID : null; // Ensure you return roleID here
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
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
                    {t("Edit User")}
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
                      style={{ marginTop: "3.5rem" }}
                    >
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="firstName">{t("First name")}</Label>
                            <Input
                              name="firstName"
                              placeholder={t("Enter FirstName")}
                              type="text"
                              className="form-control"
                              id="firstName"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstName || ""}
                              invalid={
                                validation.touched.firstName &&
                                validation.errors.firstName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.firstName &&
                            validation.errors.firstName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.firstName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="lastName">{t("Last Name")}</Label>
                            <Input
                              name="lastName"
                              placeholder={t("Enter Lastname")}
                              type="text"
                              className="form-control"
                              id="lastName"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lastName || ""}
                              invalid={
                                validation.touched.lastName &&
                                validation.errors.lastName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.lastName &&
                            validation.errors.lastName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lastName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <div className="mb-3">
                              <Label htmlFor="emailadress">
                                {t("Email Address")}
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                                id="email"
                                name="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback>
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <div className="mb-3">
                              <Label htmlFor="phone">
                                {t("Phone Number")}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="tel"
                                className="form-control"
                                placeholder="Enter phone number"
                                id="phone"
                                name="phone"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback>
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        {!userPermissions.tenantID && (
                          <Col lg={12}>
                            <Label htmlFor="tenantID">
                              {t("Tenant ID")}
                              <span className="text-danger">*</span>
                            </Label>
                            <select
                              className={`form-select  ${
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
                              aria-label="Default select example"
                              invalid={
                                validation.touched.tenantID &&
                                validation.errors.tenantID
                                  ? true
                                  : false
                              } // Validation state
                            >
                              <option value="">{t("Select Tenant")}</option>
                              {tenants.map((tenant) => (
                                <option
                                  key={tenant.tenantID}
                                  value={tenant.tenantID}
                                >
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
                      </Row>
                      <Row>
                      {userPermissions.tenantID && (
                        <Col>
                          <Label htmlFor="organizationID">
                            {t("Organization ID")}
                          </Label>
                          <select
                            className={`form-select  ${
                              validation.touched.organizationID &&
                              validation.errors.organizationID
                                ? "is-invalid"
                                : ""
                            }`} // Add red border class if error
                            id="organizationID"
                            name="organizationID"
                            value={validation.values.organizationID} // Formik-controlled value
                            onChange={validation.handleChange} // Formik change handler
                            onBlur={validation.handleBlur} // Formik blur handler
                            aria-label="Default select example"
                            invalid={
                              validation.touched.organizationID &&
                              validation.errors.organizationID
                                ? true
                                : false
                            } // Validation state
                          >
                            <option value="">{t("Select Organization")}</option>
                            {organizations.map((org) => (
                              <option
                                key={org.organizationID}
                                value={org.organizationID}
                              >
                                {org.organizationName}
                              </option>
                            ))}
                          </select>
                          {validation.touched.organizationID &&
                          validation.errors.organizationID ? (
                            <FormFeedback className="d-block">
                              {validation.errors.organizationID}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      )}
                        <Col>
                          <Label htmlFor="userRole">
                            {t("User Role")}
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            className={`form-select  ${
                              validation.touched.userRole &&
                              validation.errors.userRole
                                ? "is-invalid"
                                : ""
                            }`} // Add red border class if error
                            id="userRole"
                            name="userRole"
                            value={validation.values.userRole} // Formik-controlled value
                            onChange={validation.handleChange} // Formik change handler
                            onBlur={validation.handleBlur} // Formik blur handler
                            aria-label="Default select example"
                            invalid={
                              validation.touched.userRole &&
                              validation.errors.userRole
                                ? true
                                : false
                            } // Validation state
                          >
                            <option value="">{t("Select User Role")}</option>
                            {roles.map((role) => (
                              <option key={role.roleID} value={role.roleName}>
                                {role.roleName}
                              </option>
                            ))}
                          </select>
                          {validation.touched.userRole &&
                          validation.errors.userRole ? (
                            <FormFeedback className="d-block">
                              {validation.errors.userRole}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end  mt-3" style={{marginRight:'4rem'}}>
                        <Button
                          type="submit"
                          color="success"
                          className="rounded-pill me-2"
                        >
                          {t("Submit")}
                        </Button>
                        <Button
                          type="button"
                          color="danger"
                          className="rounded-pill"
                          onClick={() => history.back()}
                        >
                          {t("Cancel")}
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
  );
};

export default EditUser;
