import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import ResponsiveNavbar from "../responsiveNavBar";

const ReportsTable = () => {
  const [reports, setReports] = useState([]);

  // Fetch reports data (replace with your API call)
  useEffect(() => {
    const generateRandomReports = () => {
      const reportTypes = [
        "Suspicious Activity",
        "Traffic Accident",
        "Noise Complaint",
        "Lost Item",
        "Property Damage",
      ];
      const locations = [
        { lat: 40.7128, lng: -74.0059 },
        { lat: 40.7075, lng: -74.006 },
        { lat: 40.71, lng: -73.9968 },
        { lat: 40.715, lng: -74.009 },
        { lat: 40.705, lng: -74.01 },
      ];

      const randomReports = [];
      for (let i = 0; i < 10; i++) {
        const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const description = `This is a random report of type <span class="math-inline">\{reportType\} at location \(</span>{location.lat}, ${location.lng}).`;
        randomReports.push({
          id: i + 1,
          name: reportType,
          description,
          created_at: new Date().toISOString(), // Simulate recent creation time
        });
      }
      setReports(randomReports);
    };

    generateRandomReports();
  }, []);

  // Handle report deletion (replace with your API call)
  const handleDeleteReport = async (reportId) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReports(reports.filter((report) => report.id !== reportId)); // Update state after deletion
      } else {
        console.error("Error deleting report:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const data = React.useMemo(() => reports, [reports]); // Memoize data for performance
  const columns = React.useMemo(
    () => [
      {
        Header: "Report Name",
        accessor: "name",
      },
      {
        Header: "Report Description",
        accessor: "description",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <button onClick={() => handleDeleteReport(row.original.id)}>
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Current page
    canNextPage, // Whether there's a next page
    canPreviousPage, // Whether there's a previous page
    pageOptions, // Array of page options
    gotoPage, // Function to go to a specific page
    pageCount, // Total number of pages
    prepareRow, // Function to prepare each row data
  } = tableInstance;

  return (
   <>
    <ResponsiveNavbar />
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">All Reports</h1>
      <table
        {...getTableProps()}
        className="w-full border border-gray-300 table-auto"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-2 border border-gray-300 text-left"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " " : " ") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                className="border border-gray-300 hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"} Previous
        </button>
        <p>
          Page {page + 1} of {pageCount}
        </p>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
   </>
  );
};

export default ReportsTable;
