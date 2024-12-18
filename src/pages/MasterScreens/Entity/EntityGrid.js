import React, { useContext, useState, useEffect } from "react";
import { EntityContext } from "../../../contexts/EntityContext";
import TableGrid from "../common/TableGrid";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import AddEntityModal from "./AddEntityModal";
const EntityGrid = () => {
const navigate = useNavigate();
  const { entity, loading, removeEntity, fetchAllEntity } = useContext(EntityContext);
    const [isEntityModal, setIsEntityModal] = useState(false);
  
    const handleCreateEntity = () => {
      setIsEntityModal(true);
    };
  
    const handleCloseEntity = () => {
      setIsEntityModal(false);
    };



  const handleEdit = (id) => {
    navigate(
        `/edit-entity/${id}`
      )
  };

  const handleView = (id) => {
    console.log(`View tenant with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete tenant with id: ${id}`);
  };

  const formattedEntity = entity.map((entityData) => ({
    ...entityData,
    formattedCreatedDate: entityData.createdDate && formatDate(entityData.createdDate),
  }));

  const columns = [
    { key: "entityID", label: "ID" },
    { key: "name", label: "Entity" },
    { key: "contactDetails.name", label: "Contact Name" },
    { key: "contactDetails.email", label: "Contact Email" },
    { key: "contactDetails.phoneNumber", label: "Contact Phone" },
    { key: "formattedCreatedDate", label: "Created Date" },
     {
          key: "actions",
          label: "Actions",
          render: (row) => (
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-info edit-item-btn"
                  onClick={() => handleEdit(row.gasid)}
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
                  onClick={() => handleDelete(row.gasid)}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                >
                  <FaTrashAlt color="white" />
                </button>
              </div>
            </div>
          ),
        },
  ];

  return (
    <>
    <TableGrid
      data={formattedEntity}
      loading={loading}
      addbtn = {handleCreateEntity}
      removeItem={removeEntity}
      fetchData={fetchAllEntity}
      columns={columns}
      onEdit={handleEdit}
      onView={handleView}
      onDelete={handleDelete}
      title="Entity Information"
    />
    <AddEntityModal open={isEntityModal} onClose={handleCloseEntity}/>
    </>
  );
};

export default EntityGrid;
