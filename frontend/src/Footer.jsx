import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-4 mt-8 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>&copy; 2024 Shopping Eye. All rights reserved.</div>
                <div>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/" className="hover:underline">Terms of Service</a></li>
                        <li><a href="/" className="hover:underline">Support</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
