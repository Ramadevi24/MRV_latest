import React,{useState, useContext} from 'react'
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {EntityContext} from "../../../contexts/EntityContext"
import { useTranslation } from "react-i18next";

const AddEntityModal = ({ open, onClose }) => {
 const navigate = useNavigate();
   const {createNewEntity, fetchAllEntity} = useContext(EntityContext);
   const { t } = useTranslation();
   const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
   const [formValues, setFormValues] = useState({
    entityName: "",
    contactDetails: {
    name: "",
    email: "",
    title: "",
    phoneNumber: "",
  }});

  const [errors, setErrors] = useState({});

  const handleChange = (field, isNested = false) => (event) => {
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
      newErrors.entityName = "Entity is required.";
    }
    if (!formValues.contactDetails.name.trim()) {
      newErrors.name = "Contact Name is required.";
    }
    if (!formValues.contactDetails.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formValues.contactDetails.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formValues.contactDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
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
             name:formValues.contactDetails.name,
             email:  formValues.contactDetails.email,
             title: formValues.contactDetails.title,
             phoneNumber: formValues.contactDetails.phoneNumber,
             },
             tenantID: userPermissions.tenantID || "", 
         };
         try {
           await createNewEntity(createFormData);
           await fetchAllEntity();
           onClose();
           toast.success(t("Entity created successfully"), { autoClose: 3000 });
         } catch (error) {
           toast.error(t("Error creating entity"));
         }
       
  };

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Modal
          size="lg"
          title="Add Entity"
          isOpen={open}
          onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Row>
            <Col md={12}>
                    <FormField
                      label="Entity"
                      placeholder="DOE"
                      value={formValues.entityName}
                      onChange={handleChange("entityName")}
                      error={errors.entityName}
                      type="text"
                    />
                    </Col>
                    </Row>
                    <div className="category-sub-modal" style={{marginTop:'10px'}}>
                   <Row>
                            <Col md={6}>
                            <h4 className="modal-subhead">Contact Details</h4>
                            </Col>
                        </Row>
                        <Row>
  <Col md={6}>
    <FormField
      label="Name"
      placeholder="Abdul"
      value={formValues.contactDetails.name}
      onChange={handleChange("name", true)} // Pass true for nested fields
      error={errors.contactName}
      type="text"
    />
  </Col>
  <Col md={6}>
    <FormField
      label="Title"
      placeholder="Plant Operator"
      value={formValues.contactDetails.title}
      onChange={handleChange("title", true)}
      error={errors.title}
      type="text"
    />
  </Col>
  <Col md={6}>
    <FormField
      label="Email"
      placeholder="abdul@gmail.com"
      value={formValues.contactDetails.email}
      onChange={handleChange("email", true)}
      error={errors.email}
      type="email"
    />
  </Col>
  <Col md={6}>
    <FormField
      label="Phone Number"
      placeholder="+971 123456789"
      value={formValues.contactDetails.phoneNumber}
      onChange={handleChange("phoneNumber", true)}
      error={errors.phoneNumber}
      type="number"
    />
  </Col>
</Row>
                </div>
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

export default AddEntityModal