import React, { useContext } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Button,
  CardBody,
  Container,
  Card,
  CardHeader,
  Form,
  FormFeedback
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FuelContext } from "../../contexts/FuelContext";
import { fuelTypesData, isPrimaryFuelTypes, conversionFactorTypes } from "../../utils/FuelData";

const AddFuel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addFuel, fetchFuels } = useContext(FuelContext);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fuelType: "",
      fuelName: "",
      isPrimaryFuel: "",
      netCalorificValue: "",
      carbonContentNCV: "",
      grossCalorificValue: "",
      carbonContentGCV: "",
      conversionFactorType: "",
    },
    validationSchema: Yup.object({
      fuelName: Yup.string().required(t("Please Enter a Fuel Name")),
      fuelType: Yup.string().required(t("Please select a fuel type")),
      isPrimaryFuel: Yup.string().required(t("Please select a primary fuel")),
      netCalorificValue: Yup.string().required(t("Please Enter a netCalorificValue")),
      carbonContentNCV: Yup.string().required(t("Please Enter a carbonContentNCV")),
      grossCalorificValue: Yup.string().required(t("Please enter a grossCalorificValue")),
      carbonContentGCV: Yup.string().required(t("Please enter a carbonContentGCV")),
      conversionFactorType: Yup.string().required(t("Please select a conversionFactorType")),
    }),
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        isPrimaryFuel: values.isPrimaryFuel === "Yes" ? true : false,
      }
      try {
        await addFuel(updatedValues);;
        toast.success(t("Fuel created successfully"), { autoClose: 3000 });
        fetchFuels();
        navigate("/fuelmanager");
      } catch (error) {
        toast.error(t("Error creating fuel"));
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4
                    className="card-title mb-0"
                    style={{
                      color: "#45CB85",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Add Fuel")}
                  </h4>
                </CardHeader>

                <CardBody>
                  <div className="live-preview" style={{ marginTop: "3.5rem" }}>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                      }}
                    >
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="fuelType">{t("Fuel Type")}
                            <span className="text-danger">*</span>
                            </Label>
                              <select
                              className={`form-select  ${
                                formik.touched.fuelType &&
                                formik.errors.fuelType
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="fuelType"
                              name="fuelType"
                              value={formik.values.fuelType} 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              aria-label="Default select example"
                              invalid={
                                formik.touched.fuelType &&
                                formik.errors.fuelType
                                  ? true
                                  : false
                              } 
                            >
                              <option value="">{t("Select Fuel Type")}</option>
                              {fuelTypesData.map((fuel) => (
                                <option
                                  key={fuel.name}
                                  value={fuel.name}
                                >
                                  {fuel.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.fuelType &&
                            formik.errors.fuelType ? (
                              <FormFeedback className="d-block">
                                {formik.errors.fuelType}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="fuelName">{t("Fuel Name")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="fuelName"
                              className="form-control"
                              id="fuelName"
                              placeholder={t("Enter Fuel Name")}
                              value={formik.values.fuelName || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.fuelName &&
                                formik.errors.fuelName
                                  ? true
                                  : false
                              }
                            />
                               {formik.touched.fuelName &&
                            formik.errors.fuelName ? (
                              <FormFeedback type="invalid">
                                {formik.errors.fuelName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="primaryFuel">{t("Is Primary Fuel")}
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
                                <option
                                  key={fuel.name}
                                  value={fuel.value}
                                >
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
                            <Label htmlFor="netCalorific">{t("Net Calorific Value")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              name="netCalorificValue"
                              id="netCalorificValue"
                              className="form-control"
                              placeholder="Enter Calorific Value"
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
                            {formik.touched.netCalorificValue && formik.errors.netCalorificValue ? (
                              <FormFeedback>
                              {formik.errors.netCalorificValue}
                            </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="carbonNcv">{t("Carbon Content NCV")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              name="carbonContentNCV"
                              id = "carbonContentNCV"
                              className="form-control"
                              placeholder="Enter Carbon Content NCV"
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
                            {formik.touched.carbonContentNCV && formik.errors.carbonContentNCV ? (
                             <FormFeedback>
                             {formik.errors.carbonContentNCV}
                           </FormFeedback>
                         ) : null}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label>{t("Gross Calorific Value")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              name="grossCalorificValue"
                              id = "grossCalorificValue"
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
                            {formik.touched.grossCalorificValue && formik.errors.grossCalorificValue ?(
                             <FormFeedback>
                             {formik.errors.grossCalorificValue}
                           </FormFeedback>
                         ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label>{t("Carbon Content GCV")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              name="carbonContentGCV"
                              id= "carbonContentGCV"
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
                            {formik.touched.carbonContentGCV && formik.errors.carbonContentGCV ? (
                          <FormFeedback>
                          {formik.errors.carbonContentGCV}
                        </FormFeedback>
                      ) : null}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label>{t("Conversion Factor Type")}
                            <span className="text-danger">*</span>
                            </Label>
                            {/* <div className="d-flex">
                              <Input
                                type="radio"
                                name="conversionFactorType"
                                value="NCV"
                                checked={
                                  formik.values.conversionFactorType === "NCV"
                                }
                                onChange={formik.handleChange}
                                style={{ marginRight: "40px" }}
                              />
                              <Label>{t("NCV")}</Label>

                              <Input
                                type="radio"
                                name="conversionFactorType"
                                value="GCV"
                                checked={
                                  formik.values.conversionFactorType === "GCV"
                                }
                                onChange={formik.handleChange}
                              />
                              <Label>{t("GCV")}</Label>
                            </div> */}
                            <select
                              className={`form-select  ${
                                formik.touched.conversionFactorType &&
                                formik.errors.conversionFactorType
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="conversionFactorType"
                              name="conversionFactorType"
                              value={formik.values.conversionFactorType || ""} // Formik-controlled value
                              onChange={formik.handleChange} // Formik change handler
                              onBlur={formik.handleBlur} // Formik blur handler
                              aria-label="Default select example"
                              invalid={
                                formik.touched.conversionFactorType &&
                                formik.errors.conversionFactorType
                                  ? true
                                  : false
                              }
                            >
                              <option value="">{t("Select Conversionfactor Type")}</option>
                              {conversionFactorTypes.map((conversion) => (
                                <option
                                  key={conversion.name}
                                  value={conversion.value}
                                >
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
                      </Row>
                      <div className="d-flex justify-content-end  mt-3" style={{marginRight:'4rem'}}>
                        <Button
                          type="submit"
                          color="success"
                          className=" me-2"
                        >
                          {t("Submit")}
                        </Button>
                        <Button
                          type="button"
                          color="danger"
                          className=""
                          onClick={() => history.back()}
                        >
                          {t("Cancel")}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddFuel;
