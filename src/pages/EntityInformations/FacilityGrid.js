import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/CommonComponents/PaginationNumber";
import SearchBar from "../../Components/CommonComponents/SearchBar";
import DataTable from "../../Components/CommonComponents/DataTable";
import DeleteModal from "../../Components/CommonComponents/DeleteModal";
import { RoleContext } from "../../contexts/RoleContext";
import { Spinner, Button, Card, CardBody, Col, Container, Row, CardHeader } from "reactstrap";
import { formatDate } from "../../utils/formateDate";
import '../../assets/scss/CSS/styles.css';

const FacilityGrid = () => {
  document.title = "MRV_PROJECT | Facility Grid";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roles, loading, removeRole, fetchAllRoles } = useContext(RoleContext);
  const {power} = useParams();


  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
  useEffect(() => {
    fetchAllRoles(userPermissions?.tenantID);
  }, []);

  const handleDelete = (id) => {
    setDeleteRoleId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteRoleId) {
      await removeRole(deleteRoleId, userPermissions.tenantID);
      fetchAllRoles(userPermissions?.tenantID);
      setDeleteModal(false);
      setDeleteRoleId(null);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const filteredRoles = roles
    .filter(
      (role) =>
        role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

  const currentItems = filteredRoles?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: "Facility(Plant Name)", label: t("Facility(Plant Name)"), sortable: true },
    { key: "Sector", label: t("Sector"), sortable: true },
    { key: "Sub Category", label: t("Sub Category"), sortable: true},
    { key: "Calendar Year", label: t("Calendar Year"), sortable: true},
    { key: "Calculation Approach", label: t("Calculation Approach"), sortable: true},
    { key: "Status", label: t("Status"), sortable: true},
    { key: "Actions", label: t("Actions"), render: (val, item) => (
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-info" onClick={() => {}}>
          <i className="ri-pencil-line" />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() =>{} }>
          <i className="ri-delete-bin-line" />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() =>{} }>
          <i className="ri-delete-bin-line" />
        </button>
      </div>
    ) },
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
                    className="card-title mb-0 cardTitle"
                  >
                   {t('Facility/Company Information')}
                  </h4>
                </CardHeader>
            <CardBody>
            <div className="listjs-table" id="customerList">
              <Row className="g-4 mb-3">
                      <Col className="col-sm">
                  <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} placeholder={t("Search...")} />
                </Col>
                <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => navigate(`/add-facility/${power}`)}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            {t('Add Facility')}
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
                <DataTable
                  data={currentItems}
                  columns={columns}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  onAction={(action, item) => {
                    if (action === "edit") navigate(`/edit-role/${item.roleID}`);
                    if (action === "delete") handleDelete(item.roleID);
                    if (action === "view") navigate(`/view-role/${item.roleID}`);
                  }}
                />
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalItems={filteredRoles.length}
                paginate={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
                t={t}
              />
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <DeleteModal show={deleteModal} onDeleteClick={confirmDelete} onCloseClick={() => setDeleteModal(false)} />
    </Container>
  </div>
    </React.Fragment>
  );
};

export default FacilityGrid;
