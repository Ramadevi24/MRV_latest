import React from "react";
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, FormFeedback, FormGroup } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

const TenantForm = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    tenantName: Yup.string()
      .required(t("Please enter tenant name")),
    description: Yup.string()
      .required(t("Please enter description")),
  });

  const formik = useFormik({
    initialValues: {
      tenantName: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      // handle form submission here
    },
  });

  return (
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
                  {t('Add Tenant')}
                </h4>
              </CardHeader>

              <CardBody>
                <form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <FormGroup>
                        <Label htmlFor="tenantName" className="form-label">
                          {t('Tenant Name')}
                        </Label>
                        <Input
                          type="text"
                          id="tenantName"
                          name="tenantName"
                          className={`form-control ${
                            formik.touched.tenantName && formik.errors.tenantName ? 'is-invalid' : ''
                          }`}
                          placeholder={t("Enter Tenant name")}
                          value={formik.values.tenantName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.tenantName && formik.errors.tenantName ? (
                          <FormFeedback>{formik.errors.tenantName}</FormFeedback>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="description" className="form-label">
                          {t('Description')}
                        </Label>
                        <Input
                          type="textarea"
                          id="description"
                          name="description"
                          className={`form-control ${
                            formik.touched.description && formik.errors.description ? 'is-invalid' : ''
                          }`}
                          placeholder={t("Enter your message")}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          rows="3"
                        />
                        {formik.touched.description && formik.errors.description ? (
                          <FormFeedback>{formik.errors.description}</FormFeedback>
                        ) : null}
                      </FormGroup>

                      <div className="d-flex justify-content-end">
                        <Button type="submit" color="success" className="rounded-pill me-2">
                          {t('Submit')}
                        </Button>
                        <Button
                          type="button"
                          color="danger"
                          className="rounded-pill"
                          onClick={() => window.history.back()}
                        >
                          {t('Cancel')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TenantForm;
