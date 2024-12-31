import React,{useState, useContext} from 'react'
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import {GasContext} from "../../../contexts/GasContext"
import { useTranslation } from "react-i18next";

const AddGasModal = ({ open, onClose }) => {
const { t } = useTranslation();
   const {addGas, fetchAllGases} = useContext(GasContext);

   const [formValues, setFormValues] = useState({
    gasGroupID: "",
    gasName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
      setFormValues({ ...formValues, [field]: event.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    }

  const validate = () => {
    const newErrors = {};
  
    if (!formValues.gasGroupID.trim()) {
      newErrors.gasGroupID = `${t("Gas Type is required.")}`;
    }
    if (!formValues.gasName.trim()) {
      newErrors.gasName = `${t("Gas Name is required.")}`;
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
      gasGroupID: formValues.gasGroupID,
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

  const gasesOptions = [
    { id: 1, name: 'Greenhouse Gases (GHGs)', name: 'Greenhouse Gases (GHGs)' },
    { id:2, name: 'Precursor Gases', name: 'Precursor Gases' }
  ];

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Modal
          size="lg"
          title={t("Add Gas")}
          isOpen={open}
          onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Row>
            <Col md={6}>
                  
                         <FormField label={t("Gas Type")} isDropdown options={gasesOptions}  value={formValues.gasGroupID}
                      onChange={handleChange("gasGroupID")}
                      error={errors.gasGroupID} valueKey="id" labelKey="name"/>
                    </Col>
                    <Col md={6}>
                    <FormField
                      label={t("Gas Name")}
                      placeholder="N20"
                      value={formValues.gasName}
                      onChange={handleChange("gasName")}
                      error={errors.gasName}
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
  )
}

export default AddGasModal