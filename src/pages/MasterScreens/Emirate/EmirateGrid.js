import React, { useState, useContext, useEffect } from "react";
import { EmiratesContext } from "../../../contexts/EmiratesContext";
import { formatDate } from "../../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import AddEmirateModal from "./AddEmirateModal";
import DeleteModal from "../../../Components/CommonComponents/DeleteModal";
import { FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Pagination from "../../../Components/CommonComponents/PaginationNumber.js";
import { toast } from "react-toastify";
import "../../../assets/scss/CSS/styles.css";
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
} from "reactstrap";

const EmirateGrid = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const { emirates, loading, deleteEmirate, fetchAllEmirates, updateEmirate } =
    useContext(EmiratesContext);

  const [isEmirateModal, setIsEmirateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [emirateToDelete, setEmirateToDelete] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingEmirate, setEditingEmirate] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleDelete = (id) => {
    setEmirateToDelete(id);
    setDeleteModal(true);
    const totalPages = Math.ceil(updateEmirate.length / 10);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Go to the last available page
    }
  };

  const confirmDelete = async () => {
    if (emirateToDelete) {
      await deleteEmirate(emirateToDelete);
      await fetchAllEmirates();
      setDeleteModal(false);
      setEmirateToDelete(null);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...emirates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredSortedData = sortedData?.filter((data) => {
    if (!data) return false;
    return ["name", "createdDate"].some((key) => {
      const value = key.includes(".")
        ? key.split(".").reduce((obj, k) => obj?.[k], data) // Handle nested keys
        : data[key];
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;
  const currentData = filteredSortedData.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditRow = (row) => {
    setEditingRowId(row.emiratesID);
    setEditingEmirate({ ...row });
  };

  const handleInputChange = (e) => {
    setEditingEmirate({
      ...editingEmirate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveRow = async () => {
    try {
      await updateEmirate(editingRowId, editingEmirate);
      await fetchAllEmirates();
      setEditingRowId(null);
      setEditingEmirate({});
      toast.success("Location updated successfully");
    } catch (error) {
      toast.error("Error updating Location");
    }
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditingEmirate({});
  };

  const handleCreateEmirate = () => {
    setIsEmirateModal(true);
  };

  const handleCloseEmirate = () => {
    setIsEmirateModal(false);
  };

  const handleView = (id) => {
    console.log(`View tenant with id: ${id}`);
  };

  const columns = [
    { key: "emiratesID", label: "ID" },
    { key: "name", label: "Name" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Actions" },
  ];

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
                    {t("Location Information")}
                  </h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      {/* <Col className="col-sm">
                        <div className="d-flex justify-content-sm-start">
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
                      </Col> */}
                      <Col className="col-sm w-[5rem] col-mobile">
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
                              <option value="All">{t("All")}</option>
                              {/* <option value="ADDA">{t("ADDA")}</option>
                              <option value="IST">{t("IST")}</option> */}
                            </select>
                          </div>

                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search rounded-0 rounded-end"
                              placeholder={t("Search...")}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={handleCreateEmirate}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            {t("Add")}
                          </Button>
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
                      <div
                        className="table-responsive table-card mt-3 mb-1"
                        style={{ padding: "20px" }}
                      >
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              {columns.map((column) => (
                                <th
                                  key={column.key}
                                  onClick={() =>
                                    column.key !== "actions" &&
                                    handleSort(column.key)
                                  } // Prevent sorting for "Actions"
                                  className={
                                    column.key !== "actions" ? "sort" : ""
                                  } // Conditionally apply the sort class
                                  data-sort={
                                    column.key !== "actions"
                                      ? column.key
                                      : undefined
                                  }
                                >
                                  {t(column.label)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          {currentData.length > 0 ? (
                            <tbody className="list form-check-all">
                              {currentData.map((item) => (
                                <tr key={item.emiratesID}>
                                  <td className="name">{item.emiratesID}</td>
                                  <td className="name">
                                    {editingRowId === item.emiratesID ? (
                                      <Input
                                        type="text"
                                        name="name"
                                        value={editingEmirate.name}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      item.name
                                    )}
                                  </td>
                                  <td className="createdDate">
                                    {formatDate(item.createdDate)}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2">
                                      {editingRowId === item.emiratesID ? (
                                        <>
                                          <Button
                                            color="success"
                                            size="sm"
                                            onClick={() =>
                                              handleSaveRow(item.emiratesID)
                                            }
                                          >
                                            <FaCheck color="white" />
                                          </Button>

                                          <Button
                                            color="danger"
                                            size="sm"
                                            onClick={handleCancelEdit}
                                          >
                                            <FaXmark color="white" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <div className="edit">
                                            <button
                                              className="btn btn-sm btn-info edit-item-btn"
                                              onClick={() =>
                                                handleEditRow(item)
                                              }
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
                                                handleDelete(item.emiratesID)
                                              }
                                              data-bs-toggle="modal"
                                              data-bs-target="#deleteRecordModal"
                                            >
                                              <FaTrashAlt color="white" />
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          ) : (
                            <tbody>
                              {" "}
                              <tr>
                                {" "}
                                <td
                                  colSpan={columns.length}
                                  className="text-center no-records"
                                >
                                  {" "}
                                  {t("No records found")}{" "}
                                </td>{" "}
                              </tr>{" "}
                            </tbody>
                          )}
                        </table>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={dataPerPage}
                      currentPage={currentPage}
                      totalItems={filteredSortedData.length}
                      paginate={paginate}
                      setItemsPerPage={setDataPerPage}
                      t={t}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <AddEmirateModal open={isEmirateModal} onClose={handleCloseEmirate} />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={confirmDelete}
          onCloseClick={() => setDeleteModal(false)}
        />
      </div>
    </React.Fragment>
  );
};

export default EmirateGrid;
