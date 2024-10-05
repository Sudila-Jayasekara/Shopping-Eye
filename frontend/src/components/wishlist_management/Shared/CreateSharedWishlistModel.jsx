import React, { useState } from 'react';


const CreateSharedWishlistModel = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, memberEmail });
        onClose(); // Close the modal after submission
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <h2 className="text-2xl font-bold mb-4">Create Shared Wishlist</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Wishlist Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Add Member Email</label>
                            <input
                                type="email"
                                value={memberEmail}
                                onChange={(e) => setMemberEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="ml-2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default CreateSharedWishlistModel;
