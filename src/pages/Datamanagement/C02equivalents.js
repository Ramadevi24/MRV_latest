import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber.js";
import "../../assets/scss/CSS/DataManagement.css";
import { toast } from "react-toastify";
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
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Co2EquivalentContext } from "../../contexts/Co2EquivalentContext.js";
import DeleteModal from "../../Components/CommonComponents/DeleteModal.js";
import { formatDate } from "../../utils/formateDate.js";
import AddCo2Modal from "./AddCo2Modal.js";
import EditCo2Modal from "./EditCo2Modal.js";

const C02equivalents = () => {
  document.title = "MRV_PROJECT | Co2 Equivalents";
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const {
    co2Equivalents,
    fetchAllEquivalents,
    updateExistingEquivalent,
    removeEquivalent,
    loading,
    co2EquivalentsTypes,
    updateExistingEquivalentType,
    fetchEquivalentTypeById
  } = useContext(Co2EquivalentContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEquivalentModal, setIsEquivalentModal] = useState(false);
  const [EquivalentToDelete, setEquivalentToDelete] = useState(null);
  const [isEditEquivalentModal, setIsEditEquivalentModal] = useState(false);
  const [equivalentId, setEquivalentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEquivalentTypeData, setSelectedEquivalentTypeData] = useState(null);

  useEffect(() => {
    if (selectedCategory === null) return; 
    const SelectedEquivalentTypeById = async () => {
      try {
        const response = await fetchEquivalentTypeById(selectedCategory);
        setSelectedEquivalentTypeData(response);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
  
    SelectedEquivalentTypeById();
  }, [selectedCategory]);

  const confirmDelete = async () => {
    if (EquivalentToDelete) {
      await removeEquivalent(EquivalentToDelete);
      await fetchAllEquivalents();
      setDeleteModal(false);
      setEquivalentToDelete(null);
    }
  };

  const handleDeleteClick = async (id) => {
    setEquivalentToDelete(id);
    setDeleteModal(true);
  };

  const handleCreateEquivalent = () => {
    setIsEquivalentModal(true);
  };

  const handleCloseEquivalent = () => {
    setIsEquivalentModal(false);
  };

  const handleEditTypeEquivalent = async (id) => {
    try {
      const updatedEquivalent = {
        co2EquiId: id,
        gasTypeName: selectedEquivalentTypeData.gasTypeName,
        isDefault: ! selectedEquivalentTypeData.isDefault,
      };
      await updateExistingEquivalentType(id, updatedEquivalent);
      toast.success("Default CO2 Equivalent Type Set Successfully");
    } catch (error) {
      toast.error("Error setting default CO2 Equivalent Type");
    }
  };

  const handleEditEquivalent = (id) => {
    setEquivalentId(id);
    setIsEditEquivalentModal(true);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...co2Equivalents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData?.filter((fuel) => {
    return fuel?.gasName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                      color: "#0f6192",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("CO2 Equivalents")}
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                  <div className="d-flex align-items-center justify-content-between mb-4 flex-mobile">
                             <Row className="g-4">
                              <Col className="col-sm w-[5rem]">
                            <div className="d-flex justify-content-sm-start">
                              <div className="dropdown position-relative">
                                <i
                                  className="ri-filter-line filter icon position-absolute"
                                  style={{
                                    top: "50%",
                                    left: "10px",
                                    transform: "translateY(-50%)",
                                  }}
                                />
                            
                                <select
                                  className="form-select px-12 rounded-0 rounded-start"
                                  style={{ paddingLeft: "40px" }}
                                  onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                  }
                                  value={selectedCategory}
                                >
                                   <option>{t("Type")}</option>
                                  {co2EquivalentsTypes && co2EquivalentsTypes.map((gas) => (
                                  <option key={gas.co2EquiId} value={gas.co2EquiId}>{gas.gasTypeName}</option>
                                ))}
                                </select>
                              </div>

                              <div className="search-box">
                                <input
                                  type="text"
                                  className="form-control search rounded-0 rounded-end"
                                  placeholder={t("Search...")}
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                                <i className="ri-search-line search-icon"></i>
                              </div>
                            </div>
                            </Col>
                            </Row>
                          <div className="d-flex justify-content-end mobile-height">
                          <Button
                              className="me-1 default-btn"
                              onClick={()=>handleEditTypeEquivalent(selectedCategory)}
                            >
                              {t("Set as Default")}
                            </Button>
                            <Button
                              color="success"
                              className="add-btn me-1"
                              onClick={handleCreateEquivalent}
                              id="create-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              {t("Add")}
                            </Button>
                          </div>
                        
                        </div>
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
                      <div
                        className="table-responsive table-card"
                        style={{ padding: "20px" }}
                      >
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th>{t("ID")}</th>
                              <th  className="sort" onClick={() => handleSort("gasName")}>
                                {" "}
                                {t("Gas Group")}{" "}
                              </th>
                              <th  className="sort" onClick={() => handleSort("createdDate")}>{t("createdDate")}</th>
                              <th>{t("Actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems?.map((equivalent) => (
                              <tr key={equivalent?.co2GasId}>
                                <td> {equivalent?.co2GasId} </td>
                                <td> {equivalent?.gasName} </td>
                                <td> {formatDate(equivalent?.createdDate)} </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        onClick={() =>
                                          handleEditEquivalent(
                                            equivalent?.co2GasId
                                          )
                                        }
                                        onClose={handleCloseEquivalent}
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
                                        {" "}
                                        <FaPencilAlt color="white" />
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() =>
                                          handleDeleteClick(
                                            equivalent.co2GasId
                                          )
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                      >
                                        <FaTrashAlt color="white" />
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredData.length}
                      paginate={paginate}
                      setItemsPerPage={setItemsPerPage}
                      t={t}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <AddCo2Modal open={isEquivalentModal} onClose={handleCloseEquivalent} />
      <EditCo2Modal
        open={isEditEquivalentModal}
        onClose={() => setIsEditEquivalentModal(false)}
        id={equivalentId}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={confirmDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
    </React.Fragment>
  );
};

export default C02equivalents;
