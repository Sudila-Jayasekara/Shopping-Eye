// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import UserService from './UsersService';

// function UpdateUser() {
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     role: '',
//     city: ''
//   });

//   useEffect(() => {
//     fetchUserDataById(userId);
//   }, [userId]);

//   const fetchUserDataById = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await UserService.getUserById(userId, token);
//       const { name, email, role, city } = response.ourUsers;
//       setUserData({ name, email, role, city });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to update this user?');
//       if (confirmDelete) {
//         const token = localStorage.getItem('token');
//         const res = await UserService.updateUser(userId, userData, token);
//         console.log(res);
//         navigate("/admin/user-management");
//       }
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       alert(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Update User</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={userData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
//             <input
//               type="text"
//               name="role"
//               value={userData.role}
//               onChange={handleInputChange}
//               placeholder="Enter your role"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
//             <input
//               type="text"
//               name="city"
//               value={userData.city}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateUser;

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
    city: '',
    imageUrl: '' // Add imageUrl to userData
  });

  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token);
      const { name, email, role, city, imageUrl } = response.ourUsers; // Assuming imageUrl is returned
      setUserData({ name, email, role, city, imageUrl });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
            <input
              type="text"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              placeholder="Enter your role"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
            <input
              type="file"
              onChange={handleFileChange} // Handle file selection
              accept="image/*" // Accept only image files
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
