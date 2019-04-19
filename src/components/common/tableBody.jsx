import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class TableBody extends Component {
  renderCell = (row, column) => {
    if (column.content) return column.content(row);

    return _.get(row, column.path);
  };

  render() {
    const { columns, rows } = this.props;

    return (
      <tbody>
        {rows.map(row => (
          <tr key={row._id}>
            {columns.map(column => (
              <td key={column.path || column.key}>
                {this.renderCell(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
