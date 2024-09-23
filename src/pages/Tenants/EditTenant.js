import React from 'react'

const EditTenant = () => {
  return (
    <Container style={{ marginTop: '100px' }}>
    <h2 className="form-heading" >Edit Tenant</h2>
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
        <div className="text-end">
          <Button type="submit" color="primary">Update</Button>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default EditTenant