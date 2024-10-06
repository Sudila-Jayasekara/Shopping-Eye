import React, { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Optionally clear other user data
        localStorage.removeItem('userData'); // Remove any additional data if necessary
        // Clear any other relevant data, e.g., user preferences, settings
        // localStorage.removeItem('preferences');

        // Redirect to the login page
        window.location.href = '/login'; // Redirect to the login page

    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-lg font-semibold">Logging out...</h2>
        </div>
    );
};

export default Logout;
