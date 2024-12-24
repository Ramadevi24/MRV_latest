import React from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  InputGroup,
} from "reactstrap";
import { useTranslation } from "react-i18next";
function Dashboard() {
  document.title = "MRV_PROJECT | Dashboard";
  const { t } = useTranslation();
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
                    textAlign: "center",
                    color: "#0f6192",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {t("Welcome To Dashboard")}
                </h4>
              </CardHeader>

              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup></FormGroup>
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
}

export default Dashboard;
