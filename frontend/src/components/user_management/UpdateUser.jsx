// src/UpdateUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from './UsersService';
import { uploadImage } from '../inventory_management/InventoryService'; // Ensure the correct path

function UpdateUser() {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        dob: '',
        gender: '',
        phone: '',
        address: '',
        imageUrl: ''
    });

    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

    useEffect(() => {
        fetchUserDataById(userId);
    }, [userId]);

    const fetchUserDataById = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getUserById(userId, token);
        // Extracting user data from the response
        const user = response.ourUsers; 
    
        if (user) {
          // Destructure fields from the 'ourUsers' object
          const { name, email, role, dob, gender, phone, address, imageUrl } = user;
          
          // Update state with user data
          setUserData({ name, email, role, dob, gender, phone, address, imageUrl });
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Update selectedFile state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this user?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');

                let imageUrl = userData.imageUrl; // Default to current image URL

                if (selectedFile) {
                    imageUrl = await uploadImage(selectedFile); // Upload image and get the URL
                }

                const updatedData = {
                    ...userData,
                    imageUrl: imageUrl // Use the new image URL if uploaded
                };

                const res = await UserService.updateUser(userId, updatedData, token);
                console.log(res);
                navigate("/admin/user-management");
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update User</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">DOB:</label>
                        <input
                            type="date"
                            name="dob"
                            value={userData.dob}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Profile Image:</label>
                        <input
                            type="file"
                            onChange={handleFileChange} // Handle file selection
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Role:</label>
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select your role</option>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SELLER">Seller</option>
                            <option value="CUSTOMER">Customer</option>
                            <option value="SHOP_OWNER">Shop Owner</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Phone Number:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Gender:</label>
                        <select
                            name="gender"
                            value={userData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select your gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
