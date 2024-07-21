import React from 'react';
import { GoogleLogin } from 'react-google-login';

// Assuming you've set up an.env.local file correctly and added your client ID there
const clientID = "186323848512-q3mbqm3nkph6ab885oj4fnnh1m279q76.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res) => {
        console.log("Login Successful : ", res.profileObj.email);
    };

    const onFailure = (res) => {
        console.log("Login Failed : ", res);
        // Handle failed login here, e.g., show an error message
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Login with Google
                    </label>
                    <div id="signInButton" className="w-full border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                        <GoogleLogin
                            clientId={clientID}
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;