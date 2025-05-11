import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";
import ChatRoomComment from "../Components/ChatRoomComment";
import Header from '../components/Header';
import Footer from '../components/Footer';
const useChatConnection = (eventName, userName) => {
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState('');
    const connectionRef = useRef(null);

    const joinChat = useCallback(async () => {
        if (connectionRef.current) {
            console.log("Connection already exists. Skipping setup.");
            return;
        }

        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5211/chat")
                .configureLogging(LogLevel.Information)
                .build();

            await newConnection.start();
            console.log("Connection started");

            await newConnection.invoke("JoinSpecificEventChat", { UserName: userName, EventName: eventName });
            console.log("Joined event chat group");

            setConnection(newConnection);
            connectionRef.current = newConnection;
            setError('');
        } catch (e) {
            console.error("Failed to connect:", e);
            setError(`Failed to connect: ${e.message}`);
        }
    }, [eventName, userName]);

    useEffect(() => {
        joinChat();

        return () => {
            if (connectionRef.current) {
                console.log("Stopping connection");
                connectionRef.current.stop();
                connectionRef.current = null;
            }
        };
    }, [joinChat]);

    return { connection, error };
};

const ChatRoom = () => {
    const navigate = useNavigate();
    const { eventName } = useParams();
    const [userName, setUserName] = useState('Anonymous');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { connection, error: connectionError } = useChatConnection(eventName, userName);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.given_name || 'Anonymous');
            } catch (e) {
                console.error("Error decoding token:", e);
                setError("Error decoding user token. Using 'Anonymous' as username.");
            }
        }
    }, []);

    useEffect(() => {
        if (!connection) return;

        connection.on("ReceivedMessage", (user, message) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
        });

        connection.on("ErrorMessage", (errorMessage) => {
            setError(errorMessage);
        });

        return () => {
            connection.off("ReceivedMessage");
            connection.off("ErrorMessage");
        };
    }, [connection]);

    const leaveChat = async () => {
        try {
            await connection.invoke("LeaveChat", { UserName: userName, EventName: eventName });
            navigate("/events");
        } catch (e) {
            console.log(e);
        }
    };
    const validate = () => {
        if (message.trim().length < 1) {
            setError('Message cannot be empty.');
            return false;
        }
        setError('');
        return true;
    }


    const sendMessage = async () => {
        if (!validate()) return;
        if (connection) {
            try {
                await connection.invoke("SendMessage", { UserName: userName, EventName: eventName }, message);
                setMessage('');
            } catch (e) {
                console.error("Failed to send message:", e);
                setError(`Failed to send message: ${e.message}`);
            }
        } else {
            setError("No connection to server yet.");
        }
    };

    return (
        <>
        <Header/>
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">MMA Event Chat: {eventName}</h1>

            {(error || connectionError) && <div className="text-red-500 mb-4">{error || connectionError}</div>}
            <button onClick={leaveChat} className="p-2 bg-red-500 text-white rounded">Leave</button>

            <ul className="mb-4 h-64 overflow-y-auto bg-gray-800 p-4 rounded">
                {messages.map((msg, index) => (
                    <ChatRoomComment key={index} user={msg.user} message={msg.message} />
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <button onClick={sendMessage} className="p-2 bg-green-500 text-white rounded">Send</button>
            </div>
        </div>
        
       </>
    );
};

export default ChatRoom;
