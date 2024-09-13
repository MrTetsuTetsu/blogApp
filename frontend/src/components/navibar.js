import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';


const Navbar = () => {
    const { isAuthenticated, loading, user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const timeoutId = useRef(null);
    const navigate = useNavigate(); 


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dropdownRef]);

    const handleMouseEnter = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId.current = setTimeout(() => {
            setDropdownOpen(false);
        }, 300); // 300msの遅延を設定
    };
    
    if(loading) {
        return <div>loading</div>;
    }

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${scrolled ? '-translate-y-1/2' : 'translate-y-0'}`}>
            <nav className="border-gray-200 bg-gray-900 max-w-full">
                <div className="flex flex-wrap justify-between items-center mx-auto px-12 py-4" >
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-white">MyBlog</h1>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {isAuthenticated ? (
                            <div
                                className="relative"
                                ref={dropdownRef}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                            <button
                                className="bg-gray-700 text-white hover:bg-gray-600 rounded-lg px-5 py-1 transition-colors duration-200"
                            >
                                {user?.username}
                            </button>
                            {dropdownOpen && (
                                <div 
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                                >    
                                <Link
                                        to="/customer/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        マイページ
                                    </Link>
                                    <button
                                        onClick={async() => {
                                            await logout();
                                            setDropdownOpen(false);
                                            navigate('/customer/login')
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        ログアウト
                                    </button>
                                </div>
                            )}
                        </div>
                        ) : (
                            <div className="flex space-x-4">
  <Link to="/customer/login" className="bg-gray-700 text-white hover:bg-gray-600 rounded-lg px-5 py-1 transition-colors duration-200">
    ログイン
  </Link>
  <Link to="/customer/create" className="bg-white text-gray-700 hover:bg-gray-400 rounded-lg px-5 py-1 transition-colors duration-200">
    新規登録
  </Link>
</div>
                        )}
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-700">
                <div className="max-w-full px-12 py-3 mx-auto"> 
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to="/" className="text-white hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">Home</Link>
                            </li>
                            <li>
                                <Link to="/" className="text-white hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">About</Link>
                            </li>
                            <li>
                                <Link to="/" className="text-white hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar;
