import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
const About = () => {
    return (
        <>
        <Header/>
        <main className="bg-gray-900 text-white">
            <section className="py-10">
                <h1 className="text-3xl font-bold text-center mb-4">About FightClub</h1>
                <p className="text-lg text-gray-400 text-center">Our mission, our passion, our community</p>
            </section>

            <section className="py-10 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Who <span className="text-red-500">We</span> Are</h2>
                        <p className="text-gray-400 mb-4">
                            FightClub is more than just a platform - we're a global community of MMA enthusiasts who live and breathe the sport.
                            Founded by fans, for fans, we aim to create the most engaging and immersive experience for fight lovers worldwide.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Our platform connects passionate fans, providing a space to discuss strategies, share predictions,
                            and stay updated with the latest news from the world of Mixed Martial Arts.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/community"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                                Join Community
                            </Link>
                            <Link
                                to="/events"
                                className="border border-white hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                                Upcoming Events
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-sm text-gray-300">OUR COMMUNITY</p>
                            <h3 className="text-xl font-bold">United by Passion</h3>
                            <p className="text-red-500">Connecting Fight Fans Globally</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-8">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-red-500 mb-4">Passion</h3>
                            <p className="text-gray-400">
                                We are driven by an unwavering passion for Mixed Martial Arts and the incredible athletes who define the sport.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-red-500 mb-4">Community</h3>
                            <p className="text-gray-400">
                                We believe in building a supportive, inclusive community where every fan can share their voice and love for MMA.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-red-500 mb-4">Innovation</h3>
                            <p className="text-gray-400">
                                We continually strive to enhance the fan experience through cutting-edge technology and interactive features.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    );
};

export default About;