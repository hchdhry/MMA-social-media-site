import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
                <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h1 className="text-4xl font-bold text-red-400 mb-6 text-center">{article?.title}</h1>
                    <p className="text-gray-300 whitespace-pre-wrap break-words">{article?.content}</p>

                </div>
            </main>
            <Footer />
        </>
    );
};

export default ReadArticle;
