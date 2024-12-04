import React, { useState, useContext } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row, Card } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import deleteIcon from "../../../assets/images/Power Sector--- Data Entry/Vector.png";
import { MenuContext } from "../../../contexts/MenuContext";
import { useParams } from "react-router-dom";

const EmissionSourceModal = ({ open, onClose }) => {
  const { power } = useParams();
  const [rows, setRows] = useState([
    { name: "CO", value: 30 },
    { name: "CH4", value: 21 },
  ]);

  const constructionrows = [
    { parameter: "NOX", technology: "SCR", efficiency: 23 },
    { parameter: "SOX", technology: "Desulphurisation", efficiency: 43 },
    { parameter: "Others", technology: "", efficiency: "" },
  ];

  const addRow = () => {
    setRows([...rows, { name: "", value: "" }]);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal
            size="lg"
            title="Emission Source Details"
            isOpen={open}
            onClose={onClose}
          >
            <form>
              <Row>
                <Col md={6}>
                  <FormField
                    label="Sub Plant Name"
                    isDropdown
                    options={[{ label: "GT/HRSG 41", value: "GT/HRSG 41" }]}
                  />
                </Col>
              </Row>
              <div
                className="category-sub-modal"
                style={{ margin: "10px 0px 10px 0px" }}
              >
                <Row>
                  <Col md={6}>
                    <h4 className="modal-subhead">Emission Details</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Stack ID" placeholder="GT12345" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Diameter (m)" placeholder="1.5" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Height (m)" placeholder="60" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Velocity (m/s)" placeholder="120" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Temperature (c0)" placeholder="178" />
                  </Col>
                </Row>
              </div>
              {power !== ":construction" && (<div>
                <Row>
                  <Col md={6}>
                    <FormField
                      label="Fuel Type"
                      isDropdown
                      options={[
                        {
                          label: "Natural Gas, Diesel, Gas Oil",
                          value: "Natural Gas, Diesel, Gas Oil",
                        },
                      ]}
                    />
                  </Col>

                  <Col md={6}>
                    <FormField
                      label="Configuration"
                      placeholder="Combined Cycle"
                    />
                  </Col>
                </Row>
                {power === ":petroleum" && (
                  <Row>
                    <Col md={6}>
                      <FormField
                        label="Fuel Produced"
                        isDropdown
                        options={[
                          {
                            label: "Naphtha, Diesel",
                            value: "Naphtha, Diesel",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                )}
              </div>)}
              {power !== ":construction" && (<div className="category-sub-modal" style={{ marginTop: "10px" }}>
                <Row>
                  <Col md={6}>
                    <h4 className="modal-subhead">Technologies</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField
                      label="Technology Used"
                      placeholder="Gas Turbines"
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="CO2 Capture Efficiency (%)"
                      placeholder="23"
                    />
                  </Col>
                  <Row>
                    <Col md={5}>
                      <div className="efficiency-section">
                        <h4 className="emission-subtitle">
                          Abatement Efficiency
                        </h4>
                        <Row>
                          <Col md={6}>
                            <label className="emission-modal-label">
                              NOX (%)
                            </label>
                          </Col>
                          <Col md={6}>
                            <div className="input-with-icon">
                              <input
                                type="number"
                                value=""
                                onChange=""
                                placeholder="23"
                                className="emission-modal-input"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "10px" }}>
                          <Col md={6}>
                            <label className="emission-modal-label">
                              SOX (%)
                            </label>
                          </Col>
                          <Col md={6}>
                            <div className="input-with-icon">
                              <input
                                type="number"
                                value=""
                                onChange=""
                                placeholder="23"
                                className="emission-modal-input"
                              />
                            </div>
                          </Col>
                        </Row>
                        {power === ":petroleum" && (
                          <Row style={{ marginTop: "10px" }}>
                            <Col md={6}>
                              <label className="emission-modal-label">
                                CO (%)
                              </label>
                            </Col>
                            <Col md={6}>
                              <div className="input-with-icon">
                                <input
                                  type="number"
                                  value=""
                                  onChange=""
                                  placeholder="24"
                                  className="emission-modal-input"
                                />
                              </div>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </Col>
                    <Col md={7}>
                      <div className="other-efficiency-section">
                        <h4 className="emission-subtitle">
                          Other Abatement Efficiency
                        </h4>
                        <Card>
                          <div className="abatement-table-container">
                            <table className="abatement-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Value (%)</th>
                                  <button
                                    onClick={addRow}
                                    className="add-emission-modalbtn"
                                  >
                                    + Add other
                                  </button>
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((row, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) =>
                                          updateRow(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Name"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        value={row.value}
                                        onChange={(e) =>
                                          updateRow(
                                            index,
                                            "value",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Value"
                                      />
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => removeRow(index)}
                                        style={{
                                          border: "none",
                                          background: "none",
                                        }}
                                      >
                                        <img src={deleteIcon} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </Row>
              </div>)}
              {power === ":construction" && (
                <div
                  className="category-sub-modal"
                  style={{ marginTop: "10px" }}
                >
                  <Row>
                    <Col md={6}>
                      <h4 className="modal-subhead">Abatement Technology</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormField
                        label="CO2 Capture Efficiency (%)"
                        placeholder="23"
                      />
                    </Col>
                    <Row>
                      <Col md={12}>
                        <Card>
                          <div className="abatement-table-container">
                            <table className="abatement-table">
                              <thead>
                                <tr>
                                  <th>Parameter</th>
                                  <th>Technology</th>
                                  <th>Efficiency</th>
                                </tr>
                              </thead>
                              <tbody>
                                {constructionrows.map((row, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        type="text"
                                        value={row.parameter}
                                        placeholder="Name"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={row.technology}
                                        placeholder=""
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        value={row.efficiency}
                                        placeholder=""
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Row>
                </div>
              )}
              <Col md={12}>
                <label className="modal-subhead">Remarks</label>
                <textarea
                  className="form-control"
                  placeholder="Write here..."
                  rows="3"
                ></textarea>
              </Col>
              <div
                className="d-flex justify-content-end mt-3"
                style={{ marginRight: "4rem" }}
              >
                <button type="submit" className="add-details-btn  me-2">
                  {" "}
                  Add Details
                </button>
                <button
                  type="submit"
                  color="danger"
                  className="cancel-details-btn "
                  onClick={() => history.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmissionSourceModal;
