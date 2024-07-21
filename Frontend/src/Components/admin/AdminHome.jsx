import { useState } from "react";
import ResponsiveNavbar from "../responsiveNavBar";
import AdminPanel from "./AdminPanel";
import CreateUserForm from "./CreateUserForm";
import ReportsTable from "./ReportsTable";

const AdminHome = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <ResponsiveNavbar />
      <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Admin</h1> {/* Heading for the page */}
      <div className="flex">
        <div className="flex flex-col space-y-4 justify-center items-center p-8 bg-gray-100 w-1/2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            onClick={() => handleClick('roleManagement')}
          >
            Role Management
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            onClick={() => handleClick('reportManagement')}
          >
            Report Management
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            onClick={() => handleClick('createUser')}
          >
            Create User
          </button>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-gray-200 w-1/2">
          <div className="flex space-x-4">
            <div className="bg-white rounded shadow px-4 py-3 w-full">
              <h3 className="text-lg font-medium mb-2">Citizen Users</h3>
              <span className="text-xl font-bold text-blue-500">100</span>
            </div>
            <div className="bg-white rounded shadow px-4 py-3 w-full">
              <h3 className="text-lg font-medium mb-2">Law Enforcement Users</h3>
              <span className="text-xl font-bold text-green-500">50</span>
            </div>
            <div className="bg-white rounded shadow px-4 py-3 w-full">
              <h3 className="text-lg font-medium mb-2">Total Reports</h3>
              <span className="text-xl font-bold text-red-500">250</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-8 bg-white h-[40wh]">
        {selectedButton === 'roleManagement' && (
          <div>
            {/* Content for Role Management */}
            <AdminPanel />
            {/* Add your components/logic for Role Management */}
          </div>
        )}
        {selectedButton === 'reportManagement' && (
          <div>
            {/* Content for Report Management */}
            <ReportsTable />
            {/* Add your components/logic for Report Management */}
          </div>
        )}
        {selectedButton === 'createUser' && (
          <div>
            {/* Content for Create User */}
            <CreateUserForm />
            {/* Add your components/logic for Create User */}
          </div>
        )}
        {selectedButton === null && (
          <p className="text-center text-gray-500">Please select a button to view content.</p>
        )}
      </div>
      </div>
    </>
  );
};

export default AdminHome;
