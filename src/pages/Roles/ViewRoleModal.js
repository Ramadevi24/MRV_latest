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
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/CommonComponents/Modal";

const ViewRoleModal = (open, onClose, id) => {
  console.log(id, "id");
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { id } = useParams();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllPermissions, permissions } = useContext(PermissionContext);
  const { fetchRoleById } = useContext(RoleContext);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];

  const formik = useFormik({
    initialValues: {
      roleName: "",
      description: "",
      permissionIds: [],
      // tenantID: "",
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required("Please Enter Role Name"),
      description: Yup.string().required("Please Enter Role Description"),
      permissionIds: Yup.array().required("Please Select Permissions"),
    }),
  });

  useEffect(() => {
    fetchAllTenants();
    fetchAllPermissions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await fetchRoleById(id, userPermissions.tenantID);
        formik.setValues({
          roleName: role.roleName || "",
          description: role.description || "",
          permissionIds: role.permissions.$values?.map((p) => p.permissionID) || [],
          tenantID: role.tenantID,
        });

        setSelectedPermissions(role.permissions.$values?.map((p) => p.permissionID) || []);
      } catch (error) {
        console.log(t("Error fetching role data"));
      }
    };

    fetchData();
  }, [id]);

  const groupedPermissions = permissions?.reduce((grouped, permission) => {
    const group = permission.permissionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(permission);
    return grouped;
  }, {});

  const getSwitchColor = (permissionDisplayName, isChecked) => {
    if (!isChecked) {
      if (permissionDisplayName.toLowerCase()){
      return "switch-default"; // Default color for switch off
    }
  }
    else{
      return "switch-success"
    }

    // if (permissionDisplayName.toLowerCase().includes("create")) {
    //   return "switch-warning";
    // } else if (permissionDisplayName.toLowerCase().includes("edit")) {
    //   return "switch-primary";
    // } else if (permissionDisplayName.toLowerCase().includes("view")) {
    //   return "switch-success";
    // } else if (permissionDisplayName.toLowerCase().includes("delete")) {
    //   return "switch-danger";
    // } else {
    //   return "";
    // }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Modal isOpen={open}
        onClose={onClose}
        title = "View Role"
        size = "lg" >
        <form>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="roleName">{t('Role Name')}</Label>
                        <Input
                          name="roleName"
                          placeholder="Enter Role Name"
                          type="text"
                          className="form-control"
                          id="roleName"
                          value={formik.values.roleName}
                          disabled // Disabling the input field
                        />
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
                          value={formik.values.description}
                          disabled // Disabling the input field
                        />
                      </FormGroup>
                    </Col>

                    {/* {!userPermissions.tenantID && (
                      <Col md={12}>
                        <Label>{('Tenant ID')}</Label>
                        <select
                          className="form-select mb-3"
                          id="tenantID"
                          name="tenantID"
                          value={formik.values.tenantID}
                          disabled // Disabling the select dropdown
                        >
                          <option value="">{t("selectTenant")}</option>
                          {tenants.map((tenant) => (
                            <option key={tenant.tenantID} value={tenant.tenantID}>
                              {tenant.name}
                            </option>
                          ))}
                        </select>
                      </Col>
                    )} */}

                    <Col>
                    <Label>{t('Permissions')}:</Label>
                    <Table>
                        <thead></thead>
                        <tbody>
                          {Object?.entries(groupedPermissions)?.map(
                            ([groupName, groupPermissions]) => (
                              <tr key={groupName} className="role-table-tr">
                                <td style={{ padding: "20px" }}>
                                  <FormGroup check inline>
                                    <Label check>
                                      {groupName} {/* Disabling group checkbox */}
                                    </Label>
                                  </FormGroup>
                                  {/* <div>
                                    <a href="#">
                                      Show {groupPermissions.length} sub-categories
                                    </a>
                                  </div> */}
                                </td>
                                <td className="role-table" style={{display: "flex", flexWrap: "wrap"}}>
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
                                        {permission.permissionDisplayName}
                                      </Label>
                                      <div
                                        className={`form-check form-switch form-switch-md mb-3 ${getSwitchColor(
                                          permission.permissionDisplayName,
                                          selectedPermissions.includes(permission.permissionID)
                                        )}`}
                                        dir="ltr"
                                      >
                                        <Input
                                        style={{marginLeft: "20px"}}
                                          type="checkbox"
                                          className={`form-check-input ${getSwitchColor(
                                            permission.permissionDisplayName,
                                            selectedPermissions.includes(permission.permissionID)
                                          )}`}
                                          id={`permission-${permission.permissionID}`}
                                          checked={selectedPermissions.includes(permission.permissionID)}
                                          disabled // Disabling the switches
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

         
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </form>
        </Modal>
      </Container>
    </div>
  );
};

export default ViewRoleModal;
