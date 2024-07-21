import { useState } from "react";

const DataTable = ({ reports, sortOrder, onSort }) => {
  // Function to handle sorting by a column
  const handleSort = (column) => {
    const newSortOrder = { ...sortOrder }; // Copy current sort order
    newSortOrder[column] = newSortOrder[column] === "asc" ? "desc" : "asc";
    onSort(newSortOrder); // Call parent component's sort handler
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
            onClick={() => handleSort("email")} // Sort by email
          >
            Email
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
            onClick={() => handleSort("role")} // Sort by role
          >
            Role
          </th>
          {/* ... other column headers */}
        </tr>
      </thead>
      <tbody>
        {reports.sort((a, b) => {
          // Sorting logic remains the same
        }).map((report) => (
          <tr key={report.id}>
            <td className="px-6 py-4 text-left text-sm">{report.email}</td>
            <td className="px-6 py-4 text-left text-sm">{report.role}</td>
            {/* ... other table cells */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
