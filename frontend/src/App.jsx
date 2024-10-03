import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/user_management/LoginPage';
import RegistrationPage from './components/user_management/RegistrationPage';
import UserService from './components/user_management/UsersService';
import UpdateUser from './components/user_management/UpdateUser';
import UserManagementPage from './components/user_management/UserManagementPage';
import ProfilePage from './components/user_management/ProfilePage';
import PaymentForm from './components/order_process_management/PaymentForm';
import AdminPaymentView from './components/order_process_management/AdminPaymentView';

import ItemForm from './components/inventory_management/itemForm';
import Inventory from './components/inventory_management/Inventory';
import HomeShopping from './components/inventory_management/HomeShopping';
import ItemDetails from './components/inventory_management/ItemDetails';
import { QuantityProvider } from './components/inventory_management/QuantityContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Header from './Header';
import Footer from './footer';

function App() {
  // Check if user is authenticated and admin
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeShopping />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            
            {/* Render admin-only routes if user is authenticated and is admin */}
            {isAuthenticated && isAdmin && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/admin/payments" element={<AdminPaymentView />} />
              </>
            )}
            
            <Route path="/payment" element={<PaymentForm />} />

            <Route path="/create-item" element={<ItemForm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/home" element={<HomeShopping/>} />
            <Route path="/item/:id" element={<ItemDetails />} />
            
            {/* Redirect all other routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
