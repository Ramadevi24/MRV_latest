import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber.js";
import { PermissionContext } from "../../contexts/PermissionContext";
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
} from "reactstrap";

const PermissionGrid = () => {
  document.title = "MRV_PROJECT | PermissionGrid";
  const { t } = useTranslation();
  const {
    permissions,
    loading,
    fetchAllPermissions,
    updatePermissionProfile,
  } = useContext(PermissionContext);
  
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingPermission, setEditingPermission] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const handleEdit = (permission) => {
    setEditingRowId(permission.permissionID);
    setEditingPermission({ ...permission });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditingPermission({});
  };

  const handleSave = (PermissionID) => {
    const updatedPermission = { ...editingPermission,
      permissionID: PermissionID
     };
    updatePermissionProfile(PermissionID, updatedPermission); 
    fetchAllPermissions();
    setEditingRowId(null);
    setEditingPermission({});
  };

  const handleInputChange = (e) => {
    setEditingPermission({
      ...editingPermission,
      [e.target.name]: e.target.value,
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPermissions = [...permissions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredPermissions = sortedPermissions.filter((permission) =>
    permission.permissionDisplayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.permissionGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPermissions.slice(
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
                    {t('Permissions')}
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
                                onClick={() =>
                                  handleSort("permissionDisplayName")
                                }
                                className="sort"
                                data-sort="permissionDisplayName"
                              >
                                {t("Permission DisplayName")}
                              </th>
                              <th
                                onClick={() => handleSort("description")}
                                className="sort"
                                data-sort="description"
                              >
                                {t("Description")}
                              </th>
                              <th
                                onClick={() => handleSort("permissionGroup")}
                                className="sort"
                                data-sort="permissionGroup"
                              >
                                {t("Permission Group")}
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
                            {currentItems.map((permission) => (
                              <tr key={permission.permissionID}>
                                <td className="email">
                                  {editingRowId === permission.permissionID ? (
                                    <Input
                                      type="text"
                                      name="permissionDisplayName"
                                      value={editingPermission.permissionDisplayName}
                                      onChange={handleInputChange}
                                    />
                                  ) : (
                                    permission.permissionDisplayName
                                  )}
                                </td>
                                <td className="description">
                                  {editingRowId === permission.permissionID ? (
                                    <Input
                                      type="text"
                                      name="description"
                                      value={editingPermission.description}
                                      onChange={handleInputChange}
                                    />
                                  ) : (
                                    permission.description
                                  )}
                                </td>
                                <td className="date">
                                  {permission.permissionGroup}
                                </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {t("Active")}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    {editingRowId === permission.permissionID ? (
                                      <>
                                        <Button
                                          color="success"
                                          size="sm"
                                          onClick={()=>handleSave(permission.permissionID)}
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
                                      <Button
                                        className="btn btn-sm btn-info edit-item-btn"
                                        onClick={() => handleEdit(permission)}
                                      >
                                        <FaPencilAlt color="white" />
                                      </Button>
                                    )}
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
                                "We've searched more than 150+ Orders We did not find any orders for you search."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredPermissions.length}
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
    </React.Fragment>
  );
};

export default PermissionGrid;
