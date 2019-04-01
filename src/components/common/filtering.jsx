import React, { Component } from "react";
import PropTypes from "prop-types";

const Filtering = props => {
  const { onGenreFilterChange, choosenGenreFilter, allGenres } = props;
  return (
    <ul className="list-group">
      {allGenres.map(genre => {
        return (
          <li
            key={genre._id}
            className={
              "list-group-item" +
              (choosenGenreFilter._id === genre._id ? " active" : "")
            }
            onClick={() => {
              onGenreFilterChange(genre);
            }}
          >
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
};

Filtering.defaultProps = {
  //default values of props that can be used in this omponent
  //упрощение интерфеса компонента
  //устанавливается отдельно: npm i prop-types@15.6.2
};

export default Filtering;
