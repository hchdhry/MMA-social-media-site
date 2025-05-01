import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ArticleCard from '../Components/ArticleCard'; // Import the ArticleCard component

const BrowseArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:5211/api/Article', {
                    headers: {
                        'Accept': '*/*',
                    },
                });
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-red-500 mb-10 text-center">Browse Articles</h1>

                    {loading ? (
                        <p className="text-center text-gray-400">Loading...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-gray-400">No articles available.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    hideActions={true} 
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

export default BrowseArticles;