import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WarrantyClaimForm() {
  const { id } = useParams();
  const [inventory, setInventory] = useState({});
  const [formData, setFormData] = useState({
    itemDescription: '',
    purchaseDay: '',
    createdDate: new Date().toISOString().split('T')[0],
    issue: '',
    solution: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:1010/public/warranty-items/${id}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        setInventory(data);
        setFormData(prevData => ({
          ...prevData,
          itemDescription: data.name, // Ensure this matches the API response
          purchaseDay: data.purchaseDay
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the inventory item!", error);
      });
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get suggested solution from the AI service
    axios.post('http://localhost:1010/public/predict-solution', { issue: formData.issue })
      .then(response => {
        const solution = response.data.solution;
        console.log(solution);
        // Update formData with the predicted solution
        const updatedFormData = {
          ...formData,
          solution // include the predicted solution
        };

        console.log(updatedFormData);
        // Submit the warranty claim
        axios.post('http://localhost:1010/public/warranty-claims', updatedFormData);
      })
      .then(response => {
        console.log('Warranty claim submitted:', response.data);
        setMessage('Warranty claim submitted successfully!');
        setFormData({
          itemDescription: '',
          purchaseDay: '',
          createdDate: new Date().toISOString().split('T')[0],
          issue: '',
          solution: ''
        });
      })
      .catch(error => {
        console.error("There was an error submitting the warranty claim!", error);
        setMessage('Error submitting warranty claim. Please try again.');
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Warranty Claim Form</h2>
      {message && <div className="mb-4 text-red-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            name="itemDescription" // Change this to match the state
            value={formData.itemDescription} // Correct the value reference here
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Purchase Day</label>
          <input
            type="date"
            name="purchaseDay"
            value={formData.purchaseDay}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Created Date</label>
          <input
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Issue</label>
          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required // Make it required for user input
          />
        </div>
        <div>
          <label className="block text-gray-700">Solution</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
}

export default WarrantyClaimForm;
