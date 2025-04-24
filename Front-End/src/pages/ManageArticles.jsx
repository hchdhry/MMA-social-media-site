import React, { useEffect, useState } from 'react';
import ArticleCard from '../Components/ArticleCard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const ManageArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:5211/api/Article/getbyuser', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [token]);

    const handleDeleted = (id) => {
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-red-500 mb-8 text-center">Manage Your Articles</h1>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => navigate('/CreateArticle')}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                        >
                            Create New Article
                        </button>
                    </div>
                    {loading ? (
                        <p className="text-center text-gray-400">Loading...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-gray-400">No articles found.</p>
                    ) : (
                        <div className="space-y-6">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    token={token}
                                    onDeleted={handleDeleted}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ManageArticles;