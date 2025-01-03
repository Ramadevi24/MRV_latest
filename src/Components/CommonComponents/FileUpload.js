import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import DownloadIcon from "../../assets/images/Power Sector--- Data Entry/basil_upload-solid.png";
import { useTranslation } from "react-i18next";

const FileUpload = ({ 
  label, 
  toggleClick, 
  conditionData, 
  onFileUpload, 
  allowedFileTypes = [], 
  maxFileSize = 1 * 1024 * 1024 // Default max file size: 5 MB
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles) => {
    setError("");

    const validFiles = selectedFiles.filter((file) => {
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}`);
        return false;
      }
      if (file.size > maxFileSize) {
        setError(`File too large: ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      if (onFileUpload) {
        onFileUpload(validFiles); // Call the callback with valid files
      }
    }
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="file-upload">
      <div className="file-upload-header">
        <ToggleSwitch
          label={label}
          toggleDivClassName="toggle-switch-modal"
          toggleLabelClassName="toggle-label-modal"
          onToggle={toggleClick}
          isCheckedData={false}
        />
      </div>
      {conditionData && (
        <div
          className="file-upload-body"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {!files.length ? (
            <div className="file-upload-align">
              <div style={{ display: "flex" }}>
                <input
                  type="file"
                  id={`upload-${label}`}
                  onChange={handleFileChange}
                  hidden
                  multiple
                />
                <img
                  src={DownloadIcon}
                  alt="Upload"
                  style={{ width: "15px", height: "15px" }}
                />
                <label
                  htmlFor={`upload-${label}`}
                  className="upload-placeholder"
                >
                  {t("DragDropFiles")}
                </label>
              </div>
              <div>
                <label htmlFor={`upload-${label}`} className="upload-button">
                  {t("Upload")}
                </label>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          ) : (
            <div className="uploaded-files">
            {files.map((file, index) => (
              <div key={index} className="uploaded-file">
                <span className="file-name">{file.name}</span>
                <button
                  className="remove-button"
                  onClick={() => handleFileRemove(file.name)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
