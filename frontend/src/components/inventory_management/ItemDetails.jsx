// import { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { getAllItems } from './InventoryService';
// import { QuantityContext } from './QuantityContext'; // Import the context

// const ItemDetails = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const { quantities, updateQuantity } = useContext(QuantityContext); // Get quantity and updateQuantity function from context

//   const currentQuantity = quantities[id] || 0; // Default quantity is 0 if not set

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const data = await getAllItems();
//         if (Array.isArray(data)) {
//           const foundItem = data.find((item) => item.id === parseInt(id, 10));
//           setItem(foundItem);
//         } else {
//           console.error("Unexpected data format:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching item details:", error);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   const handleIncreaseQuantity = () => {
//     updateQuantity(id, currentQuantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     if (currentQuantity > 0) {
//       updateQuantity(id, currentQuantity - 1);
//     }
//   };

//   if (!item) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen p-6 bg-white text-gray-800">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex flex-col lg:flex-row">
//           <div className="lg:w-1/2">
//             <img src={item.imageUrl} alt={item.name} className="w-full h-auto object-cover rounded-lg" />
//           </div>
//           <div className="lg:w-1/2 lg:pl-6">
//             <h1 className="text-3xl font-playfair font-bold">{item.name}</h1>
//             <p className="text-lg font-lora mb-4">Category: {item.category}</p>
//             <p className="text-lg font-lora mb-4">Shop: {item.shop}</p>
//             <p className="text-xl font-lora mb-4">Description: {item.description}</p>
//             <p className="text-2xl font-bold text-green-400 mb-4">Price: Rs. {item.price.toFixed(2)}</p>
            
//             {/* Quantity Control */}
//             <div className="flex items-center space-x-4">
//               <button onClick={handleDecreaseQuantity} className="bg-gray-300 px-3 py-1 rounded">-</button>
//               <span>{currentQuantity}</span>
//               <button onClick={handleIncreaseQuantity} className="bg-gray-300 px-3 py-1 rounded">+</button>
//             </div>

//             <div className="flex space-x-4 items-center mt-4">
//               <button className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
//                 Buy
//               </button>
//               <button className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
//                 Add to Cart
//               </button>
//               <a href="#" className="text-black hover:text-dark-red transition-colors duration-300 text-2xl">
//                 <i className="fas fa-heart"></i>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetails;

import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllItems, getFeedbackByItemId, submitFeedback } from './InventoryService';
import { QuantityContext } from './QuantityContext'; // Import the context

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { quantities, updateQuantity } = useContext(QuantityContext); // Get quantity and updateQuantity function from context
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // For showing the success message
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');

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

    const fetchFeedbacks = async () => {
      try {
        const feedbackData = await getFeedbackByItemId(id);
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedbacks!", error);
      }
    };

    fetchItem();
    fetchFeedbacks();
  }, [id]);

  const handleIncreaseQuantity = () => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 0) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // const addToCart = (item) => {
  //   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  //   const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

  //   if (existingItem) {
  //     existingItem.quantity = Math.min(existingItem.quantity + currentQuantity, item.stock);
  //   } else {
  //     cartItems.push({ ...item, quantity: currentQuantity });
  //   }

  //   localStorage.setItem('cart', JSON.stringify(cartItems));
  //   // Show success message
  //   setShowSuccessMessage(true);
  //   // Hide message after 3 seconds
  //   setTimeout(() => {
  //     setShowSuccessMessage(false);
  //   }, 3000);
  //   updateQuantity(id, 0);  // Reset quantity after adding to cart
  // };

  const addToCart = async (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  
    // Update quantity or add a new item to the cart
    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + currentQuantity, item.stock);
    } else {
      cartItems.push({ ...item, quantity: currentQuantity });
    }
  
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Show success message
    setShowSuccessMessage(true);
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  
    // Reset quantity after adding to cart
    updateQuantity(item.id, 0); 
  
    // Prepare warranty item data
    const purchaseDay = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const warrantyItem = {
      itemId: item.id,
      purchaseDay: purchaseDay,
      name: item.name,
      price: item.price,
      description: item.description || "No description available",
      category: item.category,
      warrantyTime: item.warrantyTime || 12, // Default warranty time if not provided
    };
  
    // Send POST request to backend
    try {
      const response = await fetch('http://localhost:1010/public/warranty-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization header if necessary
          // 'Authorization': `Bearer ${yourToken}`, // Uncomment if needed
        },
        body: JSON.stringify(warrantyItem),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Warranty item saved:', data);
      // Additional success handling can be added here
  
    } catch (error) {
      console.error('Fetch error:', error.message);
      alert('An error occurred while processing your warranty item. Please try again.');
    }
  };
  
  const handleBuy = () => {
    const totalPrice = item.price * currentQuantity; // Calculate the total price based on item price and selected quantity

    // Store total price and other necessary info in sessionStorage
    sessionStorage.setItem('totalPrice', totalPrice);
    sessionStorage.setItem('selectedQuantity', currentQuantity); // Optional, if you want to track quantity

    // Navigate to the payment page
    navigate('/payment');
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      customerName,
      rating,
      comment,
      item: { id: item.id },
    };

    try {
      await submitFeedback(newFeedback);
      setFeedbacks(prevFeedbacks => [...prevFeedbacks, newFeedback]);
      setRating(0);
      setComment('');
      setCustomerName('');
    } catch (error) {
      console.error("Error submitting feedback:", error);
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
              <button onClick={handleBuy} className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
                Buy
              </button>
              <button onClick={() => addToCart(item)} className="bg-white text-dark-blue px-4 py-2 rounded border border-blue-700 hover:bg-dark-blue hover:text-white">
                Add to Cart
              </button>
              <a href="#" className="text-black hover:text-dark-red transition-colors duration-300 text-2xl">
                <i className="fas fa-heart"></i>
              </a>
            </div>
            {showSuccessMessage && (
              <div className="mt-4 text-green-500">
                Item added to the shopping cart successfully!
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 bg-yellow-50 p-10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-10 ">Customer Feedback</h2>
          {feedbacks.length === 0 ? (
            <p>No feedbacks yet. Be the first to review!</p>
          ) : (
            feedbacks.map((feedback, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <p className="font-bold">{feedback.customerName}</p>
                <div className="text-yellow-400">
                  {'★'.repeat(feedback.rating)}{' '}
                  {'☆'.repeat(5 - feedback.rating)}
                </div>
                <p>{feedback.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Star Rating Form */}
        <form onSubmit={handleFeedbackSubmit} className="bg-gray-100 p-4 rounded-lg shadow mt-10">
          <div>
            <label className="block mb-2 font-bold">Your Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold">Rating</label>
            <div className="flex space-x-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`cursor-pointer inline-block ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-bold">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="mt-4 w-60 bg-green-700 text-white p-3 rounded ">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemDetails;
