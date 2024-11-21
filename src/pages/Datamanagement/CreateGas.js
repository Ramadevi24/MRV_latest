import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber.js";
import { FaXmark } from "react-icons/fa6";
import {
  Spinner,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
    Form,
    FormGroup,
    Label
} from "reactstrap";

const CreateGas = () => {
  const { t } = useTranslation();
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingGas, setEditingGas] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [gasData, setGasData] = useState([]);
  const [gasName, setGasName] = useState("");
  const [co2Value, setCo2Value] = useState("");
  const [lastId, setLastId] = useState(0);

  const handleAddItem = () => {
    const newItem = {
      id: lastId + 1,
      gasName: gasName,
      co2Value: co2Value,
    };
    setGasData([...gasData, newItem]);
    setLastId(lastId + 1); 
    setGasName("");
    setCo2Value("");
  }

  const handleEdit = (gas) => {
    setEditingRowId(gas.id);
    setEditingGas({ ...gas });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditingGas({});
  };

  const handleSave = (id) => {
    const updatedGas = gasData.map((gas) => {
      if (gas.id === id) {
        return { ...gas, ...editingGas };
      }
      return gas;
    }
    );
    setGasData(updatedGas);
    setEditingRowId(null);
    setEditingGas({});
  };

  const handleInputChange = (e) => {
    setEditingGas({
      ...editingGas,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClick = (id) => {
    const updatedGas = gasData.filter((gas) => gas.id !== id);
    setGasData(updatedGas);
  }


  return (
    <React.Fragment>
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
                    {t('C02 Equivalent Type')}
                  </h4>
                </CardHeader>

                <CardBody>
                    <>
                    <div className="live-preview">
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                    >
                      <Row>
                        
                        <Col className="col-6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="gasName">{t("Gas Name")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="gasName"
                              className="form-control mt-3"
                              placeholder={t("Enter Gas Name")}
                              value={gasName}
                              onChange={(e) => setGasName(e.target.value)}
                            //   value={formik.values.fuelName || ""}
                            //   onChange={formik.handleChange}
                            //   onBlur={formik.handleBlur}
                            //   invalid={
                            //     formik.touched.fuelName &&
                            //     formik.errors.fuelName
                            //       ? true
                            //       : false
                            //   }
                            />
                             
                          </FormGroup>
                        </Col>
                        <Col className="col-6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="co2value">{t("C02 Equivalent Value")}
                            <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              name="co2value"
                              className="form-control mt-3"
                              value={co2Value}
                              onChange={(e) => setCo2Value(e.target.value)}
                              placeholder={t("Enter Co2 Value")}
                            //   value={formik.values.fuelName || ""}
                            //   onChange={formik.handleChange}
                            //   onBlur={formik.handleBlur}
                            //   invalid={
                            //     formik.touched.fuelName &&
                            //     formik.errors.fuelName
                            //       ? true
                            //       : false
                            //   }
                            />
                             
                          </FormGroup>
                        </Col>
                        <Col className="col-3">
                        <div style={{marginRight:'4rem'}}>
                        <Button
                          type="submit"
                          color="success"
                          className="rounded-pill me-2"
                          onClick={handleAddItem}
                        >
                          {t("Submit")}
                        </Button>
                        </div>
                        </Col>
                      </Row>     
                    </Form>
                  </div>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder={t("Search...")}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {loading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "50vh" }}
                      >
                        <Spinner animation="border" role="status">
                          <span className="sr-only">{t("Loading...")}</span>
                        </Spinner>
                      </div>
                    ) : (
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th>
                                {t("Gas Name")}
                              </th> 
                              <th>
                                {t("C02 Equivalent Value")}
                              </th> 
                              <th>
                                {t("Action")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                          {gasData.map((item) => (
                            <tr key={item.id}>
                              <td>{editingRowId === item.id ? (
                                 <Input
                                 type="text"
                                 name="gasName"
                                 value={editingGas.gasName}
                                 onChange={handleInputChange}
                               />
                             ) : (
                                item.gasName
                             )}</td>
                              <td>{editingRowId === item. id ? 
                              (<Input type = "number"
                              name = "co2Value"
                              value = {editingGas.co2Value}
                              onChange = {handleInputChange}
                              />) : (
                                item.co2Value)}</td>
                              <td>
                                    <div className="d-flex gap-2">
                                    {editingRowId === item.id ? (
                                       <>
                                       <Button
                                         color="success"
                                         size="sm"
                                         onClick={()=>handleSave(item.id)}
                                       >
                                        <FaCheck color="white"/>
                                       </Button>
                                       
                                       <Button
                                         color="danger"
                                         size="sm"
                                         onClick={handleCancel}
                                       >
                                       <FaXmark color="white" />
                                       </Button>
                                       </>
                                   ) : (
                                    <>
                                      <Button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        onClick={() => handleEdit(item)}
                                      >
                                        <FaPencilAlt color="white" />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteClick(item.id)
                                        }
                                        className="btn btn-sm btn-danger remove-item-btn"
                                      >
                                        <FaTrashAlt color="white" />
                                      </Button>
                                    </>
                                    )}
                                    </div>
                                  </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {/* <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredPermissions.length}
                      paginate={paginate}
                      setItemsPerPage={setItemsPerPage}
                      t={t}
                    /> */}
                  </div>
                  </>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateGas;
