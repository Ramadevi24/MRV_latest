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
import {EmiratesContext} from "../../../contexts/EmiratesContext"

const EmirateForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
   const {createEmirate} = useContext(EmiratesContext);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
        name: "",
        country: "",
        description: "",
    },
    validationSchema: Yup.object({
      emirate: Yup.string().required(t("Please Enter Emirate")),
      country: Yup.string().required(t("Please Enter Country")),
      description: Yup.string().required(t("Please Enter Description")),
    }),
    onSubmit: async (values) => {
        const createFormData = {
            emirate: values.emirate,
            country: values.country,
            description: values.description,
        };
      try {
        await createEmirate(createFormData);
        toast.success(t("Emirate created successfully"), { autoClose: 3000 });
        navigate("/locations");
      } catch (error) {
        toast.error(t("Error creating user"));
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
                      color: "#0f6192",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Add Emirate")}
                  </h4>
                </CardHeader>

                <CardBody>

                  <div className="live-preview" style={{marginTop:'3.5rem'}}>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                    <Row>
                     <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="Emirate">{t("Emirate")}</Label>
                            <Input
                              name="emirate"
                              placeholder={t("Enter Emirate")}
                              type="text"
                              className="form-control"
                              id="emirate"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.emirate || ""}
                              invalid={
                                validation.touched.emirate &&
                                validation.errors.emirate
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.emirate &&
                            validation.errors.emirate ? (
                              <FormFeedback type="invalid">
                                {validation.errors.emirate}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="mb-3">
                            <Label htmlFor="country">{t("Country")}</Label>
                            <Input
                              name="country"
                              placeholder={t("Enter Country")}
                              type="text"
                              className="form-control"
                              id="country"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.country || ""}
                              invalid={
                                validation.touched.country &&
                                validation.errors.country
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.country &&
                            validation.errors.country ? (
                              <FormFeedback type="invalid">
                                {validation.errors.country}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

</Row>
                      
                      <Row>
                        <Col lg={12}>
                          <FormGroup>
                            <div className="mb-3">
                              <Label htmlFor="description">
                                {t("Description")}
                              </Label>
                              <Input
                                type="textarea"
                                className="form-control"
                                placeholder="Write here..."
                                id="description"
                                name="description"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                                invalid={
                                  validation.touched.description &&
                                  validation.errors.description
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.description &&
                              validation.errors.description ? (
                                <FormFeedback>
                                  {validation.errors.description}
                                </FormFeedback>
                              ) : null}
                            </div>
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

export default EmirateForm;
