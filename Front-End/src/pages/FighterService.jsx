import React, { useState } from 'react';
import Header from '../Components/Header';
import FighterCard from '../Components/FighterCard';

const FighterService = () => {
    const [queryObject, setQueryObject] = useState({
        NameQuery: '',
        SortBy: '',
        PageSize: 20,
        PageNumber: 1
    });
    const [data, setData] = useState([]);
    const jwtToken = localStorage.getItem("token");

    const handleSearchChange = (e) => {
        setQueryObject(prev => ({ ...prev, NameQuery: e.target.value }));
    };

    const handleSortChange = (event) => {
        setQueryObject(prev => ({
            ...prev,
            SortBy: event.target.value
        }));
    };

    const fetchData = async () => {
        try {
            let url = `http://localhost:5211/api/Fighter?NameQuery=${queryObject.NameQuery}&PageSize=${queryObject.PageSize}&PageNumber=${queryObject.PageNumber}`;

            if (queryObject.SortBy) {
                url += `&SortBy=${queryObject.SortBy}`;
            }

            let response = await fetch(url);

            if (!response.ok) {
                response = await fetch(`http://localhost:5211/api/Fighter`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(queryObject.NameQuery)
                });
                if (response.ok) {
                    const newData = await response.json();
                    setData([newData]);
                } else {
                    console.log('Both requests failed');
                    setData([]);
                }
            } else {
                const fetchedData = await response.json();
                setData(fetchedData);
            }
        } catch (e) {
            console.log(e);
            setData([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData();
    };

    const loadMore = () => {
        setQueryObject(prev => ({
            ...prev,
            PageNumber: prev.PageNumber + 1
        }));
        fetchData();
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="container mx-auto py-10">
                <div className="flex justify-end mb-4">
                    <select
                        onChange={handleSortChange}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="wins_desc">Most Wins</option>
                        <option value="wins_asc">Least Wins</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                    </select>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center mb-8">
                    <div className="search-bar flex items-center bg-gray-800 rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search fighters..."
                            value={queryObject.NameQuery}
                            onChange={handleSearchChange}
                            className="bg-transparent text-gray-300 placeholder-gray-500 outline-none flex-grow"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.length > 0 ? (
                        data.map((fighter, index) => <FighterCard key={index} fighterData={fighter} />)
                    ) : (
                        <p className="text-lg text-gray-400 text-center">No fighters found</p>
                    )}
                </section>
                {data.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={loadMore}
                            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FighterService;