import React, { useState, useContext, useEffect } from "react";
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
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import "cleave.js/dist/addons/cleave-phone.in";
import { TenantContext } from "../../contexts/TenantContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { formatDate } from "../../utils/formateDate";

const customStyles = (hasError) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: hasError ? "red" : provided.borderColor, // Change border color to red if there's an error
    // '&:hover': {
    //   borderColor: hasError ? 'red' : provided.borderColor // Red border on hover if error exists
    // }
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "white", // Text color of the selected item
  }),
});

// const SingleOptions = [
//   { value: "Choices 1", label: "Choices 1" },
//   { value: "Choices 2", label: "Choices 2" },
//   { value: "Choices 3", label: "Choices 3" },
//   { value: "Choices 4", label: "Choices 4" },
// ];

const EditOrganization = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
  const [selectedMulti, setselectedMulti] = useState(null);
  const { fetchAllTenants, tenants } = useContext(TenantContext);
  const { fetchAllCategories, categories, fetchOrganizationById, updateOrganizationProfile } = useContext(OrganizationContext);
  const [checkedItems, setCheckedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organization = await fetchOrganizationById(id);
        organization.establishedDate = formatDate(organization.establishedDate);

        const categoryIDs = organization.categories.$values
          .map((categoryName) => findCategoryIds(categoryName, categories))
          .filter(Boolean);
          validation.setValues({ ...organization, categoryIDs });
        setCheckedItems(categoryIDs);
        fetchAllTenants(organization.tenantName); 
       console.log("organization: ", organization);
        validation.setValues({
          tenantID: organization.tenantID || "",
          organizationName: organization.organizationName || "",
          description: organization.description || "",
          establishedDate: organization.establishedDate || "",
          contactEmail: organization.contactEmail || "",
          contactPhone: organization.contactPhone || "",
          address: organization.address || "",
          locations: organization.locations || [{ latitude: "", longitude: "", address: "" }],
          categoryIDs: organization.categories.$values || [],
        });
        setCheckedItems(organization.categories.$values || []); // Pre-check the categories
      } catch (error) {
        toast.error(t("Error fetching organization data"));
      }
    };
    fetchData();
    fetchAllTenants();
    fetchAllCategories();
  }, [id]);

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
      tenantID: Yup.string().required(t("Please select a Tenant ID")),
      organizationName: Yup.string().required(t("Please enter organization name")),
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
        await updateOrganizationProfile(id, values); // Send the updated data to the backend
        toast.success(t("Organization updated successfully"), {
          autoClose: 2000,
        });
        navigate("/organizations");
      } catch (error) {
        toast.error(t("Error updating organization"));
      }
    },
  });

  const handleMultiSelectChange = (selectedOptions) => {
    validation.setFieldValue("categoryIDs", selectedOptions); // Update the form value for multi-select
  };

  //   function handleMulti(selectedMulti) {
  //     setselectedMulti(selectedMulti);
  // }

  const handleCheck = (category) => {
    const allChildIds = getAllChildIds(category);
    setCheckedItems((prev) => {
      const newCheckedItems = allChildIds.every((id) => prev.includes(id))
        ? prev.filter((id) => !allChildIds.includes(id))
        : [...new Set([...prev, ...allChildIds])];
      validation.setFieldValue("categoryIDs", newCheckedItems);
      return newCheckedItems;
    });
  };

  const handleExpand = (categoryId) => {
    setExpandedItems((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
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
        console.log("category: ", category.categoryName);
        console.log("categoryName: ", categoryName);
        return category.categoryID; // Return matched category ID
      }

      // If subcategories exist, search within them recursively
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

  const CheckboxTree = ({
    data,
    checkedItems,
    expandedItems,
    handleCheck,
    handleExpand,
  }) => (
    console.log(data, "data"),
    console.log(checkedItems, "checkedItems"),
    <div style={{ paddingLeft: "20px" }}>
      {data
        ?.filter((category) => category.categoryName && category.categoryCode)
        ?.map((item) => (
          <div key={item.categoryID} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.subCategories && (
                <span
                  onClick={() => handleExpand(item.categoryID)}
                  style={{ cursor: "pointer", marginRight: "8px" }}
                >
                  {expandedItems.includes(item.categoryID) ? "▼" : "▶"}
                </span>
              )}
              <input
                type="checkbox"
                checked={checkedItems.includes(item.categoryID)}
                onChange={() => handleCheck(item)}
                style={{
                  marginRight: "8px",
                  marginTop: "-5px",
                  width: "20px",
                  transform: "scale(1.3)",
                }}
              />
              <label>{`${item.categoryCode} - ${item.categoryName}`}</label>
            </div>
            {item.subCategories && expandedItems.includes(item.categoryID) && (
              <CheckboxTree
                data={item.subCategories.$values}
                checkedItems={checkedItems}
                expandedItems={expandedItems}
                handleCheck={handleCheck}
                handleExpand={handleExpand}
              />
            )}
          </div>
        ))}
    </div>
  );

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
                 {t('Edit Organization')}
                  </h4>
                </CardHeader>

                <CardBody>
                  {/* <div style={{ margin: '5rem 1rem' }}> */}

                  {/* <CardHeader className="ribbon-box" style={{padding:"2rem"}}>
                <h2 className="ribbon ribbon-success ribbon-shape" style={{fontSize:'20px', padding:"10px"}}>Add Organization</h2>
                </CardHeader> */}

                  <Form
                    className="needs-validation "
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}
                    style={{marginTop:'3.5rem'}}
                  >
                    <Row>
                    {!userPermissions.tenantID && (
                      <Col lg={6}>
                        <Label htmlFor="validationtenantid">
                         {t('Tenant ID')}<span className="text-danger">*</span>
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
                      <Col md={6}>
                        <FormGroup>
                          <div className="mb-3">
                            <Label htmlFor="validationorganizationname">
                              {t('Organization Name')}
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
                              value={validation.values.organizationName || ""}
                             
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
                      <Col md={12}>
                        <FormGroup>
                          <div className="mb-3">
                            <Label htmlFor="Textarea">
                              {t('Description')}<span className="text-danger">*</span>
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
                      <Col md={6}>
                        <FormGroup>
                          <div className="mb-3">
                            <Label htmlFor="establishdate">
                              {t('Established Date')}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="date"
                              name="establishedDate"
                              id="establishdate"
                              className="form-control"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.establishedDate || ""}
                    
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
                      <Col md={6}>
                        <label
                          htmlFor="validationDefaultUsername"
                          className="form-label"
                        >
                          {t('Email')}<span className="text-danger">*</span>
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
                      <Col md={6}>
                        <FormGroup>
                          <div className="mb-3">
                            <Label htmlFor="phonenumberInput">
                              {t('Phone Number')}<span className="text-danger">*</span>
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

                      {/* <Col xl={6}>
                          <div className="mb-3 mb-xl-0">
                            <label htmlFor="cleave-phone" className="form-label">Phone Number<span className="text-danger">*</span></label>
                            <Cleave
                              placeholder="xxxx xxx xxx"
                              options={{
                                phone: true,
                                phoneRegionCode: "IN"
                              }}
                              value={phone}
                              onChange={onPhoneChange}
                              className="form-control"
                            />
                          </div>
                        </Col> */}
                      <Col lg={6} md={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="choices-multiple-default"
                            className="form-label "
                          >
                            {t('categoryIDs')}<span className="text-danger">*</span>
                          </Label>
                          <div style={{ margin: "0 auto" }}>
                            <button
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              style={{
                                padding: "10px",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                                background: "white",
                                border: "1px solid #ddd",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div> Select Categories </div>
                                <div> {isDropdownOpen ? "▲" : "▼"} </div>
                              </div>
                            </button>

                            {isDropdownOpen && (
                              <div
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "10px",
                                  maxHeight: "300px",
                                  overflowY: "auto",
                                }}
                              >
                                <CheckboxTree
                                  data={categories}
                                  checkedItems={checkedItems}
                                  expandedItems={expandedItems}
                                  handleCheck={handleCheck}
                                  handleExpand={handleExpand}
                                />
                              </div>
                            )}
                          </div>
                          {/* {checkedItems.length > 0 && (
                            <div className="mt-2">
                              <strong>Selected Categories:</strong>{" "}
                              {checkedItems
                                .map(
                                  (categoryID) =>
                                    categories.find(
                                      (cat) => cat.categoryID === categoryID
                                    )?.categoryName
                                )
                                .join(", ")}
                            </div>
                          )} */}
                          {/* <Select
                            value={validation.values.categoryIDs}
                            isMulti={true}
                            onChange={handleMultiSelectChange}
                            options={SingleOptions}
                            styles={customStyles(
                              !!validation.errors.categoryIDs &&
                                validation.touched.categoryIDs
                            )} // Dynamically set border color
                            onBlur={() =>
                              validation.setFieldTouched("categoryIDs", true)
                            } 
                          /> */}
                          {validation.touched.categoryIDs &&
                          validation.errors.categoryIDs ? (
                            <FormFeedback className="d-block">
                              {validation.errors.categoryIDs}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="addressinput"
                            >
                              {t('Address')}<span className="text-danger">*</span>
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
                      {/* <Col lg={6}>
            <Label>
              categoryIDs
            </Label>
            <select className="form-select mb-3" aria-label="Default select example">
            <option >Select your categoryIDs </option>
            <option defaultValue="1">Declined Payment</option>
            <option defaultValue="2">Delivery Error</option>
            <option defaultValue="3">Wrong Amount</option>
        </select>
          </Col> */}
                      {/* <Col lg={6} md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="choices-multiple-default" className="form-label ">categoryIDs<span className="text-danger">*</span></Label>                                                        
                                                        <Select
                                                             value={validation.values.categoryIDs}
                                                            isMulti={true}                                                            
                                                            onChange={handleMultiSelectChange}
                                                            options={SingleOptions}
                                                            styles={customStyles(!!validation.errors.categoryIDs && validation.touched.categoryIDs)} // Dynamically set border color
                                                            onBlur={() => validation.setFieldTouched('categoryIDs', true)}  // Mark the field as touched on blur
                                                        />
                                                              {validation.touched.categoryIDs && validation.errors.categoryIDs ? (
                        <FormFeedback className="d-block">{validation.errors.categoryIDs}</FormFeedback>
                      ) : null}
                                                    </div>
                                                </Col> */}
                    </Row>
                    <Col md={4}>
                      <Label>{t('Location')}:</Label>
                    </Col>
                    {validation.values.locations && validation.values.locations.$values && validation.values.locations.$values?.map((location, index) => (
                      <Row key={index}>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor={`latitude-${index}`}
                              className="form-label"
                            >
                              {t('Latitude')}<span className="text-danger">*</span>
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
                                validation.values.locations.$values[index].latitude ||
                                ""
                              }
                             
                            />
                            {validation.touched.locations &&
                              validation.touched.locations.$values[index]?.latitude &&
                              validation.errors.locations &&
                              validation.errors.locations.$values[index]?.latitude && (
                                <FormFeedback>
                                  {validation.errors.locations.$values[index].latitude}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor={`longitude-${index}`}
                            >
                              {t('Longitude')}<span className="text-danger">*</span>
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
                                validation.values.locations.$values[index].longitude ||
                                ""
                              }
                              
                            />
                            {validation.touched.locations &&
                              validation.touched.locations.$values[index]?.longitude &&
                              validation.errors.locations &&
                              validation.errors.locations.$values[index]?.longitude && (
                                <FormFeedback>
                                  {validation.errors.locations.$values[index].longitude}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor={`address-${index}`}
                              className="form-label"
                            >
                              {t('Location Address')}
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
                                validation.values.locations.$values[index].address || ""
                              }
                              
                            />
                            {validation.touched.locations &&
                              validation.touched.locations.$values[index]?.address &&
                              validation.errors.locations &&
                              validation.errors.locations.$values[index]?.address && (
                                <FormFeedback>
                                  {validation.errors.locations.$values[index].address}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    ))}
                    <div className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        color="success"
                        className="rounded-pill me-2"
                      >
                        {t('Submit')}
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="rounded-pill"
                        onClick={() => history.back()}
                      >
                        {t('Cancel')}
                      </Button>
                    </div>
                  </Form>

                  {/* </div> */}
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
