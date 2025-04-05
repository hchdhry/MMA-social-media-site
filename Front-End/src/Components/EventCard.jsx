import { useNavigate } from "react-router-dom";
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

    // Create Google search URL for tickets
    const ticketSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(event.name + " tickets")}`;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-4">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-400">Date: {new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={handleJoinChat}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
                >
                    Join Live Chat
                </button>
                <a
                    href={ticketSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                >
                    Find Tickets
                </a>
            </div>
        </div>
    );
};
export default EventCard;