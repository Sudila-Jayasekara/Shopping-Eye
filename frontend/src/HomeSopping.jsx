import { useState, useEffect } from 'react';
import { getAllItems, deleteItem, updateItem } from './api'; // Adjust import based on your actual API file

const HomeShopping = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '', description: '', category: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getAllItems();
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    const handleEditClick = (item) => {
        setEditingItem(item.id);
        setFormData(item);
    };

    const handleDeleteClick = async (itemId) => {
        try {
            await deleteItem(itemId);
            setItems(items.filter(item => item.id !== itemId));
            setSuccessMessage('Item successfully deleted.');
            setTimeout(() => setSuccessMessage(''), 3000);
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
            const updatedItem = await updateItem(editingItem, formData);
            setItems(items.map(item => item.id === editingItem ? updatedItem.data : item));
            setEditingItem(null);
            setSuccessMessage('Item successfully updated.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="min-h-screen text-gray-200 p-6">
            <h2 className="text-2xl text-black font-bold mb-6 text-center">Marketplace</h2>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-700 text-white rounded-lg">
                    {successMessage}
                </div>
            )}

            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold">Total Quantity of items</h3>
                <p className="text-lg">{totalQuantity}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                            <p className="mb-2">Price: Rs. {item.price.toFixed(2)}</p>
                            <p className="mb-2">Quantity: {item.quantity}</p>
                            <p className="mb-2">Description: {item.description}</p>
                            <p className="mb-4">Category: {item.category}</p>
                            <div className="flex justify-between">
                                <button className="bg-green-700 text-white px-3 py-1 rounded" onClick={() => alert(`Buy ${item.name}`)}>
                                    Buy
                                </button>
                                <button className="bg-blue-700 text-white px-3 py-1 rounded" onClick={() => alert(`Add ${item.name} to Cart`)}>
                                    Add to Cart
                                </button>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button className="bg-blue-800 text-white px-2 py-1 rounded" onClick={() => handleEditClick(item)}>
                                    Update
                                </button>
                                <button className="bg-red-800 text-white px-2 py-1 rounded" onClick={() => handleDeleteClick(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center px-4 py-2">No items available</div>
                )}
            </div>

            {editingItem && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Update Item</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-200">Item Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-900" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-900" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Quantity</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-900" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-900" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-900" />
                        </div>
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default HomeShopping;
