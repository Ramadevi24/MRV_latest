import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Button,
  CardBody,
  Container,
  Card,
  CardHeader,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {GasContext} from "../../../contexts/GasContext"

const GasForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {addGas} = useContext(GasContext);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
        GasType: "",
        gasName: "",
    },
    validationSchema: Yup.object({
        GasType: Yup.string().required(t("Please Enter Gas Type")),
        gasName: Yup.string().required(t("Please Enter Gas Name")),
    }),
    onSubmit: async (values) => {
      const createFormData = {
        GasType: values.GasType,
        gasName: values.gasName,
      };
      try {
        await addGas(createFormData);
        toast.success(t("Gas created successfully"), { autoClose: 3000 });
        navigate("/gases");
      } catch (error) {
        toast.error(t("Error creating Gas"));
      }
    },
  });

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
                    {t("Add Gas")}
                  </h4>
                </CardHeader>

                <CardBody>
                  <div className="live-preview" style={{ marginTop: "3.5rem" }}>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <Row>
                        <Col lg={6}>
                          <Label htmlFor="GasType">
                            {t("Gas Type")}
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            className={`form-select  ${
                              validation.touched.GasType &&
                              validation.errors.GasType
                                ? "is-invalid"
                                : ""
                            }`} // Add red border class if error
                            id="GasType"
                            name="GasType"
                            value={validation.values.GasType} // Formik-controlled value
                            onChange={validation.handleChange} // Formik change handler
                            onBlur={validation.handleBlur} // Formik blur handler
                            aria-label="Default select example"
                            invalid={
                              validation.touched.GasType &&
                              validation.errors.GasType
                                ? true
                                : false
                            } // Validation state
                          >
                            <option value="">{t("Select Gas Type")}</option>
                            {gasesOptions.map((gas) => (
                                                  <option key={gas.label} value={gas.label}>
                                                    {gas.label}
                                                  </option>
                                                ))}
                          </select>
                          {validation.touched.GasType &&
                          validation.errors.GasType ? (
                            <FormFeedback className="d-block">
                              {validation.errors.GasType}
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="gasname">{t("Gas Name")}</Label>
                            <Input
                              name="gasName"
                              placeholder={t("Enter Country")}
                              type="text"
                              className="form-control"
                              id="gasName"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.gasName || ""}
                              invalid={
                                validation.touched.gasName &&
                                validation.errors.gasName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.gasName &&
                            validation.errors.gasName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.gasName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <div
                        className="d-flex justify-content-end  mt-3"
                        style={{ marginRight: "4rem" }}
                      >
                        <Button type="submit" color="success" className=" me-2">
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

export default GasForm;
