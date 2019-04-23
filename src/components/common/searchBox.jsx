import React from "react";

const SerchBox = ({ value, onChange }) => {
  return (
    <input
      placeholder="Search..."
      type="search"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SerchBox;
