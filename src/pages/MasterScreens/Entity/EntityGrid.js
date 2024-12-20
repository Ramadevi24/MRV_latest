import React, { useContext, useState, useEffect } from "react";
import { EntityContext } from "../../../contexts/EntityContext";
import { formatDate } from "../../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import AddEntityModal from "./AddEntityModal";
import DeleteModal from "../../../Components/CommonComponents/DeleteModal";
import { FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Pagination from "../../../Components/CommonComponents/PaginationNumber.js";
import { updateEntity } from "../../../services/EntityService.js";
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
import { toast } from "react-toastify";

const EntityGrid = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
      key: "name",
      direction: "ascending",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const { entity, loading, removeEntity, fetchAllEntity, updateExistingEntity } = useContext(EntityContext);
    const [isEntityModal, setIsEntityModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState(null);
      const [editingRowId, setEditingRowId] = useState(null);
      const [editingEntity, setEditingEntity] = useState({});
    
        const handleDelete = (id) => {
          setEntityToDelete(id);
          setDeleteModal(true);
        };
      
        const confirmDelete = async () => {
          if (entityToDelete) {
          await removeEntity(entityToDelete);
          await fetchAllEntity(); 
          setDeleteModal(false);
          setEntityToDelete(null);
          }
        };

        const handleSort = (key) => {
          let direction = "ascending";
          if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
          }
          setSortConfig({ key, direction });
        };
      
        const sortedData = [...entity].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });

        const filteredSortedData = sortedData?.filter((data) =>
          ["name",
            "contactDetails.name",
            "contactDetails.email",
            "contactDetails.phoneNumber", "contactDetails.title", "createdDate"].some((key) =>
            data[key].toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      
        const indexOfLastPage = currentPage * dataPerPage;
        const indexOfFirstPage = indexOfLastPage - dataPerPage;
        const currentData = filteredSortedData.slice(
          indexOfFirstPage,
          indexOfLastPage
        );

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        const handleEditRow = (row) => {
          setEditingRowId(row.entityID);
          setEditingEntity({ ...row });
        };
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
        
          if (name.startsWith("contactDetails.")) {
            // Handle nested fields in contactDetails
            const field = name.split(".")[1];
            setEditingEntity((prev) => ({
              ...prev,
              contactDetails: {
                ...prev.contactDetails,
                [field]: value,
              },
            }));
          } else {
            // Handle top-level fields
            setEditingEntity((prev) => ({
              ...prev,
              [name]: value,
            }));
          }
        };
        

          const handleSaveRow = async () => {
            try {
              await updateExistingEntity(editingRowId, editingEntity);
              await fetchAllEntity();
              setEditingRowId(null);
              setEditingEntity({});
              toast.success("Entity updated successfully");
            } catch (error) {
              toast.error("Error updating Entity");
            }
          };

          const handleCancelEdit = () => {
            setEditingRowId(null);
            setEditingEntity({});
          };
        
      
  
    const handleCreateEntity = () => {
      setIsEntityModal(true);
    };
  
    const handleCloseEntity = () => {
      setIsEntityModal(false);
    };

  const columns = [
    { key: "entityID", label: "ID" },
    { key: "name", label: "Entity" },
    { key: "contactDetails.name", label: "Contact Name" },
    { key: "contactDetails.email", label: "Contact Email" },
    { key: "contactDetails.phoneNumber", label: "Contact Phone" },
    {key:"contactDetails.title", label:"Contact Title"},
    { key: "createdDate", label: "Created Date" },
     {
          key: "actions",
          label: "Actions",
        },
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
                    color: "#45CB85",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {t("Entity Information")}
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
                          onClick={handleCreateEntity}
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
                          {currentData.map((item) => (
                            <tr key={item.entityID}>
                              <td className="name">{item.entityID}</td>
                              <td className="name">
                                {editingRowId === item.entityID ? (
                                  <Input
                                    type="text"
                                    name="name"
                                    value={editingEntity.name}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  item.name
                                )}
                              </td>
                              <td className="createdDate">
                                {editingRowId === item.entityID ? (
                                  <Input
                                    type="text"
                                    name="contactDetails.name"
                                    value={editingEntity.contactDetails?.name || ""}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  item.contactDetails.name
                                )}
                              </td>
                              <td className="createdDate">
                                {editingRowId === item.entityID ? (
                                  <Input
                                    type="text"
                                    name="contactDetails.email"
                                    value={editingEntity.contactDetails.email}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  item.contactDetails.email
                                )}
                              </td>
                              <td className="createdDate">
                                {editingRowId === item.entityID ? (
                                  <Input
                                    type="text"
                                    name="contactDetails.phoneNumber"
                                    value={editingEntity.contactDetails.phoneNumber}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  item.contactDetails.phoneNumber
                                )}
                              </td>
                              <td className="createdDate">
                                {editingRowId === item.entityID ? (
                                  <Input
                                    type="text"
                                    name="contactDetails.title"
                                    value={editingEntity.contactDetails.title}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  item.contactDetails.title
                                )}
                              </td>
                              <td className="createdDate">
                                {formatDate(item.createdDate)}
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  {editingRowId === item.entityID ? (
                                    <>
                                      <Button
                                        color="success"
                                        size="sm"
                                        onClick={() =>
                                          handleSaveRow(item.entityToDelete)
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
                                          onClick={() => handleEditRow(item)}
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
                                            handleDelete(item.entityID)
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
    <AddEntityModal open={isEntityModal} onClose={handleCloseEntity}/>
         <DeleteModal
                show={deleteModal}
                onDeleteClick={confirmDelete}
                onCloseClick={() => setDeleteModal(false)}
              />
     </div>
       </React.Fragment>
  );
};

export default EntityGrid;
