import React, { useContext, useEffect, useState, useMemo } from "react";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/Common/PaginationNumber.js";
import { formatDate } from "../../utils/formateDate.js";
import { UserContext } from '../../contexts/UserContext';
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

const UserGrid = ({ userPermissions }) => {
  document.title = "MRV_PROJECT | UserGrid";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { users, loading, removeUser, fetchAllUsers } =
    useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllUsers(userPermissions?.tenantID);
  }, [userPermissions]);

  const handleDelete = (id) => {
    setDeleteUserId(id); // Set the organization ID to delete
    setDeleteModal(true); // Show the modal
  };
  
  const confirmDelete = async () => {
    if (deleteUserId) {
      await removeUser(deleteUserId); // Call your deletion function with the correct org ID
      setDeleteModal(false); // Close the modal
      setDeleteUserId(null); // Clear the state
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user =>
      Object.keys(user).some(key =>
        user[key] && user[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedUsers, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(
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
                    Roles
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
                            onClick={() => navigate("/create-role")}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
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
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th
                                onClick={() => handleSort("userID")}
                                className="sort"
                                data-sort="userID"
                              >
                                {t("User ID")}
                              </th>
                              <th
                                onClick={() => handleSort("firstName")}
                                className="sort"
                                data-sort="firstName"
                              >
                                {" "}
                                {t("First Name")}
                              </th>
                              <th
                                onClick={() => handleSort("lastName")}
                                className="sort"
                                data-sort="lastName"
                              >
                                {" "}
                                {t("Last Name")}
                              </th>
                              <th
                                onClick={() => handleSort("email")}
                                className="sort"
                                data-sort="email"
                              >
                                {" "}
                                {t("Email")}
                              </th>
                              <th
                                onClick={() => handleSort("phone")}
                                className="sort"
                                data-sort="phone"
                              >
                                {" "}
                                {t("Phone")}
                              </th>
                              <th className="sort" data-sort="status">
                                Delivery Status
                              </th>
                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((user ) => (
                              <tr key={user.userID}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="id" style={{ display: "none" }}>
                                  <Link
                                    to="#"
                                    className="fw-medium link-primary"
                                  >
                                    #VZ2101
                                  </Link>
                                </td>
                                <td className="customer_name">
                                  {user.userID}
                                </td>
                                <td className="email">
                                  {user.firstName}
                                </td>
                                <td className="description">
                                {user.lastName}
                                </td>
                                <td className="date">
                                  {user.email}
                                </td>
                                <td className="date">
                                  {user.phone}
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
                                        onClick={() =>
                                          navigate(
                                            `/edit-user/${user.userID}`
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
                                          handleDelete(user.userID)}
                                      >
                                        <FaTrashAlt color="white" />
                                      </button>
                                    </div>
                                    <div className="view">
                                      <button
                                        className="btn btn-sm btn-success view-item-btn"
                                        onClick={() =>
                                          navigate(
                                            `/view-user/${user.userID}`
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
                      totalItems={filteredUsers.length}
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

export default UserGrid;
