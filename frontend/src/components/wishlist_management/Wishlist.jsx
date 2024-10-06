import React, { useEffect, useState } from 'react';
import UserService from '../user_management/UsersService';
import { getWishlistByUserId } from './WishlistService';
import { getItemById } from '../inventory_management/InventoryService';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

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
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setError('Token is missing');
            }
        };

        fetchWishlist();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-100 py-4">
            {/* Wishlist Items Section */}
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

            {/* Wishlist Details Section */}
            <div className="w-2/6 flex-grow bg-white rounded-lg shadow-lg p-8 m-4 max-h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Wishlist Details</h2>
                {error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <div className="space-y-4">
                        {wishlist ? (
                            <>
                                <p className="text-xl"><span className="font-bold">Wishlist Name:</span> {wishlist.name}</p>
                                <div className="space-y-2">
                                    {wishlist.itemIds.length > 0 ? (
                                        wishlist.itemIds.map((id) => (
                                            <div key={id} className="flex items-center bg-gray-100 rounded-lg p-4 transition-transform hover:scale-105">
                                                <p className="text-lg">Item ID: {id}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No items in this wishlist</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">Loading wishlist details...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
