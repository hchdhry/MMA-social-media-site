import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { toast } from 'sonner';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: ''
    });
    const [editingEvent, setEditingEvent] = useState(null);

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5211/api/Event', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    toast.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Fetch events error:', error);
                toast.error('An error occurred while fetching events');
            }
        };

        fetchEvents();
    }, []);

    // Handle input change for new/edit event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingEvent) {
            setEditingEvent(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewEvent(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Convert the event date to UTC format (ISO 8601)
            const formattedEvent = {
                ...newEvent,
                date: new Date(newEvent.date).toISOString(), // Ensures UTC format
            };

            const response = await fetch('http://localhost:5211/api/Event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedEvent) // Send properly formatted date
            });

            if (response.ok) {
                const createdEvent = await response.json();
                setEvents(prev => [...prev, createdEvent]);
                setNewEvent({ name: '', date: '' });
                toast.success('Event created successfully!');
            } else {
                const errorData = await response.text();
                toast.error(errorData || 'Failed to create event');
            }
        } catch (error) {
            console.error('Create event error:', error);
            toast.error('An error occurred while creating the event');
        }
    };


    // Update existing event
    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5211/api/Event/${editingEvent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingEvent)
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setEvents(prev =>
                    prev.map(event =>
                        event.id === updatedEvent.id ? updatedEvent : event
                    )
                );
                setEditingEvent(null);
                toast.success('Event updated successfully!');
            } else {
                const errorData = await response.text();
                toast.error(errorData || 'Failed to update event');
            }
        } catch (error) {
            console.error('Update event error:', error);
            toast.error('An error occurred while updating the event');
        }
    };

    // Delete event
    const handleDeleteEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5211/api/Event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setEvents(prev => prev.filter(event => event.id !== eventId));
                toast.success('Event deleted successfully!');
            } else {
                const errorData = await response.text();
                toast.error(errorData || 'Failed to delete event');
            }
        } catch (error) {
            console.error('Delete event error:', error);
            toast.error('An error occurred while deleting the event');
        }
    };

    return (
        <>
        <Header />
        <main className="bg-gray-900 text-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Event <span className="text-red-500">Management</span>
                </h1>

                {/* Event Creation/Edit Form */}
                <form
                    onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                    className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {editingEvent ? 'Edit Event' : 'Create New Event'}
                    </h2>

                    <div className="grid gap-6">
                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Event Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editingEvent ? editingEvent.name : newEvent.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-400 mb-2">Event Date</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={editingEvent ?
                                    (editingEvent.date ? new Date(editingEvent.date).toISOString().slice(0, 16) : '') :
                                    newEvent.date
                                }
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                            >
                                {editingEvent ? 'Update Event' : 'Create Event'}
                            </button>
                            {editingEvent && (
                                <button
                                    type="button"
                                    onClick={() => setEditingEvent(null)}
                                    className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {/* Events List */}
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Existing Events</h2>

                    {events.length === 0 ? (
                        <p className="text-center text-gray-400">No events found</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => (
                                <div
                                    key={event.id}
                                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-red-500">{event.name}</h3>
                                    <p className="text-gray-400 mb-4">
                                        {new Date(event.date).toLocaleString()}
                                    </p>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setEditingEvent(event)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
        <Footer/>
        </>
    );
};

export default AdminEvents;