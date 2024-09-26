import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { TenantContext } from '../../contexts/TenantContext';

const TenantForm = () => {
  const { t } = useTranslation();
  const [name, setTenantName] = useState('');
  const [description, setDescription] = useState('');
  const { addTenant } = React.useContext(TenantContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description) {
    console.log(t('Please fill all fields'));
      return;
    }
  
    const createPayload = {
      name,
      description,
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
  };
  

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
      <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className="mb-3">
            <Label htmlFor="tenantName" className="form-label">{t('Tenant Name')}</Label>
            <Input type="text" className="form-control" id="tenantName" 
            value={name}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder={t("Enter Tenant name")} />
          </div>
       
          
         
          <div className="mb-3">
            <Label htmlFor="description" className="form-label">{t('Description')}</Label>
            <textarea className="form-control" id="description" rows="3" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("Enter your message")}></textarea>
          </div>
          <div className="d-flex justify-content-end">
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
