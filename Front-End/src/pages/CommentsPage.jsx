import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import CommentItem from '../Components/CommentItems';


const CommentsPage = () => {
    const fighterId = useParams().fighterId;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ title: '', text: '' });
    const jwtToken = localStorage.getItem("token");
    const [error, setError] = useState({});

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5211/api/Comment/${fighterId}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            if (response.ok) {
                const comments = await response.json();
                setComments(comments);
            } else {
                console.error('Error fetching comments:', response.status);
                setError({ general: 'Failed to fetch comments. Please try again.' });
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError({ general: 'An error occurred while fetching comments.' });
        }
    };
    const validate = () => 
        {
            const newErrors = {};
            if (newComment.title.trim().length < 5) {
                newErrors.title = 'Title must be at least 5 characters.';
            }
            if (newComment.text.trim().length < 20) {
                newErrors.text = 'Text must be at least 20 characters.';
            }
            setError(newErrors);
            return Object.keys(newErrors).length === 0;
        }

    useEffect(() => {
        fetchComments();
    }, [fighterId, jwtToken]);

    const handleTitleChange = (e) => {
        setNewComment({ ...newComment, title: e.target.value });
    };

    const handleTextChange = (e) => {
        setNewComment({ ...newComment, text: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        setError({});

        try {
            const response = await fetch(`http://localhost:5211/api/Comment/${fighterId}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                console.log('Comment submitted successfully');
                setNewComment({ title: '', text: '' });
                await fetchComments();
            } else {
                const errorData = await response.json();
                setError({
                    title: errorData.errors?.Title?.[0],
                    text: errorData.errors?.Text?.[0]
                });
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setError({ general: 'An error occurred while submitting the comment.' });
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-white mb-4">Comments</h1>
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        {comments.length === 0 ? (
                            <p className="text-gray-400">No comments yet.</p>
                        ) : (
                            <ul className="list-none">
                                {comments.map((comment, index) => (
                                    <CommentItem key={index} comment={comment} />
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={newComment.title}
                                onChange={handleTitleChange}
                                placeholder="Title"
                                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 w-full mb-2"
                                rows="1"
                            />
                            {error.title && <p className="text-red-500 mb-2">{error.title}</p>}
                            <textarea
                                value={newComment.text}
                                onChange={handleTextChange}
                                placeholder="Enter your comment..."
                                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 w-full mb-2"
                                rows="3"
                            />
                            {error.text && <p className="text-red-500 mb-2">{error.text}</p>}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </form>
                        {error.general && <p className="text-red-500 mt-2">{error.general}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CommentsPage;