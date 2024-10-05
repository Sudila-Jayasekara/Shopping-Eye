// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import UserService from './UsersService';

// function UserManagementPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await UserService.getAllUsers(token);
//       setUsers(response.ourUsersList);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to delete this user?');
//       const token = localStorage.getItem('token');
//       if (confirmDelete) {
//         await UserService.deleteUser(userId, token);
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex  py-8"> {/* Added flex and center alignment */}
//       <div className="w-full bg-white shadow-lg rounded-lg p-6 m-4"> {/* Set a max width for better centering */}
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Users Management Page</h2>
//         <div className="flex justify-end mb-4">
//           <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
//             Add User
//           </Link>
//         </div>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">ID</th>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">Name</th>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">Email</th>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">City</th>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">Role</th>
//               <th className="py-2 px-4 border-b font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id} className="text-center">
//                 <td className="py-2 px-4 border-b text-gray-700">{user.id}</td>
//                 <td className="py-2 px-4 border-b text-gray-700">{user.name}</td>
//                 <td className="py-2 px-4 border-b text-gray-700">{user.email}</td>
//                 <td className="py-2 px-4 border-b text-gray-700">{user.city}</td>
//                 <td className="py-2 px-4 border-b text-gray-700">{user.role}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => deleteUser(user.id)}
//                     className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 mr-2"
//                   >
//                     Delete
//                   </button>
//                   <Link
//                     to={`/update-user/${user.id}`}
//                     className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-600"
//                   >
//                     Update
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default UserManagementPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from './UsersService';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex py-8">
      <div className="w-full bg-white shadow-lg rounded-lg p-6 m-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Users Management Page</h2>
        <div className="flex justify-end mb-4">
          <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
            Add User
          </Link>
        </div>
        <div className="overflow-x-auto"> {/* Enable horizontal scrolling */}
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">ID</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Name</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Email</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Role</th>
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Address</th> {/* Reduced width */}
                <th className="py-2 px-4 border-b font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border-b text-gray-700">{user.id}</td>
                  <td className="py-2 px-4 border-b text-gray-700">{user.name}</td>
                  <td className="py-2 px-4 border-b text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border-b text-gray-700">{user.role}</td>
                  <td className="py-2 px-4 border-b text-gray-700">{user.address}</td> {/* Reduced width */}
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center space-x-2"> {/* Flex container for buttons */}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 w-full" // Same size
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-user/${user.id}`}
                        className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-600 w-full" // Same size
                      >
                        Update
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagementPage;
