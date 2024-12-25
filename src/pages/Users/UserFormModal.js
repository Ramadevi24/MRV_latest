import React, { useEffect, useContext } from "react";
import {
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Form,
  Row,
  Col,
} from "reactstrap";
import Modal from "../../Components/CommonComponents/Modal";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { RoleContext } from "../../contexts/RoleContext";
import { UserContext } from "../../contexts/UserContext";
import CryptoJS from "crypto-js";

const UserFormModal = ({ isOpen, onClose, userId }) => {
  const { t } = useTranslation();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllOrganizations, organizations } =
    useContext(OrganizationContext);
  const { fetchAllRoles, roles } = useContext(RoleContext);
  const { addUser } = useContext(UserContext);
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
      tenantID: userPermissions.tenantID || "", // Default to userPermissions.tenantID if available
      organizationID: "",
      roleID: "",
      userRole: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t("Please Enter Your First Name")),
      tenantID: Yup.string().required(t("Please select a Tenant")),
      lastName: Yup.string().required(t("Please Enter Your Last Name")),
      email: Yup.string().required(t("Please Enter Your Email")),
      phone: Yup.string().required(t("Please enter a Phone Number")),
      passwordHash: Yup.string().required(t("Please enter a password")),
      userRole: Yup.string().required(t("Please select a User Role")),
    }),
    onSubmit: async (values) => {
      const roleID = findRoleIdByRoleName();
      if (!roleID) {
        toast.error(t("Please select a valid user role"));
        return;
      }
      const createFormData = {
        ...values,
        loginType: "custom",
        roleID: roleID,
        passwordHash: CryptoJS.SHA256(values.passwordHash).toString(),
        organizationID: values.organizationID || null,
      };
      try {
        await addUser(createFormData);
        toast.success(t("User created successfully"), { autoClose: 3000 });
        // navigate("/users");
        onClose();
      } catch (error) {
        toast.error(t("Error creating user"));
      }
    },
  });

  useEffect(() => {
    // Fetch all tenants on component mount or when needed
    fetchAllTenants();

    // Determine the tenant ID to use
    const selectedTenantID = validation.values?.tenantID;
    const tenantIdToUse = userPermissions.tenantID || selectedTenantID;

    if (tenantIdToUse) {
      fetchAllOrganizations(tenantIdToUse);
      fetchAllRoles(tenantIdToUse);
    }
  }, [userPermissions.tenantID, validation.values.tenantID]); // Only keep the values you depend on

  const findRoleIdByRoleName = () => {
    const role = roles?.find(
      (role) => role.roleName === validation.values.userRole
    );
    return role ? role.roleID : null; // Ensure you return roleID here
  };

  // useEffect(() => {
  //   fetchAllTenants();
  //   if (validation.values.tenantID) {
  //     fetchAllOrganizations(validation.values.tenantID);
  //     fetchAllRoles(validation.values.tenantID);
  //   }
  //   if (isOpen && userId) {
  //     const loadUser = async () => {
  //       try {
  //         const user = await fetchUserById(userId);
  //         if (user) {
  //           validation.setValues({
  //             firstName: user.firstName || '',
  //             lastName: user.lastName || '',
  //             email: user.email || '',
  //             passwordHash: '',
  //             phone: user.phone || '',
  //             tenantID: user.tenantID || '',
  //             organizationID: user.organizationID || '',
  //             userRole: user.userRole || '',
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error loading user:", error);
  //       }
  //     };
  //     loadUser();
  //   }
  // }, [isOpen, userId, validation.values.tenantID]);

  return (
    <Modal
      size="lg"
      //   title={userId ? "Edit User" : "Add User"}
      title="Add User"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form onSubmit={validation.handleSubmit}>
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
                  validation.touched.firstName && validation.errors.firstName
                    ? true
                    : false
                }
              />
              {validation.touched.firstName && validation.errors.firstName ? (
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
                  validation.touched.lastName && validation.errors.lastName
                    ? true
                    : false
                }
              />
              {validation.touched.lastName && validation.errors.lastName ? (
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
                <Label htmlFor="emailadress">{t("Email Address")}</Label>
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
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback>{validation.errors.email}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationCustom03">{t("Password")}</Label>
              <Input
                name="passwordHash"
                placeholder={t("Enter Password")}
                type="password"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.passwordHash || ""}
                invalid={
                  validation.touched.passwordHash &&
                  validation.errors.passwordHash
                    ? true
                    : false
                }
              />
              {validation.touched.passwordHash &&
              validation.errors.passwordHash ? (
                <FormFeedback type="invalid">
                  {validation.errors.passwordHash}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback>{validation.errors.phone}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col>
          {!userPermissions.tenantID && (
            <Col lg={6}>
              <Label htmlFor="tenantID">
                {t("Tenant ID")}
                <span className="text-danger">*</span>
              </Label>
              <select
                className={`form-select  ${
                  validation.touched.tenantID && validation.errors.tenantID
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
                  validation.touched.tenantID && validation.errors.tenantID
                    ? true
                    : false
                } // Validation state
              >
                <option value="">{t("Select Tenant")}</option>
                {tenants.map((tenant) => (
                  <option key={tenant.tenantID} value={tenant.tenantID}>
                    {tenant.name}
                  </option>
                ))}
              </select>
              {validation.touched.tenantID && validation.errors.tenantID ? (
                <FormFeedback className="d-block">
                  {validation.errors.tenantID}
                </FormFeedback>
              ) : null}
            </Col>
          )}
          {userPermissions.tenantID && (
            <Col lg={6}>
              <Label htmlFor="organizationID">{t("Organization ID")}</Label>
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
                  <option key={org.organizationID} value={org.organizationID}>
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
          <Col lg={6}>
            <Label htmlFor="userRole">
              {t("User Role")}
              <span className="text-danger">*</span>
            </Label>
            <select
              className={`form-select  ${
                validation.touched.userRole && validation.errors.userRole
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
                validation.touched.userRole && validation.errors.userRole
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
            {validation.touched.userRole && validation.errors.userRole ? (
              <FormFeedback className="d-block">
                {validation.errors.userRole}
              </FormFeedback>
            ) : null}
          </Col>
        </Row>
        <div className="modal-footer mt-3">
          <Button color="success" type="submit" className="me-2 add-btn">
            Save
          </Button>
          <Button color="danger" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
