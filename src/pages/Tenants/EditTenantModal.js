import React, { useEffect, useContext } from 'react';
import { ModalHeader, ModalBody, Button, FormGroup, Input, Label, FormFeedback, Form } from 'reactstrap';
import Modal from '../../Components/CommonComponents/Modal';
import { TenantContext } from '../../contexts/TenantContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const EditTenantModal = ({ isOpen, onClose, tenantId }) => {
  const { t } = useTranslation();
  const { editTenant, fetchTenantById, fetchAllTenants} = useContext(TenantContext);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenant = await fetchTenantById(tenantId);
        if (tenant) {
          formik.setValues({
            name: tenant.name || "",
            description: tenant.description || "",
          });
        }
      } catch (error) {
        console.error("Error loading tenant:", error);
      }
    };
    loadTenant();
  }, [tenantId]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("Please enter tenant name")),
    description: Yup.string()
      .required(t("Please enter description")),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatePayload = {
        ...values,
        countryID: 1,
        regionID: 1,
      };
      try {
        await editTenant(tenantId, updatePayload);
        toast.success("Tenant updated successfully", { autoClose: 3000 });
        await fetchAllTenants();
        onClose(); // Close the modal after successful submission
      } catch (error) {
        toast.error("Error updating tenant", { autoClose: 3000 });
      }
    },
  });

  return (
    <Modal
      size="lg"
      title="Edit Tenant"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="tenantName">Tenant Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.touched.name && formik.errors.name ? 'is-invalid' : ''
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <FormFeedback>{formik.errors.name}</FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.touched.description && formik.errors.description ? 'is-invalid' : ''
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <FormFeedback>{formik.errors.description}</FormFeedback>
            ) : null}
          </FormGroup>
        </ModalBody>
        <div className="modal-footer">
          <Button color="success" type="submit" className="me-2">
            Save
          </Button>
          <Button color="danger" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditTenantModal;
