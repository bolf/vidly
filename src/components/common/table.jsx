import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  return (
    <table className="table table-bordered">
      <TableHeader
        columns={props.columns}
        sortingColumn={props.sortingColumn}
        onSort={props.onSort}
      />
      <TableBody rows={props.rows} columns={props.columns} />
    </table>
  );
};

export default Table;
