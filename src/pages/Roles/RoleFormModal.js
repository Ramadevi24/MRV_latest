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

const RoleFormModal = ({open, onClose}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllPermissions, permissions } = useContext(PermissionContext);
  const { addRole } = useContext(RoleContext);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);
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
      try {
        const roleData = {
          roleName: values.roleName,
          description: values.description,
          permissionIds: selectedPermissions,
          tenantID: userPermissions.tenantID || null,
        };

        await addRole(roleData);
        toast.success("Role created successfully");
        // setModalOpen(false);
        // navigate("/roles");
        onClose()
      } catch (error) {
        toast.error("Failed to save role");
      }
    },
  });

  const handlePermissionChange = (permissionID) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permissionID)
        ? prevPermissions.filter((id) => id !== permissionID)
        : [...prevPermissions, permissionID]
    );
  };

  // useEffect(() => {
  //   fetchAllTenants();
  //   fetchAllPermissions();
  // }, []);

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
  }


//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

  return (
    <div className="page-content">
      <Container fluid>
        {/* <Button color="primary" onClick={openModal} className="mb-3">
          {t("Add Role")}
        </Button> */}

        <Modal
          isOpen={open}
          onClose={onClose}
          title={t("Add Role")}
          size="lg"
        >
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={12}>
                <FormGroup className="mb-3">
                  <Label htmlFor="roleName">{t("Role Name")}</Label>
                  <Input
                    name="roleName"
                    placeholder={t("Enter Role Name")}
                    type="text"
                    className="form-control"
                    id="roleName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roleName}
                    invalid={formik.touched.roleName && formik.errors.roleName}
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
                  <Label htmlFor="description">{t("Role Description")}</Label>
                  <Input
                    name="description"
                    placeholder={t("Enter Role Description")}
                    type="text"
                    className="form-control"
                    id="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    invalid={formik.touched.description && formik.errors.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormFeedback type="invalid">
                      {formik.errors.description}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col>
                <Label>{t("Permissions")}:</Label>
                <Table>
                  <tbody>
                    {Object.entries(groupedPermissions || {}).map(
                      ([groupName, groupPermissions]) => (
                        <tr key={groupName} className="role-table-tr">
                          <td style={{ padding: "20px" }}>
                            <FormGroup check inline>
                              <Label check>{groupName}</Label>
                            </FormGroup>
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
                                        style={{marginLeft: "20px"}}
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
            </Row>

            <div className="d-flex justify-content-end mt-3" style={{marginRight: "4rem"}}>
              <Button type="submit" color="success" className="me-2 add-btn">
                {t("Submit")}
              </Button>
              <Button type="button" color="danger" onClick={onClose}>
                {t("Cancel")}
              </Button>
            </div>
          </form>
        </Modal>
      </Container>
    </div>
  );
};

export default RoleFormModal;
