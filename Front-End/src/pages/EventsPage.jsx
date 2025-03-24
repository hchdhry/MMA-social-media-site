import { Link, useNavigate } from "react-router-dom";

const events = [
    { id: "ufc-london", name: "UFC London", date: "March 30, 2025" },
    { id: "ufc-314", name: "UFC 314", date: "April 15, 2025" },
    { id: "ufc-315", name: "UFC 315", date: "May 20, 2025" },
];

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleJoinChat = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect if not authenticated
        } else {
            navigate(`/chat/${event.id}`); // Proceed to chat if authenticated
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-4">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-400">Date: {event.date}</p>
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
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Upcoming UFC Events</h1>
            <div className="space-y-4">
                {events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </div>
    );
};

export default EventsPage;
