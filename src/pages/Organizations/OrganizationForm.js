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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "cleave.js/dist/addons/cleave-phone.in";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import classnames from "classnames";

const OrganizationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllCategories, categories, addOrganization } =
    useContext(OrganizationContext);


    const [isOrganizationTabActive, setIsOrganizationTabActive] = useState(true);
    const [isCategoriesTabActive, setIsCategoriesTabActive] = useState(false);

    // const [topBorderTab, setTopBorderTab] = useState(() => {
    //   return localStorage.getItem("topBorderTab") || "1";
    // });
  
    // Sync with localStorage when the state changes
    // useEffect(() => {
    //   localStorage.setItem("topBorderTab", topBorderTab);
    // }, [topBorderTab]);
  
    // // Handle tab click and set the state
    // const topBordertoggle = (tab) => {
    //   if (topBorderTab !== tab) {
    //     setTopBorderTab(tab);
    //   }
    // };
    // Handle tab change
  const handleTabChange = (tab) => {
    if (tab === "organization") {
      setIsOrganizationTabActive(true);
      setIsCategoriesTabActive(false);
    } else if (tab === "categories") {
      setIsOrganizationTabActive(false);
      setIsCategoriesTabActive(true);
    }
  };

    const CategoryCheckboxList = ({ categories, categoryIDs, setCategoryIDs }) => {
      const [expandedFolders, setExpandedFolders] = useState({});
    
      // Recursively get all subcategory IDs
      const getAllSubCategoryIDs = (category) => {
        let ids = [category.categoryID];
        if (category.subCategories && category.subCategories.$values.length > 0) {
          category.subCategories.$values.forEach((subCategory) => {
            ids = ids.concat(getAllSubCategoryIDs(subCategory));
          });
        }
        return ids;
      };
    
      // Handle checkbox change
      const handleCheckboxChange = useCallback(
        (category, isChecked) => {
          const updatedCategoryIDs = new Set(categoryIDs);
    
          if (isChecked) {
            // Add the current category and all subcategories
            const allCategoryIDs = getAllSubCategoryIDs(category);
            allCategoryIDs.forEach((id) => updatedCategoryIDs.add(id));
    
            // Ensure all parent categories are also selected
            let parent = category.parent;
            while (parent) {
              updatedCategoryIDs.add(parent.categoryID);
              parent = parent.parent;
            }
          } else {
            // Remove the current category and all subcategories
            const allCategoryIDs = getAllSubCategoryIDs(category);
            allCategoryIDs.forEach((id) => updatedCategoryIDs.delete(id));
          }
    
          setCategoryIDs([...updatedCategoryIDs]);
        },
        [categoryIDs, setCategoryIDs]
      );
    
      // Handle folder (expand/collapse) toggle
      const handleFolderClick = useCallback((categoryId, e) => {
        // Prevent checkbox from toggling folder
        e.stopPropagation();
        setExpandedFolders((prevExpandedFolders) => ({
          ...prevExpandedFolders,
          [categoryId]: !prevExpandedFolders[categoryId],
        }));
      }, []);
    
      // Render the category list recursively
      const renderCategories = useCallback(
        (categories) => {
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
                    onClick={(e) =>
                      hasSubCategories && handleFolderClick(category.categoryID, e)
                    }
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent dropdown from closing on checkbox click
                      }}
                      onChange={(e) => {
                        handleCheckboxChange(category, e.target.checked);
                      }}
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
                      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on label click
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
        },
        [expandedFolders, handleFolderClick, handleCheckboxChange, categoryIDs]
      );
    
      return <div>{renderCategories(categories)}</div>;
    };
    
    const handleSubmit = async () => {
      await validation.setFieldValue('categoryIDs', formData.categoryIDs);
      validation.submitForm();
    };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenantID: userPermissions.tenantID || "",
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
          address: Yup.string().required(t("Please Enter Location Address")),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log("Values before submission:", values.categoryIDs);
    
      const updatedValues = {
        ...values,
        categoryIDs: values.categoryIDs
      };
    
      console.log("Payload being sent:", updatedValues);
    
      try {
        await addOrganization(values);
        toast.success(t("Organization created successfully"), {
          autoClose: 2000,
        });
        navigate("/organizations");
      } catch (error) {
        toast.error(t("createError"));
      }
    },
  });

  const [formData, setFormData] = useState(validation.initialValues);

  const handleNext = () => {
    setFormData(validation.values);
    // topBordertoggle("2");
    handleTabChange("categories");

    
    
  };
 
  
  
  

  useEffect(() => {
    fetchAllTenants();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      validation.setFieldValue("categoryIDs", validation.values.categoryIDs);
    }
  }, [categories]);

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
                    {t("Add Organization")}
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
                        className={classnames("nav-link", { active: topBorderTab === "1" })}
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
                        className={classnames("nav-link", { active: topBorderTab === "2" })}
                        onClick={() => {
                          topBordertoggle("2");
                        }}
                      >
                        <i className="ri-user-line me-1 align-middle"></i>{" "}
                        Categories
                      </NavLink>
                    </NavItem>
                  </Nav> */}

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
                      <Form onSubmit={validation.handleSubmit}
                        className="needs-validation"
                        // onSubmit={(e) => {
                        //   e.preventDefault();
                        //   validation.handleSubmit();
                        // }}
                        // style={{ marginTop: "3.5rem" }}
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
                                invalid={
                                  validation.touched.tenantID &&
                                  validation.errors.tenantID
                                    ? true
                                    : false
                                } // Validation state
                              >
                                <option value="">{t("selectTenant")}</option>
                                {tenants.map((tenant) => (
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
                                  placeholder={t("Enter Organization Name")}
                                  id="validationorganizationname"
                                  name="organizationName"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={
                                    validation.values.organizationName || ""
                                  }
                                  invalid={
                                    validation.touched.organizationName &&
                                    validation.errors.organizationName
                                      ? true
                                      : false
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
                                  invalid={
                                    validation.touched.description &&
                                    validation.errors.description
                                      ? true
                                      : false
                                  }
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
                                  invalid={
                                    validation.touched.establishedDate &&
                                    validation.errors.establishedDate
                                      ? true
                                      : false
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

                          {/*       
          <Col md={6}>
            <FormGroup>
              <div className="mb-3">
                <Label htmlFor="emailadress">Email Address<span className="text-danger">*</span></Label>
                <Input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  id="emailadress"
                  name="Emailaddress"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Emailaddress || ""}
                  invalid={validation.touched.Emailaddress && validation.errors.Emailaddress ? true : false}
                />
                {validation.touched.Emailaddress && validation.errors.Emailaddress ? (
                  <FormFeedback>{validation.errors.Emailaddress}</FormFeedback>
                ) : null}
              </div>
            </FormGroup>
          </Col> */}
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
                                invalid={
                                  validation.touched.contactEmail &&
                                  validation.errors.contactEmail
                                    ? true
                                    : false
                                }
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
                                  placeholder={t("Enter phone number")}
                                  id="phonenumberInput"
                                  name="contactPhone"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.contactPhone || ""}
                                  invalid={
                                    validation.touched.contactPhone &&
                                    validation.errors.contactPhone
                                      ? true
                                      : false
                                  }
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
                                  placeholder={t("Enter Your Address")}
                                  id="addressinput"
                                  name="address"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.address || ""}
                                  invalid={
                                    validation.touched.address &&
                                    validation.errors.address
                                      ? true
                                      : false
                                  }
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
                        <Row></Row>
                        <Col>
                          <Label
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            {t("Location")}:
                          </Label>
                        </Col>
                        {validation.values.locations.map((location, index) => (
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
                                  invalid={
                                    validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.latitude &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]?.latitude
                                      ? true
                                      : false
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
                                  invalid={
                                    validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.longitude &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]
                                      ?.longitude
                                      ? true
                                      : false
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
                                  invalid={
                                    validation.touched.locations &&
                                    validation.touched.locations[index]
                                      ?.address &&
                                    validation.errors.locations &&
                                    validation.errors.locations[index]?.address
                                      ? true
                                      : false
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
                          className="d-flex justify-content-end mt-3"
                          style={{ marginRight: "4rem" }}
                        >
                          <Button
                            type="button"
                            color="success"
                            className="rounded-pill me-2"
                            onClick={handleNext}
                          >
                            Next
                          </Button>
                          <Button
                            type="button"
                            color="danger"
                            className="rounded-pill"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    </TabPane> :

                    <TabPane tabId="2" id="nav-border-justified-profile">
                      <Col>
                        <div className="mb-3" style={{ color: "black" }}>
                        <CategoryCheckboxList
                            categories={categories}
                            categoryIDs={validation.values.categoryIDs}
                            setCategoryIDs={async (newCategoryIDs) => {
                              console.log("Updated category IDs:", newCategoryIDs);
                              await validation.setFieldValue("categoryIDs", newCategoryIDs);
                            }}
                          />
                        </div>
                      </Col>
                      <div
                        className="d-flex justify-content-end mt-3"
                        style={{ marginRight: "4rem" }}
               
                      >
                             <Button
                            type="button"
                            color="danger"
                            className="rounded-pill"
                            onClick={() =>     handleTabChange("organization")}
                            style={{ marginRight: "1rem" }}
                          >
                            Cancel
                          </Button>
                        <Button
                          type="submit"
                          color="success"
                          className="rounded-pill me-2"
                          // onClick={(e) => validation.handleSubmit()}
                          onClick={() => {
                            validation.handleSubmit();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </TabPane>}
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

export default OrganizationForm;
