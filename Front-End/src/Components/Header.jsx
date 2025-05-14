import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 

const Header = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({ username: null, role: null });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAdminDropdownVisible, setIsAdminDropdownVisible] = useState(false);
    let dropdownTimeout;
    let adminDropdownTimeout;

    useEffect(() => {
        const handleStorageChange = async () => {
            try {
                const jwtToken = localStorage.getItem("token");
                if (jwtToken) {
                    const decodedToken = await jwtDecode(jwtToken);
                    setUserDetails({ username: decodedToken.given_name, role: decodedToken.role });
                } else {
                    setUserDetails({ username: null, role: null });
                }
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setUserDetails({ username: null, role: null });
        navigate("/");
    };

    return (
        <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="FightClub Logo" className="h-10 w-auto" />
                    <span className="text-xl font-bold">FightClub</span>
                </Link>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link to="/" className="hover:text-red-500 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-red-500 transition duration-300">
                            About
                        </Link>
                       
                    </li>
                    <li>
                        <Link to="/FightCompanion" className="hover:text-red-500 transition duration-300">
                            Fight Companion
                        </Link>
                        </li>
                    <li>
                        <Link to="/Contact" className="hover:text-red-500 transition duration-300">
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/BrowseArticles" className="hover:text-red-500 transition duration-300">
                            Browse Articles
                        </Link>
                    </li>

                    {/* Fighters Dropdown */}
                    
                    <li
                        className="relative group"
                        onMouseEnter={() => {
                            clearTimeout(dropdownTimeout);
                            setIsDropdownVisible(true);
                        }}
                        onMouseLeave={() => {
                            dropdownTimeout = setTimeout(() => setIsDropdownVisible(false), 500);
                        }}
                    >
                        <button className="hover:text-red-500 transition duration-300 flex items-center">
                            Services
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-opacity duration-500 z-10 
                            ${isDropdownVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                            <Link to="/fighters" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                All Fighters
                            </Link>
                            {userDetails.role && (
                                <>
                                    <Link to="/Gym" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                        Your Gym
                                    </Link>
                                    <Link to="/ManageArticles" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                        Your Articles
                                    </Link>
                                </>
                            )}

                        </div>
                    </li>


                    {/* Admin Dropdown */}
                    {Array.isArray(userDetails.role) && userDetails.role.includes("Admin") &&(
                        <li
                            className="relative group"
                            onMouseEnter={() => {
                                clearTimeout(adminDropdownTimeout);
                                setIsAdminDropdownVisible(true);
                            }}
                            onMouseLeave={() => {
                                adminDropdownTimeout = setTimeout(() => setIsAdminDropdownVisible(false), 500);
                            }}
                        >
                            <button className="hover:text-red-500 transition duration-300 flex items-center">
                                Admin Tools
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-opacity duration-500 z-10 
                                ${isAdminDropdownVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                                <Link to="/create-fighter" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    Create Fighter
                                </Link>
                                <Link to="/AdminEvents" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    Create Event
                                </Link>
                                <Link to="/FighterDelete" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    Delete Fighter
                                </Link>
                                <Link to="/AdminDashboard" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    Admin Dashboard
                                </Link>
                            </div>
                        </li>
                    )}

                    {userDetails.username !== null ? (
                        <>
                            <li className="text-gray-400">Hello {userDetails.username}</li>
                            <li>
                                <button onClick={handleLogOut} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition duration-300">
                                    Log Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="hover:text-red-500 transition duration-300">
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition duration-300">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
