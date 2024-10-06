import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function WarrentyClame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({});
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1010/public/warranty-items/${id}`)
      .then(response => {
        const data = response.data;
        setInventory(data);
        calculateRemainingTime(data.purchaseDay, data.warrantyTime);
      })
      .catch(error => {
        console.error("There was an error fetching the inventory item!", error);
      });
  }, [id]);

  const calculateRemainingTime = (purchaseDay, warrantyTime) => {
    const purchaseDate = new Date(purchaseDay);
    const warrantyEndDate = new Date(purchaseDate.setMonth(purchaseDate.getMonth() + warrantyTime));

    const updateTimer = () => {
      const now = new Date();
      const timeLeft = warrantyEndDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setRemainingTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  };

  const handleClaimClick = () => {
    navigate(`/warranty-form/${id}`); // Navigate to the warranty claim form
  };

  return (
    
    <div className="max-w-lg mx-auto p-2 bg-white shadow-lg rounded-lg">
        
        <div>
        <Link to="/warranty-claim">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mb-4">
          View All Claims
        </button>
      </Link>
        </div>
      <h2 className="text-2xl font-bold mb-4">Warranty Claim for {inventory.itemName}</h2>
      <p className="text-gray-700 mb-4">Purchased on: {inventory.purchaseDay}</p>
      <h3 className="text-xl font-semibold mb-2">Remaining Warranty Time</h3>
      <p className="text-lg text-gray-800 mb-6">
        {remainingTime.days} Days : {remainingTime.hours} Hours : {remainingTime.minutes} Minutes : {remainingTime.seconds} Seconds
      </p>
      <button
        onClick={handleClaimClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Claim Warranty
      </button>
      
    </div>
   
    
  );
}

export default WarrentyClame;
