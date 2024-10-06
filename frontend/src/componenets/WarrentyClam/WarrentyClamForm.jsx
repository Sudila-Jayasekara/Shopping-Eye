import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WarrantyClaimForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [inventory, setInventory] = useState({});
  const [formData, setFormData] = useState({
    itemName: '',
    purchaseDay: '',
    createdDate: new Date().toISOString().split('T')[0],
    issue: '',
    solution: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // To display success message

  useEffect(() => {
    axios.get(`http://localhost:8080/api/inventry/${id}`)
      .then(response => {
        const data = response.data;
        setInventory(data);
        setFormData(prevData => ({
          ...prevData,
          itemName: data.itemName,
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
    axios.post('http://localhost:8080/api/predict-solution', { issue: formData.issue })
      .then(response => {
        const solution = response.data.solution;

        // Update formData with the predicted solution
        setFormData(prevData => ({
          ...prevData,
          solution
        }));

        // Submit the warranty claim
        axios.post('http://localhost:8080/api/warranty-claims', formData)
          .then(response => {
            setSuccessMessage('Warranty claim submitted successfully!'); // Set success message
            setTimeout(() => {
              navigate('/warranty-claim'); // Redirect to warranty claims page after a delay
            }, 2000); // Wait for 2 seconds before redirecting
          })
          .catch(error => {
            console.error("There was an error submitting the warranty claim!", error);
          });
      })
      .catch(error => {
        console.error('Error fetching solution:', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Warranty Claim Form</h2>
      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>} {/* Success message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
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
            required
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
