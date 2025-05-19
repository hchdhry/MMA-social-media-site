import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Footer from '../Components/Footer';
import Header from '../Components/Header'
import EventCard from '../Components/EventCard';



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