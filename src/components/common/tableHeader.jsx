import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
//interface of this component:
//columns: array
//sortingColumn: object
//onSort: function

class TableHeader extends Component {
  raiseSorting = path => {
    const sortingColumn = { ...this.props.sortingColumn };
    //console.log("from_tableHeader before", sortingColumn);
    if (this.props.sortingColumn.path === path) {
      sortingColumn.order =
        this.props.sortingColumn.order === "desc" ? "asc" : "desc";
    } else {
      sortingColumn.path = path;
      sortingColumn.order = "asc";
    }
    this.props.onSort(sortingColumn);
  };

  renederSortIcon = column => {
    const { sortingColumn } = this.props;
    if (!column.path || column.path !== sortingColumn.path) return null;

    if (sortingColumn.order === "desc") {
      return <FontAwesomeIcon icon={faArrowDown} style={{ marginLeft: 10 }} />;
    } else {
      return <FontAwesomeIcon icon={faArrowUp} style={{ marginLeft: 10 }} />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th
                key={column.path || column.key}
                className="clickable"
                onClick={() => this.raiseSorting(column.path)}
              >
                {column.label}
                {this.renederSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
