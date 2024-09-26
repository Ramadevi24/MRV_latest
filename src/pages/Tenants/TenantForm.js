import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, Form, FormGroup, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { TenantContext } from '../../contexts/TenantContext';
import { useFormik } from "formik";
import * as Yup from "yup";

const TenantForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addTenant } = React.useContext(TenantContext);

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
      const createPayload = {
        ...values,
        countryID: 1,
        regionID: 1,
      };
      try {
        await addTenant(createPayload);
        toast.success(t('Tenant created successfully'), { autoClose: 3000 });
        navigate('/tenants');
      } catch (error) {
        toast.error(t('Error creating tenant'), { autoClose: 3000 });
      }
    },
  });
 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!name || !description) {
  //   console.log(t('Please fill all fields'));
  //     return;
  //   }
  
  //   const createPayload = {
  //     name,
  //     description,
  //     countryID: 1,
  //     regionID: 1,
  //   };
  
  //   try {
  //     await addTenant(createPayload);
  //     toast.success(t('Tenant created successfully'), { autoClose: 3000 });
  //     navigate('/tenants');
  //   } catch (error) {
  //     toast.error(t('Error creating tenant'), { autoClose: 3000 });
  //   }
  // };
  

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
  
      <Form onSubmit={formik.handleSubmit} style={{marginTop:'3.5rem'}}>
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
          <div className="d-flex mt-3">
                <Button type="submit" color="success" className="rounded-pill me-2">
                  {t('Submit')}
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="rounded-pill"
                  onClick={() => history.back()}
                >
                  {t('Cancel')}
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

export default TenantForm;
