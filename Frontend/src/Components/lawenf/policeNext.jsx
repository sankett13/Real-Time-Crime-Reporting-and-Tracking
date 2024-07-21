import React from "react";
import ResponsiveNavbar from "../responsiveNavBar";

const PoliceNext = () => {
  return (
    <>
      <ResponsiveNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Police Next Actions</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Search
        </button>
        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Solved
        </button>
      </div>

      <div className="reportContent bg-white p-4 rounded-md shadow mb-4">
        {/* Add content for reportContent here */}
        <p className="text-gray-700">Report content goes here...</p>
      </div>

      <div className="mediaContent bg-white p-4 rounded-md shadow">
        {/* Add content for mediaContent here */}
        <p className="text-gray-700">Media content goes here...</p>
      </div>
    </div>
    </>
  );
}

export default PoliceNext;