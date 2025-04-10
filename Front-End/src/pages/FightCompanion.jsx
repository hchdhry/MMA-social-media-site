import React from 'react';
import ChatBot from '../Components/ChatBot';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const FighterCompanion = () => {
    return (
        <>
        <Header/>
        <div className="fighter-companion-page">
            <h1 className="text-center text-3xl font-bold my-5">
                Welcome to the Fighter Companion
            </h1>
            <p className="text-center text-xl mb-5">
                Get predictions, breakdowns, and insights on your favorite matchups. Ask about fight predictions and let’s dive into the analysis!
            </p>

            {/* ChatBot Component */}
            <ChatBot />

            <div className="text-center mt-5">
                <p className="text-lg">Ready for some fight predictions? Ask away!</p>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default FighterCompanion;
