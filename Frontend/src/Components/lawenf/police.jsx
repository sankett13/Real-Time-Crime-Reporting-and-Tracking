import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ResponsiveNavbar from "../responsiveNavBar";

const Police = () => {
  const [searchParams, setSearchParams] = useState({
    date: "",
    location: "",
    type: "",
  });
  const [crimes, setCrimes] = useState([]);
  const [allCrimes, setAllCrimes] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [solveReason, setSolveReason] = useState("");
  const [showSolveReason, setShowSolveReason] = useState(false);

  const specificCrimeTypes = ["Theft", "Vandalism", "Assault"];

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setMapCenter([51.505, -0.09]); // Default to London
        }
      );
    } else {
      setMapCenter([51.505, -0.09]); // Default to London
    }

    const fetchCrimes = async () => {
      const mockCrimes = [
        {
          id: 1,
          type: "Theft",
          date: "2024-06-29",
          location: "Alkapuri Society",
          lat: 22.3283,
          lng: 73.1878,
        },
        {
          id: 2,
          type: "Vandalism",
          date: "2024-06-28",
          location: "Sayaji Baug",
          lat: 22.3322,
          lng: 73.1814,
        },
        {
          id: 3,
          type: "Robbery",
          date: "2024-06-27",
          location: "Manjalpur Area",
          lat: 22.3156,
          lng: 73.1739,
        },
        {
          id: 4,
          type: "Assault",
          date: "2024-06-28",
          location: "Sayaji Baug",
          lat: 22.8872,
          lng: 76.1814,
        },
        {
          id: 5,
          type: "Fraud",
          date: "2024-06-28",
          location: "Sayaji Baug",
          lat: 22.6682,
          lng: 75.1814,
        },
        {
          id: 6,
          type: "Burglary",
          date: "2024-06-28",
          location: "Sayaji Baug",
          lat: 22.5523,
          lng: 78.1814,
        },
        {
          id: 7,
          type: "Shoplifting",
          date: "2024-06-29",
          location: "Ellora Park",
          lat: 22.3105,
          lng: 73.1763,
        },
        {
          id: 8,
          type: "Vehicle Theft",
          date: "2024-06-30",
          location: "Fatehgunj",
          lat: 22.3162,
          lng: 73.1745,
        },
        {
          id: 9,
          type: "Burglary",
          date: "2024-06-30",
          location: "Karelibaug",
          lat: 22.3301,
          lng: 73.1877,
        },
        {
          id: 10,
          type: "Assault",
          date: "2024-06-30",
          location: "Waghodia Road",
          lat: 22.2971,
          lng: 73.1266,
        },
        {
          id: 11,
          type: "Robbery",
          date: "2024-06-29",
          location: "Akota",
          lat: 22.3096,
          lng: 73.1497,
        },
        {
          id: 12,
          type: "Vandalism",
          date: "2024-06-29",
          location: "Gotri",
          lat: 22.3232,
          lng: 73.0518,
        },
        {
          id: 13,
          type: "Fraud",
          date: "2024-06-29",
          location: "Subhanpura",
          lat: 22.3280,
          lng: 73.1779,
        },
        {
          id: 14,
          type: "Theft",
          date: "2024-06-28",
          location: "New VIP Road",
          lat: 22.3306,
          lng: 73.0421,
        },
        {
          id: 15,
          type: "Burglary",
          date: "2024-06-27",
          location: "Sama",
          lat: 22.2962,
          lng: 73.1885,
        },
        {
          id: 16,
          type: "Shoplifting",
          date: "2024-06-27",
          location: "Manjalpur",
          lat: 22.3156,
          lng: 73.1739,
        },
        {
          id: 17,
          type: "Vehicle Theft",
          date: "2024-06-27",
          location: "Nizampura",
          lat: 22.3220,
          lng: 73.1895,
        },
        {
          id: 18,
          type: "Assault",
          date: "2024-06-27",
          location: "Gorwa",
          lat: 22.3186,
          lng: 73.1624,
        },
        {
          id: 19,
          type: "Fraud",
          date: "2024-06-26",
          location: "Sama-Savli Road",
          lat: 22.3104,
          lng: 73.1840,
        },
        {
          id: 20,
          type: "Theft",
          date: "2024-06-26",
          location: "Warasiya",
          lat: 22.3206,
          lng: 73.1583,
        },
        // Add more mock crimes as needed
      ];
    
      setAllCrimes(mockCrimes);
    };
    
    fetchCrimes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const locationNormalized = searchParams.location.toLowerCase();
    const filteredCrimes = allCrimes.filter((crime) =>
      (!searchParams.date || crime.date === searchParams.date) &&
      (!searchParams.location || crime.location.toLowerCase().includes(locationNormalized)) &&
      (!searchParams.type || 
        (searchParams.type === "Other" 
          ? !specificCrimeTypes.includes(crime.type)
          : crime.type === searchParams.type))
    );
    setCrimes(filteredCrimes);
  };

  const handleSolvedCase = () => {
    setShowSolveReason(true);
  };

  const confirmSolvedCase = () => {
    if (solveReason.trim() === "") {
      alert("Please provide a reason for solving the case.");
      return;
    }

    const now = new Date();
    const solvedDate = now.toISOString().split('T')[0];
    const solvedTime = now.toTimeString().split(' ')[0];

    console.log("Case solved:", {
      crimeId: selectedCrime.id,
      solvedDate,
      solvedTime,
      reason: solveReason
    });

    setAllCrimes(allCrimes.filter(crime => crime.id !== selectedCrime.id));
    setCrimes(crimes.filter(crime => crime.id !== selectedCrime.id));
    setSelectedCrime(null);
    setShowSolveReason(false);
    setSolveReason("");
  };

  const MapEventHandlers = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        const visibleCrimes = allCrimes.filter(
          (crime) =>
            bounds.contains([crime.lat, crime.lng]) &&
            (!searchParams.date || crime.date === searchParams.date) &&
            (!searchParams.location || crime.location.toLowerCase().includes(searchParams.location.toLowerCase())) &&
            (!searchParams.type || 
              (searchParams.type === "Other" 
                ? !specificCrimeTypes.includes(crime.type)
                : crime.type === searchParams.type))
        );
        setCrimes(visibleCrimes);
      },
    });

    return null;
  };

  if (!mapCenter) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ResponsiveNavbar />
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Police Dashboard</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location..."
          value={searchParams.location}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={searchParams.type}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Crime Type</option>
          <option value="Theft">Theft</option>
          <option value="Vandalism">Vandalism</option>
          <option value="Assault">Assault</option>
          <option value="Other">Other</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
      <div className="h-[600px] w-full mb-4">
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {crimes.map((crime) => (
            <Marker key={crime.id} position={[crime.lat, crime.lng]} icon={redIcon} eventHandlers={{
              click: () => {
                setSelectedCrime(crime);
                setShowSolveReason(false);
              },
            }}>
              <Popup>
                <div>
                  <h3 className="font-bold">{crime.type}</h3>
                  <p>Date: {crime.date}</p>
                  <p>Location: {crime.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapEventHandlers />
        </MapContainer>
      </div>
      {selectedCrime && !showSolveReason && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSolvedCase}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Solve Case
          </button>
        </div>
      )}
      {showSolveReason && (
        <div className="mt-4">
          <textarea
            value={solveReason}
            onChange={(e) => setSolveReason(e.target.value)}
            placeholder="Enter reason for solving the case..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={confirmSolvedCase}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Confirm Solve
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Police;