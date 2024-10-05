import React, { useEffect, useState } from 'react';
import { getAllItems } from './InventoryService'; // Ensure this function is correctly implemented
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryReport = () => {
    const [items, setItems] = useState([]);
    const [categoryData, setCategoryData] = useState({ labels: [], values: [] });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getAllItems();
                setItems(response);

                // Calculate inventory per category
                const categoryCount = {};
                response.forEach(item => {
                    if (!categoryCount[item.category]) {
                        categoryCount[item.category] = 0;
                    }
                    categoryCount[item.category] += item.quantity;
                });

                const labels = Object.keys(categoryCount);
                const values = Object.values(categoryCount);
                setCategoryData({ labels, values });
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // Calculate total inventory quantity
    const totalInventory = items.reduce((total, item) => total + (item.quantity || 0), 0);

    const pieData = {
        labels: categoryData.labels,
        datasets: [
            {
                data: categoryData.values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        // Company Name, Tagline, and Title
        doc.setFontSize(18);
        doc.text("Shopping Eye", 10, 10); // Company Name
        doc.setFontSize(14);
        doc.text("One-stop online solution for everything", 10, 18); // Tagline
        doc.setFontSize(16);
        doc.text("Inventory Report", 10, 30); // Title

        // Horizontal Line
        doc.line(10, 35, 200, 35);

        // Date and Time on the Right
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 150, 40);
        doc.text(`Time: ${currentTime}`, 150, 45);

        // Total Inventory
        doc.setFontSize(12);
        doc.text(`Total Inventory: ${totalInventory} units`, 10, 55);

        // Inventory by Category with proper spacing
        doc.text("Inventory by Category:", 10, 65);
        categoryData.labels.forEach((label, index) => {
            doc.text(`${label}: ${categoryData.values[index]} units`, 10, 75 + index * 10);
        });

        // Save the PDF
        doc.save('inventory_report.pdf');
    };

    return (
        <div className="min-h-screen text-gray-200 p-6">
            <h2 className="text-2xl text-black font-bold mb-6 text-center">Inventory Report</h2>

            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold">Total Inventory</h3>
                <p className="text-lg">Total Quantity: {totalInventory}</p>
            </div>

            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Inventory by Category</h3>
                {/* Display the pie chart with smaller size */}
                <div className="flex justify-center">
                    <Pie data={pieData} height={100} width={100} /> {/* Adjusted size */}
                </div>
                {/* Display category labels with quantities */}
                <ul className="mt-4">
                    {categoryData.labels.map((label, index) => (
                        <li key={label} className="text-lg">
                            <span style={{ color: pieData.datasets[0].backgroundColor[index] }}>■ </span>
                            {label}: {categoryData.values[index]} units
                        </li>
                    ))}
                </ul>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center">
                <button 
                    onClick={generatePDF}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default InventoryReport;
