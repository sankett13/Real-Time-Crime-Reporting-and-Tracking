import React, { useState, useEffect } from 'react';
import ResponsiveNavbar from '../responsiveNavBar';

const ReportingHistory = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch user's reporting history (replace with backend logic)
    const fetchReports = async () => {
      const response = await fetch('/api/user/reports');
      const data = await response.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  return (
   <>
    <ResponsiveNavbar />
    <div className="reporting-history">
      <h2>Reporting History</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {/* Display report details (e.g., date, type, location) */}
          </li>
        ))}
      </ul>
    </div>
   </>
  );
};

export default ReportingHistory;
