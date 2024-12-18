import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Button,
  CardBody,
  Container,
  Card,
  CardHeader,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { GasContext } from "../../../contexts/GasContext";

const EditGas= () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the gas ID from the URL params
  const { getGasById, updateGas } = useContext(GasContext); // Get the gas details and update function
  const [gasData, setGasData] = useState(null);

  // Fetch the gas details by ID
  useEffect(() => {
    const fetchGas = async () => {
      try {
        const data = await getGasById(id);
        setGasData(data); // Set the gas data to the form
      } catch (error) {
        toast.error(t("Error fetching gas data"));
        navigate("/gases");
      }
    };
    fetchGas();
  }, [id, navigate, t, getGasById]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      GasType: gasData?.GasType || "",
      gasName: gasData?.gasName || "",
    },
    validationSchema: Yup.object({
      GasType: Yup.string().required(t("Please Enter Gas Type")),
      gasName: Yup.string().required(t("Please Enter Gas Name")),
    }),
    onSubmit: async (values) => {
      const updatedGasData = {
        GasType: values.GasType,
        gasName: values.gasName,
      };
      try {
        await updateGas(id, updatedGasData); // Update the gas using the ID
        toast.success(t("Gas updated successfully"), { autoClose: 3000 });
        navigate("/gases"); // Redirect after successful update
      } catch (error) {
        toast.error(t("Error updating Gas"));
      }
    },
  });

  // Dropdown options for gases
  const gasesOptions = [
    { label: "Carbon Dioxide (CO2)", value: "co2" },
    { label: "Methane (CH4)", value: "ch4" },
    { label: "Nitrous Oxide (N2O)", value: "n2o" },
    // Add more options as needed
  ];

  if (!gasData) {
    return <div>Loading...</div>; // Display loading message if data is not fetched yet
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <h5>{t("Edit Gas")}</h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={validation.handleSubmit}>
            <Row>
              {/* Gas Type */}
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="GasType">{t("Gas Type")}</Label>
                  <Input
                    type="select"
                    id="GasType"
                    name="GasType"
                    value={validation.values.GasType}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={validation.touched.GasType && validation.errors.GasType}
                  >
                    <option value="">{t("Select Gas Type")}</option>
                    {gasesOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.GasType && validation.errors.GasType && (
                    <FormFeedback>{validation.errors.GasType}</FormFeedback>
                  )}
                </FormGroup>
              </Col>

              {/* Gas Name */}
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="gasName">{t("Gas Name")}</Label>
                  <Input
                    type="text"
                    id="gasName"
                    name="gasName"
                    value={validation.values.gasName}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={validation.touched.gasName && validation.errors.gasName}
                  />
                  {validation.touched.gasName && validation.errors.gasName && (
                    <FormFeedback>{validation.errors.gasName}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Button type="submit" color="primary">
              {t("Update Gas")}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditGas;
