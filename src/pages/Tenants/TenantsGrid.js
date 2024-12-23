import React, { useContext, useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaEye
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber.js";
import { formatDate } from "../../utils/formateDate.js";
import { TenantContext } from "../../contexts/TenantContext";
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
import DeleteModal from "../../Components/CommonComponents/DeleteModal.js";
import AddTenantModal from "./AddTenantModal.js";
import EditTenantModal from "./EditTenantModal.js";

const TenantsGrid = () => {

  document.title = "MRV_PROJECT | TenantsGrid";
const {t}=useTranslation();
  const navigate = useNavigate();
  const { tenants, loading, removeTenant, fetchAllTenants } =
    useContext(TenantContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage, setTenantsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [editTenant, setEditTenant] = useState(false);
  const [addTenant, setAddTenant] = useState(false);
  const [editTenantId, setEditTenantId] = useState(null);

  const handleEditTenantClick = (id) => {
    setEditTenantId(id)
    setEditTenant(true);
  };

  const handleTenantCloseModal = () => {
    setEditTenant(false);
  };

  const handleAddTenantClick = () => {
    setAddTenant(true);
  };

  const handleAddTenantCloseModal = () => {
    setAddTenant(false);
  };

  useEffect(() => {
    fetchAllTenants();
  }, []);

  const handleDelete = (id) => {
    setTenantToDelete(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (tenantToDelete) {
    await removeTenant(tenantToDelete);
    setDeleteModal(false);
    setTenantToDelete(null);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTenants = [...tenants].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredTenants = sortedTenants?.filter((tenant) =>
    ["name", "description", "createdDate"].some((key) =>
      tenant[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(
    indexOfFirstTenant,
    indexOfLastTenant
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
                  <h4 className="card-title mb-0" style={{color:'#45CB85', fontSize:'20px', fontWeight:'bold'}}>{t('Tenants')}</h4>
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
                            // onClick={() => navigate("/create-tenant")}
                            onClick={handleAddTenantClick} onClose={handleAddTenantCloseModal}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                           {t('Add')}
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
                      <div className="table-responsive table-card mt-3 mb-1"  style={{ padding: "20px" }}>
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th
                                onClick={() => handleSort("name")}
                                className="sort"
                                data-sort="email"
                              >
                                {" "}
                                {t("Tenant Name")}
                              </th>
                              <th
                                onClick={() => handleSort("description")}
                                className="sort"
                                data-sort="phone"
                              >
                                {t("Description")}
                              </th>
                              <th
                                onClick={() => handleSort("createdDate")}
                                className="sort"
                                data-sort="date"
                              >
                                {" "}
                                {t("Created Date")}
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
                            {currentTenants.map((tenant) => (
                              <tr key={tenant.tenantID}>
                                <td className="name">{tenant.name}</td>
                                <td className="description">{tenant.description}</td>
                                <td className="createdDate">
                                  {formatDate(tenant.createdDate)}
                                </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        onClick={() => handleEditTenantClick(tenant.tenantID)
                                        } onClose={handleTenantCloseModal}
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
                                            handleDelete(tenant.tenantID)
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
                      itemsPerPage={tenantsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredTenants.length}
                      paginate={paginate}
                      setItemsPerPage={setTenantsPerPage}
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
      <AddTenantModal isOpen={addTenant} onClose={handleAddTenantCloseModal}/>
      <EditTenantModal isOpen={editTenant} onClose={handleTenantCloseModal} tenantId={editTenantId}/>
      </div>
    </React.Fragment>
  );
};

export default TenantsGrid;