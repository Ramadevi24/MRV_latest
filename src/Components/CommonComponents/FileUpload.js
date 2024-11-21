import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const FileUpload = ({ label }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <div className="file-upload">
      <div className="file-upload-header">
        {/* <span>{label}</span> */}
        <ToggleSwitch label={label}  />
      </div>
      <div className="file-upload-body">
        {!file ? (
          <>
            <input
              type="file"
              id={`upload-${label}`}
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor={`upload-${label}`} className="upload-placeholder">
              Drag and drop files here or click to upload
            </label>
          </>
        ) : (
          <div className="uploaded-file">
            <span className="file-name">{file.name}</span>
            <button className="remove-button" onClick={handleFileRemove}>
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
