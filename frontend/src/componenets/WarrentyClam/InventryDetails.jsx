import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

function InventryDetails() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1010/public/inventry/all')
      .then(response => {
        setInventories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the inventory data!", error);
      });
  }, []);

  return (
    <div>
        <Header/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        
      {inventories.map((item) => (
        <div key={item.id} className="border rounded-lg p-6 shadow-md bg-white">
          <h3 className="text-lg font-bold mb-2">{item.itemName}</h3>
          <p className="text-gray-700 mb-4">{item.itemDescription}</p>
          <p className="text-gray-500 mb-4">Purchased on: {item.purchaseDay}</p>
          <Link to={`/warrenty/${item.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Warranty
            </button>
          </Link>
        </div>
      ))}
      
    </div>
    <Footer/>
    </div>
  );
}

export default InventryDetails;
