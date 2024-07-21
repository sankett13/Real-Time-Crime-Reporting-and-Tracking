import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResponsiveNavbar from '../responsiveNavBar';
import { GoogleLogin } from 'react-google-login'; // Import for Google Login

// Assuming you've set up a .env.local file with your client ID
const clientID = "186323848512-q3mbqm3nkph6ab885oj4fnnh1m279q76.apps.googleusercontent.com";
 // Access from environment variable

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // True for login, False for signup

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here (replace with your backend calls)
    console.log('Submitted form data');
  };

  const toggleFormType = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    window.history.pushState({}, '', isLogin ? '/signup' : '/login');
  };

  const onSuccess = (res) => {
    console.log("Login Successful : ", res.profileObj.email);
    // Handle successful login (e.g., redirect, store user data)
  };

  const onFailure = (res) => {
    console.log("Login Failed : ", res);
    // Handle failed login (e.g., show error message)
  };

  return (
    <>
      <div className="login-signup-container flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        {isLogin ? (
          <LoginForm onSubmit={handleFormSubmit} />
        ) : (
          <SignupForm onSubmit={handleFormSubmit} />
        )}
        <p className="text-center mt-4">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}
          <a
            href={isLogin ? '/signup' : '/login'}
            onClick={toggleFormType}
            className="text-blue-500 hover:text-blue-700"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </p>
        {/* New paragraph for Google sign-up */}
        <p className="text-center mt-4">
          {/* Replace with GoogleLogin component */}
          <GoogleLogin
            clientId={clientID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true} // Optional: Set to false for initial render
          />
        </p>
      </div>
    </>
  );
};

export default LoginSignup;