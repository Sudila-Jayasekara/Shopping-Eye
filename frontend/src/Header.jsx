import React from 'react';
import logo from './logo.png'; // Import your logo

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-3" /> {/* Increased size */}
          <div className="text-3xl font-bold">Shopping Eye</div> {/* Increased font size */}
        </div>
        <nav>
          <ul className="flex space-x-6"> {/* Increased space between links */}
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
