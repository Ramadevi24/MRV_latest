import React, { useState, useContext } from "react";
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
  UncontrolledAlert,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/CommonComponents/PaginationNumber.js";
import { PermissionContext } from "../contexts/PermissionContext";

const SamplePage = () => {
  document.title = "MRV_PROJECT | Sample Page";
  const [expandedRows, setExpandedRows] = useState({});
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useContext(PermissionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const data = [
    {
      srNo: "01",
      id: "VLZ-452",
      purchaseId: "VLZ1400087402",
      title: "Post launch reminder/ post list",
      user: "Joseph Parker",
      assignedTo: "Alexis Clarke",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
      details: [
        {
          subId: "1.1",
          description: "Sub item 1 description",
          value: "Sub value 1",
        },
        {
          subId: "1.2",
          description: "Sub item 2 description",
          value: "Sub value 2",
        },
      ],
    },
    {
      srNo: "02",
      id: "VLZ-452",
      purchaseId: "VLZ1400087402",
      title: "Post launch reminder/ post list",
      user: "Joseph Parker",
      assignedTo: "Alexis Clarke",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "low",
      details: [
        {
          subId: "2.1",
          description: "Sub item 1 description",
          value: "Sub value 1",
        },
        {
          subId: "2.2",
          description: "Sub item 2 description",
          value: "Sub value 2",
        },
      ],
    },
    // Add other data objects similarly
  ];

  const toggleRowExpansion = (srNo) => {
    setExpandedRows((prev) => ({
      ...prev,
      [srNo]: !prev[srNo],
    }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <Row>
                  <Col xl={6}></Col>
                  <Col xl={6}>
                    <UncontrolledAlert
                      color="success"
                      className="alert-label-icon label-arrow "
                    >
                      <i className="ri-notification-off-line label-icon"></i>
                      <strong>Success</strong>
                      Label icon arrow alert
                    </UncontrolledAlert>

                    <UncontrolledAlert
                      color="danger"
                      className="alert-label-icon label-arrow mb-xl-0"
                    >
                      <i className="ri-error-warning-line label-icon"></i>
                      <strong>Danger</strong>
                      Label icon arrow alert
                    </UncontrolledAlert>
                  </Col>
                </Row>
                <CardHeader>
                  <h4
                    className="card-title mb-0"
                    style={{
                      color: "#0f6192",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Sample Page")}
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
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        id="example"
                        className="table table-bordered dt-responsive nowrap table-striped align-middle"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "10px" }}></th>
                            <th>SR No.</th>
                            <th>ID</th>
                            <th>Purchase ID</th>
                            <th>Title</th>
                            <th>User</th>
                            <th>Assigned To</th>
                            <th>Created By</th>
                            <th>Create Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                      toggleRowExpansion(item.srNo)
                                    }
                                  >
                                    {expandedRows[item.srNo] ? "-" : "+"}
                                  </button>
                                </td>
                                <td>{item.srNo}</td>
                                <td>{item.id}</td>
                                <td>{item.purchaseId}</td>
                                <td>{item.title}</td>
                                <td>{item.user}</td>
                                <td>{item.assignedTo}</td>
                                <td>{item.createdBy}</td>
                                <td>{item.createDate}</td>
                                <td>
                                  <span
                                    className={`badge bg-${getBadgeClass(
                                      item.status
                                    )} text-${getTextColor(item.status)}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`badge bg-${getPriorityBadgeClass(
                                      item.priority
                                    )}`}
                                  >
                                    {item.priority}
                                  </span>
                                </td>
                              </tr>
                              {expandedRows[item.srNo] && (
                                <tr>
                                  <td colSpan="11">
                                    <div className="nested-table">
                                      <h6>Details</h6>
                                      <table className="table table-bordered table-sm">
                                        <thead>
                                          <tr>
                                            <th>Sub ID</th>
                                            <th>Description</th>
                                            <th>Value</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {item.details.map(
                                            (detail, detailIndex) => (
                                              <tr key={detailIndex}>
                                                <td>{detail.subId}</td>
                                                <td>{detail.description}</td>
                                                <td>{detail.value}</td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
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

                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      totalItems={10}
                      paginate={10}
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

const getBadgeClass = (status) => {
  switch (status) {
    case "Re-open":
      return "info-subtle";
    case "On-Hold":
      return "secondary-subtle";
    case "Closed":
      return "danger-subtle";
    case "Inprogress":
      return "warning-subtle";
    case "Open":
      return "primary-subtle";
    case "New":
      return "success-subtle";
    default:
      return "secondary";
  }
};

const getTextColor = (status) => {
  switch (status) {
    case "Re-open":
      return "info";
    case "On-Hold":
      return "secondary";
    case "Closed":
      return "danger";
    case "Inprogress":
      return "warning";
    case "Open":
      return "primary";
    case "New":
      return "success";
    default:
      return "secondary";
  }
};

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case "High":
      return "danger";
    case "Medium":
      return "info";
    case "Low":
      return "success";
    default:
      return "secondary";
  }
};

export default SamplePage;
