import React, { Component } from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize } = props;

  const pageCount = itemsCount / pageSize;
  const pages = _.range(1, pageCount + 1); //crates array

  return (
    <nav aria-label="...">
      <ul class="pagination">
        {pages.map(page => {
          return (
            <li class="page-item">
              <a class="page-link">{page}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
