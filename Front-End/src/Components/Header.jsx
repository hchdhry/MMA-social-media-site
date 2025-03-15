import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Header = () => {
    const [userDetails, setUserDetails] = useState({ username: null, role: null });

    useEffect(() => {
        const handleStorageChange = async () => {
            try {
                const jwtToken = localStorage.getItem("token");
                if (jwtToken) {
                    const decodedToken = await jwtDecode(jwtToken);
                    const usernameProp = decodedToken.given_name;
                    const roleProp = decodedToken.role;
                    setUserDetails({ username: usernameProp, role: roleProp });
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
    };

    return (
        <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
            <nav className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">FightClub</div>

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

                        <li className="relative group">
                            <button className="hover:text-red-500 transition duration-300 flex items-center">
                                Fighters
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-10">
                                <Link to="/fighters" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    All Fighters
                                </Link>
                                <Link to="/favorites" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    Your Favorites
                                </Link>
                            </div>
                        </li>

                        {userDetails.username !== null ? (
                            <>
                                <li className="text-gray-400">
                                    Hello {userDetails.username}
                                </li>
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
                </div>
            </nav>
        </header>
    );
};

export default Header;