import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Col,
  Label,
  Input,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Button,
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
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "cleave.js/dist/addons/cleave-phone.in";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { formatDate } from "../../utils/formateDate";
import classnames from "classnames";

const CategoryCheckboxList = ({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const initializeCheckedItems = (categories) => {
      const initialCheckedItems = {};
      categories.forEach((category) => {
        if (selectedCategoryIds.includes(category.categoryID)) {
          initialCheckedItems[category.categoryID] = true;
        }
        if (category.subCategories?.$values?.length > 0) {
          Object.assign(
            initialCheckedItems,
            initializeCheckedItems(category.subCategories.$values)
          );
        }
      });
      return initialCheckedItems;
    };

    if (categories) {
      const initialCheckedItems = initializeCheckedItems(categories);
      setCheckedItems(initialCheckedItems);
    }
  }, [categories, selectedCategoryIds]);

  const handleCheckboxChange = (categoryId, isChecked, subCategories) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [categoryId]: isChecked,
      };

      const updateSubCategories = (subCategories, checked) => {
        if (subCategories && subCategories.$values.length > 0) {
          subCategories.$values.forEach((subCategory) => {
            updatedCheckedItems[subCategory.categoryID] = checked;
            updateSubCategories(subCategory.subCategories, checked);
          });
        }
      };

      if (subCategories) {
        updateSubCategories(subCategories, isChecked);
      }

      return updatedCheckedItems;
    });

    setSelectedCategoryIds((prevSelected) => {
      let updatedSelected = new Set([...prevSelected]);

      const updateSelectedIds = (categoryId, isChecked, subCategories) => {
        if (isChecked) {
          updatedSelected.add(categoryId);
        } else {
          updatedSelected.delete(categoryId);
        }

        if (subCategories && subCategories.$values.length > 0) {
          subCategories.$values.forEach((subCategory) => {
            updateSelectedIds(
              subCategory.categoryID,
              isChecked,
              subCategory.subCategories
            );
          });
        }
      };

      updateSelectedIds(categoryId, isChecked, subCategories);

      return Array.from(updatedSelected);
    });
  };

  const renderCategories = (categories) => {
    return categories
      .filter(
        (category) => category && category.categoryID && category.categoryName
      )
      .map((category) => {
        const hasSubCategories =
          category.subCategories &&
          category.subCategories.$values &&
          category.subCategories.$values.length > 0;

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
                cursor: "pointer",
                padding: "5px",
                borderRadius: "4px",
                transition: "background 0.2s",
                width: "fit-content",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                id={`category-${category.categoryID}`}
                checked={!!checkedItems[category.categoryID]}
                onChange={(e) =>
                  handleCheckboxChange(
                    category.categoryID,
                    e.target.checked,
                    category.subCategories
                  )
                }
                style={{
                  transform: "scale(1.2)",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor={`category-${category.categoryID}`}
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {category.categoryCode} - {category.categoryName}
              </label>
            </div>
            {hasSubCategories && renderCategories(category.subCategories.$values)}
          </div>
        );
      });
  };

  return (
    <div>
      {renderCategories(categories)}
    </div>
  );
};

const EditOrganization = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const {
    fetchAllCategories,
    categories,
    fetchOrganizationById,
    updateOrganizationProfile,
  } = useContext(OrganizationContext);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  
  const [isOrganizationTabActive, setIsOrganizationTabActive] = useState(
    localStorage.getItem("activeTab") === "categories" ? false : true
  );
  const [isCategoriesTabActive, setIsCategoriesTabActive] = useState(
    localStorage.getItem("activeTab") === "categories" ? true : false
  );

  const handleTabChange = (tab) => {
    if (tab === "organization") {
      setIsOrganizationTabActive(true);
      setIsCategoriesTabActive(false);
      localStorage.setItem("activeTab", "organization");
    } else if (tab === "categories") {
      setIsOrganizationTabActive(false);
      setIsCategoriesTabActive(true);
      localStorage.setItem("activeTab", "categories");
    }
  };

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
    validationSchema: Yup.object({
      organizationName: Yup.string().required(
        t("Please enter organization name")
      ),
      description: Yup.string().required(t("Please enter a description")),
      establishedDate: Yup.string().required(
        t("Please enter the established date")
      ),
      contactEmail: Yup.string()
        .email(t("Invalid email format"))
        .required(t("Please enter an email address")),
      contactPhone: Yup.string().required(t("Please enter a phone number")),
      address: Yup.string().required(t("Please enter your address")),
      categoryIDs: Yup.array().min(1, t("Please select at least one category")),
      locations: Yup.array().of(
        Yup.object().shape({
          latitude: Yup.string().required(t("Please enter latitude")),
          longitude: Yup.string().required(t("Please enter longitude")),
          address: Yup.string().required(t("Please enter location address")),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const updatedData = {
          ...values,
          organizationID: id,
        };
        await updateOrganizationProfile(id, updatedData); 
        toast.success(t("Organization updated successfully"), {
          autoClose: 2000,
        });
        navigate("/organizations");
      } catch (error) {
        toast.error(t(error.message || "Error updating organization"));
      }
    },
  });

  useEffect(() => {
    fetchAllCategories();
    fetchAllTenants();
  }, []);

  useEffect(() => {
    if (validation.values.categoryIDs.length) {
      validation.setFieldValue("categoryIDs", validation.values.categoryIDs);
    }
  }, [validation.values.categoryIDs]);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organization = await fetchOrganizationById(id);
        organization.establishedDate = formatDate(organization.establishedDate);

        const initialTenant =
          tenants &&
          tenants.find((tenant) => tenant.name === organization.tenantName);
        const tenantID = initialTenant ? initialTenant.tenantID : "";

        const normalizedLocations =
          organization.locations?.$values || organization.locations || [];

        const categoryIDs = organization.categories?.$values
          ?.map((categoryName) => findCategoryIds(categoryName, categories))
          .filter(Boolean);
          setSelectedCategoryIds(categoryIDs);

        validation.setValues({
          tenantID: userPermissions.tenantID || "", 
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


  const handleNext = () => {
    handleTabChange("categories");
  };

  const handleCategorySubmit = () => {
    validation.setFieldValue("categoryIDs", selectedCategoryIds, false);
    validation.handleSubmit();
  };

 
  const getAllChildIds = (category) => {
    let ids = [category.categoryID];
    category.subCategories?.$values?.forEach((subCategory) => {
      ids = [...ids, ...getAllChildIds(subCategory)];
    });
    return ids;
  };

  const findCategoryIds = (categoryName, categories) => {
    if (!categories || categories.length === 0) {
      return null;
    }

    let matchedCategory = null;
    for (const category of categories) {
      if (category.categoryName === categoryName) {
        return category.categoryID; // Return matched category ID
      }
      if (category.subCategories?.$values?.length) {
        matchedCategory = findCategoryIds(
          categoryName,
          category.subCategories.$values
        );
        if (matchedCategory) {
          return matchedCategory; // Return matched subcategory ID
        }
      }
    }
    return null; // Return null if no match found
  };


  useEffect(() => {
    fetchAllTenants();
    fetchAllCategories();
  }, []);

  const findCategoryNameById = (categoryID, categories) => {
    if (!categories || categories.length === 0) {
      return null;
    }

    for (const category of categories) {
      // Check if the category ID matches
      if (category.categoryID === categoryID) {
        return category.categoryName;
      }

      // Recursively search in subcategories
      if (category.subCategories?.$values?.length) {
        const subCategoryName = findCategoryNameById(
          categoryID,
          category.subCategories.$values
        );
        if (subCategoryName) {
          return subCategoryName; // Return matched subcategory name
        }
      }
    }
    return null; // Return null if no match found
  };

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
                    {t("Edit Organization")}
                  </h4>
                </CardHeader>

                <CardBody>
                  {/* <Nav
                    tabs
                    className="nav nav-tabs nav-justified nav-border-top nav-border-top-success mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        // className={classnames({ active: topBorderTab === "1" })}
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
                        // className={classnames({ active: topBorderTab === "2" })}
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
                    <TabPane tabId="1" id="nav-border-justified-home"> */}
                    <div className="tabs-container" style={{ display: "flex", marginBottom: "20px" }}>
                    {/* Organization Data Tab */}
                    <div
                      onClick={() => handleTabChange("organization")}
                      style={{
                        cursor: "pointer",
                        padding: "10px 20px",
                        borderTop: isOrganizationTabActive ? "3px solid #45CB85" : "3px solid transparent",
                        fontWeight: isOrganizationTabActive ? "bold" : "normal",
                        color: isOrganizationTabActive ? "#45CB85" : "#000",
                        background: isOrganizationTabActive ? "#eff2f7":""
                      }}
                    >
                      <i className="ri-home-5-line align-middle me-1"></i> Organization Data
                    </div>
                    
                    {/* Categories Tab */}
                    <div
                      onClick={() => handleTabChange("categories")}
                      style={{
                        cursor: "pointer",
                        padding: "10px 20px",
                        borderTop: isCategoriesTabActive ? "3px solid #45CB85" : "3px solid transparent",
                        fontWeight: isCategoriesTabActive ? "bold" : "normal",
                        color: isCategoriesTabActive ? "#45CB85" : "#000",
                        background: isCategoriesTabActive ? "#eff2f7":""
                      }}
                    >
                      <i className="ri-user-line me-1 align-middle"></i> Categories
                    </div>
                  </div>
                  <TabContent activeTab={isOrganizationTabActive ? "1" : "2"} >
{isOrganizationTabActive ?

                    <TabPane tabId="1" id="nav-border-justified-home">
                      <Form
                        className="needs-validation "
                        onSubmit={validation.handleSubmit}
                        style={{ marginTop: "3.5rem" }}
                      >
                        <Row>
                          {!userPermissions.tenantID && (
                            <Col>
                              <Label htmlFor="validationtenantid">
                                {t("Tenant ID")}
                                <span className="text-danger">*</span>
                              </Label>
                              <select
                                className={`form-select  ${
                                  validation.touched.tenantID &&
                                  validation.errors.tenantID
                                    ? "is-invalid"
                                    : ""
                                }`} // Add red border class if error
                                id="validationtenantid"
                                name="tenantID"
                                value={validation.values.tenantID} // Formik-controlled value
                                onChange={validation.handleChange} // Formik change handler
                                onBlur={validation.handleBlur} // Formik blur handler
                                aria-label="Default select example"
                              >
                                <option value="">{t("selectTenant")}</option>
                                {tenants?.map((tenant) => (
                                  <option
                                    key={tenant.tenantID}
                                    value={tenant.tenantID}
                                  >
                                    {tenant.name}
                                  </option>
                                ))}
                              </select>
                              {validation.touched.tenantID &&
                              validation.errors.tenantID ? (
                                <FormFeedback className="d-block">
                                  {validation.errors.tenantID}
                                </FormFeedback>
                              ) : null}
                            </Col>
                          )}
                          <Col>
                            <FormGroup>
                              <div className="mb-3">
                                <Label htmlFor="validationorganizationname">
                                  {t("Organization Name")}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Organization Name"
                                  id="validationorganizationname"
                                  name="organizationName"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={
                                    validation.values.organizationName || ""
                                  }
                                />
                                {validation.touched.organizationName &&
                                validation.errors.organizationName ? (
                                  <FormFeedback>
                                    {validation.errors.organizationName}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <FormGroup>
                              <div className="mb-3">
                                <Label htmlFor="Textarea">
                                  {t("Description")}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="textarea"
                                  className="form-control"
                                  id="Textarea"
                                  rows="3"
                                  name="description"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.description || ""}
                                />
                                {validation.touched.description &&
                                validation.errors.description ? (
                                  <FormFeedback>
                                    {validation.errors.description}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <div className="mb-3">
                                <Label htmlFor="establishdate">
                                  {t("Established Date")}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="date"
                                  name="establishedDate"
                                  id="establishdate"
                                  className="form-control"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={
                                    validation.values.establishedDate || ""
                                  }
                                />
                                {validation.touched.establishedDate &&
                                validation.errors.establishedDate ? (
                                  <FormFeedback>
                                    {validation.errors.establishedDate}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>
                          <Col>
                            <label
                              htmlFor="validationDefaultUsername"
                              className="form-label"
                            >
                              {t("Email")}
                              <span className="text-danger">*</span>
                            </label>
                            <InputGroup>
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend2"
                              >
                                @
                              </span>
                              <Input
                                type="email"
                                className="form-control"
                                id="emailadress"
                                name="contactEmail"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.contactEmail || ""}
                              />
                            </InputGroup>
                            {validation.touched.contactEmail &&
                            validation.errors.contactEmail ? (
                              <FormFeedback>
                                {validation.errors.contactEmail}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <div className="mb-3">
                                <Label htmlFor="phonenumberInput">
                                  {t("Phone Number")}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter phone number"
                                  id="phonenumberInput"
                                  name="contactPhone"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.contactPhone || ""}
                                />
                                {validation.touched.contactPhone &&
                                validation.errors.contactPhone ? (
                                  <FormFeedback>
                                    {validation.errors.contactPhone}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>
                 
                          <Col>
                            <FormGroup>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="addressinput"
                                >
                                  {t("Address")}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter Your Address"
                                  id="addressinput"
                                  name="address"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.address || ""}
                                />
                                {validation.touched.address &&
                                validation.errors.address ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.address}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Col>
                          <Label
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            {t("Location")}:
                          </Label>
                        </Col>

                        {validation.values.locations &&
                          validation.values.locations.length > 0 &&
                          validation.values.locations.map((location, index) => (
                            <Row key={index}>
                              <Col>
                                <div className="mb-3">
                                  <Label
                                    htmlFor={`latitude-${index}`}
                                    className="form-label"
                                  >
                                    {t("Latitude")}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Enter your Latitude")}
                                    id={`latitude-${index}`}
                                    onChange={validation.handleChange}
                                    name={`locations[${index}].latitude`}
                                    onBlur={validation.handleBlur}
                                    value={
                                      validation.values.locations[index]
                                        .latitude || ""
                                    }
                                  />
                                  {validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.latitude &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]
                                      ?.latitude && (
                                      <FormFeedback>
                                        {
                                          validation.errors.locations[index]
                                            .latitude
                                        }
                                      </FormFeedback>
                                    )}
                                </div>
                              </Col>

                              <Col>
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor={`longitude-${index}`}
                                  >
                                    {t("Longitude")}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Enter your Longitude")}
                                    id={`longitude-${index}`}
                                    onChange={validation.handleChange}
                                    name={`locations[${index}].longitude`}
                                    onBlur={validation.handleBlur}
                                    value={
                                      validation.values.locations[index]
                                        .longitude || ""
                                    }
                                  />
                                  {validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.longitude &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]
                                      ?.longitude && (
                                      <FormFeedback>
                                        {
                                          validation.errors.locations[index]
                                            .longitude
                                        }
                                      </FormFeedback>
                                    )}
                                </div>
                              </Col>

                              <Col>
                                <div className="mb-3">
                                  <Label
                                    htmlFor={`address-${index}`}
                                    className="form-label"
                                  >
                                    {t("Location Address")}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Enter Location Address")}
                                    id={`address-${index}`}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    name={`locations[${index}].address`}
                                    value={
                                      validation.values.locations[index]
                                        .address || ""
                                    }
                                  />
                                  {validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.address &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]
                                      ?.address && (
                                      <FormFeedback>
                                        {
                                          validation.errors.locations[index]
                                            .address
                                        }
                                      </FormFeedback>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          ))}

                        <div
                          className="d-flex justify-content-end  mt-3"
                          style={{ marginRight: "4rem" }}
                        >
                          <Button
                            type="submit"
                            color="success"
                            className="rounded-pill me-2"
                            onClick={handleNext}
                          >
                            {t("Next")}
                          </Button>
                          <Button
                            type="button"
                            color="danger"
                            className="rounded-pill"
                            onClick={() => history.back()}
                          >
                            {t("Cancel")}
                          </Button>
                        </div>
                      </Form>
                    </TabPane> :

                    <TabPane tabId="2" id="nav-border-justified-profile">
                      <Col>
                        <div className="mb-3" style={{ color: "black" }}>
                        <CategoryCheckboxList
                              categories={categories}
                              selectedCategoryIds={selectedCategoryIds}
                              setSelectedCategoryIds={setSelectedCategoryIds}
                            />
                        </div>
                      </Col>
                      <div
                        className="d-flex justify-content-end mt-3"
                        style={{ marginRight: "4rem" }}
                      >
                        <Button
                          type="submit"
                          color="success"
                          className="rounded-pill me-2"
                          onClick={handleCategorySubmit}
                        >
                          Submit
                        </Button>
                        <Button
                            type="button"
                            color="danger"
                            className="rounded-pill"
                            onClick={() =>     handleTabChange("organization")}
                            style={{ marginRight: "1rem" }}
                          >
                            Cancel
                          </Button>
                      </div>
                    </TabPane>
                    }
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

export default EditOrganization;
