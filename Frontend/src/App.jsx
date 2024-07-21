import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Login/LoginForm';
import SignupForm from './Components/Login/SignupForm';
import Police from './Components/lawenf/police';
import PoliceNext from './Components/lawenf/policeNext';
import LoginSignup from './Components/Login/LoginSignup';
import Login from './Components/Login/googleLogin';
import CitizenPage from './Components/Citizen/CitizenPage';
import CrimeReportForm from './Components/Citizen/CrimeReportingForm';
import AdminHome from './Components/admin/AdminHome';


function App() {
  return (
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/citizen' element={<CitizenPage />} />
        <Route path='/policeNext' element={<PoliceNext />} />
        <Route path='/police' element={<Police />} />
        <Route path='/admin' element={<AdminHome/>} />
        <Route path='/google' element={<Login />} />
        <Route path='/report' element={<CrimeReportForm />} />
      </Routes>
  );
}

export default App;
