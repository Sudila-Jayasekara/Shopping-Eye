import { useState } from 'react';
import { createItem } from './InventoryService'; // Ensure this path is correct

const ItemForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); // New state for image
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const categories = ['Food', 'Electronics', 'Clothing', 'Home Appliances', 'Books', 'Furniture'];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImage(files[0]); // Handle file input
        } else {
            switch (name) {
                case 'name':
                    setName(value);
                    break;
                case 'price':
                    setPrice(value);
                    break;
                case 'quantity':
                    setQuantity(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'category':
                    setCategory(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImage(image); // Upload image and get URL
            }

            const itemData = {
                name,
                price,
                quantity,
                description,
                category,
                imageUrl // Include image URL if uploaded
            };

            const response = await createItem(itemData); // Send item data to API
            console.log("Item listing created successfully:", response);

            setSuccessMessage("Item listing created successfully!");
            setErrorMessage(''); // Clear any previous errors

            // Clear form fields
            setName('');
            setPrice('');
            setQuantity('');
            setDescription('');
            setCategory('');
            setImage(null); // Clear image after submission
        } catch (error) {
            console.error("Error creating item listing:", error);
            setErrorMessage("There was an error creating the item listing.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg border border-gray-600 w-full max-w-lg bg-gray-200">
                <h2 className="text-xl font-bold mb-4 text-center text-black">Item Listing Information</h2>

                {successMessage && (
                    <div className="mb-4 text-green-400 text-center">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 text-red-400 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={price}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black">Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-700 text-gray-200"
                        />
                    </div>
                </div>

                <button type="submit" className="mt-6 w-full p-3 bg-blue-700 text-white rounded hover:bg-green-800">Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
