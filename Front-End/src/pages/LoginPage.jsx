import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const requestBody = JSON.stringify({
            username: formData.username,
            password: formData.password,
        });

        try {
            const response = await fetch('http://localhost:5211/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            const data = await response.json();
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError("Invalid username or password. Please try again.");
            }
        } catch (error) {
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen flex flex-col">
                <div className="container mx-auto py-12 px-4">
                    <div className="max-w-md mx-auto">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

                            {error && (
                                <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
                                    {error}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="block text-gray-300 font-medium">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors duration-300 font-medium"
                                >
                                    Sign In
                                </button>

                                <div className="text-center text-gray-400 mt-4">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-red-400 hover:text-red-300">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;