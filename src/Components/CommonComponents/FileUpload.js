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
  maxFileSize = 5 * 1024 * 1024, // Default max file size: 5 MB
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
    event.target.value = null; // Reset the input to allow re-upload of the same file
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles) => {
    setError("");

    const validFiles = selectedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(fileExtension)) {       
        setError(t("InvalidFileType", { fileName: file.name }));
        return false;
      }
      if (file.size > maxFileSize) {        
        setError(t("FileTooLarge", { fileName: file.name }));
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
       <> {error && <div className="error-message">{error}</div>}  
        <div
          className="file-upload-body"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          
          <div className="file-upload-align">
            <input
              type="file"
              id={`upload-${label}`}
              onChange={handleFileChange}
              hidden
              multiple
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={DownloadIcon}
                alt="Upload"
                style={{ width: "15px", height: "15px" }}
              />
              <label
                htmlFor={`upload-${label}`}
                className="upload-placeholder"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                {t("DragDropFiles") }
              </label>
              <label
                htmlFor={`upload-${label}`}
                className="upload-button"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                {t("Upload")}
              </label>
            </div>
            
          </div>
          {files.length > 0 && (
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
        </>
      )}
    </div>
  );
};

export default FileUpload;
