import React, { useEffect, useContext, useState } from 'react';
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader } from 'reactstrap';
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
  const [tenantName, setTenantName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenant = await fetchTenantById(id);
        console.log('Fetched tenant:', tenant); // Check the tenant data
        if (tenant) {
          setTenantName(tenant.name || '');
          setDescription(tenant.description || '');
        }
      } catch (error) {
        console.error("Error loading tenant:", error);
      }
    };
    loadTenant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTenant = { name: tenantName, description, countryID: 1, regionID: 1 };

    try {
      await editTenant(id, updatedTenant);
      toast.success(t("Tenant Updated Successfully"), { autoClose: 3000 });
      navigate('/tenants');
    } catch (error) {
      toast.error(t('Error updating tenant'), { autoClose: 3000 });
    }
  };

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
                <form onSubmit={handleSubmit}  style={{marginTop:'3.5rem'}}>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <div className="mb-3">
                        <Label htmlFor="tenantName" className="form-label">{t('Tenant Name')}</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="tenantName"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          placeholder={t('Enter Tenant name')}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="description" className="form-label">{t('Description')}</Label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder={t('Enter description')}
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Button type="submit" color="success" className="rounded-pill me-2">
                          {t('Submit')}
                        </Button>
                        <Button type="button" color="danger" className="rounded-pill" onClick={() => navigate(-1)}>
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

export default EditTenant;
