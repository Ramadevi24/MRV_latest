import React,{useState, useContext} from 'react'
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {GasContext} from "../../../contexts/GasContext"

const AddGasModal = ({ open, onClose }) => {
 const navigate = useNavigate();
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
        GasType: values.GasType,
        gasName: values.gasName,
      };
         try {
           await addGas(createFormData);
          toast.success(t("Gas created successfully"), { autoClose: 3000 });
           fetchAllGases();
           navigate("/gases")
         } catch (error) {
            toast.error(t("Error creating Gas"));
         }
       
  };

  const gasesOptions = [
    { label: 'Carbon Dioxide (CO2)', value: 'co2' },
    { label: 'Methane (CH4)', value: 'ch4' },
    { label: 'Nitrous Oxide (N2O)', value: 'n2o' },
    { label: 'Sulfur Dioxide (SO2)', value: 'so2' },
    { label: 'Ammonia (NH3)', value: 'nh3' },
    { label: 'Ozone (O3)', value: 'o3' },
    { label: 'Nitrogen Dioxide (NO2)', value: 'no2' },
    { label: 'Carbon Monoxide (CO)', value: 'co' },
    { label: 'Hydrogen Sulfide (H2S)', value: 'h2s' },
    { label: 'Formaldehyde (CH2O)', value: 'ch2o' },
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
                  
                         <FormField label="Gas Type" isDropdown options={gasesOptions} />
                    </Col>
                    <Col md={6}>
                    <FormField
                      label="Gas Name"
                      placeholder="N20"
                      value={formValues.gasName}
                      onChange={handleChange("gasName")}
                      error={errors.gasName}
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