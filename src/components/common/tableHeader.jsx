import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
//interface of this component:
//columns: array
//sortColumn: object
//onSort: function

class TableHeader extends Component {
  raiseSorting = path => {
    const sortColumn = { ...this.props.sortColumn };
    //console.log("from_tableHeader before", sortColumn);
    if (this.props.sortColumn.path === path) {
      sortColumn.order =
        this.props.sortColumn.order === "desc" ? "asc" : "desc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renederSortIcon = column => {
    const { sortColumn } = this.props;
    if (!column.path || column.path !== sortColumn.path) return null;
    if (sortColumn.order === "desc") {
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
