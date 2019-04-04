import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { paginate } from "../utils/paginate";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
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
      <table className="table table-bordered">
        <TableHeader
          columns={this.columns}
          sortingColumn={sortingColumn}
          onSort={onSort}
        />
        <TableBody rows={paginatedMovies} columns={this.columns} />
      </table>
    );
  }
}
export default MoviesTable;
