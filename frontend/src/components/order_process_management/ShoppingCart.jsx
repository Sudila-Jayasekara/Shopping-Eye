import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Add useNavigate for navigation
import './ShoppingCart.css'; 

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, quantity: newQuantity };
        return updatedItem;
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleCheckout = () => {
    sessionStorage.setItem('totalPrice', totalPrice);
    navigate('/payment');  // Navigate to the checkout page
  };

  return (
    <div className="shopping-cart-container">
      <div className="cart-items">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </div>
                <p className="cart-item-price">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                <span
                  className="remove-item"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  &#10005;
                </span>
              </div>
            ))}
            <Link to="/" className="back-to-shop">Back to shop</Link>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <p>ITEMS: {cartItems.length}</p>
        <p className="total">TOTAL PRICE: Rs. {totalPrice.toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default ShoppingCart;