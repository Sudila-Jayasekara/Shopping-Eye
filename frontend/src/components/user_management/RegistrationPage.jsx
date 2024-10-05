
// // import React, { useState } from 'react';
// // import UserService from './UsersService';
// // import { useNavigate } from 'react-router-dom';
// // import { uploadImage } from '../inventory_management/InventoryService'; // Ensure the correct path

// // function RegistrationPage() {
// //     const navigate = useNavigate();

// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: '',
// //         role: '', // This will hold the selected role
// //         city: '',
// //         imageUrl: '' // Add imageUrl to formData
// //     });

// //     const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({ ...formData, [name]: value });
// //     };

// //     const handleFileChange = (e) => {
// //         setSelectedFile(e.target.files[0]); // Update selectedFile state
// //     };

// //     const handleRoleChange = (e) => {
// //         const { value } = e.target;
// //         setFormData({ ...formData, role: value }); // Update role in formData
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             let imageUrl = ''; // Initialize imageUrl
    
// //             if (selectedFile) {
// //                 imageUrl = await uploadImage(selectedFile); // Upload image and get the URL
// //             }
    
// //             // Create a new object that includes the imageUrl
// //             const dataToSend = {
// //                 ...formData,
// //                 imageUrl: imageUrl // Use the URL obtained from the upload
// //             };
    
// //             // Log the formData before sending to the backend
// //             console.log('Form Data to be sent:', dataToSend);
    
// //             const token = localStorage.getItem('token');
// //             await UserService.register(dataToSend, token); // Send the complete formData including imageUrl
    
// //             // Reset the form
// //             setFormData({
// //                 name: '',
// //                 email: '',
// //                 password: '',
// //                 role: '', // Reset role
// //                 city: '',
// //                 imageUrl: ''
// //             });
// //             alert('User registered successfully');
// //             navigate('/admin/user-management');
// //         } catch (error) {
// //             console.error('Error registering user:', error);
// //             alert('An error occurred while registering user');
// //         }
// //     };
    

// //     return (
// //         <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
// //             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //                 <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registration</h2>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">Name:</label>
// //                         <input
// //                             type="text"
// //                             name="name"
// //                             value={formData.name}
// //                             onChange={handleInputChange}
// //                             required
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         />
// //                     </div>
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">Email:</label>
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             value={formData.email}
// //                             onChange={handleInputChange}
// //                             required
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         />
// //                     </div>
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">Password:</label>
// //                         <input
// //                             type="password"
// //                             name="password"
// //                             value={formData.password}
// //                             onChange={handleInputChange}
// //                             required
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         />
// //                     </div>
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">Role:</label>
// //                         <select
// //                             name="role"
// //                             value={formData.role}
// //                             onChange={handleRoleChange} // Handle dropdown change
// //                             required
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         >
// //                             <option value="" disabled>Select your role</option>
// //                             <option value="ADMIN">Admin</option>
// //                             <option value="USER">User</option>
// //                             <option value="SELLER">Seller</option>
// //                             <option value="CUSTOMER">Customer</option>
// //                             <option value="SHOP_OWNER">Shop Owner</option>
// //                         </select>
// //                     </div>
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">City:</label>
// //                         <input
// //                             type="text"
// //                             name="city"
// //                             value={formData.city}
// //                             onChange={handleInputChange}
// //                             placeholder="Enter your city"
// //                             required
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         />
// //                     </div>
// //                     <div className="form-group">
// //                         <label className="block text-gray-700 font-semibold">Profile Image:</label>
// //                         <input
// //                             type="file"
// //                             onChange={handleFileChange} // Handle file selection
// //                             accept="image/*" // Accept only image files
// //                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
// //                         />
// //                     </div>
// //                     <button
// //                         type="submit"
// //                         className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
// //                     >
// //                         Register
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// // export default RegistrationPage;

// // src/RegistrationPage.js
// import React, { useState } from 'react';
// import UserService from './UsersService';
// import { useNavigate } from 'react-router-dom';
// import { uploadImage } from '../inventory_management/InventoryService'; // Ensure the correct path

// function RegistrationPage() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: '',
//         city: '',
//         imageUrl: '' // Add imageUrl to formData
//     });

//     const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]); // Update selectedFile state
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let imageUrl = ''; // Initialize imageUrl

//             if (selectedFile) {
//                 imageUrl = await uploadImage(selectedFile); // Upload image and get the URL
//             }

//             // Create a new object that includes the imageUrl
//             const dataToSend = {
//                 ...formData,
//                 imageUrl: imageUrl // Use the URL obtained from the upload
//             };

//             // Log the formData before sending to the backend
//             console.log('Form Data to be sent:', dataToSend);

//             const token = localStorage.getItem('token');
//             await UserService.register(dataToSend, token); // Send the complete formData including imageUrl

//             // Reset the form
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 role: '',
//                 city: '',
//                 imageUrl: ''
//             });
//             alert('User registered successfully');
//             navigate('/admin/user-management');
//         } catch (error) {
//             console.error('Error registering user:', error);
//             alert('An error occurred while registering user');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
//                 <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registration</h2>
//                 <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//                     {/* Left Column */}
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">City:</label>
//                         <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleInputChange}
//                             placeholder="Enter your city"
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">Profile Image:</label>
//                         <input
//                             type="file"
//                             onChange={handleFileChange} // Handle file selection
//                             accept="image/*" // Accept only image files
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         />
//                     </div>

//                     {/* Right Column */}
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">Password:</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-semibold">Role:</label>
//                         <select 
//                             name="role" 
//                             value={formData.role} 
//                             onChange={handleInputChange} 
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         >
//                             <option value="">Select your role</option>
//                             <option value="USER">User</option>
//                             <option value="ADMIN">Admin</option>
//                             <option value="SELLER">Seller</option>
//                             <option value="CUSTOMER">Customer</option>
//                             <option value="SHOP_OWNER">Shop Owner</option>
//                         </select>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="col-span-2">
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default RegistrationPage;


// src/RegistrationPage.js
import React, { useState } from 'react';
import UserService from './UsersService';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../inventory_management/InventoryService'; // Ensure the correct path

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: '',
        dob: '',          // New field for Date of Birth
        gender: '',       // New field for Gender
        phone: '',        // New field for Phone Number
        address: '',      // New field for Address
        imageUrl: ''      // Add imageUrl to formData
    });

    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Update selectedFile state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = ''; // Initialize imageUrl

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile); // Upload image and get the URL
            }

            // Create a new object that includes the imageUrl
            const dataToSend = {
                ...formData,
                imageUrl: imageUrl // Use the URL obtained from the upload
            };

            // Log the formData before sending to the backend
            console.log('Form Data to be sent:', dataToSend);

            const token = localStorage.getItem('token');
            await UserService.register(dataToSend, token); // Send the complete formData including imageUrl

            // Reset the form
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                city: '',
                dob: '',
                gender: '',
                phone: '',
                address: '',
                imageUrl: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registration</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
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
                            value={formData.email}
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
                            value={formData.dob}
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
                            accept="image/*" // Accept only image files
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Role:</label>
                        <select 
                            name="role" 
                            value={formData.role} 
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
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Gender:</label>
                        <select 
                            name="gender" 
                            value={formData.gender} 
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
                            value={formData.address}
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
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;
