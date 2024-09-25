// Pagination.js
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

const PaginationNumber = ({ itemsPerPage, currentPage, totalItems, paginate, setItemsPerPage, t }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle items per page change and reset current page to 1
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    paginate(1); 
  };

  return (
    <div className="d-flex justify-content-between mt-3">
      {/* <div className="pagination">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange} // Updated here
          style={{ height: '40px' }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
   */}
      <div>
    <select className="form-select" aria-label=" example"onChange={handleItemsPerPageChange}  value={itemsPerPage}>
      
        <option defaultValue="1" selected>10</option>
        <option defaultValue="2">20</option>
        <option defaultValue="3">50</option>
    </select>
    </div>


      <nav aria-label="Pagination Navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={t('Previous')}
            >
              &laquo;
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} >
              <button onClick={() => paginate(number)} className="page-link" style={{background:'#45CB85',color:'white', fontWeight:'bold'}}>
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              aria-label={t('Next')}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

PaginationNumber.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PaginationNumber;
