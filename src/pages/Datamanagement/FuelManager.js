import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/Common/PaginationNumber.js";
import { FuelContext } from "../../contexts/FuelContext.js";
import "../../assets/scss/CSS/DataManagement.css";
import { toast } from "react-toastify";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  Form,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { fuelTypesData, isPrimaryFuelTypes } from "../../utils/FuelData.js";

const FuelManager = () => {
  document.title = "MRV_PROJECT | Fuel Manager";
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const {
    fuels,
    removeFuel,
    setFuels,
    loading,
    fetchFuels,
    updateExistingFuel,
  } = useContext(FuelContext);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingFuel, setEditingFuel] = useState({});
  const [showUserDefined, setShowUserDefined] = useState(false);
  const [conversionFactorType, setConversionFactorType] = useState("NCV");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    fetchFuels();
  }, []);

  useEffect(() => {
    setSelectedFuelType(t("All Fuels"));
  }, []);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCheckboxChange = () => {
    setShowUserDefined(!showUserDefined);
  };

  const handleEdit = (fuel) => {
    setEditingRowId(fuel.fuelID);
    setEditingFuel({ ...fuel, isPrimaryFuel: fuel.isPrimaryFuel === true ? "Yes" : "No" });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditingFuel({});
  };

  const handleSave = async (fuelID) => {
    const updatedFuel = { ...editingFuel, fuelID: fuelID , isPrimaryFuel: editingFuel.isPrimaryFuel === "Yes" ? true : false};
    try {
      await updateExistingFuel(fuelID, updatedFuel);
      setFuels((prevFuels) =>
        prevFuels.map((fuel) =>
          fuel.fuelID === fuelID ? { ...fuel, ...updatedFuel } : fuel
        )
      );
      await fetchFuels();
      setEditingRowId(null);
      setEditingFuel({});
      toast.success("Fuel updated successfully");
    } catch (error) {
      toast.error("Error updating fuel");
    }
  };

  const handleInputChange = (e) => {
    setEditingFuel({
      ...editingFuel,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleClick = () => {
    setConversionFactorType((prevType) => (prevType === "NCV" ? "GCV" : "NCV"));
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelType(fuelType);
  };

  const handleDeleteClick = async (fuelId) => {
    try {
      await removeFuel(fuelId);
      setFuels(fuels.filter((fuel) => fuel.fuelID !== fuelId));
    } catch (error) {
      console.error("Error deleting fuel:", error);
    }
  };

  const filteredFuelData =
    selectedFuelType === "All Fuels"
      ? fuels
      : fuels?.filter((fuel) => fuel?.fuelType === selectedFuelType);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredFuelData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredFuels = sortedData?.filter((fuel) => {
    return (
      fuel?.fuelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fuel?.isPrimaryFuel ? "yes" : "no").includes(searchTerm.toLowerCase()) ||
      fuel?.fuelType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFuels.slice(indexOfFirstItem, indexOfLastItem);

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
                    {t("Fuel Manager")}
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <Button
                              color="success"
                              className="add-btn me-1"
                              onClick={() => Navigate("/create-fuel")}
                              id="create-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              {t("Add")}
                            </Button>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="button-box">
                              <input
                                type="checkbox"
                                id="userDefined"
                                checked={showUserDefined}
                                onChange={handleCheckboxChange}
                                style={{
                                  transform: "scale(1.5)",
                                  marginRight: "10px",
                                  width: "auto",
                                }}
                              />
                              <label
                                htmlFor="userDefined"
                                className="userdefined-label"
                              >
                                {t("Show user-defined fuels only")}
                              </label>
                            </div>
                            <div
                              className="side-button-box toggle-button"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "20px",
                              }}
                            >
                              <label className="conversionfactor">
                                {t("Conversion Factor Type")} :
                              </label>
                              <span>{t("NCV")}</span>
                              <div className="form-check form-switch custom-switch">
                                <input
                                  className="form-check-input form-switch"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  checked={conversionFactorType === "GCV"}
                                  onChange={handleToggleClick}
                                />
                              </div>
                              <span>{t("GCV")}</span>
                            </div>

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
                      <div
                        className="table-responsive table-card mt-3 mb-1"
                        style={{ padding: "20px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginBottom: "20px",
                          }}
                        >
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            className="btn-success"
                          >
                            <DropdownToggle caret>
                              {selectedFuelType}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() =>
                                  handleFuelTypeChange(t("All Fuels"))
                                }
                              >
                                {t("All Fuels")}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleFuelTypeChange(t("Liquid"))
                                }
                              >
                                {t("Liquid Fuels")}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleFuelTypeChange(t("Solid"))}
                              >
                                {t("Solid Fuels")}
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th onClick={() => handleSort("fuelName")}>
                                {t("Fuel Name")}
                              </th>
                              <th onClick={() => handleSort("isPrimaryFuel")}>
                                {t("Primary Fuel")}
                              </th>
                              <th>
                                {" "}
                                {conversionFactorType == "NCV"
                                  ? t("Net Calorific Value (TJ/Gg)")
                                  : t("Gross Calorific Value (TJ/Gg)")}
                              </th>
                              <th>
                                {conversionFactorType == "NCV"
                                  ? t("Carbon Content NCV")
                                  : t("Carbon Content GCV")}
                              </th>
                              <th onClick={() => handleSort("fuelType")}>
                                {t("Fuel Type")}
                              </th>
                              <th>{t("Actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems?.map((fuel) => (
                              <tr key={fuel.fuelID}>
                                <td>
                                  {" "}
                                  {editingRowId === fuel.fuelID ? (
                                    <Input
                                      type="text"
                                      name="fuelName"
                                      value={editingFuel.fuelName}
                                      onChange={handleInputChange}
                                    />
                                  ) : (
                                    fuel?.fuelName
                                  )}
                                </td>

                                <td>
                                  {editingRowId === fuel.fuelID ? (
                                    <select
                                      className="form-select"
                                      id="isPrimaryFuel"
                                      name="isPrimaryFuel"
                                      value={editingFuel.isPrimaryFuel}
                                      onChange={handleInputChange}
                                      aria-label="Default select example"
                                    >
                                      {isPrimaryFuelTypes.map((fuel) => (
                                        <option
                                          key={fuel.name}
                                          value={fuel.value}
                                        >
                                          {fuel.name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : fuel?.isPrimaryFuel ? (
                                    <span className="badge bg-success-subtle text-success text-uppercase">
                                      {t('Yes')}
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger-subtle text-danger text-uppercase">
                                    {t('No')}
                                  </span>
                                  )}
                                </td>
                                <td>
                                  {" "}
                                  {editingRowId === fuel.fuelID ? (
                                    <Input
                                      type="text"
                                      name={
                                        conversionFactorType === "NCV"
                                          ? "netCalorificValue"
                                          : "grossCalorificValue"
                                      }
                                      value={
                                        conversionFactorType === "NCV"
                                          ? editingFuel.netCalorificValue
                                          : editingFuel.grossCalorificValue
                                      }
                                      onChange={handleInputChange}
                                    />
                                  ) : conversionFactorType === "NCV" ? (
                                    fuel?.netCalorificValue
                                  ) : (
                                    fuel?.grossCalorificValue
                                  )}
                                </td>
                                <td>
                                  {editingRowId === fuel.fuelID ? (
                                    <Input
                                      type="text"
                                      name={
                                        conversionFactorType === "NCV"
                                          ? "carbonContentNCV"
                                          : "carbonContentGCV"
                                      }
                                      value={
                                        conversionFactorType === "NCV"
                                          ? editingFuel.carbonContentNCV
                                          : editingFuel.carbonContentGCV
                                      }
                                      onChange={handleInputChange}
                                    />
                                  ) : conversionFactorType === "NCV" ? (
                                    fuel?.carbonContentNCV
                                  ) : (
                                    fuel?.carbonContentGCV
                                  )}
                                </td>
                                <td>
                                  {editingRowId === fuel.fuelID ? (
                                    <select
                                      className="form-select"
                                      id="fuelType"
                                      name="fuelType"
                                      value={editingFuel.fuelType}
                                      onChange={handleInputChange}
                                      aria-label="Default select example"
                                    >
                                      <option value="">
                                        {t("Select Fuel Type")}
                                      </option>
                                      {fuelTypesData.map((fuel) => (
                                        <option
                                          key={fuel.name}
                                          value={fuel.name}
                                        >
                                          {fuel.name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    fuel?.fuelType
                                  )}
                                </td>
                                <td>
                                  {editingRowId === fuel.fuelID ? (
                                    <>
                                      <Button
                                        className="me-1"
                                        color="success"
                                        size="sm"
                                        onClick={() => handleSave(fuel.fuelID)}
                                      >
                                        <FaCheck color="white" />
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
                                    <>
                                      <Button
                                        className="btn btn-sm btn-info edit-item-btn me-1"
                                        onClick={() => handleEdit(fuel)}
                                      >
                                        <FaPencilAlt color="white" />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteClick(fuel.fuelID)
                                        }
                                        className="btn btn-sm btn-danger remove-item-btn"
                                      >
                                        <FaTrashAlt color="white" />
                                      </Button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={filteredFuels.length}
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

export default FuelManager;
