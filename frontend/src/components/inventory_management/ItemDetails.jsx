import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems } from './InventoryService';
import { QuantityContext } from './QuantityContext'; // Import the context
import { updateItemQuantity } from './InventoryService'; // Ensure correct path to your service file

import SuggestedItems from './SuggestedItems';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { quantities, updateQuantity } = useContext(QuantityContext);
  const [stockMessage, setStockMessage] = useState(''); // Manage stock limit message
  const [buyMessage, setBuyMessage] = useState(''); // Manage purchase message

  const [currentQuantity, setCurrentQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem(`quantity_${id}`);
    return storedQuantity ? parseInt(storedQuantity, 10) : 1;
  });

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

   const handleIncreaseQuantity = async () => {
    const newQuantity = currentQuantity + 1;

    if (item && newQuantity <= item.quantity) {
      setCurrentQuantity(newQuantity);
      localStorage.setItem(`quantity_${id}`, newQuantity);

      const remainingStock = item.quantity - newQuantity;
      updateQuantity(id, remainingStock);

      try {
        await updateItemQuantity(id, remainingStock);
        setStockMessage(''); // Clear message when there's available stock
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      setStockMessage('No more stock available'); // Show message when stock limit is reached
    }
  };

  const handleDecreaseQuantity = async () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      localStorage.setItem(`quantity_${id}`, newQuantity);

      const remainingStock = item.quantity - newQuantity;
      updateQuantity(id, remainingStock);

      try {
        await updateItemQuantity(id, remainingStock);
        setStockMessage(''); // Clear message on decrease
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleBuyItem = async () => {
    if (item && currentQuantity <= item.quantity) {
      const remainingStock = item.quantity - currentQuantity;

      try {
        await updateItemQuantity(id, remainingStock);

        updateQuantity(id, remainingStock);
        setItem((prevItem) => ({ ...prevItem, quantity: remainingStock }));

        localStorage.removeItem(`quantity_${id}`);

        setBuyMessage(`Purchase successful! You bought ${currentQuantity} ${item.name}(s).`);

        setCurrentQuantity(1);
      } catch (error) {
        console.error("Error completing purchase:", error);
        setBuyMessage('Error completing purchase. Please try again.');
      }
    } else {
      setBuyMessage('Insufficient stock available.');
    }
  };


  if (!item) return <div>Loading...</div>;

  const stockStatus = (quantity) => {
    return quantity > 0 ? (
      <span className="text-green-500 font-bold">In Stock</span>
    ) : (
      <span className="text-red-500 font-bold">Out of Stock</span>
    );
  };

  const totalValue = item.price * currentQuantity;


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

            <p className="text-xl mb-4">Stock Status: {stockStatus(item.quantity)}</p>
            <p className="text-xl mb-4">Total Value: Rs. {totalValue.toFixed(2)}</p>

            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDecreaseQuantity} 
                className={`bg-gray-300 px-3 py-1 rounded ${currentQuantity === 1 && 'cursor-not-allowed'}`}
                disabled={currentQuantity === 1}
              >
                -
              </button>
              <span>{currentQuantity}</span>
              <button onClick={handleIncreaseQuantity} className="bg-gray-300 px-3 py-1 rounded">+</button>
            </div>

            {stockMessage && <p className="text-red-500 font-bold mt-2">{stockMessage}</p>}
            {buyMessage && <p className="text-blue-500 font-bold mt-2">{buyMessage}</p>}

            <div className="flex space-x-4 items-center mt-4">
              <button 
                className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white"
                onClick={handleBuyItem}
              >
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

        <SuggestedItems currentItemId={parseInt(id, 10)} />
      </div>
    </div>
  );
};

export default ItemDetails;
