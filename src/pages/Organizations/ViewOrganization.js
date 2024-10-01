import React, { useState, useContext, useEffect } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  Card,
  CardBody,
  CardHeader,
  Container,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik } from "formik";
import "cleave.js/dist/addons/cleave-phone.in";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { formatDate } from "../../utils/formateDate";

const ViewOrganization = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllCategories, categories, fetchOrganizationById } = useContext(OrganizationContext);
  const [topBorderTab, setTopBorderTab] = useState(() => {
    return localStorage.getItem("topBorderTab") || "1";
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenantID: "",
      organizationName: "",
      description: "",
      establishedDate: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      locations: [{ latitude: "", longitude: "", address: "" }],
      categoryIDs: [],
    },
  });

  useEffect(() => {
    fetchAllCategories();
    fetchAllTenants();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organization = await fetchOrganizationById(id);
        organization.establishedDate = formatDate(organization.establishedDate);

        const initialTenant = tenants && tenants.find(
          (tenant) => tenant.name === organization.tenantName
        );
        const tenantID = initialTenant ? initialTenant.tenantID : "";
        const normalizedLocations = organization.locations?.$values || organization.locations || [];
        const categoryIDs = organization.categories?.$values
          ?.map((categoryName) => findCategoryIds(categoryName, categories))
          .filter(Boolean);

        validation.setValues({
          tenantID: tenantID,
          organizationName: organization.organizationName || "",
          description: organization.description || "",
          establishedDate: organization.establishedDate || "",
          contactEmail: organization.contactEmail || "",
          contactPhone: organization.contactPhone || "",
          address: organization.address || "",
          locations: normalizedLocations,
          categoryIDs: categoryIDs || [],
        });
      } catch (error) {
        toast.error(t("Error fetching organization data"));
      }
    };
    fetchData();
  }, [id, categories, tenants]);

  const findCategoryIds = (categoryName, categories) => {
    if (!categories || categories.length === 0) {
      return null;
    }

    let matchedCategory = null;
    for (const category of categories) {
      if (category.categoryName === categoryName) {
        return category.categoryID;
      }

      if (category.subCategories?.$values?.length) {
        matchedCategory = findCategoryIds(
          categoryName,
          category.subCategories.$values
        );
        if (matchedCategory) {
          return matchedCategory;
        }
      }
    }
    return null;
  };

  const topBordertoggle = (tab) => {
    if (topBorderTab !== tab) {
      setTopBorderTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0" style={{ color: "#45CB85", fontSize: "20px", fontWeight: "bold" }}>
                    {t('View Organization')}
                  </h4>
                </CardHeader>
                <CardBody>
                  <Nav
                    tabs
                    className="nav nav-tabs nav-justified nav-border-top nav-border-top-success mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames("nav-link", {
                          active: topBorderTab === "1",
                        })}
                        onClick={() => {
                          topBordertoggle("1");
                        }}
                      >
                        <i className="ri-home-5-line align-middle me-1"></i>{" "}
                        Organization Data
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames("nav-link", {
                          active: topBorderTab === "2",
                        })}
                        onClick={() => {
                          topBordertoggle("2");
                        }}
                      >
                        <i className="ri-user-line me-1 align-middle"></i>{" "}
                        Categories
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={topBorderTab} className="text-muted">
                    <TabPane tabId="1" id="nav-border-justified-home">
                      <Form className="needs-validation" style={{ marginTop: '3.5rem' }}>
                        <Row>
                          {!userPermissions.tenantID && (
                            <Col>
                              <Label>
                                {t('Tenant ID')}<span className="text-danger">*</span>
                              </Label>
                              <select
                                name="tenantID"
                                defaultValue={validation.values.tenantID}
                                className="form-select"
                                disabled // Disable the dropdown
                              >
                                <option value="">{t("selectTenant")}</option>
                                {tenants.map((tenant) => (
                                  <option key={tenant.tenantID} value={tenant.tenantID}>
                                    {tenant.name}
                                  </option>
                                ))}
                              </select>
                            </Col>
                          )}
                          <Col>
                            <FormGroup>
                              <Label>
                                {t('Organization Name')}<span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                defaultValue={validation.values.organizationName || ""}
                                readOnly // Disable editing
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="Textarea">
                            {t('Description')}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="textarea"
                            rows="3"
                            defaultValue={validation.values.description || ""}
                            readOnly // Disable editing
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>
                            {t('Established Date')}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="date"
                            defaultValue={validation.values.establishedDate || ""}
                            readOnly // Disable editing
                          />
                        </FormGroup>
                      </Col>

                      <Col>
                        <Label>
                          {t('Email')}<span className="text-danger">*</span>
                        </Label>
                        <InputGroup>
                          <span className="input-group-text">@</span>
                          <Input
                            defaultValue={validation.values.contactEmail || ""}
                            readOnly // Disable editing
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>
                            {t('Phone Number')}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            defaultValue={validation.values.contactPhone || ""}
                            readOnly // Disable editing
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>
                            {t('Address')}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            defaultValue={validation.values.address || ""}
                            readOnly // Disable editing
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Col>
                      <Label style={{ fontSize: "18px", fontWeight: 'bold' }}>
                        {t('Location')}:
                      </Label>
                    </Col>

                    {validation.values.locations && validation.values.locations.length > 0 && 
                      validation.values.locations?.map((location, index) => (
                        <Row key={index}>
                          <Col>
                            <Label>
                              {t('Latitude')}<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              defaultValue={location.latitude || ""}
                              readOnly // Disable editing
                            />
                          </Col>
                          <Col>
                            <Label>
                              {t('Longitude')}<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              defaultValue={location.longitude || ""}
                              readOnly // Disable editing
                            />
                          </Col>
                          <Col>
                            <Label>
                              {t('Location Address')}<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              defaultValue={location.address || ""}
                              readOnly // Disable editing
                            />
                          </Col>
                        </Row>
                      ))}
                      </Form>
                    </TabPane>

                    <TabPane tabId="2" id="nav-border-justified-profile">
                      <Col>
                        <div className="mb-3" style={{ color: "black" }}>
                          <CategoryCheckboxList
                            categories={categories}
                            categoryIDs={validation.values.categoryIDs}
                            setCategoryIDs={() => {}} // Disabled, no updates to categories
                          />
                        </div>
                      </Col>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

// CategoryCheckboxList Component for View (with disabled checkboxes)
const CategoryCheckboxList = ({ categories, categoryIDs }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  // Handle folder (expand/collapse) toggle
  const handleFolderClick = (categoryId) => {
    setExpandedFolders((prevExpandedFolders) => ({
      ...prevExpandedFolders,
      [categoryId]: !prevExpandedFolders[categoryId],
    }));
  };

  // Render the category list recursively
  const renderCategories = (categories) => {
    return categories
      .filter((category) => category && category.categoryID && category.categoryName)
      .map((category) => {
        const hasSubCategories =
          category.subCategories && category.subCategories.$values.length > 0;

        return (
          <div
            key={category.categoryID}
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: hasSubCategories ? "pointer" : "default",
                padding: "5px",
                borderRadius: "4px",
                transition: "background 0.2s",
                width: "fit-content",
                userSelect: "none",
              }}
              onClick={() =>
                hasSubCategories && handleFolderClick(category.categoryID)
              }
            >
              <span
                style={{
                  marginRight: "10px",
                  fontSize: "20px",
                }}
              >
                {hasSubCategories
                  ? expandedFolders[category.categoryID]
                    ? "▼ 📂"
                    : "▶ 📁"
                  : "📄"}
              </span>
              <input
                type="checkbox"
                id={`category-${category.categoryID}`}
                checked={categoryIDs.includes(category.categoryID)}
                style={{
                  transform: "scale(1.2)",
                  marginRight: "10px",
                  cursor: "not-allowed",
                }}
              />
              <label
                htmlFor={`category-${category.categoryID}`}
                style={{
                  fontSize: "16px",
                }}
              >
                {category.categoryCode} - {category.categoryName}
              </label>
            </div>
            {hasSubCategories &&
              expandedFolders[category.categoryID] &&
              renderCategories(category.subCategories.$values)}
          </div>
        );
      });
  };

  return <div>{renderCategories(categories)}</div>;
};

export default ViewOrganization;
