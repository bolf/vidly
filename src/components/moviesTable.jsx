import React, { Component } from "react";
import Like from "./common/like";
import { paginate } from "../utils/paginate";

const MoviesTable = props => {
  const {
    movies,
    currentPage,
    pageSize,
    onLikeClick,
    onDelete,
    onSort
  } = props; //декларация интерфейса компонента
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {paginate(movies, currentPage, pageSize).map(movie => {
          return (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td className="text-center">
                <Like
                  liked={movie.liked}
                  onClick={onLikeClick}
                  _id={movie._id}
                />
              </td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoviesTable;
