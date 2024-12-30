import React, { useContext, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Modal from "../../Components/CommonComponents/Modal";
import { TenantContext } from "../../contexts/TenantContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddTenantModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addTenant, fetchAllTenants } = useContext(TenantContext);
  const [generalError, setGeneralError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required(t("Please enter tenant name")),
    description: Yup.string().required(t("Please enter description")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const createPayload = {
        ...values,
        countryID: 1,
        regionID: 1,
        isActive: true,
      };
      try {
        const response = await addTenant(createPayload);
        console.log(response, 'response')
        if (response) {
          onClose();
          toast.success(t("Tenant created successfully"), { autoClose: 3000 });
          await fetchAllTenants();
        }
      } catch (error) {
        console.log("Error adding tenant:", error);
      }
    },
  });

  return (
    <Modal size="lg" title={t("Add Tenant")} isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="name">{t("Tenant Name")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <FormFeedback>{formik.errors.name}</FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="description">{t("Description")}</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.touched.description && formik.errors.description
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <FormFeedback>{formik.errors.description}</FormFeedback>
            ) : null}
          </FormGroup>
          {generalError && <p className="error-text">{generalError}</p>}
        </ModalBody>
        <div className="modal-footer mt-3">
          <Button color="success" type="submit" className="me-2 add-btn">
            {t("Save")}
          </Button>
          <Button color="danger" type="button" onClick={onClose}>
            {t("Cancel")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTenantModal;
