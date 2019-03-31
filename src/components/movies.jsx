import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Filtering from "./common/filtering";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    choosenGenreFilter: getGenres()[0]
  };

  handleDelete = movieFoorDeleting => {
    this.setState({
      movies: this.state.movies.filter(movie => {
        return movie !== movieFoorDeleting;
      })
    });
  };

  getNumberOfMovies() {
    if (this.state.movies.length !== 0) {
      return "Showing " + this.state.movies.length + " movies from the DB";
    } else {
      return "There're no movies in the DB";
    }
  }

  handleLikeClick = movieId => {
    const movies = this.state.movies.map(movie => {
      if (movie._id === movieId) {
        movie.liked = !movie.liked;
      }
      return movie;
    });
    this.setState({ movies });
  };

  handlePageChange = page => {
    if (this.state.currentPage === page) return;
    this.setState({ currentPage: page });
  };

  handleFilteringByGenre = genre => {
    if (this.state.choosenGenreFilter === genre) return;
    if (genre.name === "All Genres") {
      var movies_tmp = getMovies();
    } else {
      var movies_tmp = getMovies().filter(
        movie => movie.genre._id === genre._id
      );
    }
    this.setState({
      movies: movies_tmp,
      choosenGenreFilter: genre,
      currentPage: 1
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2" />
          <Filtering
            onGenreFilterChange={this.handleFilteringByGenre}
            choosenGenreFilter={this.state.choosenGenreFilter}
            allGenres={this.state.genres}
          />
          <div className="col-8">
            <h1>{this.getNumberOfMovies()}</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {paginate(
                  this.state.movies,
                  this.state.currentPage,
                  this.state.pageSize
                ).map(movie => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td className="text-center">
                        <Like
                          liked={movie.liked}
                          onClick={this.handleLikeClick}
                          _id={movie._id}
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => this.handleDelete(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={this.state.movies.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Movies;
