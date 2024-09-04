import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/user_management/LoginPage';
import RegistrationPage from './components/user_management/RegistrationPage';
import UserService from './components/user_management/UsersService';
import UpdateUser from './components/user_management/UpdateUser';
import UserManagementPage from './components/user_management/UserManagementPage';
import ProfilePage from './components/user_management/ProfilePage';
import PaymentForm from './components/PaymentForm'
import AdminPaymentView from './components/AdminPaymentView';
import Header from './components/header';
import Footer from './components/footer';

function App() {

  // Check if user is authenticated and admin
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.adminOnly();

  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />

            {/* Render admin-only routes if user is authenticated and is admin */}
            {isAuthenticated && isAdmin && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
             <Route path="/payment" element={<PaymentForm />} />
             <Route path="/admin/payments" element={<AdminPaymentView />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
