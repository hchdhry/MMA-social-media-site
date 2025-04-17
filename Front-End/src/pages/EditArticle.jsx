import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const token = localStorage.getItem('token');

    const [article, setArticle] = useState({
        title: '',
        content: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (state?.article) {
            setArticle(state.article);
        }
    }, [state]);

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (article.title.trim().length < 5) {
            newErrors.title = 'Title must be at least 5 characters.';
        }

        if (article.content.trim().length < 20) {
            newErrors.content = 'Content must be at least 20 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch(`http://localhost:5211/api/Article/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json-patch+json',
                },
                body: JSON.stringify({
                    title: article.title,
                    content: article.content,
                }),
            });

            if (!res.ok) throw new Error('Update failed');
            navigate('/ManageArticles');
        } catch (err) {
            console.error('Error updating article:', err);
        }
    };

    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">Edit Your Article</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                className={`w-full bg-gray-900 border ${errors.title ? 'border-red-500' : 'border-gray-600'
                                    } text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1">Content</label>
                            <textarea
                                name="content"
                                rows="8"
                                value={article.content}
                                onChange={handleChange}
                                className={`w-full bg-gray-900 border ${errors.content ? 'border-red-500' : 'border-gray-600'
                                    } text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                                required
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default EditArticle;
