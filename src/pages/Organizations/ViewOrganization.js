// import React, { useState, useContext, useEffect } from "react";
// import {
//   Col,
//   Label,
//   Input,
//   Row,
//   FormGroup,
//   Form,
//   FormFeedback,
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   InputGroup,
// } from "reactstrap";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import "cleave.js/dist/addons/cleave-phone.in";
// import { TenantContext } from "../../contexts/TenantContext";
// import { OrganizationContext } from "../../contexts/OrganizationContext";
// import { formatDate } from "../../utils/formateDate";

// const customStyles = (hasError) => ({
//   control: (provided, state) => ({
//     ...provided,
//     borderColor: hasError ? "red" : provided.borderColor, // Change border color to red if there's an error
//     // '&:hover': {
//     //   borderColor: hasError ? 'red' : provided.borderColor // Red border on hover if error exists
//     // }
//   }),
//   multiValueLabel: (provided, state) => ({
//     ...provided,
//     color: "white", // Text color of the selected item
//   }),
// });

// // const SingleOptions = [
// //   { value: "Choices 1", label: "Choices 1" },
// //   { value: "Choices 2", label: "Choices 2" },
// //   { value: "Choices 3", label: "Choices 3" },
// //   { value: "Choices 4", label: "Choices 4" },
// // ];

// const ViewOrganization = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
//   const [selectedMulti, setselectedMulti] = useState(null);
//   const { fetchAllTenants, tenants } = useContext(TenantContext);
//   const { fetchAllCategories, categories, fetchOrganizationById, updateOrganizationProfile } = useContext(OrganizationContext);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [expandedItems, setExpandedItems] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => { 
//     fetchAllCategories();
//     fetchAllTenants();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const organization = await fetchOrganizationById(id);
//         organization.establishedDate = formatDate(organization.establishedDate);
  
//         const initialTenant = tenants && tenants.find(
//           (tenant) => tenant.name === organization.tenantName
//         );
//         const tenantID = initialTenant ? initialTenant.tenantID : ""; 
//         // Map the categories to IDs
//         const categoryIDs = organization.categories.$values
//           .map((categoryName) => findCategoryIds(categoryName, categories))
//           .filter(Boolean);
  
//         // Set the form values, including tenantID
//         validation.setValues({
//           tenantID: tenantID, // Set tenantID here
//           organizationName: organization.organizationName || "",
//           description: organization.description || "",
//           establishedDate: organization.establishedDate || "",
//           contactEmail: organization.contactEmail || "",
//           contactPhone: organization.contactPhone || "",
//           address: organization.address || "",
//           locations: organization.locations || [{ latitude: "", longitude: "", address: "" }],
//           categoryIDs: categoryIDs || [],
//         });
//         setCheckedItems(categoryIDs); // Pre-check categories
  
//       } catch (error) {
//         toast.error(t("Error fetching organization data"));
//       }
//     };
//     fetchData();
//   }, [id]);

//   const validation = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       tenantID: "",
//       organizationName: "",
//       description: "",
//       establishedDate: "",
//       contactEmail: "",
//       contactPhone: "",
//       address: "",
//       locations: [{ latitude: "", longitude: "", address: "" }],
//       categoryIDs: [],
//     },
//     // validationSchema: Yup.object({
//     //   tenantID: Yup.string().required(t("Please select a Tenant ID")),
//     //   organizationName: Yup.string().required(t("Please enter organization name")),
//     //   description: Yup.string().required(t("Please enter a description")),
//     //   establishedDate: Yup.string().required(
//     //    t("Please enter the established date")
//     //   ),
//     //   contactEmail: Yup.string()
//     //     .email(t("Invalid email format"))
//     //     .required(t("Please enter an email address")),
//     //   contactPhone: Yup.string().required(t("Please enter a phone number")),
//     //   address: Yup.string().required(t("Please enter your address")),
//     //   categoryIDs: Yup.array().min(1, t("Please select at least one category")),
//     //   locations: Yup.array().of(
//     //     Yup.object().shape({
//     //       latitude: Yup.string().required(t("Please enter latitude")),
//     //       longitude: Yup.string().required(t("Please enter longitude")),
//     //       address: Yup.string().required(t("Please enter location address")),
//     //     })
//     //   ),
//     // }),
//     // onSubmit: async (values) => {
//     //   try {
//     //     await updateOrganizationProfile(id, values); // Send the updated data to the backend
//     //     toast.success(t("Organization updated successfully"), {
//     //       autoClose: 2000,
//     //     });
//     //     navigate("/organizations");
//     //   } catch (error) {
//     //     toast.error(t("Error updating organization"));
//     //   }
//     // },
//   });

//   const handleMultiSelectChange = (selectedOptions) => {
//     validation.setFieldValue("categoryIDs", selectedOptions); // Update the form value for multi-select
//   };

//   //   function handleMulti(selectedMulti) {
//   //     setselectedMulti(selectedMulti);
//   // }

//   const handleCheck = (category) => {
//     const allChildIds = getAllChildIds(category);
//     setCheckedItems((prev) => {
//       const newCheckedItems = allChildIds.every((id) => prev.includes(id))
//         ? prev.filter((id) => !allChildIds.includes(id))
//         : [...new Set([...prev, ...allChildIds])];
//       validation.setFieldValue("categoryIDs", newCheckedItems);
//       return newCheckedItems;
//     });
//   };

//   const handleExpand = (categoryId) => {
//     setExpandedItems((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const getAllChildIds = (category) => {
//     let ids = [category.categoryID];
//     category.subCategories?.$values?.forEach((subCategory) => {
//       ids = [...ids, ...getAllChildIds(subCategory)];
//     });
//     return ids;
//   };

//   const findCategoryIds = (categoryName, categories) => {
//     if (!categories || categories.length === 0) {
//       return null;
//     }

//     let matchedCategory = null;
//     for (const category of categories) {
//       if (category.categoryName === categoryName) {
//         console.log("category: ", category.categoryName);
//         console.log("categoryName: ", categoryName);
//         return category.categoryID; // Return matched category ID
//       }

//       // If subcategories exist, search within them recursively
//       if (category.subCategories?.$values?.length) {
//         matchedCategory = findCategoryIds(
//           categoryName,
//           category.subCategories.$values
//         );
//         if (matchedCategory) {
//           return matchedCategory; // Return matched subcategory ID
//         }
//       }
//     }
//     return null; // Return null if no match found
//   };

//   const CheckboxTree = ({
//     data,
//     checkedItems,
//     expandedItems,
//     handleCheck,
//     handleExpand,
//   }) => (
//     <div style={{ paddingLeft: "20px" }}>
//       {data
//         ?.filter((category) => category.categoryName && category.categoryCode)
//         ?.map((item) => (
//           <div key={item.categoryID} style={{ marginBottom: "8px" }}>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               {item.subCategories && (
//                 <span
//                   onClick={() => handleExpand(item.categoryID)}
//                   style={{ cursor: "pointer", marginRight: "8px" }}
//                 >
//                   {expandedItems.includes(item.categoryID) ? "▼" : "▶"}
//                 </span>
//               )}
//               <input
//                 type="checkbox"
//                 checked={checkedItems.includes(item.categoryID)}
//                 onChange={() => handleCheck(item)}
//                 style={{
//                   marginRight: "8px",
//                   marginTop: "-5px",
//                   width: "20px",
//                   transform: "scale(1.3)",
//                 }}
//               />
//               <label>{`${item.categoryCode} - ${item.categoryName}`}</label>
//             </div>
//             {item.subCategories && expandedItems.includes(item.categoryID) && (
//               <CheckboxTree
//                 data={item.subCategories.$values}
//                 checkedItems={checkedItems}
//                 expandedItems={expandedItems}
//                 handleCheck={handleCheck}
//                 handleExpand={handleExpand}
//               />
//             )}
//           </div>
//         ))}
//     </div>
//   );

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader>
//                   <h4
//                     className="card-title mb-0"
//                     style={{
//                       color: "#45CB85",
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                  {t('View Organization')}
//                   </h4>
//                 </CardHeader>

//                 <CardBody>
//                   {/* <div style={{ margin: '5rem 1rem' }}> */}

//                   {/* <CardHeader className="ribbon-box" style={{padding:"2rem"}}>
//                 <h2 className="ribbon ribbon-success ribbon-shape" style={{fontSize:'20px', padding:"10px"}}>Add Organization</h2>
//                 </CardHeader> */}

//                   <Form
//                     className="needs-validation "
                   
//                     style={{marginTop:'3.5rem'}}
//                   >
//                     <Row>
//                     {!userPermissions.tenantID && (
//                       <Col>
//                         <Label >
//                          {t('Tenant ID')}<span className="text-danger">*</span>
//                         </Label>
//                         <select
                         
//                           name="tenantID"
//                           defaultValue={validation.values.tenantID} // Formik-controlled value
//                          className="form-select"
//                         >
//                           <option value="">{t("selectTenant")}</option>
//                           {tenants.map((tenant) => (
//                             <option
//                               key={tenant.tenantID}
//                               defaultValue={tenant.tenantID}
//                             >
//                               {tenant.name}
//                             </option>
//                           ))}
//                         </select>
                        
//                       </Col>
//                     )}
//                       <Col>
//                         <FormGroup>
//                           <div className="mb-3">
//                             <Label>
//                               {t('Organization Name')}
//                               <span className="text-danger">*</span>
//                             </Label>
//                             <Input
//                               type="text"
//                               className="form-control"
                         
                            
                             
//                               defaultValue={validation.values.organizationName || ""}
                             
//                             />
                           
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col>
//                         <FormGroup>
//                           <div className="mb-3">
//                             <Label htmlFor="Textarea">
//                               {t('Description')}<span className="text-danger">*</span>
//                             </Label>
//                             <Input
//                               type="textarea"
                              
//                               rows="3"
                            
                            
//                               defaultValue={validation.values.description || ""}
                      
//                             />
                           
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col>
//                         <FormGroup>
//                           <div className="mb-3">
//                             <Label>
//                               {t('Established Date')}
//                               <span className="text-danger">*</span>
//                             </Label>
//                             <Input
//                               type="date"
                              
//                               defaultValue={validation.values.establishedDate || ""}
                    
//                             />
                           
//                           </div>
//                         </FormGroup>
//                       </Col>

//                       {/*       
//           <Col md={6}>
//             <FormGroup>
//               <div className="mb-3">
//                 <Label htmlFor="emailadress">Email Address<span className="text-danger">*</span></Label>
//                 <Input
//                   type="email"
//                   className="form-control"
//                   placeholder="example@gmail.com"
//                   id="emailadress"
//                   name="Emailaddress"
//                   onChange={validation.handleChange}
//                   onBlur={validation.handleBlur}
//                   value={validation.values.Emailaddress || ""}
//                   invalid={validation.touched.Emailaddress && validation.errors.Emailaddress ? true : false}
//                 />
//                 {validation.touched.Emailaddress && validation.errors.Emailaddress ? (
//                   <FormFeedback>{validation.errors.Emailaddress}</FormFeedback>
//                 ) : null}
//               </div>
//             </FormGroup>
//           </Col> */}
//                       <Col>
//                         <label
//                           className="form-label"
//                         >
//                           {t('Email')}<span className="text-danger">*</span>
//                         </label>
//                         <InputGroup>
//                           <span
//                             className="input-group-text"
//                             id="inputGroupPrepend2"
//                           >
//                             @
//                           </span>
//                           <Input
                           
//                             defaultValue={validation.values.contactEmail || ""}
                            
//                           />
//                         </InputGroup>
                       
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col>
//                         <FormGroup>
//                           <div className="mb-3">
//                             <Label>
//                               {t('Phone Number')}<span className="text-danger">*</span>
//                             </Label>
//                             <Input
                             
//                               defaultValue={validation.values.contactPhone || ""}
                        
//                             />
                          
//                           </div>
//                         </FormGroup>
//                       </Col>

//                       {/* <Col xl={6}>
//                           <div className="mb-3 mb-xl-0">
//                             <label htmlFor="cleave-phone" className="form-label">Phone Number<span className="text-danger">*</span></label>
//                             <Cleave
//                               placeholder="xxxx xxx xxx"
//                               options={{
//                                 phone: true,
//                                 phoneRegionCode: "IN"
//                               }}
//                               value={phone}
//                               onChange={onPhoneChange}
//                               className="form-control"
//                             />
//                           </div>
//                         </Col> */}
//                       <Col>
//                         <div className="mb-3">
//                           <Label
//                             className="form-label "
//                           >
//                             {t('categoryIDs')}<span className="text-danger">*</span>
//                           </Label>
//                           <div style={{ margin: "0 auto" }}>
//                             <button
//                               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                               style={{
//                                 padding: "10px",
//                                 width: "100%",
//                                 textAlign: "left",
//                                 cursor: "pointer",
//                                 background: "white",
//                                 border: "1px solid #ddd",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                 }}
//                               >
//                                 <div> Select Categories </div>
//                                 <div> {isDropdownOpen ? "▲" : "▼"} </div>
//                               </div>
//                             </button>

//                             {isDropdownOpen && (
//                               <div
//                                 style={{
//                                   border: "1px solid #ddd",
//                                   padding: "10px",
//                                   maxHeight: "300px",
//                                   overflowY: "auto",
//                                 }}
//                               >
//                                 <CheckboxTree
//                                   data={categories}
//                                   checkedItems={checkedItems}
//                                   expandedItems={expandedItems}
//                                   handleCheck={handleCheck}
//                                   handleExpand={handleExpand}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           {/* {checkedItems.length > 0 && (
//                             <div className="mt-2">
//                               <strong>Selected Categories:</strong>{" "}
//                               {checkedItems
//                                 .map(
//                                   (categoryID) =>
//                                     categories.find(
//                                       (cat) => cat.categoryID === categoryID
//                                     )?.categoryName
//                                 )
//                                 .join(", ")}
//                             </div>
//                           )} */}
//                           {/* <Select
//                             value={validation.values.categoryIDs}
//                             isMulti={true}
//                             onChange={handleMultiSelectChange}
//                             options={SingleOptions}
//                             styles={customStyles(
//                               !!validation.errors.categoryIDs &&
//                                 validation.touched.categoryIDs
//                             )} // Dynamically set border color
//                             onBlur={() =>
//                               validation.setFieldTouched("categoryIDs", true)
//                             } 
//                           /> */}
                   
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col>
//                         <FormGroup>
//                           <div className="mb-3">
//                             <Label
//                               className="form-label"
//                             >
//                               {t('Address')}<span className="text-danger">*</span>
//                             </Label>
//                             <Input
//                               type="tel"
//                               className="form-control"
                             
//                               defaultValue={validation.values.address || ""}
                            
//                             />
                           
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       {/* <Col lg={6}>
//             <Label>
//               categoryIDs
//             </Label>
//             <select className="form-select mb-3" aria-label="Default select example">
//             <option >Select your categoryIDs </option>
//             <option defaultValue="1">Declined Payment</option>
//             <option defaultValue="2">Delivery Error</option>
//             <option defaultValue="3">Wrong Amount</option>
//         </select>
//           </Col> */}
//                       {/* <Col lg={6} md={6}>
//                                                     <div className="mb-3">
//                                                         <Label htmlFor="choices-multiple-default" className="form-label ">categoryIDs<span className="text-danger">*</span></Label>                                                        
//                                                         <Select
//                                                              value={validation.values.categoryIDs}
//                                                             isMulti={true}                                                            
//                                                             onChange={handleMultiSelectChange}
//                                                             options={SingleOptions}
//                                                             styles={customStyles(!!validation.errors.categoryIDs && validation.touched.categoryIDs)} // Dynamically set border color
//                                                             onBlur={() => validation.setFieldTouched('categoryIDs', true)}  // Mark the field as touched on blur
//                                                         />
//                                                               {validation.touched.categoryIDs && validation.errors.categoryIDs ? (
//                         <FormFeedback className="d-block">{validation.errors.categoryIDs}</FormFeedback>
//                       ) : null}
//                                                     </div>
//                                                 </Col> */}
//                     </Row>
//                     <Col>
//                       <Label style={{    fontSize: "18px",fontWeight: 'bold'}}>{t('Location')}:</Label>
//                     </Col>
//                     {validation.values.locations && validation.values.locations.$values && validation.values.locations.$values?.map((location, index) => (
//                       <Row key={index}>
//                         <Col>
//                           <div className="mb-3">
//                             <Label
//                               className="form-label"
//                             >
//                               {t('Latitude')}<span className="text-danger">*</span>
//                             </Label>
//                             <Input
//                               type="text"
                             
//                               defaultValue={
//                                 validation.values.locations.$values[index].latitude ||
//                                 ""
//                               }
                             
//                             />
                            
//                           </div>
//                         </Col>
//                         <Col>
//                           <div className="mb-3">
//                             <Label
//                               className="form-label"
//                             >
//                               {t('Longitude')}<span className="text-danger">*</span>
//                             </Label>
//                             <Input
                             
//                               defaultValue={
//                                 validation.values.locations.$values[index].longitude ||
//                                 ""
//                               }
                              
//                             />
                           
//                           </div>
//                         </Col>
//                         <Col>
//                           <div className="mb-3">
//                             <Label
//                               className="form-label"
//                             >
//                               {t('Location Address')}
//                               <span className="text-danger">*</span>
//                             </Label>
//                             <Input
                              
//                               defaultValue={
//                                 validation.values.locations.$values[index].address || ""
//                               }
                              
//                             />
                            
//                           </div>
//                         </Col>
//                       </Row>
//                     ))}
//                   </Form>

//                   {/* </div> */}
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ViewOrganization;


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
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
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
  const [checkedItems, setCheckedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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
    if (validation.values.categoryIDs.length) {
      setCheckedItems(validation.values.categoryIDs);
    }
  }, [validation.values.categoryIDs]);

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
        const categoryIDs = organization.categories.$values
          .map((categoryName) => findCategoryIds(categoryName, categories))
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
        setCheckedItems(categoryIDs);
      } catch (error) {
        toast.error(t("Error fetching organization data"));
      }
    };
    fetchData();
  }, [id, categories, tenants]);

 




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
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
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

  const CheckboxTree = ({ data, checkedItems, expandedItems, handleCheck, handleExpand }) => (
    <div style={{ paddingLeft: "20px" }}>
      {data
        ?.filter((category) => category.categoryName && category.categoryCode)
        ?.map((item) => (
          <div key={item.categoryID} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.subCategories && (
                <span onClick={() => handleExpand(item.categoryID)} style={{ cursor: "pointer", marginRight: "8px" }}>
                  {expandedItems.includes(item.categoryID) ? "▼" : "▶"}
                </span>
              )}
              <input
                type="checkbox"
                checked={checkedItems.includes(item.categoryID)}
                onChange={() => handleCheck(item)}
                disabled // Disable the checkbox
                style={{ marginRight: "8px", marginTop: "-5px", width: "20px", transform: "scale(1.3)" }}
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
        const subCategoryName = findCategoryNameById(categoryID, category.subCategories.$values);
        if (subCategoryName) {
          return subCategoryName; // Return matched subcategory name
        }
      }
    }
    return null; // Return null if no match found
  };

  const handleRemoveCategory = (categoryID) => {
    setCheckedItems((prevItems) => prevItems.filter((id) => id !== categoryID));
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
                    
                        <Label>
                          {t('categoryIDs')}<span className="text-danger">*</span>
                        </Label>
                        <div style={{ margin: "0 auto" }}>
                        <button
        type="button"  // Ensures it's not seen as a form submission button
        onClick={(e) => {
          e.preventDefault();  // Prevents default form submission behavior
          setIsDropdownOpen(!isDropdownOpen);
        }}
                            style={{
                              padding: "10px",
                              width: "100%",
                              textAlign: "left",
                              cursor: "pointer",
                              background: "white",
                              border: "1px solid #ddd",
                              pointerEvents: "none", // Disable the button click
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <div>
                              {/* <div> Select Categories </div> */}
                               {/* Display selected categories or default text */}
            {checkedItems.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {checkedItems.map((categoryID) => {
                  const categoryName = findCategoryNameById(categoryID, categories);
                  return (
                    <span
                      key={categoryID}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#f0f0f0", // Light background for the category/subcategory
                        borderRadius: "10px",
                        padding: "5px 21px",
                        marginRight: "5px",
                        marginBottom: "5px",
                        position: "relative",
                      }}
                    >
                      {categoryName}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCategory(categoryID);
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          marginLeft: "10px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "7px",
                          right: "0px",
                          fontSize: "10px",
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <span>{t('Select Categories')}</span>  // Default text if no categories are selected
            )}
            </div>
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
                      </Col>
                    </Row>

                    <Row>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewOrganization;

