import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-300 mb-10">
                        Have questions or feedback? Here’s how you can reach out to us.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 space-y-6 text-left">
                        <div className="flex items-center gap-3">
                            <Mail className="text-red-500" />
                            <span>fightClub@DMU.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-red-500" />
                            <span>+44 1234 567890</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-red-500" />
                            <span>Leicester, UK</span>
                        </div>

                        <div className="pt-6 border-t border-gray-600">
                            <p className="text-sm text-gray-400 mb-2">Follow us on socials:</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-red-400 flex items-center gap-2">
                                    <Instagram className="w-5 h-5" /> Instagram
                                </a>
                                <a href="#" className="hover:text-red-400 flex items-center gap-2">
                                    <Twitter className="w-5 h-5" /> Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Contact;
