import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber.js";
import { formatDate } from "../../utils/formateDate.js";
import { RoleContext } from "../../contexts/RoleContext";
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
import RoleFormModal from "./RoleFormModal.js";
import EditRoleModal from "./EditRoleModal.js";
import ViewRoleModal from "./ViewRoleModal.js";
 
const RoleGrid = () => {
  document.title = "MRV_PROJECT | RoleGrid";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roles, loading, removeRole, fetchAllRoles } = useContext(RoleContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [viewRole, setViewRole] = useState(false);
  const [viewRoleId, setViewRoleId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
 
  const userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
 
  const handleAddRoleClick = () => {
    setAddRole(true);
  };
 
  const handleRoleCloseModal = () => {
    setAddRole(false);
  };
 
  const handleEditRoleClick = (id) => {
    setEditRoleId(id);
    setEditRole(true);
  };
 
  const handleEditCloseModal = () => {
    setEditRoleId(null);
    setEditRole(false);
  };
 
  const handleViewRoleClick = (id) => {
    setViewRoleId(id);
    setViewRole(true);
  };
 
  const handleViewCloseModal = () => {
    setViewRoleId(null);
    setViewRole(false);
  };
 
  useEffect(() => {
    fetchAllRoles();
  }, []);
 
  const handleDelete = (id) => {
    setDeleteRoleId(id); // Set the organization ID to delete
    setDeleteModal(true); // Show the modal
  };
 
  const confirmDelete = async () => {
    if (deleteRoleId) {
      await removeRole(deleteRoleId, userPermissions.tenantID);
      fetchAllRoles(userPermissions?.tenantID); // Call your deletion function with the correct org ID
      setDeleteModal(false); // Close the modal
      setDeleteRoleId(null); // Clear the state
    }
  };
 
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
 
  const sortedRoles = [...roles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
 
  const filteredRoles = sortedRoles.filter(
    (role) =>
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.createdDate.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log("viewRoleId",viewRoleId)
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
                    {t("Roles")}
                  </h4>
                </CardHeader>
 
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                    <Col className="col-sm w-[5rem]">
                        <div className="d-flex justify-content-sm-start">
                          <div className="dropdown position-relative" >
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
                            // onClick={() => navigate("/create-role")}
                            // onClick={handleAddRoleClick}
                            onClick={handleAddRoleClick}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
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
                      <div className="table-responsive table-card mt-3 mb-1"  style={{ padding: "20px" }}>
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th
                                onClick={() => handleSort("roleName")}
                                className="sort"
                                data-sort="roleName"
                              >
                                {t("Role Name")}
                              </th>
                              <th
                                onClick={() => handleSort("description")}
                                className="sort"
                                data-sort="description"
                              >
                                {t("Description")}
                              </th>
                              <th
                                onClick={() => handleSort("createdDate")}
                                className="sort"
                                data-sort="createdDate"
                              >
                                {t("Created Date")}
                              </th>
                              <th className="sort" data-sort="status">
                                {t("Delivery Status")}
                              </th>
                              <th className="sort" data-sort="action">
                                {t("Action")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((role) => (
                              <tr key={role.roleID}>
                                <td className="email">{role.roleName}</td>
                                <td className="description">
                                  {role.description}
                                </td>
                                <td className="date">
                                  {formatDate(role.createdDate)}
                                </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {t("Active")}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        // onClick={handleEditRoleClick}
                                        onClick={() =>
                                          handleEditRoleClick(role.roleID)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
                                        <FaPencilAlt color="white" />
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() =>
                                          handleDelete(role.roleID)
                                        }
                                      >
                                        <FaTrashAlt color="white" />
                                      </button>
                                    </div>
                                    <div className="view">
                                      <button
                                        className="btn btn-sm btn-success view-item-btn"
                                        onClick={() =>
                                          handleViewRoleClick(role.roleID)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
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
                            <h5 className="mt-2">
                              {t("Sorry! No Result Found")}
                            </h5>
                            <p className="text-muted mb-0">
                              {t(
                                " We've searched more than 150+ Orders We did not find any orders for you search."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredRoles.length}
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
      <RoleFormModal open={addRole} onClose={handleRoleCloseModal} />
      <EditRoleModal open={editRole} onClose={handleEditCloseModal} id={editRoleId}  />
      {viewRole &&
    <ViewRoleModal
      open={viewRole}
      onClose={handleViewCloseModal}
      id={viewRoleId}
    />
}
      </div>
    </React.Fragment>
  );
};
 
export default RoleGrid;