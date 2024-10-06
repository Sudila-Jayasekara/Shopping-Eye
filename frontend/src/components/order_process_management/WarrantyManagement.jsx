import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ShoppingCart.css'; 

const WarrantyManagement = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleWarrantyClaim = (itemId) => {
    // Navigate to the warranty form using the new path
    navigate(`/warrenty/${itemId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Warranty Management</h1>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border p-4 rounded-lg shadow-lg">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover mr-4 rounded" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-700">Price: Rs. {item.price.toFixed(2)}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => handleWarrantyClaim(item.id)}
                >
                  Add Warranty
                </button>
              </div>
            ))}
            <Link to="/" className="text-blue-500 underline mt-4 block text-center">Back to shop</Link>
          </>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty. Add items to manage warranties.</p>
        )}
      </div>
    </div>
  );
};

export default WarrantyManagement;
