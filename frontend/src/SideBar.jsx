import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faCog, faSignOutAlt,faClipboardCheck,faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-full fixed top-0 left-0 w-64 flex flex-col">
            <div className="flex items-center justify-center h-16 border-b border-gray-900">
                {/* <h1 className="text-xl font-bold">Shopping Eye</h1> */}
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between">
                <ul className="flex-grow space-y-2"> {/* Add space between list items */}
                    <li>
                        <Link to="/profile" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/user-management" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/payments" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            payments
                        </Link>
                    </li>
                    <li>
    <Link to="/warranty" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
        <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
        Warranty Management
    </Link>
    <Link to="/warranty-claim" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
    Warranty Claim
</Link>

</li>

                </ul>
                {/* Logout Button at the Bottom */}
                <div className="mt-4">
                    <Link to="/logout" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
