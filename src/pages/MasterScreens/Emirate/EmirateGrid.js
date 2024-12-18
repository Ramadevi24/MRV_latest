import React, { useState, useContext, useEffect } from "react";
import { EmiratesContext } from "../../../contexts/EmiratesContext";
import TableGrid from "../common/TableGrid";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import AddEmirateModal from "./AddEmirateModal";

const EmirateGrid = () => {
const navigate = useNavigate();
  const { emirates, loading, deleteEmirate, fetchAllEmirates } = useContext(EmiratesContext);
  const [isEmirateModal, setIsEmirateModal] = useState(false);

  const handleCreateEmirate = () => {
    setIsEmirateModal(true);
  };

  const handleCloseEmirate = () => {
    setIsEmirateModal(false);
  };

  const handleEdit = (id) => {
    navigate(
        `/edit-emirate/${id}`
      )
  };

  const handleView = (id) => {
    console.log(`View tenant with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete tenant with id: ${id}`);
  };

  const formattedEmirates = emirates && emirates.map((emirate) => ({
    ...emirate,
    formattedCreatedDate: emirate.createdDate && formatDate(emirate.createdDate),
  }));

  const columns = [
    { key: "emiratesID", label: "ID" },
    { key: "name", label: "Name" },
    { key: "formattedCreatedDate", label: "Created Date" },
    {
         key: "actions",
         label: "Actions",
         render: (row) => (
           <div className="d-flex gap-2">
             <div className="edit">
               <button
                 className="btn btn-sm btn-info edit-item-btn"
                 onClick={() => handleEdit(row.emiratesID)}
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
                 onClick={() => handleDelete(row.emiratesID)}
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
      data={formattedEmirates}
      loading={loading}
      addbtn = {handleCreateEmirate}
      removeItem={deleteEmirate}
      fetchData={fetchAllEmirates}
      columns={columns}
      onEdit={handleEdit}
      onView={handleView}
      onDelete={handleDelete}
      title="Emirate Information"
    />
    <AddEmirateModal open={isEmirateModal} onClose={handleCloseEmirate}/>
    </>
  );
};

export default EmirateGrid;
