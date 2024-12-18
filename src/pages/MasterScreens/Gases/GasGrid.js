import React, { useContext, useState, useEffect } from "react";
import TableGrid from "../common/TableGrid";
import { useNavigate } from "react-router-dom";
import { GasContext } from "../../../contexts/GasContext";
import { formatDate } from "../../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import AddGasModal from "./AddGasModal";

const GasGrid = () => {
  const navigate = useNavigate();
  const { gases, loading, removeGas, fetchAllGases } = useContext(GasContext);
   const [isGasModal, setIsGasModal] = useState(false);
    
      const handleCreateGases = () => {
        setIsGasModal(true);
      };
    
      const handleCloseGases = () => {
        setIsGasModal(false);
      };
  


  const handleEdit = (id) => {
    navigate(`/edit-gases/${id}`);
  };

  const handleView = (id) => {
    console.log(`View tenant with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete tenant with id: ${id}`);
  };

  const formattedGases = gases.map((gas) => ({
    ...gas,
    formattedCreatedDate: gas.createdDate && formatDate(gas.createdDate),
  }));

  const columns = [
    { key: "gasid", label: "ID" },
    { key: "gasType", label: "Gas Type" },
    { key: "gasName", label: "Gas Name" },
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
      data={formattedGases}
      loading={loading}
      addbtn={handleCreateGases}
      removeItem={removeGas}
      fetchData={fetchAllGases}
      columns={columns}
      title="Gas Information"
    />
    <AddGasModal open ={isGasModal} onClose={handleCloseGases}/>
    </>
  );
};

export default GasGrid;
