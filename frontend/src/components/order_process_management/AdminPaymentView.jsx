import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Include the jsPDF Autotable plugin

const AdminPaymentView = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:1010/public/payments');
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1010/public/payments/${id}`);
            setPayments(payments.filter(payment => payment.id !== id));
        } catch (error) {
            console.error("Error deleting payment:", error);
        }
    };
    const downloadPdf = () => {
        const doc = new jsPDF();

        // Table headers
        const headers = [['ID', 'Payment Method', 'Full Name', 'Billing Address', 'Phone Number', 'Email']];

        // Table data without the Actions column
        const data = payments.map(payment => [
            payment.id,
            payment.paymentMethod,
            `${payment.firstName} ${payment.lastName}`,
            payment.billingAddress,
            payment.phoneNumber,
            payment.email,
        ]);

        // Add title to the PDF
        doc.text('Payment Details', 10, 10);

        // Generate table in the PDF
        doc.autoTable({
            head: headers,
            body: data,
            startY: 20, // Positioning the table
        });

        // Save the generated PDF
        doc.save('payment_details.pdf');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Payment Method</th>
                        <th className="px-4 py-2">Full Name</th>
                        <th className="px-4 py-2">Billing Address</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td className="border px-4 py-2">{payment.id}</td>
                            <td className="border px-4 py-2">{payment.paymentMethod}</td>
                            <td className="border px-4 py-2">
                                {payment.firstName} {payment.lastName}
                            </td>
                            <td className="border px-4 py-2">{payment.billingAddress}</td>
                            <td className="border px-4 py-2">{payment.phoneNumber}</td>
                            <td className="border px-4 py-2">{payment.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDelete(payment.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

             {/* Download PDF Button */}
             <button
                onClick={downloadPdf}
                className="bg-green-700 text-white px-4 py-2 rounded mt-10"
            >
                Download PDF
            </button>
            
        </div>
    );
};

export default AdminPaymentView;
