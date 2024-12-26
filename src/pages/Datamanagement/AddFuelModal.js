import React, { useState, useContext } from "react";
import Modal from "../../Components/CommonComponents/Modal";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Button,
  Container,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FuelContext } from "../../contexts/FuelContext";
import {
  fuelTypesData,
  isPrimaryFuelTypes,
  conversionFactorTypes,
} from "../../utils/FuelData";

const AddFuelModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { addFuel, fetchFuels } = useContext(FuelContext);
  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      fuelType: "",
      fuelName: "",
      isPrimaryFuel: "",
      netCalorificValue: "",
      carbonContentNCV: "",
    },
    validationSchema: Yup.object({
      fuelName: Yup.string().required(t("Please Enter a Fuel Name")),
      fuelType: Yup.string().required(t("Please select a fuel type")),
      isPrimaryFuel: Yup.string().required(t("Please select a primary fuel")),
      netCalorificValue: Yup.string().required( t("Please Enter a netCalorificValue")),
      carbonContentNCV: Yup.string().required(t("Please Enter a carbonContentNCV"))
    }),
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        isPrimaryFuel: values.isPrimaryFuel === "Yes",
      };
      try {
        await addFuel(updatedValues);
        toast.success(t("Fuel created successfully"), { autoClose: 3000 });
        await fetchFuels();
        onClose();
      } catch (error) {
        console.log("Error creating fuel", error);
        if (error.response && error.response.data) {
          // Extract errors from the response
          const backendErrors = error.response.data.errors;
          setErrors(backendErrors);
        } else {
          console.error('Unexpected Error:', error.message);
        }

      }
    },
  });

  return (
    <React.Fragment>
      <Container fluid>
        <Modal
          size="lg"
          title="Add Fuel Details"
          isOpen={open}
          onClose={onClose}
        >
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <Label htmlFor="fuelType">
                    {t("Fuel Type")} <span className="text-danger">*</span>
                  </Label>
                  <select
                    className={`form-select ${
                      formik.touched.fuelType && formik.errors.fuelType
                        ? "is-invalid"
                        : ""
                    }`}
                    id="fuelType"
                    name="fuelType"
                    value={formik.values.fuelType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">{t("Select Fuel Type")}</option>
                    {fuelTypesData.map((fuel) => (
                      <option key={fuel.name} value={fuel.name}>
                        {fuel.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.fuelType && formik.errors.fuelType && (
                    <FormFeedback className="d-block">
                      {formik.errors.fuelType}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <Label htmlFor="fuelName">
                    {t("Fuel Name")} <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="fuelName"
                    id="fuelName"
                    placeholder={t("Aviation Gasoline")}
                    value={formik.values.fuelName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.fuelName && formik.errors.fuelName}
                  />
                  {formik.touched.fuelName && formik.errors.fuelName && (
                    <FormFeedback>{formik.errors.fuelName}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <Label htmlFor="primaryFuel">
                    {t("Is Primary Fuel")}
                    <span className="text-danger">*</span>
                  </Label>
                  <select
                    className={`form-select  ${
                      formik.touched.isPrimaryFuel &&
                      formik.errors.isPrimaryFuel
                        ? "is-invalid"
                        : ""
                    }`}
                    id="isPrimaryFuel"
                    name="isPrimaryFuel"
                    value={formik.values.isPrimaryFuel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-label="Default select example"
                    invalid={
                      formik.touched.isPrimaryFuel &&
                      formik.errors.isPrimaryFuel
                        ? true
                        : false
                    }
                  >
                    <option value="">{t("Select Value")}</option>
                    {isPrimaryFuelTypes.map((fuel) => (
                      <option key={fuel.name} value={fuel.value}>
                        {fuel.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.isPrimaryFuel &&
                  formik.errors.isPrimaryFuel ? (
                    <FormFeedback className="d-block">
                      {formik.errors.isPrimaryFuel}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <Label htmlFor="netCalorific">
                    {t("Net Calorific Value (TJ/Gg)")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="netCalorificValue"
                    id="netCalorificValue"
                    className="form-control"
                    placeholder="12.6"
                    value={formik.values.netCalorificValue || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.netCalorificValue &&
                      formik.errors.netCalorificValue
                        ? true
                        : false
                    }
                  />
                  {formik.touched.netCalorificValue &&
                  formik.errors.netCalorificValue ? (
                    <FormFeedback>
                      {formik.errors.netCalorificValue}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label htmlFor="carbonNcv">
                    {t("Carbon Content (Kg C/GJ)")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="carbonContentNCV"
                    id="carbonContentNCV"
                    className="form-control"
                    placeholder="15.3"
                    value={formik.values.carbonContentNCV || ""}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    invalid={
                      formik.touched.carbonContentNCV &&
                      formik.errors.carbonContentNCV
                        ? true
                        : false
                    }
                  />
                  {formik.touched.carbonContentNCV &&
                  formik.errors.carbonContentNCV ? (
                    <FormFeedback>
                      {formik.errors.carbonContentNCV}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              {/* <Col>
                <FormGroup className="mb-3">
                  <Label>
                    {t("Gross Calorific Value")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="grossCalorificValue"
                    id="grossCalorificValue"
                    className="form-control"
                    placeholder="Enter Gross Calorific Value"
                    value={formik.values.grossCalorificValue || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.grossCalorificValue &&
                      formik.errors.grossCalorificValue
                        ? true
                        : false
                    }
                  />
                  {formik.touched.grossCalorificValue &&
                  formik.errors.grossCalorificValue ? (
                    <FormFeedback>
                      {formik.errors.grossCalorificValue}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col> */}
            </Row>
            {/* <Row>
              <Col>
                <FormGroup className="mb-3">
                  <Label>
                    {t("Carbon Content GCV")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="carbonContentGCV"
                    id="carbonContentGCV"
                    className="form-control"
                    placeholder="Enter Carbon Content GCV"
                    value={formik.values.carbonContentGCV || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.carbonContentGCV &&
                      formik.errors.carbonContentGCV
                        ? true
                        : false
                    }
                  />
                  {formik.touched.carbonContentGCV &&
                  formik.errors.carbonContentGCV ? (
                    <FormFeedback>
                      {formik.errors.carbonContentGCV}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <Label>
                    {t("Conversion Factor Type")}
                    <span className="text-danger">*</span>
                  </Label>
                 
                  <select
                    className={`form-select  ${
                      formik.touched.conversionFactorType &&
                      formik.errors.conversionFactorType
                        ? "is-invalid"
                        : ""
                    }`}
                    id="conversionFactorType"
                    name="conversionFactorType"
                    value={formik.values.conversionFactorType || ""} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    aria-label="Default select example"
                    invalid={
                      formik.touched.conversionFactorType &&
                      formik.errors.conversionFactorType
                        ? true
                        : false
                    }
                  >
                    <option value="">
                      {t("Select Conversionfactor Type")}
                    </option>
                    {conversionFactorTypes.map((conversion) => (
                      <option key={conversion.name} value={conversion.value}>
                        {conversion.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.conversionFactorType &&
                  formik.errors.conversionFactorType ? (
                    <FormFeedback className="d-block">
                      {formik.errors.conversionFactorType}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row> */}
  {errors.ConversionFactorType && (
        <div style={{ color: 'red' }}>
          {errors.ConversionFactorType.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
            <div className="d-flex justify-content-end mt-3">
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
    </React.Fragment>
  );
};

export default AddFuelModal;
