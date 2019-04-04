import React, { Component } from "react";
import _ from "lodash";

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

/* <td>{row.title}</td>
              <td>{row.genre.name}</td>
              <td>{row.numberInStock}</td>
              <td>{row.dailyRentalRate}</td>
              <td className="text-center">
                <Like liked={row.liked} onClick={onLikeClick} _id={row._id} />
              </td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(row)}
                >
                  Delete
                </button>
              </td>
            </tr> */
