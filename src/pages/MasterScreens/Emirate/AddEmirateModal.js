import React,{useState, useContext} from 'react'
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {EmiratesContext} from "../../../contexts/EmiratesContext"

const AddEmirateModal = ({ open, onClose }) => {
 const navigate = useNavigate();
   const {createEmirate, fetchAllEmirates} = useContext(EmiratesContext);

   const [formValues, setFormValues] = useState({
    name: "",
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
    if (!formValues.name.trim()) {
      newErrors.name = "Emirate is required.";
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
      name: formValues.name,
      createdBy:"Admin"
    };

    try {
      await createEmirate(createFormData);
      await fetchAllEmirates();
      onClose();
      toast.success("Emirate created successfully", { autoClose: 3000 });
      navigate("/emirate");
    } catch (error) {
      toast.error("Error creating emirate");
    }
  };

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Modal
          size="lg"
          title="Add Emirate"
          isOpen={open}
          onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Row>
            <Col md={12}>
                    <FormField
                      label="Emirate"
                      placeholder="Abu Dhabi"
                      value={formValues.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      type="text"
                    />
                    </Col>
                    </Row>
                    <div
                className="d-flex justify-content-end mt-3"
               
              >
                <button
                  type="submit"
                  className="add-details-btn  me-2"
                >
                  {" "}
                  Add Details
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
  )
}

export default AddEmirateModal