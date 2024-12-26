import React, { useState, useContext } from "react";
import Modal from "../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Co2EquivalentContext } from "../../contexts/Co2EquivalentContext";

const AddCo2Modal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const {createNewEquivalentType, fetchAllEquivalentsTypes} = useContext(Co2EquivalentContext);
  const [formValues, setFormValues] = useState({
    gasTypeName: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.gasTypeName.trim()) {
      newErrors.gasTypeName = "CO2 Equivalent Name is required.";
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
      gasTypeName: formValues.gasTypeName,
    };
    try {
      await createNewEquivalentType(createFormData);
      await fetchAllEquivalentsTypes();
      onClose();
    } catch (error) {
      toast.error(t("Error creating CO2Equivalent Type"));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal size="lg" title={t("Add Type")} isOpen={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormField
                    label={t("CO2 Equivalent Type Name")}
                    placeholder={t("Liquid")}
                    value={formValues.gasTypeName}
                    onChange={handleChange("gasTypeName")}
                    error={errors.gasTypeName}
                    type="text"
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="add-details-btn me-2 add-btn">
                  {" "}
                  {t("Add")}  
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

export default AddCo2Modal;
