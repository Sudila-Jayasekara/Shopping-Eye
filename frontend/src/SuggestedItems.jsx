import React, { useEffect, useState } from 'react';
import { getAllItems } from './api';

const SuggestedItems = ({ currentItemId }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await getAllItems();
        if (Array.isArray(data)) {
          // Filter out the current item and suggest based on a category or other logic
          const suggested = data.filter(item => item.id !== currentItemId);
          setSuggestions(suggested.slice(0, 8)); // Get the first 8 suggestions for continuous scroll
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [currentItemId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
      <div className="relative overflow-hidden"> {/* Container for horizontal scrolling */}  
        <div className="flex space-x-4 animate-scroll"> {/* Flex for horizontal layout and animation */}  
          {suggestions.map(item => (
            <div key={item.id} className="bg-white rounded shadow p-4 min-w-[200px]">
              <img src={item.imageUrl} alt={item.name} className="h-32 w-full object-cover rounded mb-2" />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-lg">Rs. {item.price.toFixed(2)}</p>
              <a href={`/item/${item.id}`} className="text-blue-600 hover:underline">View Details</a>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for Scroll Animation */}
      <style>
        {`
          .animate-scroll {
            display: flex;
            animation: scroll 20s linear infinite;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .min-w-[200px] {
            min-width: 200px;
          }
        `}
      </style>
    </div>
  );
};

export default SuggestedItems;
