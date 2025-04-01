import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
