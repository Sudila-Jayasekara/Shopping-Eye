//itemForm.jsx
import { useState } from 'react';
import { createItem } from './InventoryService'; // Ensure this path is correct

const ItemForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const categories = ['Food', 'Electronics', 'Clothing', 'Home Appliances', 'Books', 'Furniture']; // Define your categories here

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
            category
        };
        try {
            const response = await createItem(itemData);
            console.log("Item listing created successfully:", response);

            // Show success message
            setSuccessMessage("Item listing created successfully!");

            // Clear the form
            setName('');
            setPrice('');
            setQuantity('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error("Error creating item listing:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-lg border border-gray-600 w-full max-w-lg bg-gray-200">
                <h2 className="text-xl font-bold mb-4 text-center text-black">Item Listing Information</h2>

                {/* Display success message if present */}
                {successMessage && (
                    <div className="mb-4 text-green-400 text-center">
                        {successMessage}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Item Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="mt-6 w-full p-3 bg-blue-700 text-white rounded hover:bg-green-800">Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
