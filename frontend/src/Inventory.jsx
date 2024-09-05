import { useState, useEffect } from 'react';
import { getAllItems, deleteItem, updateItem } from './api'; // Ensure these API methods are correctly implemented

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null); // Track the item being edited
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '', description: '', category: '' });
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getAllItems(); // Fetch items from the API
                setItems(response.data); // Assume response.data contains the list of items
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleEditClick = (item) => {
        setEditingItem(item.id); // Set the current item for editing
        setFormData(item); // Populate form with existing data
    };

    const handleDeleteClick = async (itemId) => {
        try {
            console.log(`Attempting to delete item with ID: ${itemId}`);
            await deleteItem(itemId); // Call the delete API method
            console.log(`Successfully deleted item with ID: ${itemId}`);
            setItems(items.filter(item => item.id !== itemId)); // Update state to remove the item
            setSuccessMessage('Item successfully deleted.'); // Set success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data before update:", formData);
            const updatedItem = await updateItem(editingItem, formData); // Call the update API method
            console.log("Updated item:", updatedItem.data);
            setItems(items.map(item => item.id === editingItem ? updatedItem.data : item)); // Update the item in state
            setEditingItem(null); // Reset editing state
            setSuccessMessage('Item successfully updated.'); // Set success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // Calculate total quantity
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="min-h-screen  text-gray-200 p-6">
            <h2 className="text-2xl text-black font-bold mb-6 text-center">Inventory</h2>

            {/* Display success message */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-700 text-white rounded-lg">
                    {successMessage}
                </div>
            )}

            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold">Total Quantity of items</h3>
                <p className="text-lg">{totalQuantity}</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700 rounded-lg border border-gray-600">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Item Name</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Price</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Quantity</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Description</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Category</th>
                            <th className="px-4 py-2 border-b border-gray-600 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border-b border-gray-600">{item.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">Rs. {item.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{item.quantity}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{item.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">{item.category}</td>
                                    <td className="px-4 py-2 border-b border-gray-600">
                                        <button
                                            className="bg-blue-800 text-white px-2 py-1 mr-2 rounded"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-800 text-white px-2 py-1 rounded"
                                            onClick={() => handleDeleteClick(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-2">No items available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editingItem && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Update Item</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-200">Item Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-900"
                            />
                        </div>
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Inventory;
