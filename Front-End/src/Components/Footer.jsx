import { useState } from 'react';
import { Share2, Instagram, Twitter, Facebook, Youtube, Mail, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        setIsSubscribed(true);
       
    };

    return (
        <footer className="bg-gray-900 text-white py-8 border-t-4 border-red-600">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-6 md:mb-0">
                        <Link to="/">
                            <h2 className="text-2xl font-bold mb-2">FIGHT<span className="text-red-500">CONNECT</span></h2>
                        </Link>
                        <p className="text-gray-400">Where fighters and fans unite</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="hover:text-red-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-red-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-red-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-red-500 transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>

                        <div className="flex items-center">
                            {!isSubscribed ? (
                                <>
                                    <button
                                        onClick={handleSubscribe}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-l flex items-center"
                                    >
                                        <Bell size={16} className="mr-2" />
                                        Subscribe
                                    </button>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="py-2 px-3 bg-gray-800 border border-gray-700 rounded-r text-white"
                                    />
                                </>
                            ) : (
                                <p className="text-green-500 flex items-center">
                                    <Bell size={16} className="mr-2" />
                                    Subscribed to fight alerts!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/events" className="text-gray-400 hover:text-red-500 transition-colors">Events</Link></li>
                            <li><Link to="/fighters" className="text-gray-400 hover:text-red-500 transition-colors">Fighters</Link></li>
                            <li><Link to="/FightCompanion" className="text-gray-400 hover:text-red-500 transition-colors">Fight Companion</Link></li>
                            <li><Link to="/BrowseArticles" className="text-gray-400 hover:text-red-500 transition-colors">Articles</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Community</h3>
                        <ul className="space-y-2">
                            <li><Link to="/Gym" className="text-gray-400 hover:text-red-500 transition-colors">Gyms</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-red-500 transition-colors">Login</Link></li>
                            <li><Link to="/register" className="text-gray-400 hover:text-red-500 transition-colors">Register</Link></li>
                            <li><Link to="/About" className="text-gray-400 hover:text-red-500 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/Contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact Us</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">&copy; 2025 FightConnect. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
                            <Share2 size={16} className="mr-2" />
                            Share
                        </button>
                        <Link to="/Contact" className="text-gray-400 hover:text-red-500 transition-colors flex items-center">
                            <Mail size={16} className="mr-2" />
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;