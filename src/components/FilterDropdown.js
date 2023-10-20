import React from "react";

const FilterDropdown = ({ onFilterChange }) => {
  return (
    <div>
      <select
        onChange={e => onFilterChange(e.target.value)}
        className="block w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline p-2 mb-6 text-sm"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
