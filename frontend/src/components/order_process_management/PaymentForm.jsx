import { useState } from 'react';
import { createPayment } from './paymentService';

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentData = {
            paymentMethod,
            expirationDate,
            cardNumber,
            securityCode,
            firstName,
            lastName,
            billingAddress,
            zipCode,
            email,
            phoneNumber
        };
        try {
            const response = await createPayment(paymentData);
            console.log("Payment created successfully:", response);

            // Show success message
            setSuccessMessage("Payment created successfully!");

            // Clear the form
            setPaymentMethod('');
            setExpirationDate('');
            setCardNumber('');
            setSecurityCode('');
            setFirstName('');
            setLastName('');
            setBillingAddress('');
            setZipCode('');
            setEmail('');
            setPhoneNumber('');
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Payment Information</h2>

                {/* Display success message if present */}
                {successMessage && (
                    <div className="mb-4 text-green-500 text-center">
                        {successMessage}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Select a payment method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">--select--</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Expiration Date</label>
                        <input
                            type="month"
                            placeholder="MM / YYYY"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Security Code</label>
                        <input
                            type="password"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <h2 className="text-xl font-bold mt-6 mb-4 text-center">Billing Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium">Billing Address</label>
                        <input
                            type="text"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Zip or Postal Code</label>
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Remember Me
                    </label>
                </div>
                <button type="submit" className="mt-6 w-full p-3 bg-red-500 text-white rounded">Continue</button>
            </form>
        </div>
    );
};

export default PaymentForm;
