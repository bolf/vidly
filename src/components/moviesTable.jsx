import React, { Component } from "react";
import Table from "./common/table";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: row => (
        <Like
          liked={row.liked}
          onClick={this.props.onLikeClick}
          _id={row._id}
        />
      )
    },
    {
      key: "delete",
      content: row => (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => this.props.onDelete(row)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, currentPage, pageSize, sortingColumn, onSort } = this.props; //декларация интерфейса компонента
    const paginatedMovies = paginate(movies, currentPage, pageSize);
    return (
      <Table
        columns={this.columns}
        sortingColumn={sortingColumn}
        onSort={onSort}
        rows={paginatedMovies}
      />
    );
  }
}
export default MoviesTable;
