import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const location = useLocation(); // Get the current location

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold pl-4">Shopping Eye</Link>
                <nav>
                    <ul className="flex space-x-6">
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
                                to="/about" 
                                className={`flex items-center hover:underline ${location.pathname === '/about' ? 'text-red-500' : 'text-white'}`}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> About
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
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
