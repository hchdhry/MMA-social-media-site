import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CreateFighterForm = () => {
    const navigate = useNavigate();
    const [fighterData, setFighterData] = useState({
        name: '',
        wins: 0,
        losses: 0,
        height: null,
        weight: null,
        reach: null,
        stance: '',
        age: null,
        significantStrikesLandedPerMinute: null,
        significantStrikeAccuracy: null,
        strikesAbsorbedPerMinute: null,
        strikeDefense: null,
        takedownAverage: null,
        takedownAccuracy: null,
        takedownDefense: null,
        submissionAverage: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFighterData(prev => ({
            ...prev,
            [name]: value === '' ? null :
                (name === 'name' || name === 'stance') ? value :
                    Number(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5211/api/Fighter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(fighterData)
            });

            if (response.ok) {
                toast.success('Fighter created successfully!');
                navigate('/fighters');
            } else {
                const errorData = await response.text();
                toast.error(errorData || 'Failed to create fighter');
            }
        } catch (error) {
            toast.error('An error occurred while creating the fighter');
            console.error('Create fighter error:', error);
        }
    };

    return (
        <>
        <Header />
        <main className="bg-gray-900 text-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Create <span className="text-red-500">New</span> Fighter
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={fighterData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Stance</label>
                            <input
                                type="text"
                                name="stance"
                                value={fighterData.stance || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Wins</label>
                            <input
                                type="number"
                                name="wins"
                                value={fighterData.wins}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Losses</label>
                            <input
                                type="number"
                                name="losses"
                                value={fighterData.losses}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        {/* Physical Attributes */}
                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={fighterData.height || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={fighterData.weight || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        {/* Performance Metrics */}
                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Significant Strikes Landed/Min</label>
                            <input
                                type="number"
                                name="significantStrikesLandedPerMinute"
                                value={fighterData.significantStrikesLandedPerMinute || ''}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Significant Strike Accuracy (%)</label>
                            <input
                                type="number"
                                name="significantStrikeAccuracy"
                                value={fighterData.significantStrikeAccuracy || ''}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Create Fighter
                        </button>
                    </div>
                </form>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default CreateFighterForm;