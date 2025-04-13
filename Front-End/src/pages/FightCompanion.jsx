import React, { useEffect, useState } from 'react';
import ChatBot from '../Components/ChatBot';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const matchups = [
    {
        left: '/assets/fighters/khabib.jpg',
        right: '/assets/fighters/islam.jpg',
        names: 'Khabib Nurmagomedov vs Islam Makhachev',
        description: 'Grappling masterclass between mentor and protégé'
    },
    {
        left: '/assets/fighters/gsp.webp',
        right: '/assets/fighters/silva.jpeg',
        names: 'Georges St-Pierre vs Anderson Silva',
        description: 'Two of the greatest champions in UFC history'
    },
    {
        left: '/assets/fighters/Lesnar.jpeg',
        right: '/assets/fighters/Fedor.webp',
        names: 'Brock Lesnar vs Fedor Emelianenko',
        description: 'Heavyweight dream matchup that never happened'
    },
    {
        left: '/assets/fighters/ferguson.jpeg',
        right: '/assets/fighters/khabib.jpg',
        names: 'Tony Ferguson vs Khabib Nurmagomedov',
        description: 'The cursed fight that was canceled five times'
    },
    {
        left: '/assets/fighters/Nganou.jpg',
        right: '/assets/fighters/Jones.webp',
        names: 'Francis Ngannou vs Jon Jones',
        description: 'Power vs technique in a heavyweight collision'
    },
];

const FighterCompanion = () => {
    const [index, setIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('dreamFights');

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % matchups.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentMatchup = matchups[index];

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-bold mb-4 text-red-500">
                            Fighter Companion
                        </h1>
                        <p className="text-xl text-gray-300 mb-6">
                            Your AI guide to MMA matchups, fighter analysis, and predictions
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="bg-red-900 text-red-100 px-3 py-1 rounded-full text-sm font-medium">UFC</span>
                            <span className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">Bellator</span>
                            <span className="bg-green-900 text-green-100 px-3 py-1 rounded-full text-sm font-medium">ONE FC</span>
                            <span className="bg-purple-900 text-purple-100 px-3 py-1 rounded-full text-sm font-medium">PFL</span>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <img
                            src="/assets/hero-image.jpg"
                            alt="MMA Fighters"
                            className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=MMA+Fighters" }}
                        />
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-700 mb-8">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dreamFights')}
                            className={`px-1 py-4 font-medium text-sm border-b-2 ${activeTab === 'dreamFights'
                                    ? 'border-red-500 text-red-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            Dream Matchups
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-1 py-4 font-medium text-sm border-b-2 ${activeTab === 'chat'
                                    ? 'border-red-500 text-red-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            Chat With AI
                        </button>
                    </nav>
                </div>

                {/* Dream Fights Section */}
                {activeTab === 'dreamFights' && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Dream Matchups</h2>

                        <div className="bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-700">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <img
                                        src={currentMatchup.left}
                                        alt={currentMatchup.names.split(' vs ')[0]}
                                        className="relative w-48 h-48 object-cover rounded-lg border-4 border-red-600 shadow-md"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Fighter" }}
                                    />
                                </div>

                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-bold text-red-500">VS</span>
                                    <div className="w-16 h-1 bg-red-500 rounded-full mt-2"></div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <img
                                        src={currentMatchup.right}
                                        alt={currentMatchup.names.split(' vs ')[1]}
                                        className="relative w-48 h-48 object-cover rounded-lg border-4 border-blue-600 shadow-md"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Fighter" }}
                                    />
                                </div>
                            </div>

                            <div className="text-center mt-6">
                                <h3 className="text-xl font-bold text-white">{currentMatchup.names}</h3>
                                <p className="text-gray-400 mt-2">{currentMatchup.description}</p>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-300"
                                >
                                    Get AI Analysis
                                </button>
                            </div>
                        </div>

                        {/* Matchup Indicators */}
                        <div className="flex justify-center mt-6 gap-2">
                            {matchups.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-2 h-2 rounded-full ${index === i ? 'bg-red-500' : 'bg-gray-600'
                                        }`}
                                    aria-label={`View matchup ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Section */}
                {activeTab === 'chat' && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Chat With Fighter Companion</h2>

                        <div className="bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-700">
                            <ChatBot />

                            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-medium text-blue-300 mb-2">Try asking:</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
                                        "Who would win between {currentMatchup.names}?"
                                    </button>
                                    <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
                                        "Compare Jon Jones and Francis Ngannou's fighting styles"
                                    </button>
                                    <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
                                        "What are Khabib's best submission victories?"
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Featured Articles */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-white">Featured Articles</h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "The Evolution of MMA Wrestling",
                                image: "/assets/articles/wrestling.jpg",
                                description: "How wrestling techniques have transformed in the octagon"
                            },
                            {
                                title: "Rise of African Champions",
                                image: "/assets/articles/africa.jpg",
                                description: "The new era of dominant fighters from Nigeria, Cameroon and beyond"
                            },
                            {
                                title: "The Art of Fight IQ",
                                image: "/assets/articles/fight-iq.jpg",
                                description: "Breaking down the mental game in mixed martial arts"
                            }
                        ].map((article, i) => (
                            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700 hover:shadow-lg transition-shadow duration-300">
                                <div className="p-4">
                                    <h3 className="font-bold text-white mb-2">{article.title}</h3>
                                    <p className="text-gray-400 text-sm">{article.description}</p>
                                  
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FighterCompanion;