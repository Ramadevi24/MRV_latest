import React, { useState, useContext } from "react";
import Modal from "../../Components/CommonComponents/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/formateDate";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Button, Container, Input } from "reactstrap";
import { Co2EquivalentContext } from "../../contexts/Co2EquivalentContext";

const EditCo2Modal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const {co2Equivalents} = useContext(Co2EquivalentContext);
  const [formValues, setFormValues] = useState({
    gasName: "",
    co2Value: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRow, setEditingRow] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const columns = [
    { key: "Gas", label: "Gas" },
    { key: "co2equivalent", label: "CO2 Equivalent" },
    { key: "remark", label: "Remark" },
    { key: "actions", label: "Actions" },
  ];

  const handleEditRow = (row) => {
    setEditingRowId(row.co2GasId);
    setEditingRow({ ...row });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAdding) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else {
      setEditingRow({
        ...editingRow,
        [name]: value,
      });
    }
  };

  const handleSaveRow = async () => {
    try {
      if (isAdding) {
        // Logic to add new data
        await addGas(formValues); // Assuming `addGas` is a defined function
        toast.success(t("Gas added successfully"), { autoClose: 3000 });
      } else {
        await updateEmirate(editingRowId, editingRow); // Assuming `updateEmirate` is defined
        toast.success(t("Row updated successfully"));
      }
      await fetchAllEmirates(); // Refresh the data
      setIsAdding(false);
      setEditingRowId(null);
      setFormValues({ gasName: "", co2Equivalent: "", remark: "" });
      setEditingRow({});
    } catch (error) {
      toast.error(isAdding ? t("Error adding Gas") : t("Error updating row"));
    }
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditingRow({});
  };

  const handleAddGas = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setFormValues({ gasName: "", co2Value: "", remarks: "" });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Modal size="lg" title="Add Gas" isOpen={open} onClose={onClose}>
            <div className="table-responsive table-card" style={{ padding: "20px" }}>
              <table className="table align-middle table-nowrap">
                <thead className="table-light">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className="sort">
                        {t(column.label)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {co2Equivalents?.map((item) => (
                    <tr key={item.co2GasId}>
                      <td>
                        {editingRowId === item.co2GasId ? (
                          <Input
                            type="text"
                            name="gasName"
                            value={editingRow.gasName || ""}
                            onChange={handleInputChange}
                            placeholder="Gas Name"
                          />
                        ) : (
                          item.gasName
                        )}
                      </td>
                      <td>
                        {editingRowId === item.co2GasId ? (
                          <Input
                            type="text"
                            name="co2Value"
                            value={editingRow.co2Value || ""}
                            onChange={handleInputChange}
                            placeholder="CO2 Equivalent"
                          />
                        ) : (
                          item.co2Value
                        )}
                      </td>
                      <td>
                        {editingRowId === item.co2GasId ? (
                          <Input
                            type="text"
                            name="remarks"
                            value={editingRow.remarks || ""}
                            onChange={handleInputChange}
                            placeholder="Remark"
                          />
                        ) : (
                          item.remarks
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          {editingRowId === item.co2GasId ? (
                            <>
                              <Button color="success" size="sm" onClick={handleSaveRow}>
                                <FaCheck color="white" />
                              </Button>
                              <Button color="danger" size="sm" onClick={handleCancelEdit}>
                                <FaXmark color="white" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                color="info"
                                size="sm"
                                onClick={() => handleEditRow(item)}
                              >
                                <FaPencilAlt color="white" />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDelete(item.co2GasId)}
                              >
                                <FaTrashAlt color="white" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {isAdding && (
                    <tr>
                      <td>
                        <Input
                          type="text"
                          name="gasName"
                          value={formValues.gasName}
                          onChange={handleInputChange}
                          placeholder="Gas Name"
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="co2Value"
                          value={formValues.co2Value}
                          onChange={handleInputChange}
                          placeholder="CO2 Equivalent"
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="remarks"
                          value={formValues.remarks}
                          onChange={handleInputChange}
                          placeholder="Remark"
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button color="success" size="sm" onClick={handleSaveRow}>
                            <FaCheck color="white" />
                          </Button>
                          <Button color="danger" size="sm" onClick={handleCancelAdd}>
                            <FaXmark color="white" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {!isAdding && (
                <div style={{ float: "right", marginBottom: "10px" }}>
                  <Button
                    style={{ backgroundColor: "#0066A4" }}
                    onClick={handleAddGas}
                  >
                    <i className="ri-add-line align-bottom me-1"></i> {t("Add Gas")}
                  </Button>
                </div>
              )}
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditCo2Modal;
