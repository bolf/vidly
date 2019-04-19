import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        {this.props.match.params._id}
        <div>
          <button className="btn btn-primary" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default MovieForm;
