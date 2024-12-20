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
    GasType: "",
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
  
    if (!formValues.GasType.trim()) {
      newErrors.GasType = "Gas Type is required.";
    }
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
        GasType: formValues.GasType,
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
    { name: 'Carbon Dioxide (CO2)', name: 'co2' },
    { name: 'Methane (CH4)', name: 'ch4' },
    { name: 'Nitrous Oxide (N2O)', name: 'n2o' },
    { name: 'Sulfur Dioxide (SO2)', name: 'so2' },
    { name: 'Ammonia (NH3)', name: 'nh3' },
    { name: 'Ozone (O3)', name: 'o3' },
    { name: 'Nitrogen Dioxide (NO2)', name: 'no2' },
    { name: 'Carbon Monoxide (CO)', name: 'co' },
    { name: 'Hydrogen Sulfide (H2S)', name: 'h2s' },
    { name: 'Formaldehyde (CH2O)', name: 'ch2o' },
  ];

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Modal
          size="lg"
          title="Add Gas"
          isOpen={open}
          onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Row>
            <Col md={6}>
                  
                         <FormField label="Gas Type" isDropdown options={gasesOptions}  value={formValues.GasType}
                      onChange={handleChange("GasType")}
                      error={errors.GasType}/>
                    </Col>
                    <Col md={6}>
                    <FormField
                      label="Gas Name"
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

export default AddGasModal