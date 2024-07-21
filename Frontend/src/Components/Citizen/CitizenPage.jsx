import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMap, Circle, useMapEvents, Popup } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import ResponsiveNavbar from "../responsiveNavBar";
import { useNavigate } from "react-router-dom";


const SetViewOnChange = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
};

const SearchField = () => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Search for location'
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);
  return null;
};

const ClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const CitizenPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState(null);
  const [crimeData, setCrimeData] = useState([]);
  const [mapSearchTerm, setMapSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clickedAddress, setClickedAddress] = useState(null);

  const navigate = useNavigate();


  const fetchCrimeData = useCallback(async () => {
    // Replace this with actual API call
    const mockData = [
      { lat: 51.505, lng: -0.09, intensity: 0.8 },
      { lat: 51.51, lng: -0.1, intensity: 0.6 },
      { lat: 51.51, lng: -0.12, intensity: 0.3 },
    ];
    setCrimeData(mockData);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (error) => {
          console.error("Error getting location:", error);
          setPosition([51.505, -0.09]); // Default position
        }
      );
    } else {
      console.log("Geolocation is not available");
      setPosition([51.505, -0.09]); // Default position
    }

    fetchCrimeData();
  }, [fetchCrimeData]);

  const searchLocation = useCallback(async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearchTerm)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  }, [mapSearchTerm]);

  const handleMapClick = useCallback(async (latlng) => {
    const { lat, lng } = latlng;
    setSelectedLocation({ lat, lng });

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name;
      setClickedAddress(address);
      console.log("Selected address:", address, lat, lng);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  }, []);

  const getColor = (intensity) => {
    if (intensity > 0.7) return "red";
    if (intensity > 0.5) return "yellow";
    return "blue";
  };

  return (
    <>
      <ResponsiveNavbar />
      <div className="citizen-page bg-gray-100 min-h-screen">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Crime Reporting System</h1>
        <div className="flex items-center space-x-4">
        <button 
      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
      onClick={() => navigate('/report')}
    >
      Report Crime
    </button>
          <div className="relative">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </nav>

      <div className="map-container h-[65vh] w-full relative">
        <div className="absolute top-4 left-4 z-10 w-64">
          <input
            type="text"
            placeholder="Search location..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => setMapSearchTerm(e.target.value)}
            value={mapSearchTerm}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
          />
        </div>
        {position && (
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} />
            {selectedLocation && (
              <Marker 
                position={[selectedLocation.lat, selectedLocation.lng]}
                icon={L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}
              >
                {clickedAddress && (
                  <Popup>
                    <div>
                      <strong>Selected Address:</strong>
                      <p>{clickedAddress}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            )}
            <SetViewOnChange coords={position} />
            <SearchField />
            <ClickHandler onLocationSelect={handleMapClick} />
            {crimeData.map((crime, index) => (
              <Circle
                key={index}
                center={[crime.lat, crime.lng]}
                pathOptions={{ 
                  color: getColor(crime.intensity), 
                  fillColor: getColor(crime.intensity),
                  fillOpacity: crime.intensity
                }}
                radius={2000}
              />
            ))}
          </MapContainer>
        )}
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Citizen Dashboard</h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-grow"
            />
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out">
              Show Reported Crimes
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CitizenPage;
