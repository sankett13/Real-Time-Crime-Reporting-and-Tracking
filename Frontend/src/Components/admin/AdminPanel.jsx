import { useState, useEffect } from "react";
import DataTable from "../admin/DataTable"; // Import your DataTable component
import ResponsiveNavbar from "../responsiveNavBar";

const crimeReportData = [
  {
    id: 1,
    type: "Theft",
    location: "Central Market",
    date: "2024-07-01",
    time: "10:30 AM",
    reportedBy: "John Doe (Citizen)",
    status: "Pending",
    assignedTo: "Inspector Patel (Police)",
    email: "john.doe@example.com",
    role: "Citizen",
  },
  // ... add more random report data objects
  {
    id: 10,
    type: "Vandalism",
    location: "City Park",
    date: "2024-07-05",
    time: "02:00 PM",
    reportedBy: "Jane Smith (Citizen)",
    status: "Open",
    assignedTo: "Officer Lee (Police)",
    email: "jane.smith@example.com",
    role: "Police",
  },
  // ... and so on
];

const AdminPanel = () => {
  const [reports, setReports] = useState([]); // State for crime reports
  const [filteredReports, setFilteredReports] = useState([]); // State for filtered reports
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role filter
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch crime reports from backend (replace with your API call)
  useEffect(() => {
    // Set initial reports (replace with your actual data fetching)
    setReports(crimeReportData);
    setFilteredReports(reports); // Initially show all reports
    setSearchResultCount(reports.length); // Set initial search result count
  }, []); // Run only once on component mount

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const filtered = reports.filter((report) => {
      const searchText = event.target.value.toLowerCase();
      // Search by email, reportedBy name, or other relevant fields
      return (
        report.email.includes(searchText) ||
        report.reportedBy.toLowerCase().includes(searchText)
        // ... other search criteria
      );
    });
    setFilteredReports(filtered);
    setSearchResultCount(filtered.length); // Update search result count
  };

  // Filter function by role
  const handleRoleFilter = (event) => {
    setSelectedRole(event.target.value);
    const filtered = reports.filter((report) => {
      return event.target.value === "All" || report.role === event.target.value;
    });
    setFilteredReports(filtered);
  };

  const fetchUserRoles = async () => {
    try {
      const response = await fetch("/api/user-roles"); // Replace with your API endpoint
      const data = await response.json();
      // Update state with available user roles
      // (assuming data is an array of role objects)
      setSelectedRole(data[0].name); // Set initial selected role
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId); // Update state with selected user ID
  };

  // Function to handle user role change (replace with your backend logic)
  const handleRoleChange = async (newRole) => {
    if (!selectedUser) return; // Check if a user is selected

    try {
      const response = await fetch(`/api/users/${selectedUser}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update report data if role change is successful (replace with logic)
        const updatedReports = reports.map((report) =>
          report.id === selectedUser ? { ...report, role: newRole } : report
        );
        setReports(updatedReports);
        setFilteredReports(updatedReports); // Update filtered reports as well

        // Clear user selection
        setSelectedUser(null);
      } else {
        console.error("Error updating user role:", await response.text());
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    fetchUserRoles(); // Fetch user roles on component mount
  }, []);
  return (
    <>
      <ResponsiveNavbar />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-4">User Name and Role </h1>

        <div className="flex mb-4">
          <div className="mr-4">
            <label htmlFor="search" className="block mb-2 text-sm font-medium">
              Search by Email or Name: ({searchResultCount})
            </label>
            <input
              id="search"
              type="text"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="mr-4">
            <label
              htmlFor="role-filter"
              className="block mb-2 text-sm font-medium"
            >
              Filter by Role:
            </label>
            <select
              id="role-filter"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              Filter by Role:value={selectedRole}
              onChange={handleRoleFilter}
            >
              <option value="All">All Roles</option>
              <option value="Citizen">Citizen</option>
              <option value="Police">Police</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* User selection and role change functionality */}
        {selectedUser && ( // Display role change section only if a user is selected
          <div className="flex mb-4">
            <div className="mr-4">
              <label
                htmlFor="user-role"
                className="block mb-2 text-sm font-medium"
              >
                Selected User:{" "}
                {/* Display selected user information (replace with logic) */}
                {
                  reports.find((report) => report.id === selectedUser)
                    ?.reportedBy
                }
              </label>
              <select
                id="user-role"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedRole} // Pre-select the current selected role
                onChange={(event) => handleRoleChange(event.target.value)}
              >
                {/* ... options for available user roles */}
              </select>
            </div>
          </div>
        )}

        <DataTable
          reports={filteredReports}
          sortOrder={{}} // Initial sort order (optional)
          onSort={(newSortOrder) => console.log("Sort:", newSortOrder)} // Handle sorting (implement logic here)
          onUserSelect={handleUserSelect} // Pass handleUserSelect function to DataTable
        />
      </div>
    </>
  );
};

export default AdminPanel;
