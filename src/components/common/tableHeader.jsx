import React, { Component } from "react";

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

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th
                key={column.path || column.key}
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSorting(column.path)}
              >
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
