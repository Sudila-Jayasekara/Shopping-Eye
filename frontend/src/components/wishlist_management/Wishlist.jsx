
import React, { useEffect, useState } from 'react';
import UserService from '../user_management/UsersService';
import { getWishlistByUserId } from './WishlistService';
import { getItemById } from '../inventory_management/InventoryService';
import { createSharedWishlist, getAllSharedWishlistsForUser, deleteSharedWishlist, addMemberToSharedWishlist, removeMemberFromSharedWishlist } from '../wishlist_management/Shared/SharedWishlistService';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [sharedWishlistName, setSharedWishlistName] = useState('');
    const [message, setMessage] = useState('');
    const [sharedWishlists, setSharedWishlists] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedWishlist, setSelectedWishlist] = useState(null);
    const [newMemberEmail, setNewMemberEmail] = useState('');

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const user = await UserService.getUserByToken(token);
                    const userId = user.ourUsers.id;
                    const data = await getWishlistByUserId(userId, token);
                    setWishlist(data);

                    const itemsData = await Promise.all(
                        data.itemIds.map(async (itemId) => {
                            const item = await getItemById(itemId);
                            return item;
                        })
                    );
                    setItems(itemsData);

                    const sharedWishlistsData = await getAllSharedWishlistsForUser(userId, token);
                    setSharedWishlists(sharedWishlistsData);
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setError('Token is missing');
            }
        };

        fetchWishlist();
    }, []);

    const handleCreateSharedWishlist = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = await UserService.getUserByToken(token);
                const ownerId = user.ourUsers.id;
                const sharedWishlistDTO = {
                    ownerId,
                    sharedWishlistName,
                    itemIds: [],
                    memberIds: []
                };
                const newSharedWishlist = await createSharedWishlist(sharedWishlistDTO, token);
                setSharedWishlists([newSharedWishlist, ...sharedWishlists]);
                setMessage('Shared wishlist created successfully!');
                setSharedWishlistName('');

                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } catch (err) {
                setMessage(`Error creating shared wishlist: ${err.message}`);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } else {
            setMessage('Token is missing');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleDeleteSharedWishlist = async (wishlistId) => {
        const token = localStorage.getItem('token');
        if (token) {
            const confirmed = window.confirm("Are you sure you want to delete this shared wishlist?");
            if (confirmed) {
                try {
                    await deleteSharedWishlist(wishlistId, token);
                    setSharedWishlists(sharedWishlists.filter(wishlist => wishlist.id !== wishlistId));
                    setMessage('Shared wishlist deleted successfully!');
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                } catch (err) {
                    setMessage(`Error deleting shared wishlist: ${err.message}`);
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                }
            }
        } else {
            setMessage('Token is missing');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleAddMember = async () => {
        const token = localStorage.getItem('token');
        if (token && selectedWishlist) {
            try {
                // Fetch user details by email to get the userId
                const user = await UserService.getUserByEmail(newMemberEmail, token);
                console.log('User details:', user); // Debugging log
                const userId = user.ourUsers.id;
    
                // Add member to shared wishlist using userId
                const updatedWishlist = await addMemberToSharedWishlist(selectedWishlist.id, userId, token);
                setSharedWishlists(sharedWishlists.map(wishlist => wishlist.id === updatedWishlist.id ? updatedWishlist : wishlist));
                setNewMemberEmail('');
                setMessage('Member added successfully!');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } catch (err) {
                setMessage(`Error adding member: ${err.message}`);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        }
    };
    

    const handleRemoveMember = async (memberId) => {
        const token = localStorage.getItem('token');
        if (token && selectedWishlist) {
            try {
                const updatedWishlist = await removeMemberFromSharedWishlist(selectedWishlist.id, memberId, token);
                setSharedWishlists(sharedWishlists.map(wishlist => wishlist.id === updatedWishlist.id ? updatedWishlist : wishlist));
                setMessage('Member removed successfully!');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } catch (err) {
                setMessage(`Error removing member: ${err.message}`);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        }
    };

    const handleShowMembers = (wishlist) => {
        setSelectedWishlist(wishlist);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedWishlist(null);
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-100 py-4">
            <div className="w-4/6 flex-grow bg-white rounded-lg shadow-lg p-8 m-4 max-h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Your Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                <p className="text-gray-700 mb-4">{item.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-2xl font-bold text-green-600">Rs. {item.price}</p>
                                    <button 
                                        onClick={() => addToCart(item)} 
                                        className=" bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Cart
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-4">
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
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No items in wishlist</p>
                    )}
                </div>
            </div>

            <div className="w-2/6 flex-grow bg-white rounded-lg shadow-lg p-8 m-4 max-h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Create Shared Wishlist</h2>
                {message && <div className="text-green-500">{message}</div>}
                <div className="space-y-4">
                    <input
                        type="text"
                        value={sharedWishlistName}
                        onChange={(e) => setSharedWishlistName(e.target.value)}
                        placeholder="Enter shared wishlist name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleCreateSharedWishlist}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                        Create Shared Wishlist
                    </button>
                </div>
                <h2 className="text-3xl font-bold text-center text-blue-600 mt-8 mb-4">Shared Wishlists</h2>
                <div className="space-y-4">
                    {sharedWishlists.length > 0 ? (
                        sharedWishlists.map((wishlist) => (
                            <div key={wishlist.id} className="bg-gray-100 rounded-lg p-4 flex justify-between items-center transition-transform hover:scale-105">
                                <p className="text-xl font-semibold">{wishlist.sharedWishlistName}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleShowMembers(wishlist)}
                                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                    >
                                        <i className="fas fa-users"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSharedWishlist(wishlist.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No shared wishlists</p>
                    )}
                </div>
            </div>

            {showPopup && selectedWishlist && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Manage Members for {selectedWishlist.sharedWishlistName}</h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                                placeholder="Enter member email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={handleAddMember}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                            >
                                Add Member
                            </button>
                        </div>
                        <h3 className="text-xl font-bold mt-6 mb-4">Members</h3>
                        <div className="space-y-2">
                            {selectedWishlist.members.length > 0 ? (
                                selectedWishlist.members.map((member) => (
                                    <div key={member.id} className="flex justify-between items-center">
                                        <p>{member.email}</p>
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No members</p>
                            )}
                        </div>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
