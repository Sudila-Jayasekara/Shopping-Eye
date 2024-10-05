import { useState, useEffect} from 'react';
import axios from 'axios';
import VisaLogo from '../../images/visa.jpg'
import MasterLogo from '../../images/master.jpg'
import PaypalLogo from '../../images/paypal.jpg'

// Validation functions
const isValidCardNumber = (number) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(number);
};

const isValidExpirationDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date + '-01'); // Assumes input is in YYYY-MM format
    return selectedDate > currentDate;
};

const isValidSecurityCode = (code) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(code);
};

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidPhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
};

const PaymentForm = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        paymentMethod: '',
        expirationDate: '',
        cardNumber: '',
        securityCode: '',
        firstName: '',
        lastName: '',
        billingAddress: '',
        zipCode: '',
        email: '',
        phoneNumber: '',
        totalPrice: 0,  // Total price will be set dynamically
        paymentDate: ''  // To store the current date
      });

    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message

    useEffect(() => {
        // Retrieve total price from sessionStorage and set the current date
        const totalPrice = sessionStorage.getItem('totalPrice') || 0;
        setPaymentDetails(prevDetails => ({
          ...prevDetails,
          totalPrice: totalPrice,
          paymentDate: new Date().toISOString()
        }));
      }, []);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const {
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
        }=paymentDetails;

        // Validate the form fields
        if (!paymentMethod || !expirationDate || !cardNumber || !securityCode || !firstName || !lastName || !billingAddress || !zipCode || !email || !phoneNumber) {
            setErrorMessage("Please fill all the fields");
            return;
        }

        if (!isValidCardNumber(cardNumber)) {
            setErrorMessage("Invalid card number. Must be 16 digits.");
            return;
        }

        if (!isValidExpirationDate(expirationDate)) {
            setErrorMessage("Invalid expiration date. It must be in the future.");
            return;
        }

        if (!isValidSecurityCode(securityCode)) {
            setErrorMessage("Invalid security code (CVV). Must be 3 or 4 digits.");
            return;
        }

        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email address.");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            setErrorMessage("Invalid phone number. Must be 10 digits.");
            return;
        }


        try {
            const response = await axios.post('http://localhost:1010/public/payments', paymentDetails);
            console.log("Payment created successfully:", response);

            if (response.status === 200) {
                setSuccessMessage('Payment successful!');
                setPaymentDetails({
                  paymentMethod: '',
                  expirationDate: '',
                  cardNumber: '',
                  securityCode: '',
                  firstName: '',
                  lastName: '',
                  billingAddress: '',
                  zipCode: '',
                  email: '',
                  phoneNumber: '',
                  totalPrice: 0,
                  paymentDate: ''
                });


            localStorage.removeItem('cart');
            alert('Order placed successfully!');}

        } catch (error) {
            console.error("Error creating payment:", error);
            setErrorMessage('Payment failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Payment Information</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}


                {/* Display success message if present */}
                {successMessage && (
                    <div className="mb-4 text-green-500 text-center">
                        {successMessage}
                    </div>
                )}

                <div className="flex flex-row justify-center items-center mb-6">
                    <img src={VisaLogo} alt="Visa" className="w-12 h-auto mb-4 ml-4" />
                    <img src={MasterLogo} alt="Mastercard" className="w-12 h-auto mb-4 ml-4" />
                    <img src={PaypalLogo} alt="Paypal" className="w-12 h-auto mb-4 ml-4" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Select a payment method</label>
                        <select
                            name="paymentMethod"
                            value={paymentDetails.paymentMethod}
                            onChange={handleInputChange}
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
                            name="expirationDate"
                            value={paymentDetails.expirationDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
            <label className="block font-medium">Security Code</label>
            <input
              type="password"
              name="securityCode"
              value={paymentDetails.securityCode}
              onChange={handleInputChange}
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
              name="firstName"
              value={paymentDetails.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={paymentDetails.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium">Billing Address</label>
            <input
              type="text"
              name="billingAddress"
              value={paymentDetails.billingAddress}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Zip or Postal Code</label>
            <input
              type="text"
              name="zipCode"
              value={paymentDetails.zipCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={paymentDetails.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <p className="mt-6 text-center font-bold">Total Price: Rs. {paymentDetails.totalPrice}</p>
        <button type="submit" className="mt-6 w-full p-3 bg-green-700 text-white rounded">Place Order</button>
            </form>
        </div>
    );
};

export default PaymentForm;
