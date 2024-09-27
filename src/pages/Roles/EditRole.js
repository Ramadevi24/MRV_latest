import React, { useState, useContext, useEffect } from "react";
import {
  Label,
  Row,
  Col,
  Input,
  Container,
  Button,
  CardBody,
  Card,
  CardHeader,
  FormGroup,
  FormFeedback,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "../../App.css";
import { toast } from "react-toastify";
import { TenantContext } from "../../contexts/TenantContext";
import { PermissionContext } from "../../contexts/PermissionContext";
import { RoleContext } from "../../contexts/RoleContext";
import { useNavigate, useParams } from "react-router-dom";

const EditRole = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllPermissions, permissions } = useContext(PermissionContext);
  const { updateRoleProfile, fetchRoleById, roles } = useContext(RoleContext);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];

  const formik = useFormik({
    initialValues: {
      roleName: "",
      description: "",
      permissionIds: [],
      tenantID: "",
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required("Please Enter Role Name"),
      description: Yup.string().required("Please Enter Role Description"),
      permissionIds: Yup.array().required("Please Select Permissions"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const roleData = {
          roleID: id,
          roleName: values.roleName,
          description: values.description,
          permissionIds: selectedPermissions,
          tenantID: Number(values.tenantID) || userPermissions.tenantID,
        };

        await updateRoleProfile(id, userPermissions.tenantID, roleData);
        toast.success("Role Updated successfully");
        navigate("/roles");
      } catch (error) {
        toast.error("Failed to save role");
      }
    },
  });


  useEffect(() => {
    fetchAllTenants();
    fetchAllPermissions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await fetchRoleById(id, userPermissions.tenantID);
        console.log("role", role);

        // if (tenants && tenants.length > 0) {
        //   const initialTenant = tenants.find(
        //     (tenant) => tenant.tenantID === role.tenantID 
        //   );

        //   const tenantID = initialTenant ? initialTenant.tenantID : role.tenantID || "";

        formik.setValues({
          roleName: role.roleName || "",
          description: role.description || "",
          permissionIds: role.permissions.
            $values?.map((p) => p.permissionID) || [],
          tenantID: role.tenantID,
        });

        setSelectedPermissions(role.permissions.$values?.map((p) => p.permissionID) || []);
      }
      catch (error) {
        toast.error(t("Error fetching role data"));
      }
    };

    fetchData();
  }, [id]);



  const handlePermissionChange = (permissionID) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permissionID)
        ? prevPermissions.filter(id => id !== permissionID) // Remove if already selected
        : [...prevPermissions, permissionID] // Add if not selected
    );
  };


  const groupedPermissions = permissions?.reduce((grouped, permission) => {
    const group = permission.permissionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(permission);
    return grouped;
  }, {});

  // Function to determine the switch color based on permission action
  const getSwitchColor = (permissionDisplayName, isChecked) => {
    if (!isChecked) {
      return "switch-default"; // Default color for switch off
    }

    if (permissionDisplayName.toLowerCase().includes("create")) {
      return "switch-warning"; // Yellow for Create when checked
    } else if (permissionDisplayName.toLowerCase().includes("edit")) {
      return "switch-primary"; // Primary for Edit when checked
    } else if (permissionDisplayName.toLowerCase().includes("view")) {
      return "switch-success"; // Success (green) for View when checked
    } else if (permissionDisplayName.toLowerCase().includes("delete")) {
      return "switch-danger"; // Danger (red) for Delete when checked
    } else {
      return ""; // Default color if no match
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={formik.handleSubmit}>
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
                    {t(`Edit Role`)}
                  </h4>
                </CardHeader>

                <CardBody>
                  <Row style={{ marginTop: "3.5rem" }}>
                    <Col md={12}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="roleName">{t('Role Name')}</Label>
                        <Input
                          name="roleName"
                          placeholder="Enter Role Name"
                          type="text"
                          className="form-control"
                          id="roleName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.roleName}
                          invalid={
                            formik.touched.roleName && formik.errors.roleName
                          }
                        />
                        {formik.touched.roleName && formik.errors.roleName ? (
                          <FormFeedback type="invalid">
                            {formik.errors.roleName}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="description">{t('Role Description')}</Label>
                        <Input
                          name="description"
                          placeholder="Enter Role Description"
                          type="text"
                          className="form-control"
                          id="description"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                          invalid={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                        {formik.touched.description &&
                          formik.errors.description ? (
                          <FormFeedback type="invalid">
                            {formik.errors.description}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>

                    {!userPermissions.tenantID && (
                      <Col md={12}>
                        <Label>{('Tenant ID')}</Label>
                        <select
                          className={`form-select mb-3 ${formik.touched.tenantID && formik.errors.tenantID
                              ? "is-invalid"
                              : ""
                            }`}
                          id="tenantID"
                          name="tenantID"
                          value={formik.values.tenantID}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">{t("selectTenant")}</option>
                          {tenants.map((tenant) => (
                            <option
                              key={tenant.tenantID}
                              value={tenant.tenantID}
                            >
                              {tenant.name}
                            </option>
                          ))}
                        </select>
                        {formik.touched.tenantID &&
                          formik.errors.tenantID ? (
                          <FormFeedback className="d-block">
                            {formik.errors.tenantID}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    )}

                    <Col>
                      <Table style={{ marginTop: "30px" }}>
                        <thead></thead>
                        <tbody>
                          {Object?.entries(groupedPermissions)?.map(
                            ([groupName, groupPermissions]) => (
                              <tr key={groupName} className="role-table-tr">
                                <td style={{ padding: "10px" }}>
                                  <FormGroup check inline>
                                    <Label check>
                                     {groupName}
                                    </Label>
                                  </FormGroup>
                                  <div>
                                    <a href="#">
                                      Show {groupPermissions.length}{" "}
                                      sub-categories
                                    </a>
                                  </div>
                                </td>
                                <td className="role-table" style={{display: "flex",flexWrap: "wrap"}}>
                                {groupPermissions.map((permission) => (
                                  <div
                                    key={permission.permissionID}
                                    style={{
                                      display: "flex", flexDirection: "column",
                                      alignItems: "center",
                                      marginRight: "20px"
                                    }}
                                  >
                                    
                                      <Label
                                        className="form-check-label"
                                        htmlFor={`permission-${permission.permissionID}`}
                                      >
                                        <div>
                                          {permission.permissionDisplayName}
                                        </div>
                                      </Label>
                                      <div
                                        className={`form-check form-switch form-switch-md mb-3 ${getSwitchColor(
                                          permission.permissionDisplayName,
                                          selectedPermissions.includes(permission.permissionID)
                                        )}`}
                                        dir="ltr"
                                      >
                                        <Input
                                          type="checkbox"
                                          className={`form-check-input ${getSwitchColor(
                                            permission.permissionDisplayName,
                                            selectedPermissions.includes(permission.permissionID)
                                          )}`}
                                          id={`permission-${permission.permissionID}`}
                                          checked={selectedPermissions.includes(
                                            permission.permissionID
                                          )}
                                          onChange={() =>
                                            handlePermissionChange(
                                              permission.permissionID
                                            )
                                          }
                                        />
                                      </div>
                                  </div>
                                ))}
                                    </td>

                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </Col>
                    <div className="d-flex justify-content-end mt-3" style={{ marginRight: '4rem' }}>
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
                        onClick={() => navigate("/roles")}
                        style={{ marginRight: "4rem" }}  >
                        {t('Cancel')}
                      </Button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default EditRole;
