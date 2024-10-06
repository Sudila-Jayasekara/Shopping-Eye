import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ManageWarrantyClaims() {
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarrantyClaims();
  }, []);

  const fetchWarrantyClaims = async () => {
    try {
      const response = await axios.get('http://localhost:1010/public/warranty-items');
      setWarrantyClaims(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch warranty claims');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1010/public/warranty-claims/${id}`);
      setWarrantyClaims(warrantyClaims.filter(claim => claim.id !== id));
    } catch (err) {
      setError('Failed to delete warranty claim');
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Warranty Claims Report', 10, 10);

    // Define table columns
    const columns = [
      { header: 'Item ID', dataKey: 'itemId' },
      { header: 'Item Name', dataKey: 'name' },
      { header: 'Purchase Day', dataKey: 'purchaseDay' },
      { header: 'Price', dataKey: 'price' },
      { header: 'Description', dataKey: 'description' },
      { header: 'Category', dataKey: 'category' },
      { header: 'Warranty Time (months)', dataKey: 'warrantyTime' },
    ];

    // Map the warrantyClaims array to table data format
    const tableData = warrantyClaims.map(claim => ({
      itemId: claim.itemId,
      name: claim.name,
      purchaseDay: claim.purchaseDay,
      price: claim.price,
      description: claim.description || "No description available",
      category: claim.category,
      warrantyTime: claim.warrantyTime,
    }));

    // Generate the table
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: tableData.map(row => columns.map(col => row[col.dataKey])),
      startY: 20, // start after the title text
    });

    // Save the PDF
    doc.save('warranty-claims-report.pdf');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Manage Warranty Claims</h1>
      <div className="mb-4">
        <button
          onClick={generateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Generate Report
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Item ID</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Purchase Day</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Warranty Time (months)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {warrantyClaims.map((claim) => (
            <tr key={claim.id}>
              <td className="border p-2">{claim.itemId}</td>
              <td className="border p-2">{claim.name}</td>
              <td className="border p-2">{claim.purchaseDay}</td>
              <td className="border p-2">{claim.price.toFixed(2)} USD</td>
              <td className="border p-2">{claim.description || "No description available"}</td>
              <td className="border p-2">{claim.category}</td>
              <td className="border p-2">{claim.warrantyTime}</td>
              <td className="border p-2">
                <Link to={`/warranty-claim-form/${claim.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(claim.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ml-2"
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageWarrantyClaims;
