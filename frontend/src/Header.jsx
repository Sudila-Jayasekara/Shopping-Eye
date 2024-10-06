import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const location = useLocation(); // Get the current location
    const isLoggedIn = !!localStorage.getItem('token'); // Replace with your auth logic

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold pl-4">Shopping Eye</Link>
                <nav>
                    <ul className="flex space-x-6">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link 
                                        to="/" 
                                        className={`flex items-center hover:underline ${location.pathname === '/' ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <FontAwesomeIcon icon={faHome} className="mr-1" /> Home
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/wishlist" 
                                        className={`flex items-center hover:underline ${location.pathname === '/wishlist' ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <FontAwesomeIcon icon={faHeart} className="mr-1" /> Wishlist
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/cart" 
                                        className={`flex items-center hover:underline ${location.pathname === '/cart' ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} className="mr-1" /> Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/contact" 
                                        className={`flex items-center hover:underline ${location.pathname === '/contact' ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Contact
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link 
                                        to="/login" 
                                        className="flex items-center hover:underline text-white"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/register" 
                                        className="flex items-center hover:underline text-white"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
