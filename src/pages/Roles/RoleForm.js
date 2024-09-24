import React from 'react'
import { Label, Row, Col, Input, Container, Button, CardBody, Card, CardHeader } from 'reactstrap';
const RoleForm = () => {
  return (
    <div style={{margin:'6rem'}}>


    <Container style={{  margin: '9rem 4rem ' }} >
<Card>
                <CardHeader className="ribbon-box" style={{padding:"2rem"}}>
                <h2 className="ribbon ribbon-success ribbon-shape" style={{fontSize:'20px', padding:"10px"}}>Add Tenant</h2>
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
    </Container>
    </div>
  );
};



export default RoleForm