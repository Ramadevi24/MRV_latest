import React, { useState, useContext } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EntityContext } from "../../../contexts/EntityContext";
import { TenantContext } from "../../../contexts/TenantContext";
import { useTranslation } from "react-i18next";
import "../../../assets/scss/CSS/styles.css";

const AddEntityModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { createNewEntity, fetchAllEntity } = useContext(EntityContext);
  const { tenants } = useContext(TenantContext);
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    entityName: "",
    tenantID: "",
    address: "",
    description: "",
    contactDetails: {
      name: "",
      email: "",
      title: "",
      phoneNumber: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange =
    (field, isNested = false) =>
    (event) => {
      if (isNested) {
        setFormValues({
          ...formValues,
          contactDetails: {
            ...formValues.contactDetails,
            [field]: event.target.value,
          },
        });
        if (errors[field]) {
          setErrors({ ...errors, [field]: "" });
        }
      } else {
        setFormValues({ ...formValues, [field]: event.target.value });
        if (errors[field]) {
          setErrors({ ...errors, [field]: "" });
        }
      }
    };
  const validate = () => {
    const newErrors = {};

    if (!formValues.entityName.trim()) {
      newErrors.entityName = `${t("Entity is required.")}`;
    }
    if (!formValues.tenantID.trim()) {
      newErrors.tenantID = `${t("Please select a tenant.")}`;
    }
    if (!formValues.description.trim()) {
      newErrors.description = `${t("Please add a description.")}`;
    }
    if (!formValues.address.trim()) {
      newErrors.address = `${t("Address is required.")}`;
    }
    if (!formValues.contactDetails.name.trim()) {
      newErrors.name = `${t("Contact Name is required.")}`;
    }
    if (!formValues.contactDetails.email.trim()) {
      newErrors.email = `${t("Email is required.")}`;
    }
    if (!formValues.contactDetails.title.trim()) {
      newErrors.title = `${t("Title is required.")}`;
    }
    if (!formValues.contactDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = `${t("Phone Number is required.")}`;
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const createFormData = {
      entityName: formValues.entityName,
      contactDetails: {
        name: formValues.contactDetails.name,
        email: formValues.contactDetails.email,
        title: formValues.contactDetails.title,
        phoneNumber: formValues.contactDetails.phoneNumber,
      },
      tenantID: formValues.tenantID,
      address: formValues.address,
      description: formValues.description,
    };
    try {
      const response = await createNewEntity(createFormData);
      console.log(response, "responded");
      if (response) {
        onClose();
        toast.success(t("Entity created successfully"), { autoClose: 3000 });
        await fetchAllEntity();
      }
    } catch (error) {
      console.log(t("Error creating entity"));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title={t("Add Entity")}
            isOpen={open}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormField
                    label={t("Entity")}
                    placeholder="DOE"
                    value={formValues.entityName}
                    onChange={handleChange("entityName")}
                    error={errors.entityName}
                    type="text"
                  />
                </Col>

                <Col md={6}>
                  <FormField
                    label={t("Tenants")}
                    options={tenants}
                    isDropdown
                    placeholder={t("Select Tenant")}
                    value={formValues.tenantID}
                    onChange={handleChange("tenantID")}
                    error={errors.tenantID}
                    valueKey="tenantID"
                    labelKey="name"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormField
                    label={t("Address")}
                    placeholder="Hyderabad"
                    value={formValues.address}
                    onChange={handleChange("address")}
                    error={errors.address}
                    type="text"
                  />
                </Col>
              </Row>
              <div className="category-sub-modal" style={{ marginTop: "10px" }}>
                <Row>
                  <Col md={6}>
                    <h4 className="modal-subhead">{t("Contact Details")}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField
                      label={t("Name")}
                      placeholder="Abdul"
                      value={formValues.contactDetails.name}
                      onChange={handleChange("name", true)} // Pass true for nested fields
                      error={errors.contactName}
                      type="text"
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label={t("Title")}
                      placeholder={t("Plant Operator")}
                      value={formValues.contactDetails.title}
                      onChange={handleChange("title", true)}
                      error={errors.title}
                      type="text"
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label={t("Email")}
                      placeholder="abdul@gmail.com"
                      value={formValues.contactDetails.email}
                      onChange={handleChange("email", true)}
                      error={errors.email}
                      type="email"
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label={t("Phone Number")}
                      placeholder={t("+971 123456789")}
                      value={formValues.contactDetails.phoneNumber}
                      onChange={handleChange("phoneNumber", true)}
                      error={errors.phoneNumber}
                      type="number"
                    />
                  </Col>
                </Row>
              </div>
              <Row>
                <Col md={12} style={{ marginTop: "10px" }}>
                  <FormField
                    label={t("Description")}
                    placeholder={t("Write here...")}
                    value={formValues.description}
                    onChange={handleChange("description")}
                    error={errors.description}
                    type="textarea"
                    rows="3"
                  />
                </Col>
              </Row>
              <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button type="submit" className="add-details-btn  me-2">
                  {" "}
                  {t("Add Details")}
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn "
                  onClick={onClose}
                >
                  {t("Cancel")}
                </button>
              </div>
            </form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddEntityModal;
