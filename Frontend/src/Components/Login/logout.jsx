import React from 'react';
import { GoogleLogout } from 'react-google-login';

// Assuming you've set up an.env.local file correctly and added your client ID there
const clientID = "186323848512-q3mbqm3nkph6ab885oj4fnnh1m279q76.apps.googleusercontent.com";

function Logout() {
    const onSuccess = (res) => {
        console.log('Logout Successful');
    };

    const onFailure = (err) => {
        console.error('Logout Failed', err);
    };

    return (
        <div id="signOutButton" className="logout-button">
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
}

export default Logout;