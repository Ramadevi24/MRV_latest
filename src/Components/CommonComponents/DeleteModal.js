import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
  const {t}=useTranslation();
  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
        <lord-icon
  src="https://cdn.lordicon.com/rivoakkk.json"
  trigger="loop"
  colors="primary:#f7b84b,secondary:#f06548"
  style={{ width: "100px", height: "100px" }}
></lord-icon>

          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{t('Are You Sure')} ?</h4>
            <p className="text-muted mx-4 mb-0">
              {t('Are you sure you want to remove this record')} ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            {t('Close')}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
           {t('Yes Delete It')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;