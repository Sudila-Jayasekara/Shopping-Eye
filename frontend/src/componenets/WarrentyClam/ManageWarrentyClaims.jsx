import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../HeaderFooter/Footer';
import Header from '../HeaderFooter/Header';

function ManageWarrentyClaims() {
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarrantyClaims();
  }, []);

  const fetchWarrantyClaims = async () => {
    try {
      const response = await axios.get('http://localhost:1010/public/warranty-claims');
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
      { header: 'Item Name', dataKey: 'itemName' },
      { header: 'Purchase Day', dataKey: 'purchaseDay' },
      { header: 'Created Date', dataKey: 'createdDate' },
      { header: 'Issue', dataKey: 'issue' },
      { header: 'Solution', dataKey: 'solution' },
    ];

    // Map the warrantyClaims array to table data format
    const tableData = warrantyClaims.map(claim => ({
      itemName: claim.itemName,
      purchaseDay: claim.purchaseDay,
      createdDate: claim.createdDate,
      issue: claim.issue,
      solution: claim.solution,
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
        <Header/>
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
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Purchase Day</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Issue</th>
            <th className="border p-2">Solution</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {warrantyClaims.map((claim) => (
            <tr key={claim.id}>
              <td className="border p-2">{claim.itemName}</td>
              <td className="border p-2">{claim.purchaseDay}</td>
              <td className="border p-2">{claim.createdDate}</td>
              <td className="border p-2">{claim.issue}</td>
              <td className="border p-2">{claim.solution}</td>
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
      <Footer/>
    </div>
    
  );
}

export default ManageWarrentyClaims;
