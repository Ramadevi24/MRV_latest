import React from "react";

const SearchBar = ({ searchTerm, onChange, placeholder }) => {
  return (
    <div className="d-flex justify-content-sm-start">
                          <div className="search-box ms-2">
      <input
        type="text"
        className="form-control search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
      <i className="ri-search-line search-icon"></i>
    </div>
    </div>
  );
};

export default SearchBar;
