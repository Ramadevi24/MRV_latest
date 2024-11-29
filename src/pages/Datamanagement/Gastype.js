import React, { useState } from "react";
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
  Label,
} from "reactstrap";

const Gastype = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingInput, setEditingInput] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [lastId, setLastId] = useState(0); 

  const handleAddItem = () => {
    const newItem = {
      id: lastId + 1,
      name: inputValue,
    };
    setListData([...listData, newItem]);
    setLastId(lastId + 1); 
    setInputValue("");
  };

  const handleEdit = (list) => {
    setEditingRowId(list.id);
    setEditingInput({ ...list });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditingInput({});
  };

  const handleSave = (id) => {
    const updatedList = listData.map((list) => {
      if (list.id === id) {
        return { ...list, ...editingInput };
      }
      return list;
    });
    setListData(updatedList);
    setEditingRowId(null);
    setEditingInput({});
  };

  const handleInputChange = (e) => {
    setEditingInput({
      ...editingInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const newList = listData.filter((item) => item.id !== id);
      setListData(newList);
    } catch (error) {
      console.error("Error deleting fuel:", error);
    }
  };

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
                    {t("C02 Equivalent Type")}
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
                              <Label htmlFor="co2EquivalentName">
                                {t("C02 Equivalent Type Name")}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="co2EquivalentName"
                                className="form-control mt-3"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t("Enter Type Name")}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="col-3 mt-3">
                            <div
                              className="mt-3"
                              style={{ marginRight: "4rem" }}
                            >
                              <Button
                                type="submit"
                                color="success"
                                onClick={handleAddItem}
                                className=" me-2"
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
                     
                        <div className="table-responsive table-card mt-3 mb-1">
                          <table
                            className="table align-middle table-nowrap"
                            id="customerTable"
                          >
                            <thead className="table-light">
                              <tr>
                                <th>{t("C02 Equivalent Type")}</th>
                                <th>{t("Action")}</th>
                              </tr>
                            </thead>
                            <tbody className="list form-check-all">
                              {listData.map((list) => (
                                <tr key={list.id}>
                                 <td>
                                  {editingRowId === list.id ? (
                                    <Input
                                      type="text"
                                      name="name"
                                      value={editingInput.name}
                                      onChange={handleInputChange}
                                    />
                                  ) : (
                                    list.name
                                  )}
                                </td>
                                  <td>
                                    <div className="d-flex gap-2">
                                    {editingRowId === list.id ? (
                                       <>
                                       <Button
                                         color="success"
                                         size="sm"
                                         onClick={()=>handleSave(list.id)}
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
                                        onClick={() => handleEdit(list)}
                                      >
                                        <FaPencilAlt color="white" />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteClick(list.id)
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

export default Gastype;
