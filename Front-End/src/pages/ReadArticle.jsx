import React, { useEffect } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ReadArticle = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state?.article) {
            navigate('/ManageArticles');
        }
    }, [state, navigate]);

    const article = state?.article;

    return (
        <>
            <Header />
            <main className="bg-gray-900 text-white min-h-screen py-12 px-4">
                <div className="max-w-4xl mx-auto relative">
                    <Link
                        to="/BrowseArticles"
                        className="inline-block mb-6 px-4 py-2 bg-gray-700 text-sm text-white rounded-full hover:bg-red-500 transition duration-300"
                    >
                        ← Back to Articles
                    </Link>

                    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                        <h1 className="text-4xl font-bold text-red-400 mb-6 text-center">{article?.title}</h1>
                        <p className="text-gray-300 whitespace-pre-wrap break-words">{article?.content}</p>
                    </div>
                </div>
            </main>


            <Footer />
        </>
    );
};

export default ReadArticle;
