import React, { useState, useEffect, useContext } from "react";
import Modal from "../../../Components/CommonComponents/Modal";
import { Col, Container, Row, Card } from "reactstrap";
import FormField from "../../../Components/CommonComponents/FormField";
import deleteIcon from "../../../assets/images/Power Sector--- Data Entry/Vector.png";
import { MenuContext } from "../../../contexts/MenuContext";
import { useParams } from "react-router-dom";
import { EmissionSourceContext } from "../../../contexts/EmissionSourceContext";
import { SubPlantContext } from "../../../contexts/SubPlantContext";
import { useTranslation } from "react-i18next";

const EmissionSourceModal = ({ open, onClose }) => {
  const { power } = useParams();
  const { addEmissionSource, fetchAllEmissionSources } = useContext(EmissionSourceContext);
  const {fetchSubPlantByFacilityId} = useContext(SubPlantContext);
  const { t } = useTranslation();
   const facilityStoredData = JSON.parse(localStorage.getItem("facilityData"));
   const [facilitySubPlants, setFacilitySubPlants] = useState([]);

 useEffect(() => {
     fetchAllSubPlantsByFacilityId(facilityStoredData?.facilityID);
   }, []);
 
   const fetchAllSubPlantsByFacilityId = async (id) => {
     try {
       const data = await fetchSubPlantByFacilityId(id);
       setFacilitySubPlants(data);
     } catch (error) {
       console.log("Error fetching sub-plants", error);
     }
   };
 

  const [formValues, setFormValues] = useState({
      subPlantID: 0,
      stackID: "",
      stackSource: "",
      CEMSIDs:"",
      diameter: 0,
      height: 0,
      velocity: 0,
      volumetricFlowRate: 0,
      temperature: 0,
      cO2CaptureEfficiency: 0,
      abatementEfficiencies: [
        {
          pollutantName: "",
          efficiencyValue: 0
        }
      ]
  });
  const [errors, setErrors] = useState({});
    
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

  const validate = () => {
    const newErrors = {};

    if (!formValues.subPlantID) {
      newErrors.subPlantID = `${t("Please Select Sub-Plant.")}`;
    }
    if (!formValues.stackID.trim()) {
      newErrors.stackID = `${t("Please enter stackID.")}`;
    }
    if (!formValues.stackSource.trim()) {
      newErrors.stackSource = `${t("Please enter stackSource.")}`;
    }
    if (!formValues.CEMSIDs.trim()) {
      newErrors.CEMSIDs = `${t("Please enter CEMSIDs.")}`;
    }
    if (!formValues.diameter) {
      newErrors.diameter = `${t("Please enter diameter.")}`;
    }
    if (!formValues.height) {
      newErrors.height = `${t(
        "Please enter height."
      )}`;
    }
    if (!formValues.velocity) {
      newErrors.velocity = `${t(
        "velocity is required."
      )}`;
    }
    if (!formValues.volumetricFlowRate) {
      newErrors.volumetricFlowRate = `${t(
        "volumetricFlowRate is required."
      )}`;
    }
    if (!formValues.temperature) {
      newErrors.temperature = `${t("Temperature is required.")}`;
    }
        if (
          !formValues.cO2CaptureEfficiency ||
          formValues.cO2CaptureEfficiency <= 0
        ) {
          newErrors.cO2CaptureEfficiency = `${t("cO2CaptureEfficiency is required.")}`;
        }
      
    return newErrors;
  };

  const handleChange =
    (field, isNested = false) =>
    (event) => {
      if (isNested) {
        setFormValues({
          ...formValues,
          contactDetails: {
            ...formValues.contactDetails,
            [field]: event.target.value,
          },
        });
        if (errors[field]) {
          setErrors({ ...errors, [field]: "" });
        }
      } else {
        setFormValues({ ...formValues, [field]: event.target.value });
        if (errors[field]) {
          setErrors({ ...errors, [field]: "" });
        }
      }
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const createFormData = {
          ...formValues,
          subPlantID: Number(formValues.subPlantID),
          stackID: formValues.stackID,
          stackSource: formValues.stackSource,
          diameter: Number(formValues.diameter),
          height: Number(formValues.height),
          velocity: Number(formValues.velocity),
          volumetricFlowRate: Number(formValues.volumetricFlowRate),
          temperature: Number(formValues.temperature),
          cO2CaptureEfficiency: Number(formValues.cO2CaptureEfficiency),
          CEMSIDs: formValues.CEMSIDs,
          abatementEfficiencies: [
            {
              pollutantName: "No2",
              efficiencyValue: 20
            }
          ],
          isSubmitted: false
        };
        try {
          const response = await addEmissionSource(createFormData);
          if (response) {
            onClose();
            toast.success(t("Emission Source Created Successfully."), {
              autoClose: 3000,
            });
            await fetchAllEmissionSources();
          }
        } catch (error) {
          console.log(t("Error Creating Sub-Plant"));
        }
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
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormField
                    label="Sub Plant Name"
                    isDropdown
                    options={facilitySubPlants}
                    labelKey="subPlantName"
                    valueKey="subPlantID"
                    value={formValues.subPlantID}
                    onChange={handleChange("subPlantID")}
                    error={errors.subPlantID}               
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
                    <FormField
                      label="Stack ID"
                      placeholder="GT12345"
                      type="text"
                      value={formValues.stackID}
                    onChange={handleChange("stackID")}
                    error={errors.stackID}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Emission Source"
                      placeholder="Industrial Boiler"
                      type="text"
                      value={formValues.stackSource}
                      onChange={handleChange("stackSource")}
                      error={errors.stackSource}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="CEMS ID's"
                      placeholder="CEM12345, CEM3426, CEM2341"
                      type="text"
                      value={formValues.CEMSIDs}
                      onChange={handleChange("CEMSIDs")}
                      error={errors.CEMSIDs}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Diameter (m)"
                      placeholder="1.5"
                      type="number"
                      value={formValues.diameter}
                      onChange={handleChange("diameter")}
                      error={errors.diameter}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Height (m)"
                      placeholder="60"
                      type="number"
                      value={formValues.height}
                      onChange={handleChange("height")}
                      error={errors.height}
                    />
                  </Col>
               
                
                  <Col md={6}>
                    <FormField
                      label="Velocity (m/s)"
                      placeholder="120"
                      type="number"
                      value={formValues.velocity}
                      onChange={handleChange("velocity")}
                      error={errors.velocity}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Volumetric Flow Rate (m3/hrs)"
                      placeholder="178"
                      type="number"
                      value={formValues.volumetricFlowRate}
                      onChange={handleChange("volumetricFlowRate")}
                      error={errors.volumetricFlowRate}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Temperature (c0)"
                      placeholder="178"
                      type="number"
                      value={formValues.temperature}
                      onChange={handleChange("temperature")}
                      error={errors.temperature}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="CO2 Capture Efficiency (%)"
                      placeholder="20"
                      type="number"
                      value={formValues.cO2CaptureEfficiency}
                      onChange={handleChange("cO2CaptureEfficiency")}
                      error={errors.cO2CaptureEfficiency}
                    />
                  </Col>
                </Row>
              </div>
              {/* {power !== ":construction" && (<div>
                <Row>
                  <Col md={6}>
                    <FormField
                      label="Fuel Type"
                      isDropdown
                      options={[
                        {
                          name: "Natural Gas, Diesel, Gas Oil",
                          value: "Natural Gas, Diesel, Gas Oil",
                        },
                      ]}
                    />
                  </Col>

                  <Col md={6}>
                    <FormField
                      label="Configuration"
                      placeholder="Combined Cycle"
                      type="text"
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
                            name: "Naphtha, Diesel",
                            value: "Naphtha, Diesel",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                )}
              </div>)} */}
              {power !== ":construction" && (
                <div
                  className="category-sub-modal"
                  style={{ marginTop: "10px" }}
                >
                  <Row>
                    <Col md={6}>
                      <h4 className="modal-subhead">Efficiencies</h4>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={6}>
                    <FormField
                      label="Technology Used"
                      placeholder="Gas Turbines"
                      type="text"
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="CO2 Capture Efficiency (%)"
                      placeholder="23"
                      type="number"
                    />
                  </Col> */}
                    <Row>
                      <Col md={5}>
                        <div className="efficiency-section">
                          <h4
                            className="emission-subtitle"
                            style={{ color: "#4098CE" }}
                          >
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
                                  placeholder="42"
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
                          <Row style={{ marginTop: "10px" }}>
                            <Col md={6}>
                              <label className="emission-modal-label">
                                PM (%)
                              </label>
                            </Col>
                            <Col md={6}>
                              <div className="input-with-icon">
                                <input
                                  type="number"
                                  value=""
                                  onChange=""
                                  placeholder="27"
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
                          <h4
                            className="emission-subtitle"
                            style={{ color: "#4098CE" }}
                          >
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
                </div>
              )}
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
                        type="number"
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
