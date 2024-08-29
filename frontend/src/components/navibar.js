import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 max-w-full">
            <div className="flex flex-wrap justify-between items-center mx-auto px-12 py-4" >
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyBlog</h1>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link to="" className="dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-5 py-1 transition-colors duration-200">Login</Link>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-full px-12 py-3 mx-auto"> 
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Link to="/customer/create" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/customer/create" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">About</Link>
                        </li>
                        <li>
                            <Link to="/customer/create" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
      </div>
  );
};

export default Navbar;