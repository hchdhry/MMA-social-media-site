import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CreateArticle = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [article, setArticle] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5211/api/Article/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });

            if (!res.ok) throw new Error('Create failed');

            navigate('/ManageArticles');
        } catch (err) {
            console.error('Error creating article:', err);
        }
    };

    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">Create New Article</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1">Content</label>
                            <textarea
                                name="content"
                                rows="8"
                                value={article.content}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                            >
                                Create Article
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CreateArticle;
