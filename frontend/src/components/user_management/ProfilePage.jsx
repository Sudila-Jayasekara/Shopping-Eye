import React, { useState, useEffect } from 'react';
import UserService from './UsersService';
import { Link } from 'react-router-dom';
import { getWishlistByUserId } from '../wishlist_management/WishlistService'; // Import WishlistService for fetching wishlist
import { getItemById } from '../inventory_management/InventoryService'; // Import for fetching item details
 
function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [sharedWishlists, setSharedWishlists] = useState([]); // State for shared wishlists

    useEffect(() => {
        fetchProfileInfo();
        fetchWishlist();
        //fetchSharedWishlists();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await UserService.getYourProfile(token);
                setProfileInfo(response.ourUsers);
            } else {
                console.error('No token found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const fetchWishlist = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = await UserService.getUserByToken(token);
                const userId = user.ourUsers.id;
                const data = await getWishlistByUserId(userId, token);

                // Fetch item details for the wishlist
                const itemsData = await Promise.all(
                    data.itemIds.map(async (itemId) => {
                        const item = await getItemById(itemId);
                        return item;
                    })
                );
                setWishlist(itemsData);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('Token is missing');
        }
    };

    const fetchSharedWishlists = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = await UserService.getUserByToken(token);
                const userId = user.ourUsers.id;
                const sharedData = await getSharedWishlistsByUserId(userId, token); // Fetch shared wishlists
    
                setSharedWishlists(sharedData); // Update state with shared wishlists
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('Token is missing');
        }
    };
    
    // const handleCreateSharedWishlist = async ({ name, memberEmail }) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const ownerId = profileInfo.id; // Assuming profileInfo contains the current user's ID
    
    //         // Prepare the wishlist data according to the backend's requirement
    //         const wishlistData = {
    //             name,
    //             owner: { id: ownerId } // Correctly structure the owner object
    //         };
    
    //         // Call the API to create the shared wishlist
    //         const newWishlist = await createSharedWishlist(wishlistData, token);
            
    //         console.log('Shared Wishlist Created:', newWishlist);
            
    //         // Extract the wishlist ID from the newly created wishlist
    //         const wishlistId = newWishlist.id; // Ensure this matches your actual structure
            
    //         // Prepare the member data based on the provided email
    //         const memberData = { email: memberEmail };
    
    //         // Call the API to add the member to the newly created shared wishlist
    //         const updatedWishlist = await addMemberToSharedWishlist(wishlistId, memberData, token);
            
    //         console.log(`Member ${memberEmail} added to wishlist ${wishlistId}.`, updatedWishlist);
    
    //         // Update the state with the new wishlist
    //         setSharedWishlists((prev) => [...prev, newWishlist]); // Update sharedWishlists state
    //         setIsModalOpen(false); // Close the modal after creation
    //     } catch (error) {
    //         console.error('Error creating shared wishlist or adding member:', error);
    //         setError('Failed to create shared wishlist or add member.'); // Handle errors appropriately
    //     }
    // };
    
    

    return (
        <div className="min-h-screen flex bg-gray-100 py-4">
            {/* Profile Information Section */}
            <div className="w-4/6 flex-grow bg-white rounded-lg shadow-lg p-8 m-4">
  <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
    Profile Information
  </h2>
  
  {/* Profile Picture */}
  <div className="flex justify-center mb-10">
    <img
      src={profileInfo.imageUrl || 'default-profile-pic.png'}
      alt="Profile"
      className="w-40 h-40 rounded-full border-4 border-blue-600 object-cover shadow-lg"
    />
  </div>
  
  {/* User Details */}
  <div className="text-gray-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p className="mb-2"><span className="font-bold">Name:</span> {profileInfo.name}</p>
      <p className="mb-2"><span className="font-bold">Email:</span> {profileInfo.email}</p>
      <p className="mb-2"><span className="font-bold">Role:</span> {profileInfo.role}</p>
      <p className="mb-2"><span className="font-bold">Date of Birth:</span> {profileInfo.dob}</p>
      <p className="mb-2"><span className="font-bold">Gender:</span> {profileInfo.gender}</p>
      <p className="mb-2"><span className="font-bold">Phone:</span> {profileInfo.phone}</p>
      <p className="mb-2"><span className="font-bold">Address:</span> {profileInfo.address}</p>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex justify-center space-x-4">
    <Link to={`/update-user/${profileInfo.id}`} className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
      Update This Profile
    </Link>
    {profileInfo?.role === "ADMIN" && (
      <Link to="/admin/user-management" className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out">
        Manage Users
      </Link>
    )}
  </div>
</div>


            {/* Wishlist Section */}
            <div className="w-2/6 flex-grow bg-white rounded-lg shadow-lg p-8 m-4 max-h-screen overflow-y-auto">
                
                {/* <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
                    Shared Wishlists
                </h2>

                <div className="space-y-4">
                    {sharedWishlists.length > 0 ? (
                        sharedWishlists.map((wishlist) => (
                            <div key={wishlist.id} className="bg-gray-100 rounded-lg p-4">
                                <h3 className="text-xl font-semibold">{wishlist.name}</h3>
                                <p className="text-gray-700">Members: {wishlist.members.join(', ')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No shared wishlists</p>
                    )}
                </div>
                

                <div className="mb-4 mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)} // Open the modal
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Create Shared Wishlist
                    </button>
                </div> */}
                
                {/* <CreateSharedWishlistModel
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateSharedWishlist}
                /> */}

                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
                    Wishlist
                </h2>
                {error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <div className="space-y-4">
                        {wishlist.length > 0 ? (
                            wishlist.map((item) => (
                                <div key={item.id} className="flex items-center bg-gray-100 rounded-lg p-4 transition-transform hover:scale-105">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-700">{item.description}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-lg font-bold text-green-600">Rs. {item.price}</p>
                                            <Link
                                                to={`/removefromwishlist/${item.id}`}
                                                className="text-red-300 hover:text-red-500 transition-colors duration-300 text-2xl"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const confirmed = window.confirm("Are you sure you want to remove this item from your wishlist?");
                                                    if (confirmed) {
                                                        window.location.href = `/removefromwishlist/${item.id}`;
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-heart"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No items in your wishlist</p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}

export default ProfilePage;
