import React, { useState, useEffect } from 'react';
import UserService from './UsersService';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Profile Information
                </h2>
                <div className="text-gray-700 mb-4">
                    <p className="mb-2"><span className="font-bold">Name:</span> {profileInfo.name}</p>
                    <p className="mb-2"><span className="font-bold">Email:</span> {profileInfo.email}</p>
                    <p className="mb-2"><span className="font-bold">City:</span> {profileInfo.city}</p>
                </div>
                {profileInfo?.role === "ADMIN" && (
                    <div className="mt-6 text-center">
                        <Link to={`/update-user/${profileInfo.id}`} className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Update This Profile
                        </Link>
                        <Link to="/admin/user-management" className="ml-4 inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                            Manage Users
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
