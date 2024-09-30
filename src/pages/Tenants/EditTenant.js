import React, { useEffect, useContext, useState } from 'react';
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, FormGroup, FormFeedback, Form } from 'reactstrap';
import { TenantContext } from '../../contexts/TenantContext';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";

const EditTenant = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { editTenant, fetchTenantById } = useContext(TenantContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenant = await fetchTenantById(id);
        if (tenant) {
          formik.setValues({
            name: tenant.name || "",
            description: tenant.description || "",
          });
        }
      } catch (error) {
        console.error("Error loading tenant:", error);
      }
    };
    loadTenant();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("Please enter tenant name")),
    description: Yup.string()
      .required(t("Please enter description")),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatePayload = {
        ...values,
        countryID: 1,
        regionID: 1,
      };
      try {
        await editTenant(id, updatePayload);
        toast.success(t('Tenant Updated successfully'), { autoClose: 3000 });
        navigate('/tenants');
      } catch (error) {
        toast.error(t('Error creating tenant'), { autoClose: 3000 });
      }
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0" style={{ color: "#45CB85", fontSize: "20px", fontWeight: "bold" }}>
                  {t('Edit Tenant')}
                </h4>
              </CardHeader>

              <CardBody>
      <Form onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }} style={{marginTop:'3.5rem'}}>
      <Row>
        <Col>
        <FormGroup>
            <Label htmlFor="tenantName" className="form-label">{t('Tenant Name')}</Label>
            <Input type="text"  id="name" name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.name && formik.errors.name ? 'is-invalid' : ''
            }`}
            placeholder={t("Enter Tenant name")} />
            {formik.touched.name && formik.errors.name ? (
                          <FormFeedback>{formik.errors.name}</FormFeedback>
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
          <div className="d-flex justify-content-end  mt-3" style={{marginRight:'4rem'}}>
                <Button type="submit" color="success" className="rounded-pill me-2">
                  Submit
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="rounded-pill"
                  onClick={() => history.back()}
                >
                  Cancel
                </Button>
                </div>
        </Col>
      </Row>
      </Form>
      </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditTenant;
