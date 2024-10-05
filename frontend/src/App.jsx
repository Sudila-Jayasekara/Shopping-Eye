
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
import ShoppingCart from "./components/order_process_management/ShoppingCart";
import { QuantityProvider } from './components/inventory_management/QuantityContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './SideBar';
import Wishlist from './components/wishlist_management/Wishlist';
import Logout from './components/user_management/Logout';
import AddToWishlist from './components/wishlist_management/AddToWishlist';
import RemoveFromWishlist from './components/wishlist_management/RemoveFromWishlist';

function App() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  return (
    <Router>
      <div className="App flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64"> {/* Add margin left to accommodate the sidebar */}
          <Header />
          <QuantityProvider>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomeShopping />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<ProfilePage />} />

                {isAuthenticated && isAdmin && (
                  <>
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/update-user/:userId" element={<UpdateUser />} />
                    <Route path="/admin/user-management" element={<UserManagementPage />} />
                    <Route path="/admin/payments" element={<AdminPaymentView />} />
                  </>
                )}

                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/addtowishlist/:id' element={<AddToWishlist />} />
                <Route path='/removefromwishlist/:id' element={<RemoveFromWishlist />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/create-item" element={<ItemForm />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/home" element={<HomeShopping />} />
                <Route path="/item/:id" element={<ItemDetails />} />

                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/admin/payments" element={<AdminPaymentView />} />
                <Route path="/cart" element={<ShoppingCart />} />

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </QuantityProvider>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
