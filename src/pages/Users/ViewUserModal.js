import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  CardBody,
  Container,
  Card,
  CardHeader,
} from "reactstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { RoleContext } from "../../contexts/RoleContext";
import { UserContext } from "../../contexts/UserContext";
import Modal from "../../Components/CommonComponents/Modal";

const ViewUser = ({ isOpen, onClose, user }) => {
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

    const validation = useFormik({
      enableReinitialize: true,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: "",
        phone: "",
        tenantID: userPermissions.tenantID || "",
        organizationID: "",
        roleID: "",
        userRole: "",
      }
    });

    useEffect(() => {
      fetchAllTenants();
      const selectedTenantID = validation.values?.tenantID;
      const tenantIdToUse = userPermissions.tenantID || selectedTenantID;
      if (tenantIdToUse) {
        fetchAllOrganizations(tenantIdToUse);
        fetchAllRoles(tenantIdToUse);
      }
    }, [userPermissions.tenantID, validation.values.tenantID]); // Only keep the values you depend on

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
        // toast.error(t("Error fetching user data"));
      }

    };
    
    useEffect(() => {
      if (tenants && organizations && roles) {
        fetchData();
      } else {
        console.log("Required data not available yet");
      }
    }, []);


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <Modal isOpen={isOpen}
        onClose={onClose}
        title = "View User"
        size = "lg" >
          <Row>
            <Col>
              <Card>
                <CardBody>
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
                              readOnly // Disable input
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
                              readOnly // Disable input
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
                                readOnly // Disable input
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
                                readOnly // Disable input
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
                              }`}
                              id="tenantID"
                              name="tenantID"
                              value={validation.values.tenantID}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              disabled // Disable the select
                              aria-label="Default select example"
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
                            }`}
                            id="organizationID"
                            name="organizationID"
                            value={validation.values.organizationID}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            disabled // Disable the select
                            aria-label="Default select example"
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
                            }`}
                            id="userRole"
                            name="userRole"
                            value={validation.values.userRole}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            disabled // Disable the select
                            aria-label="Default select example"
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
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default ViewUser;
