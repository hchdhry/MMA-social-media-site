import { useState } from "react";
import Header from "../components/header";
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:5211/api/Account/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError("Registration failed. Please check your information and try again.");
            }
        } catch (error) {
            setError(`Error registering: ${error}`);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen flex flex-col">
                <div className="container mx-auto py-12 px-4">
                    <div className="max-w-md mx-auto">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Your Account</h2>

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
                                        placeholder="Choose a username"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Create a password"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters long</p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors duration-300 font-medium"
                                >
                                    Create Account
                                </button>

                                <div className="text-center text-gray-400 mt-4">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-red-400 hover:text-red-300">
                                        Sign in
                                    </Link>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;