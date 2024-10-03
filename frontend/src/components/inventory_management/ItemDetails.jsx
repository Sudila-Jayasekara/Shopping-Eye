import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems } from './InventoryService';
import { QuantityContext } from './QuantityContext'; // Import the context

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { quantities, updateQuantity } = useContext(QuantityContext); // Get quantity and updateQuantity function from context

  const currentQuantity = quantities[id] || 0; // Default quantity is 0 if not set

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getAllItems();
        if (Array.isArray(data)) {
          const foundItem = data.find((item) => item.id === parseInt(id, 10));
          setItem(foundItem);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleIncreaseQuantity = () => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 0) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={item.imageUrl} alt={item.name} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="lg:w-1/2 lg:pl-6">
            <h1 className="text-3xl font-playfair font-bold">{item.name}</h1>
            <p className="text-lg font-lora mb-4">Category: {item.category}</p>
            <p className="text-lg font-lora mb-4">Shop: {item.shop}</p>
            <p className="text-xl font-lora mb-4">Description: {item.description}</p>
            <p className="text-2xl font-bold text-green-400 mb-4">Price: Rs. {item.price.toFixed(2)}</p>
            
            {/* Quantity Control */}
            <div className="flex items-center space-x-4">
              <button onClick={handleDecreaseQuantity} className="bg-gray-300 px-3 py-1 rounded">-</button>
              <span>{currentQuantity}</span>
              <button onClick={handleIncreaseQuantity} className="bg-gray-300 px-3 py-1 rounded">+</button>
            </div>

            <div className="flex space-x-4 items-center mt-4">
              <button className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
                Buy
              </button>
              <button className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
                Add to Cart
              </button>
              <a href="#" className="text-black hover:text-dark-red transition-colors duration-300 text-2xl">
                <i className="fas fa-heart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
