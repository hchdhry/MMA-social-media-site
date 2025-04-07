import { useState, useEffect, createContext } from 'react';
import FighterCard from './FighterCard';
import { Link } from 'react-router-dom';

export const TokenContext = createContext();
const Hero = () => {
    const jwtToken = localStorage.getItem("token");
    const [fighters, setFighters] = useState([]);
    const featuredFighters = fighters.length >= 3 ? [...fighters].sort(() => Math.random() - 0.5).slice(0, 3) : fighters;

    return (
        <main className="bg-gray-900 text-white">
            <section className="py-10">
                <h1 className="text-3xl font-bold text-center mb-4">FightClub</h1>
                <p className="text-lg text-gray-400 text-center">the ultimate MMA fan community</p>
            </section>
            <section className="py-10 min-h-screen flex justify-center items-center">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-4">Join The <span className="text-red-500">Ultimate</span> Fighting Community</h2>
                            <p className="text-gray-400 mb-6">Connect with MMA fans worldwide, discuss fights, share predictions, and stay updated with the latest news from the octagon.</p>
                            <div className="flex flex-wrap gap-4">
                                <Link to ="/Register"className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                                    Join Now
                                </Link>
                                <Link
                                    to="/events"
                                    className="border border-white hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                                >
                                    Explore Fights
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-6 md:mt-0">
                            <div className="relative">
                                <div className="w-full h-64 sm:h-80 bg-gray-800 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
                                
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-sm text-gray-300">UPCOMING FIGHT</p>
                                    <h3 className="text-xl font-bold">Championship Title Match</h3>
                                    <p className="text-red-500">Live this Saturday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center">Popular Fighters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredFighters.length > 0 ? (
                            <TokenContext.Provider value={jwtToken}>
                                {featuredFighters.map((fighter, index) => (
                                    <FighterCard key={index} fighterData={fighter} />
                                ))}
                            </TokenContext.Provider>
                        ) : (
                            <div className="col-span-3">
                                <p className="text-lg text-gray-400 text-center">Featured fighters coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Hero;