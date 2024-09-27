import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/Common/PaginationNumber.js";
import { formatDate } from "../../utils/formateDate.js";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import {
  Spinner,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../Components/Common/DeleteModal";

const OrganizationGrid = () => {
  document.title = "MRV_PROJECT | OrganizationGrid";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organizations, loading, fetchAllOrganizations, removeOrganization } =
    useContext(OrganizationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteOrgId, setDeleteOrgId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const userPermissions =
  JSON.parse(localStorage.getItem("UserPermissions")) || [];

  useEffect(() => {
    fetchAllOrganizations(userPermissions?.tenantID);
  }, []);

  const handleDelete = (id) => {
    setDeleteOrgId(id); // Set the organization ID to delete
    setDeleteModal(true); // Show the modal
  };
  
  const confirmDelete = async () => {
    if (deleteOrgId) {
      await removeOrganization(deleteOrgId);
      fetchAllOrganizations(userPermissions?.tenantID) // Call your deletion function with the correct org ID
      setDeleteModal(false); // Close the modal
      setDeleteOrgId(null); // Clear the state
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrganizations = [...organizations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredOrganizations = sortedOrganizations.filter(
    (org) =>
      org.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.establishedDate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
                      color: "#45CB85",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {t('Organizations')}
                  </h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => navigate("/create-organization")}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                           {t('Add')}
                          </Button>
                        </div>
                      </Col>
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
                              <th
                                onClick={() => handleSort("organizationName")}
                                className="sort"
                                data-sort="organizationName"
                              >
                                {" "}
                                {t("Organization Name")}
                              </th>
                              <th
                                onClick={() => handleSort("establishedDate")}
                                className="sort"
                                data-sort="establishedDate"
                              >
                                {" "}
                                {t("Established date")}
                              </th>
                              <th className="sort" data-sort="status">
                              {t('Delivery Status')}
                              </th>
                              <th className="sort" data-sort="action">
                                {t('Action')}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((org) => (
                              <tr key={org.organizationID}>
                               
                                <td className="email">
                                  {org.organizationName}
                                </td>
                                <td className="date">
                                  {formatDate(org.establishedDate)}
                                </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {t('Active')}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        onClick={() =>
                                          navigate(
                                            `/edit-organization/${org.organizationID}`
                                          )
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
                                          handleDelete(org.organizationID)}
                                      >
                                        <FaTrashAlt color="white" />
                                      </button>
                                    </div>
                                    <div className="view">
                                      <button
                                        className="btn btn-sm btn-success view-item-btn"
                                        onClick={() =>
                                          navigate(
                                            `/view-organization/${org.organizationID}`
                                          )
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
                                        {" "}
                                        <FaEye color="white" />
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="noresult" style={{ display: "none" }}>
                          <div className="text-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We've searched more than 150+ Orders We did not
                              find any orders for you search.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredOrganizations.length}
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
        <DeleteModal
        show={deleteModal}
        onDeleteClick={confirmDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      </div>
    </React.Fragment>
  );
};

export default OrganizationGrid;
