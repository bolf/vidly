import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolideHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

class Like extends Component {
  render() {
    return (
      <FontAwesomeIcon
        icon={this.getIcon()}
        onClick={() => this.props.onClick(this.props._id)}
        style={{ cursor: "pointer" }}
      />
    );
  }

  getIcon() {
    return this.props.liked ? faSolideHeart : faRegularHeart;
  }
}

export default Like;
