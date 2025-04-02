import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Footer from '../components/Footer';
import Header from '../components/Header';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleJoinChat = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); 
        } else {
            navigate(`/chat/${event.id}`); 
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-4">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-400">Date: {new Date(event.date).toLocaleDateString()}</p>
            <button
                onClick={handleJoinChat}
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
            >
                Join Live Chat
            </button>
        </div>
    );
};

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:5211/api/Event', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();
                setEvents(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                toast.error('Failed to load events. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 min-h-screen bg-gray-900 flex justify-center items-center">
                <div className="text-white text-xl">Loading events...</div>
            </div>
        );
    }

    return (
        <>
        <Header/>
        <div className="p-6 min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold text-white mb-6">Upcoming UFC Events</h1>
            {events.length === 0 ? (
                <div className="text-gray-400 text-center">
                    No upcoming events at the moment.
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default EventsPage;