import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../Components/CommonComponents/PaginationNumber.js";
import {
  Spinner,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input
} from "reactstrap";
import DeleteModal from "../../../Components/CommonComponents/DeleteModal.js";

const TableGrid = ({
  data,
  loading,
  removeItem,
  fetchData,
  columns,
  onEdit,
  onView,
  onDelete,
  editingRowId,
  editingEmirate,
  handleInputChange,
  handleSaveRow,
  handleCancelEdit,
  title,
  pageTitle,
  addbtn,
  itemsPerPage = 10,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: columns[0].key,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
  }, []);

  const getValueByKey = (obj, key) => {
    return key.split('.').reduce((o, k) => (o ? o[k] : null), obj);
  };


  const confirmDelete = async () => {
    if (itemToDelete && removeItem) {
      await removeItem(itemToDelete);
      setDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const getSortedData = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  const getFilteredData = () => {
    return getSortedData().filter((item) => {
      return columns.some((col) =>
        item[col.key]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);

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
                    {title}
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-start">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder={t("Search")}
                              value={searchTerm}
                              onChange={handleSearch}
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
                            onClick={addbtn}
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
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              {columns.map((column) => (
                                <th
                                  key={column.key}
                                  onClick={() => handleSort(column.key)}
                                  className="sort"
                                  data-sort="email"
                                >
                                  {t(column.label)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {getPaginatedData().map((item) => (
                              <tr key={item.id}>
                                {columns.map((column) => (
                                  <td key={column.key}>
                                  {editingRowId === item.id ? (
                                      column.key === "actions" ? (
                                        column.render(item)
                                      ) : (
                                        <Input
                                          type="text"
                                          value={
                                            editingEmirate[column.key] || ""
                                          }
                                          onChange={(e) =>
                                            handleInputChange(
                                              column.key,
                                              e.target.value
                                            )
                                          }
                                          className="form-control"
                                        />
                                      )
                                    ): column.key === "actions"
                                    ? column.render(item)
                                    : getValueByKey(item, column.key)}
                                </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <Pagination
                      totalItems={getFilteredData().length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      t={t}
                    />
                  </div>
                </CardBody>
              </Card>
              <DeleteModal
                isOpen={deleteModal}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModal(false)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TableGrid;
