import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import DownloadIcon from "../../assets/images/Power Sector--- Data Entry/basil_upload-solid.png"

const FileUpload = ({ label, toggleClick, conditionData }) => {
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
        <ToggleSwitch label={label}  toggleDivClassName="toggle-switch-modal" toggleLabelClassName="toggle-label-modal" onToggle={toggleClick} isCheckedData = {false}/>
      </div>
      {conditionData && <div className="file-upload-body">
        {!file ? (
          <div className="file-upload-align">
          <div style={{display: "flex"}}>
            <input
              type="file"
              id={`upload-${label}`}
              onChange={handleFileChange}
              hidden
            />
            <img src={DownloadIcon} style={{width:'15px', height:"15px"}}/>
            <label htmlFor={`upload-${label}`} className="upload-placeholder">
            Drag and drop files here or upload
            </label>
            </div>
            <div>
            <label htmlFor={`upload-${label}`} className="upload-button">
              Upload
            </label>
            </div>
          </div>
        ) : (
          <div className="uploaded-file">
            <span className="file-name">{file.name}</span>
            <button className="remove-button" onClick={handleFileRemove}>
              &times;
            </button>
          </div>
        )}
      </div>}
    </div>
  );
};

export default FileUpload;
