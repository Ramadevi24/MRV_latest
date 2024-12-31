import React, { useState, useContext } from "react";
import FormField from "../../Components/CommonComponents/FormField";
import "../../assets/scss/CSS/EntityComponents.css";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import "../../assets/scss/CSS/emissiontable.css";
import DownloadIcon from "../../assets/images/Power Sector--- Data Entry/basil_upload-solid.png";
import EmissionTable from "../../Components/CommonComponents/EmissionTable";
import VerticalEmissionTable from "../../Components/CommonComponents/VerticalEmissionTable";
import VerticalEmissionTable2 from "../../Components/CommonComponents/VerticalEmissionTable2";
import VerticalEmissionTable3 from "../../Components/CommonComponents/VerticalEmissionTable3";

import { useParams } from "react-router-dom";
import FileUpload from "../../Components/CommonComponents/FileUpload";
import { FacilityContext } from "../../contexts/FacilityContext";

function PowerEmission() {
  const [file, setFile] = useState(null);
  const [tierLevel, setTierLevel] = useState("T1");
  const { emission } = useParams();
    const [Uncertainty, setUncertainty] = useState(false);
    const [QAQC, setQAQC] = useState(false);
    const [ActivityQAQC, setActivityQAQC] = useState(false);
const { facility, loading, fetchAllFacility } = useContext(FacilityContext);
  
    const [facilityOptions, setFacilityOptions] = useState(facility);
  const  
  [calendarYear, setCalendarYear] = useState([
    { name: "2023", value: "2023" },
    { name: "2024", value: "2024" },
    { name: "2025", value: "2025" },
  ]);
    const handleUncertainty = () => {
      setUncertainty(!Uncertainty);
    }
    const handleQAQC = () => {
      setQAQC(!QAQC);
    }
    const handleActivityQAQC = () => {
      setActivityQAQC(!ActivityQAQC);
    }
  const FuelPowerheaders = [
    "Fuel Type",
    "Natural Gas",
    "Diesel",
    "Gasoline",
    "Fuel Oil",
  ];
  const FuelPetroleumheaders = [
    "Fuel Type",
    "Naphtha",
    "Kerosene",
    "Jet Fuel ",
    "Gasoline",
  ];
  const FuelConstructionheaders = [
    "Fuel Type",
    "Natural Gas",
    "Diesel",
  ];
  const FuelPowerT3headers = [
      "Stack Name/ID",
      "Parameters",
      "C02",
      "CH4",
      "N20",
      "HFCs",
      "PFCs",
      "SF6",
      "NF3"
  ];
  const FuelT2SubPowerheaders = [
    "Sub Plant",
    "T-Al_HRSG 13",
    "T-Al_HRSG 13",
    "T-Al_HRSG 14",
    "T-Al_HRSG 14",
  ];
  const FuelT2Petroleumheaders = [
    "Sub Plant",
    "Crude Distillation Unit",
    "Crude Distillation Unit",
    "Crude Distillation Unit",
    "Crude Distillation Unit",
  ];
  const FuelT3Powerheaders = ["", "ST12345", "", "ST12345", ""];
  const FuelPowerparameters = [
    {
      type: "Natural Gas",
      "Fuel Purpose": "Energy",
      "Fuel Purchased Quantity": 500,
      "Fuel Consumed Quantity": 324,
      "Fuel Unit": "m³",
    },
    {
      type: "Diesel",
      "Fuel Purpose": "Energy",
      "Fuel Purchased Quantity": 700,
      "Fuel Consumed Quantity": 562,
      "Fuel Unit": "m³",
    },
    {
      type: "Gasoline",
      "Fuel Purpose": "Energy",
      "Fuel Purchased Quantity": 200,
      "Fuel Consumed Quantity": 129,
      "Fuel Unit": "m³",
    },
    {
      type: "Fuel Oil",
      "Fuel Purpose": "Non Energy",
      "Fuel Purchased Quantity": 350,
      "Fuel Consumed Quantity": 284,
      "Fuel Unit": "m³",
    },
  ];

  const FuelPowerT2parameters = [
    {
      type: "Natural Gas",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 500,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Country/Plant GHG Emission Factor(kg/Tg)": "350-500 Kg/TJ",
      "Country/Plant Precursors Emission Factor(Kg/Tg)": "0.1-0.3 Kg/TJ",
    },
    {
      type: "Diesel",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 700,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Country/Plant GHG Emission Factor(kg/Tg)": "350-500 Kg/TJ",
      "Country/Plant Precursors Emission Factor(Kg/Tg)": "0.1-0.3 Kg/TJ",
    },
    {
      type: "Gasoline",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 200,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Country/Plant GHG Emission Factor(kg/Tg)": "350-500 Kg/TJ",
      "Country/Plant Precursors Emission Factor(Kg/Tg)": "0.1-0.3 Kg/TJ",
    },
    {
      type: "Fuel Oil",
      "Fuel Purpose": "Non Energy",
      "Fuel Quantity": 350,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Country/Plant GHG Emission Factor(kg/Tg)": "350-500 Kg/TJ",
      "Country/Plant Precursors Emission Factor(Kg/Tg)": "0.1-0.3 Kg/TJ",
    },
  ];

  const FuelPowerT3parameters = [
    {
      type: "Natural Gas",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 324,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Technology Specific GHG Emission Factor (Kg/TJ)": "350–500 Kg/TJ",
      "Technology Specific Precursors Emission Factor (Kg/TJ)": "0.1–0.3 Kg/TJ",
      "Source of Emission Factor": "IPCC",
      "Technology": "Stream Turbine",
      "Control Technology": "Dry Low NOX",
      "Combustion Technology": "NGCC",
      "Operating Condition": "Gas Turbine",
      "Quality Of Maintenance": "Reliability-Centre",
      "Age Of Equipment(Years)": 3,
      "Co2 Capture Efficiency(%)": 20,
    },
    {
      type: "Diesel",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 562,
      "Fuel Unit": "m³",
      "Configuration": "Combined Cycle",
      "Technology Specific GHG Emission Factor (Kg/TJ)": "350–500 Kg/TJ",
      "Technology Specific Precursors Emission Factor (Kg/TJ)": "0.1–0.3 Kg/TJ",
      "Source of Emission Factor": "IPCC",
      "Technology": "Gas Turbine",
      "Control Technology": "FGD",
      "Combustion Technology": "IGCC",
      "Operating Condition": "Gas Turbine",
      "Quality Of Maintenance": "Reliability-Centre",
      "Age Of Equipment(Years)": 4,
      "Co2 Capture Efficiency(%)": 22,
    },
    {
      type: "Gasoline",
      "Fuel Purpose": "Energy",
      "Fuel Quantity": 321,
      "Fuel Unit": "m³",
      "Configuration": "Simple Cycle",
      "Technology Specific GHG Emission Factor (Kg/TJ)": "350–500 Kg/TJ",
      "Technology Specific Precursors Emission Factor (Kg/TJ)": "0.1–0.3 Kg/TJ",
      "Source of Emission Factor": "IPCC",
      "Technology": "Stream Turbine",
      "Control Technology": "Dry Low NOX",
      "Combustion Technology": "NGCC",
      "Operating Condition": "Gas Turbine",
      "Quality Of Maintenance": "Reliability-Centre",
      "Age Of Equipment(Years)": 2,
      "Co2 Capture Efficiency(%)": 16,
    },
    {
      type: "Fuel Oil",
      "Fuel Purpose": "Non Energy",
      "Fuel Quantity": 454,
      "Fuel Unit": "m³",
      "Configuration": "Combined Cycle",
      "Technology Specific GHG Emission Factor (Kg/TJ)": "350–500 Kg/TJ",
      "Technology Specific Precursors Emission Factor (Kg/TJ)": "0.1–0.3 Kg/TJ",
      "Source of Emission Factor": "IPCC",
      "Technology": "Gas Turbine",
      "Control Technology": "FGD",
      "Combustion Technology": "NGCC",
      "Operating Condition": "Gas Turbine",
      "Quality Of Maintenance": "Reliability-Centre",
      "Age Of Equipment(Years)": 3,
      "Co2 Capture Efficiency(%)": 19,
    }]
  

  const FuelPetroleumparameters = [
    { type: "Naphtha", "Fuel Quantity": 324, "Fuel Unit": "m³" },
    { type: "Natural Gas", "Fuel Quantity": 562, "Fuel Unit": "m³" },
    { type: "Jet Fuel", "Fuel Quantity": 129, "Fuel Unit": "m³" },
    { type: "Fuel Oil", "Fuel Quantity": 284, "Fuel Unit": "m³" },
  ];

  const fuelPowerT3Parameters = [
    {
      type: "Fuel Purpose",
      "Natural Gas": "Energy",
      Diesel: "Energy",
      "Natural Gas (1)": "Energy",
      "Natural Gas (2)": "Energy",
    },
    {
      type: "Fuel Quantity",
      "Natural Gas": 324,
      Diesel: 562,
      "Natural Gas (1)": 129,
      "Natural Gas (2)": 284,
    },
    {
      type: "Fuel Unit",
      "Natural Gas": "m³",
      Diesel: "m³",
      "Natural Gas (1)": "m³",
      "Natural Gas (2)": "m³",
    },
    {
      type: "Fuel Carbon Content (%)",
      "Natural Gas": 24,
      Diesel: 18,
      "Natural Gas (1)": 29,
      "Natural Gas (2)": 19,
    },
    {
      type: "Fuel NCV (TJ/Gg)",
      "Natural Gas": 31,
      Diesel: 11,
      "Natural Gas (1)": 22,
      "Natural Gas (2)": 42,
    },
    {
      type: "Oxidation Factor",
      "Natural Gas": 0.4,
      Diesel: 0.2,
      "Natural Gas (1)": 0.5,
      "Natural Gas (2)": 0.1,
    },
    {
      type: "Is N2O Monitored ?",
      "Natural Gas": "Yes",
      Diesel: "No",
      "Natural Gas (1)": "Yes",
      "Natural Gas (2)": "No",
    },
    {
      type: "N2O Emission (Tonnes)",
      "Natural Gas": "",
      Diesel: "",
      "Natural Gas (1)": "",
      "Natural Gas (2)": "",
    },
    {
      type: "N2O Emission factor (g/GJ)",
      "Natural Gas": "",
      Diesel: "",
      "Natural Gas (1)": "",
      "Natural Gas (2)": "",
    },
    {
      type: "N2O Source of Emission factor",
      "Natural Gas": "",
      Diesel: "",
      "Natural Gas (1)": "",
      "Natural Gas (2)": "",
    },
  ];

  const stackPowerheaders = [
    "Parameters",
    "ST12345",
    "ST12346",
    "ST12347",
    "ST12348",
  ];
  const stackPowerparameters = [
    {
      group: "Abatement Efficiency",
      rows: [
        { parameter: "CH4 (%)", values: [34, 25, 12, 45] },
        { parameter: "PFC (%)", values: [32, 31, 34, 14] },
        { parameter: "CO2-Captured(%)", values: [45, 28, 45, 17] },
        { parameter: "Other 1(%)", values: [21, 25, 24, 16] },
        { parameter: "Other 2(%)", values: [24, 34, 17, 36] },
      ],
    },
    {
      group: "Stack Details",
      rows: [
        { parameter: "Velocity (m/s)", values: [34, 13, 24, 26] },
        { parameter: "Temperature (°C)", values: [32, 24, 27, 21] },
      ],
    }]
  const stackPowerT3parameters = [
    { parameter: "Velocity (m/s)", values:[24, 34,17,36]},
    {parameter: "Temperature (°C)",values:[34,13,17,24]},
    {parameter: "Flow Rate(m3/hrs)",values:[24, 23,17,46]}
  ];
 /* const emissionPowerT3parameters = [
    { parameter: "Is Monitored", values:["Yes", "Yes","Yes","Yes", "No","No","No"]},
    {parameter: "Emission Factor",values:[34,13,17,24]},
    {parameter: "Source Of emission factor",values:[24, 23,17,46]},
    {parameter: "Emission (Tonnes)",values:[24, 23,17,46]}

  ];*/

  const emissionPowerT3parameters = [
    {
      type: "Co2",
      "Is Monitored": "Yes",
      "Emission Factor (Kg/TJ)": "",
      "Source Of emission factor": "",
      "Emission (Tonnes)": "123"
        },
    {
      type: "Co4",
      "Is Monitored": "Yes",
      "Emission Factor (Kg/TJ)": "",
      "Source Of emission factor": "",
      "Emission (Tonnes)": "321"
        },  
        {
          type: "N20",
          "Is Monitored": "Yes",
          "Emission Factor (Kg/TJ)": "",
          "Source Of emission factor": "",
          "Emission (Tonnes)": "333"
            },    
            {
              type: "HFCs",
              "Is Monitored": "Yes",
              "Emission Factor (Kg/TJ)": "42",
              "Source Of emission factor": "plant",
              "Emission (Tonnes)": ""
                },    
                {
                  type: "PFCs",
                  "Is Monitored": "No",
                  "Emission Factor (Kg/TJ)": "63",
                  "Source Of emission factor": "plant",
                  "Emission (Tonnes)": ""
                    },    
                    {
                      type: "SF6",
                      "Is Monitored": "No",
                      "Emission Factor (Kg/TJ)": "25",
                      "Source Of emission factor": "plant",
                      "Emission (Tonnes)": ""
                        },  
                        {
                          type: "NF3",
                          "Is Monitored": "No",
                          "Emission Factor (Kg/TJ)": "45",
                          "Source Of emission factor": "plant",
                          "Emission (Tonnes)": ""
                            },    
                         
                                              
    
  ];


  // const stackPowerT3parameters = [
  //   { type: "CH4(%)", ST12345: 34, ST12346: 25, ST12347: 12, ST12348: 45 },
  //   { type: "PFC (%)", ST12345: 32, ST12346: 31, ST12347: 34, ST12348: 14 },
  //   { type: "CO2(%)", ST12345: 45, ST12346: 28, ST12347: 45, ST12348: 17 },
  //   { type: "Other 1(%)", ST12345: 21, ST12346: 25, ST12347: 24, ST12348: 16 },
  //   { type: "Other 2(%)", ST12345: 23, ST12346: 17, ST12347: 36, ST12348: 28 },
  //   {
  //     type: "CO2 Capture Efficiency (%)",
  //     ST12345: 45,
  //     ST12346: 25,
  //     ST12347: 31,
  //     ST12348: 17,
  //   },
  //   {
  //     type: "Technology",
  //     ST12345: "Stream Turbine",
  //     ST12346: "Gas Turbine",
  //     ST12347: "Stream Turbine",
  //     ST12348: "Gas Turbine",
  //   },
  //   {
  //     type: "Combustion Technology",
  //     ST12345: "CCGT",
  //     ST12346: "Gas Combustion",
  //     ST12347: "PCC",
  //     ST12348: "CCGT",
  //   },
  //   {
  //     type: "Control Technology",
  //     ST12345: "Dry Low NOX",
  //     ST12346: "FGD",
  //     ST12347: "Dry Low NOX",
  //     ST12348: "FGD",
  //   },
  //   {
  //     type: "Quality Of Maintenance",
  //     ST12345: "Reliability-Centre",
  //     ST12346: "Reliability-Centre",
  //     ST12347: "Reliability-Centre",
  //     ST12348: "Reliability-Centre",
  //   },
  //   {
  //     type: "Age of equipment (years)",
  //     ST12345: 3,
  //     ST12346: 2,
  //     ST12347: 4,
  //     ST12348: 3,
  //   },
  //   {
  //     type: "Velocity (m/s)",
  //     ST12345: 34,
  //     ST12346: 13,
  //     ST12347: 24,
  //     ST12348: 26,
  //   },
  //   {
  //     type: "Temperature (C0)",
  //     ST12345: 32,
  //     ST12346: 24,
  //     ST12347: 27,
  //     ST12348: 21,
  //   },
  // ];

  const handleTierChange = (event) => {
    setTierLevel(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                {emission === ":power" && (
                  <h4 className="card-title mb-0 cardTitle">
                    1.A.1.a Power Generation GHG Emission Data
                  </h4>
                )}
                {emission === ":petroleum" && (
                  <h4 className="card-title mb-0 cardTitle">
                    1.A.1.b Petroleum Refining
                  </h4>
                )}
                {emission === ":construction" && (
                  <h4 className="card-title mb-0 cardTitle">
                    1.A.2 Manufacturing Industries and Construction
                  </h4>
                )}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={3}>
                    <FormField
                      label="Facility / Plant Name"
                      isDropdown
                      options={facilityOptions}   valueKey ="$id"
                      labelKey ="facilityName"

                    />
                  </Col>
                  <Col md={3}>
                    <FormField
                      label="Calendar Year"
                      isDropdown
                      options={calendarYear}  valueKey ="name"
                      labelKey ="name"

                    />
                  </Col>
                  <Col md={3}>
                    <FormField
                      label="Tier Level"
                      isDropdown
                      options={[
                        { name: "T1", name: "T1" },
                        { name: "T2", name: "T2" },
                        { name: "T3", name: "T3" }
                      ]}
                      onChange={handleTierChange}
                      value={tierLevel}
                      valueKey ="name"
                      labelKey ="name"
                    />
                  </Col>

                </Row>
                <Row>
                <Col md={3}>
          <FileUpload label="Uncertainty Guidance?" toggleClick={handleUncertainty} conditionData={Uncertainty}/>
            </Col>
            <Col md={3}>
          <FileUpload label="Is QA/QC for emission data?" toggleClick={handleQAQC} conditionData={QAQC}/>
            </Col>
            <Col md={3}>
          <FileUpload label="Is QA/QC for activity data?" toggleClick={handleActivityQAQC} conditionData={ActivityQAQC}/>
          </Col>
                </Row>
                {emission === ":power" && (
                  <>
                    {tierLevel === "T1" && (
                      <>
                        <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerparameters}
                          title="Fuel Consumption Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                    )}
                    {tierLevel === "T2" && (
                      <>
                      <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerT2parameters}
                          subHeaders={FuelT2SubPowerheaders}
                          showHeaderRow={true}
                          title="Fuel Consumption Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                        {/* <VerticalEmissionTable
                          headers={stackPowerheaders}
                          parameters={stackPowerparameters}
                          title="Abatement & Stack Parameter Details"
                          showParametersRow={false}
                        /> */}
                        
                      </>
                    )}
                    {tierLevel === "T3" && (
                      <>
                          <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerT3parameters}
                          subHeaders={FuelT2SubPowerheaders}
                          showHeaderRow={true}
                          title="Fuel Consumption Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                           <VerticalEmissionTable2
                          headers={stackPowerheaders}
                          parameters={stackPowerT3parameters}
                          title="Stack Details"
                          showHeaderRow={false}
                          showParametersRow={false}
                        />
                        <VerticalEmissionTable3
                          headers={FuelPowerT3headers}
                          parameters={emissionPowerT3parameters}
                          title="Emission Details"
                          showParametersRow={false}
                        />
                      </>
                    )}
                  </>
                )}
                {emission === ":petroleum" && (
                  <>
                    {tierLevel === "T1" && (
                      <>
                        <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerparameters}
                          title="Fuel Consumption Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                        <EmissionTable
                          headers={FuelPetroleumheaders}
                          parameters={FuelPetroleumparameters}
                          title="Fuel Production Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                    )}
                    {tierLevel === "T2" && (
                      <>
                        <VerticalEmissionTable
                          headers={stackPowerheaders}
                          parameters={stackPowerparameters}
                          title="Stack Parameter Details"
                          showParametersRow={false}
                        />
                        <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerparameters}
                          subHeaders={FuelT2Petroleumheaders}
                          showHeaderRow={true}
                          title="Fuel Consumption Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                        <EmissionTable
                          headers={FuelPetroleumheaders}
                          parameters={FuelPetroleumparameters}
                          subHeaders={FuelT2Petroleumheaders}
                          showHeaderRow={true}
                          title="Fuel Production Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                    )}
                    {tierLevel === "T3" && (
                      <>
                        <VerticalEmissionTable
                          headers={stackPowerheaders}
                          parameters={stackPowerT3parameters}
                          title="Abatement & Stack Parameter Details"
                          showParametersRow={false}
                        />
                        <VerticalEmissionTable
                          headers={FuelPowerT3headers}
                          parameters={fuelPowerT3Parameters}
                          subHeaders={FuelT3Powerheaders}
                          showHeaderRow={true}
                          title="Fuel Consumption Details"
                          showParametersRow={false}
                        />
                         <EmissionTable
                          headers={FuelPetroleumheaders}
                          parameters={FuelPetroleumparameters}
                          subHeaders={FuelT2Petroleumheaders}
                          showHeaderRow={true}
                          title="Fuel Production Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                    )}
                  </>
                )}
                {emission === ":construction" && (
                  <>
                    {tierLevel === "T1" && (
                      <>
                        <EmissionTable
                          headers={FuelConstructionheaders}
                          parameters={FuelPowerparameters}
                          title="Fuel Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                          <EmissionTable
                          headers={FuelConstructionheaders}
                          parameters={FuelPowerparameters}
                          title="Product Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                          <EmissionTable
                          headers={FuelConstructionheaders}
                          parameters={FuelPowerparameters}
                          title="Raw Material Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                      
                    )}
                    {tierLevel === "T2" && (
                      <>
                        <VerticalEmissionTable
                          headers={stackPowerheaders}
                          parameters={stackPowerparameters}
                          title="Stack Parameter Details"
                          showParametersRow={false}
                        />
                        <EmissionTable
                          headers={FuelPowerheaders}
                          parameters={FuelPowerparameters}
                          subHeaders={FuelT2SubPowerheaders}
                          showHeaderRow={true}
                          title="Fuel Details"
                          showParametersRow={true}
                          subHead="Parameters"
                        />
                      </>
                    )}
                    {tierLevel === "T3" && (
                      <>
                        <VerticalEmissionTable
                          headers={stackPowerheaders}
                          parameters={stackPowerT3parameters}
                          title="Abatement & Stack Parameter Details"
                          showParametersRow={false}
                        />
                        <VerticalEmissionTable
                          headers={FuelPowerT3headers}
                          parameters={fuelPowerT3Parameters}
                          subHeaders={FuelT3Powerheaders}
                          showHeaderRow={true}
                          title="Fuel Details"
                          showParametersRow={false}
                        />
                      </>
                    )}
                  </>
                )}
                <Col md={12} className="mt-3">
                  <label className="modal-subhead">Remarks</label>
                  <textarea
                    className="form-control"
                    placeholder="Write here..."
                    rows="3"
                  ></textarea>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="modal-subhead">Attach Files</label>
                  <div className="file-upload-body">
                    {!file ? (
                      <div className="file-upload-align">
                        <div>
                          <input
                            type="file"
                            id="upload-label"
                            onChange={handleFileChange}
                            hidden
                          />
                          <img src={DownloadIcon} />
                          <label
                            htmlFor="upload-label"
                            className="upload-placeholder"
                          >
                            Drag and drop files here or upload
                          </label>
                        </div>
                        <div>
                          <label
                            htmlFor="upload-label"
                            className="upload-button"
                          >
                            Upload
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="uploaded-file">
                        <span className="file-name">{file.name}</span>
                        <button
                          className="remove-button"
                          onClick={handleFileRemove}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </div>
                </Col>

                <div
                  className="d-flex justify-content-end mt-3"
                  style={{ marginRight: "4rem" }}
                >
                  <Button
                    type="button"
                    color="danger"
                    className="me-2"
                    onClick={() => history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="info" className=" me-2">
                    Save
                  </Button>
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PowerEmission;
