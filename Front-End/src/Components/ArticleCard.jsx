import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article, token, onDeleted, hideActions = false }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5211/api/Article/delete/${article.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Failed to delete');
            onDeleted?.(article.id);
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete the article.');
        }
    };

    const handleEdit = () => {
        navigate(`/EditArticle/${article.id}`, { state: { article } });
    };

    const handleReadMore = () => {
        navigate(`/ReadArticle/${article.id}`, { state: { article } });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-2xl font-bold text-red-400 mb-2">{article.title}</h2>
            <p className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
                {article.content.length > 300
                    ? article.content.slice(0, 300) + '...'
                    : article.content}
            </p>

            <div className="flex gap-4">
                {hideActions ? (
                    <button
                        onClick={handleReadMore}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Read More
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArticleCard;
