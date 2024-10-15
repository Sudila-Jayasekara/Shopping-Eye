import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../HeaderFooter/Footer';
import Header from '../HeaderFooter/Header';

function UpdateWarrentyClaim() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [claim, setClaim] = useState({
    itemName: '',
    purchaseDay: '',
    createdDate: '',
    issue: '',
    solution: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the claim data when the component mounts
    const fetchClaim = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/warranty-claims/${id}`);
        setClaim(response.data);
      } catch (err) {
        setError('Failed to fetch warranty claim');
      }
    };

    fetchClaim();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim((prevClaim) => ({
      ...prevClaim,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting claim:', claim);
    try {
      await axios.put(`http://localhost:8080/api/warranty-claims/${id}`, claim);
      navigate('/warranty-claim'); // Navigate back to the list after update
    } catch (err) {
      setError('Failed to update warranty claim');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
        <Header/>
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Warranty Claim</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="itemName" className="block text-gray-700">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={claim.itemName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="purchaseDay" className="block text-gray-700">Purchase Day</label>
          <input
            type="date"
            id="purchaseDay"
            name="purchaseDay"
            value={claim.purchaseDay}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="createdDate" className="block text-gray-700">Created Date</label>
          <input
            type="date"
            id="createdDate"
            name="createdDate"
            value={claim.createdDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issue" className="block text-gray-700">Issue</label>
          <textarea
            id="issue"
            name="issue"
            value={claim.issue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="solution" className="block text-gray-700">Solution</label>
          <textarea
            id="solution"
            name="solution"
            value={claim.solution}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Update Warranty Claim
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default UpdateWarrentyClaim;
