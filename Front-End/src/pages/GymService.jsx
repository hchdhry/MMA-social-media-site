import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import GymCard from '../Components/GymCard';
import Footer from '../components/Footer';


const GymService = () => {
    const [fighters, setFighters] = useState([]);
    const jwtToken = localStorage.getItem("token");

    const fetchFighters = async () => {
        try {
            const response = await fetch('http://localhost:5211/api/Gym/getall', {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            const jsonData = await response.json();
            setFighters(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

  

    useEffect(() => {
        fetchFighters();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="container mx-auto py-10">
                <main className="bg-gray-900 text-white">
                    <section className="py-10">
                        <h1 className="text-3xl font-bold text-center mb-4">Your Fighter Gym</h1>
                        <p className="text-lg text-gray-400 text-center">Track your favorite fighters all in one place</p>
                    </section>

                 

                    <section className="py-10">
                        <h2 className="text-2xl font-bold mb-6 text-center">All Your Fighters</h2>
                        {fighters.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {fighters.map((fighter) => (
                                    <GymCard key={fighter.fighter.id} GymData={fighter} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg text-gray-400 text-center">
                                {jwtToken ? "Loading or no fighters added yet..." : "Please log in to view your fighters"}
                            </p>
                        )}
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default GymService;