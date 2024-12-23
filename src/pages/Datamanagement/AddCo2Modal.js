import React, { useState, useContext } from "react";
import Modal from "../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddCo2Modal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    gasName: "",
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
    if (!formValues.gasName.trim()) {
      newErrors.gasName = "Gas Name is required.";
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
      gasName: formValues.gasName,
    };
    try {
      await addGas(createFormData);
      toast.success(t("Gas created successfully"), { autoClose: 3000 });
      await fetchAllGases();
      onClose();
    } catch (error) {
      toast.error(t("Error creating Gas"));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal size="lg" title="Add Type" isOpen={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormField
                    label="CO2 Equivalent Type Name"
                    placeholder="Liquid"
                    value={formValues.gasName}
                    onChange={handleChange("gasName")}
                    error={errors.gasName}
                    type="text"
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="add-details-btn  me-2">
                  {" "}
                  Add
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn "
                  onClick={() => history.back()}
                >
                  Cancel
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
