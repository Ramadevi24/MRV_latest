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
import FormField from "../../../Components/CommonComponents/FormField";
import locationIcon from "../../../assets/images/Power Sector--- Data Entry/pin 1.png";
import {EntityContext} from "../../../contexts/EntityContext"

const EntityForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {createNewEntity} = useContext(EntityContext);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      contactDetails: {
      name: "",
      email: "",
      phoneNumber: "",
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("Please Enter Entity")),
      name: Yup.string().required(t("Please Enter Contact Name")),
      email: Yup.string().required(t("Please Enter Email")),
      phoneNumber: Yup.string().required(t("Please Enter phone Number")),
    }),
    onSubmit: async (values) => {
      const createFormData = {
        name: values.emirate,
        contactDetails: {
          name:values.name,
          email:  values.email,
          phoneNumber: values.phoneNumber,
          }
      };
      try {
        await createNewEntity(createFormData);
        toast.success(t("Entity created successfully"), { autoClose: 3000 });
        navigate("/entity");
      } catch (error) {
        toast.error(t("Error creating entity"));
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
                    {t("Add Entity")}
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
                        <Col>
                          <FormField label="Entity" placeholder="DOE"  type="text"/>
                        </Col>
                        <Col>
                          <FormField
                            label="Location Coordinates"
                            placeholder="23.44, 56.37"
                            icon={locationIcon}
                             type="text"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6}>
                          <FormField
                            label="Street Address"
                            placeholder="Sultan Bin Zayed Street"
                            type="text"
                          />
                        </Col>
                      </Row>
                      <div>
                        <div className="facility-subheadings">
                          <h2 className="add_facility_subtitle">
                            Contact Details
                          </h2>
                        </div>
                        <Row>
                          <Col md={6}>
                            <FormField label="Name" placeholder="Enter Name" />
                          </Col>
                          <Col md={6}>
                            <FormField
                              label="Email"
                              placeholder="Enter Email"
                              type="email"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <FormField
                              label="Phone Number"
                              placeholder="Enter Phone number"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </div>

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

export default EntityForm;
