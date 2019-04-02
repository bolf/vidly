import React from "react";

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

export default Filtering;
