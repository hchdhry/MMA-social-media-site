import React, { useEffect, useState } from 'react';
import ChatBot from '../Components/ChatBot';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const matchups = [
    {
        left: '/assets/fighters/khabib.jpg',
        right: '/assets/fighters/islam.jpg',
        names: 'Khabib vs Islam',
    },
    {
        left: '/assets/fighters/gsp.webp',
        right: '/assets/fighters/silva.jpeg',
        names: 'GSP vs Anderson Silva',
    },
    {
        left: '/assets/fighters/Lesnar.jpeg',
        right: '/assets/fighters/Fedor.webp',
        names: 'brock vs fedor',
    },
    {
        left: '/assets/fighters/ferguson.jpeg',
        right: '/assets/fighters/khabib.jpg',
        names: 'Ferguson vs Khabib',
    },
    {
        left: '/assets/fighters/Nganou.jpg',
        right: '/assets/fighters/Jones.webp',
        names: 'Ngannou vs Jones',
    },
];


const FighterCompanion = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % matchups.length);
        }, 2500); 

        return () => clearInterval(interval);
    }, []);

    const currentMatchup = matchups[index];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-900 text-white px-4 py-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-red-500 mb-4">
                        🥊 Fighter Companion
                    </h1>
                    <p className="text-lg text-gray-300 mb-10">
                        Get fight predictions, matchup breakdowns, and more. Just ask about any fighter or dream fight scenario!
                    </p>

                    {/* Fantasy Matchup Section */}
                    <div className="relative flex justify-center items-center gap-8 mb-10 transition-all duration-700">
                        <div className="flex items-center gap-4">
                            <img
                                src={currentMatchup.left}
                                alt="Left fighter"
                                className="w-40 h-40 object-cover rounded-xl border-4 border-red-600 shadow-lg"
                            />
                            <span className="text-2xl font-semibold">VS</span>
                            <img
                                src={currentMatchup.right}
                                alt="Right fighter"
                                className="w-40 h-40 object-cover rounded-xl border-4 border-blue-600 shadow-lg"
                            />
                        </div>
                        <p className="absolute bottom-[-2rem] w-full text-sm text-gray-400 text-center">
                            {currentMatchup.names}
                        </p>
                    </div>

                    {/* ChatBot Section */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                        <ChatBot />
                        <p className="text-sm text-gray-400 mt-4">
                            Example: "Who would win between Jon Jones and Francis Ngannou?"
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default FighterCompanion;
