import React from 'react'
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';
const EditRole = () => {
  const {t}=useTranslation();
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
   {t('Edit Role')}
              </h4>
            </CardHeader>

            <CardBody>
      
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className="mb-3">
            <Label htmlFor="tenantName" className="form-label">{t('Role Name')}</Label>
            <Input type="text" className="form-control" id="tenantName" placeholder={t("Enter Role name")} />
          </div>
       
          
         
          <div className="mb-3">
            <Label htmlFor="description" className="form-label">{t('Description')}</Label>
            <textarea className="form-control" id="description" rows="3" placeholder={t("Enter your message")}></textarea>
          </div>
          <div className="d-flex justify-content-end">
                <Button type="submit" color="success" className="rounded-pill me-2">
                {t('Update')}
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
      </CardBody>
      </Card>
      </Col>
      </Row>
    </Container>
    </div>
  );
};



export default EditRole