import React, { useContext, useState } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import ToggleSwitch from "../../../Components/CommonComponents/ToggleSwitch";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";
import Button from "../../../Components/CommonComponents/Button";
import addIcon from "../../../assets/images/Power Sector--- Data Entry/Plus.png";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SubPlantContext } from "../../../contexts/SubPlantContext";
import { toast } from "react-toastify";
import { FuelContext } from "../../../contexts/FuelContext";

const SubPlantModal = ({ open, onClose }) => {
  const { addSubPlant, fetchAllSubPlants} = useContext(SubPlantContext);
  const {fuels} = useContext(FuelContext)
  const { power } = useParams();
  const [isContact, setIsContact] = useState(true);
  const { t } = useTranslation();

  const [formValues, setFormValues] = useState({
    subPlantName: "",
    configuration: "",
    technology: "",
    controlTechnology: "",
    combustionTechnology: "",
    qualityOfMaintenance: "",
    ageOfEquipment: 0,
    fuelTypeId: "",
    contactDetailsSameAsFacility: isContact,
    contactDetails: {
      name: "",
      title: "",
      email: "",
      phoneNumber: 0,
    },
  });
  const [errors, setErrors] = useState({});
  const facilityStoredData = JSON.parse(localStorage.getItem("facilityData"));

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

    if (!formValues.subPlantName.trim()) {
      newErrors.subPlantName = `${t("Sub-Plant is required.")}`;
    }
    if (!formValues.configuration.trim()) {
      newErrors.configuration = `${t("Please enter configuration.")}`;
    }
    if (!formValues.technology.trim()) {
      newErrors.technology = `${t("Please add a Technology.")}`;
    }
    if (!formValues.controlTechnology.trim()) {
      newErrors.controlTechnology = `${t("Please enter control technology.")}`;
    }
    if (!formValues.combustionTechnology.trim()) {
      newErrors.combustionTechnology = `${t(
        "Please enter combustion technology."
      )}`;
    }
    if (!formValues.qualityOfMaintenance.trim()) {
      newErrors.qualityOfMaintenance = `${t(
        "quality of maintenance is required."
      )}`;
    }
    if (!formValues.ageOfEquipment || formValues.ageOfEquipment <= 0) {
      newErrors.ageOfEquipment = `${t(
        "Age of Equipment must be greater than 0."
      )}`;
    }
    if (!formValues.fuelTypeId.trim()) {
      newErrors.fuelTypeId = `${t("Please Select Fuel type.")}`;
    }
      if (!isContact) {
        if (!formValues.contactDetails.name.trim()) {
          newErrors.name = `${t("Contact Name is required.")}`;
        }
        if (!formValues.contactDetails.email.trim()) {
          newErrors.email = `${t("Email is required.")}`;
        }
        if (!formValues.contactDetails.title.trim()) {
          newErrors.title = `${t("Title is required.")}`;
        }
        if (
          !formValues.contactDetails.phoneNumber ||
          formValues.contactDetails.phoneNumber <= 0
        ) {
          newErrors.phoneNumber = `${t("Phone Number is required.")}`;
        }
      
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
      ...formValues,
      facilityID: facilityStoredData?.facilityID,
      isSubmitted: false,
      contactDetails: isContact ? null : formValues.contactDetails,
    };
    try {
      const response = await addSubPlant(createFormData);
      if (response) {
        localStorage.setItem("subPlantData", JSON.stringify(response));
        onClose();
        toast.success(t("Sub-Plant Created Successfully."), {
          autoClose: 3000,
        });
        await fetchAllSubPlants();
      }
    } catch (error) {
      console.log(t("Error Creating Sub-Plant"));
    }
  };

  const handleContact = () => {
    setIsContact(!isContact);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title="Sub Plant Details"
            isOpen={open}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormField
                    label={t("Sub Plant Name")}
                    placeholder="GT/HRSG 41"
                    value={formValues.subPlantName}
                    onChange={handleChange("subPlantName")}
                    error={errors.subPlantName}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label={t("Configuration")}
                    placeholder="Combined Cycle"
                    value={formValues.configuration}
                    onChange={handleChange("configuration")}
                    error={errors.configuration}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label="Technology"
                    placeholder="Stream Turbine"
                    value={formValues.technology}
                    onChange={handleChange("technology")}
                    error={errors.technology}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label="Control Technology"
                    placeholder="Dry Low NOX"
                    value={formValues.controlTechnology}
                    onChange={handleChange("controlTechnology")}
                    error={errors.controlTechnology}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label="Combustion Technology"
                    placeholder="NGCC"
                    value={formValues.combustionTechnology}
                    onChange={handleChange("combustionTechnology")}
                    error={errors.combustionTechnology}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label="Quality of Maintainence"
                    placeholder="Reliability-Centre"
                    value={formValues.qualityOfMaintenance}
                    onChange={handleChange("qualityOfMaintenance")}
                    error={errors.qualityOfMaintenance}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label="Age of equipment (Years)"
                    placeholder="4"
                    value={formValues.ageOfEquipment}
                    onChange={handleChange("ageOfEquipment")}
                    error={errors.ageOfEquipment}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    label={t("Fuel Type")}
                    isDropdown
                    options={fuels}
                    value={formValues.fuelTypeId}
                    onChange={handleChange("fuelTypeId")}
                    error={errors.fuelTypeId}
                    valueKey="fuelID"
                    labelKey="fuelName"
                  />
                </Col>
                {power === ":construction" && (
                  <Col md={6}>
                    <FormField
                      label="Technology"
                      placeholder="Secondary Aluminium"
                    />
                  </Col>
                )}
              </Row>
              {power === ":construction" && (
                <>
                  <Row>
                    <Col md={6}>
                      <FormField
                        label="Configuration"
                        placeholder="Normal Firing"
                      />
                    </Col>
                    <Col md={6}>
                      <FormField
                        label="Fuel Type"
                        isDropdown
                        options={fuels}
                        labelKey="subPlantName"
                        valueKey="subPlantID"
                        value={formValues.fuelTypeId}
                        onChange={handleChange("fuelTypeId")}
                        error={errors.fuelTypeId}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormField label="Raw Materials" placeholder="Bauxite" />
                    </Col>
                  </Row>

                  <div
                    className="category-sub-modal"
                    style={{ marginTop: "10px" }}
                  >
                    <Row>
                      <Col md={6}>
                        <h4 className="modal-subhead">Product Details</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormField
                          label="Product Type"
                          placeholder="Aluminium"
                        />
                      </Col>
                      <Col md={4}>
                        <FormField
                          label="Product Rate (Daily)"
                          placeholder="24"
                        />
                      </Col>
                      <Col md={4}>
                        <Button
                          label="Add"
                          width="12.5"
                          height="12.5"
                          icon={addIcon}
                          onClick={() => {}}
                          className="category-button"
                        ></Button>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
              {/* <Col md={12} className="mt-3">
                <ToggleSwitch
                  label="Location Coordinates is same as facility "
                  toggleDivClassName="toggle-switch-modal"
                  toggleLabelClassName="toggle-label-modal"
                  onToggle={handleLocation}
                  isCheckedData={true}
                />
                {!isLocation && (<Row className="mt-2">
                  <Col md={6}>
                    <FormField
                      label="Location Coordinates"
                      placeholder="23.44, 56.37"
                      icon={locationIcon}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Street Address"
                      placeholder="Sultan Bin Zayed Street"
                    />
                  </Col>
                </Row>)}
              </Col> */}
              <Col md={12} className="mt-3">
                <ToggleSwitch
                  label="Contact Details is same as facility"
                  toggleDivClassName="toggle-switch-modal"
                  toggleLabelClassName="toggle-label-modal"
                  onToggle={handleContact}
                  isCheckedData={true}
                />
                {!isContact && (
                  <div
                    className="category-sub-modal"
                    style={{ marginTop: "10px" }}
                  >
                    <Row>
                      <Col md={6}>
                        <h4 className="modal-subhead">Contact Details</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormField
                          label={t("Name")}
                          placeholder="Abdul"
                          value={formValues.contactDetails.name}
                          onChange={handleChange("name", true)}
                          error={errors.name}
                        />
                      </Col>
                      <Col md={6}>
                        <FormField
                          label={t("Title")}
                          placeholder={t("Plant Operator")}
                          value={formValues.contactDetails.title}
                          onChange={handleChange("title", true)}
                          error={errors.title}
                        />
                      </Col>
                      <Col md={6}>
                        <FormField
                          label={t("Email")}
                          placeholder="abdul@gmail.com"
                          value={formValues.contactDetails.email}
                          onChange={handleChange("email", true)}
                          error={errors.email}
                        />
                      </Col>
                      <Col md={6}>
                        <FormField
                          label={t("Phone Number")}
                          placeholder="+971 123456789"
                          value={formValues.contactDetails.phoneNumber}
                          onChange={handleChange("phoneNumber", true)}
                          error={errors.phoneNumber}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button type="submit" className="add-details-btn  me-2">
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
  );
};

export default SubPlantModal;
