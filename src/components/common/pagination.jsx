import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1); //crates array

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => {
          return (
            <li
              key={page}
              className={"page-item" + (currentPage === page ? " active" : "")}
            >
              <span
                className="page-link"
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

//default values of props that can be used in this omponent
//упрощение интерфеса компонента
//устанавливается отдельно: npm i prop-types@15.6.2
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
