import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filtering from "./common/filtering";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 6,
    currentPage: 1,
    choosenGenreFilter: getGenres()[0],
    sortingColumn: { path: "title", order: "desc" }
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
    var movies_tmp;
    if (genre.name === "All Genres") {
      movies_tmp = getMovies();
    } else {
      movies_tmp = getMovies().filter(movie => movie.genre._id === genre._id);
    }
    this.setState({
      movies: movies_tmp,
      choosenGenreFilter: genre,
      currentPage: 1
    });
  };

  handleSorting = sortColumn => {
    //console.log("from_movies", sortingColumn);
    this.setState({
      sortingColumn: { ...sortColumn },
      movies: _.orderBy(
        this.state.movies,
        [sortColumn.path],
        [sortColumn.order]
      )
    });
  };

  componentDidMount() {
    //const genres = [{name: "Alll Genres"}, ...getGenres()]
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

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
          <div className="col">
            <h1>{this.getNumberOfMovies()}</h1>
            <MoviesTable
              movies={this.state.movies}
              sortingColumn={this.state.sortingColumn}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              onLikeClick={this.handleLikeClick}
              onDelete={this.handleDelete}
              onSort={this.handleSorting}
              sortingOrder={this.state.sortingColumn.order}
            />
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
