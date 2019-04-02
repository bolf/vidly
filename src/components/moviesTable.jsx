import React, { Component } from "react";
import Like from "./common/like";
import { paginate } from "../utils/paginate";

class MoviesTable extends Component {
  raiseSorting = path => {
    var order;
    //console.log("table", this.props.sortingColumn);
    if (this.props.sortingColumn.path === path) {
      order = this.props.sortingColumn.order === "desc" ? "asc" : "desc";
    } else {
      order = "asc";
    }
    this.props.onSort({ path: path, order: order });
  };

  render() {
    const { movies, currentPage, pageSize, onDelete, onLikeClick } = this.props; //декларация интерфейса компонента
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSorting("title")}
            >
              Title
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSorting("genre.name")}
            >
              Genre
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSorting("numberInStock")}
            >
              Stock
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSorting("dailyRentalRate")}
            >
              Rate
            </th>
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
  }
}
export default MoviesTable;
