import React from "react";
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader } from 'reactstrap';

const TenantForm = () => {
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
     Add Tenant
              </h4>
            </CardHeader>

            <CardBody>
      
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className="mb-3">
            <Label htmlFor="tenantName" className="form-label">Tenant Name</Label>
            <Input type="text" className="form-control" id="tenantName" placeholder="Enter Tenant name" />
          </div>
       
          
         
          <div className="mb-3">
            <Label htmlFor="description" className="form-label">Description</Label>
            <textarea className="form-control" id="description" rows="3" placeholder="Enter your message"></textarea>
          </div>
          <div className="d-flex justify-content-end">
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
      </CardBody>
      </Card>
      </Col>
      </Row>
    </Container>
    </div>
  );
};

export default TenantForm;