import React, { useState, useEffect } from "react";
import ResponsiveNavbar from "../responsiveNavBar";
import { useNavigate } from "react-router-dom";


const CrimeReportForm = () => {
  const [crimeType, setCrimeType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = pos.coords;
            setLocation(`${coords.latitude},${coords.longitude}`);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setErrorMessage("Failed to retrieve location automatically.");
          }
        );
      } else {
        setErrorMessage("Geolocation is not supported by your browser.");
      }
    };
    
    getUserLocation();

    return () => {
      
    };
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reportData = {
      type: crimeType, // Note that we are sending 'type' as the field name
      description,
      dateTime: new Date(date),
      location: {
        type: 'Point',
        coordinates: location.split(',').map(coord => parseFloat(coord))
      }
    };

    try {
      const response = await fetch('http://localhost:8080/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else{
        navigate('/citizen')
      }

      const data = await response.json();
      console.log("Crime Report Submitted:", data);
      // Reset the form fields after submission
      setCrimeType("");
      setLocation("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error('Error submitting the report:', error);
      setErrorMessage('Failed to submit the report.');
    }
  };

  return (
    <>
      <ResponsiveNavbar />
      <div className="crime-report-form bg-gray-100 p-4 rounded-md shadow-md">
      <h2>Report a Crime</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="crimeType" className="block mb-2">
          <span className="text-gray-700 font-bold">Crime Type:</span>
          <select
            id="crimeType"
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
            className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-3 py-2"
          >
            <option value="">Select a Crime</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="assault">Assault</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label htmlFor="location" className="block mb-2">
          <span className="text-gray-700 font-bold">
            Location (address or description):
          </span>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Automatic location (or enter manually)"
            className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-3 py-2"
          />
        </label>
        <label htmlFor="date" className="block mb-2">
          <span className="text-gray-700 font-bold">Date and Time:</span>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-3 py-2"
          />
        </label>
        <label htmlFor="description" className="block mb-2">
          <span className="text-gray-700 font-bold">Description:</span>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-3 py-2 h-24" // Added height for better readability
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
        >
          Submit Report
        </button>
      </form>
    </div>
    </>
  );
};

export default CrimeReportForm;
