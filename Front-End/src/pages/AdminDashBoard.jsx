import React, { useEffect, useState, useMemo } from 'react'; // Added useMemo
import {
    UsersIcon,
    DocumentTextIcon,
    UserCircleIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    ExclamationTriangleIcon,
    ArrowPathIcon,
    ChartBarIcon // Added for the chart section title
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import Chart.js components
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Simple Spinner Component (using Tailwind) - No changes needed
const Spinner = () => (
    <svg
        className="animate-spin h-10 w-10 text-red-500 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching Logic (no changes needed) ---
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Authentication token not found. Please log in.");
                }
                const res = await fetch("http://localhost:5211/api/stats/admin-dashboard", {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                });
                if (!res.ok) {
                    let errorMsg = `HTTP error! Status: ${res.status}`;
                    try {
                        const errorData = await res.json();
                        errorMsg = errorData.message || errorData.title || errorMsg;
                    } catch (parseError) { console.warn("Could not parse error response:", parseError); }
                    if (res.status === 401 || res.status === 403) {
                        errorMsg = "Unauthorized. Please check your login session.";
                    }
                    throw new Error(errorMsg);
                }
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
                setError(err.message || "Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // --- Chart Data Preparation ---
    const fighterChartData = useMemo(() => {
        if (!stats?.topFighters || stats.topFighters.length === 0) {
            return null; // Return null if no data
        }
        // Sort fighters by comment count descending for better visualization
        const sortedFighters = [...stats.topFighters].sort((a, b) => (b.commentCount ?? 0) - (a.commentCount ?? 0));

        return {
            labels: sortedFighters.map(f => f?.name ?? 'Unknown'),
            datasets: [
                {
                    label: 'Comment Count',
                    data: sortedFighters.map(f => f?.commentCount ?? 0),
                    backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red-500 with opacity
                    borderColor: 'rgba(239, 68, 68, 1)', // Solid Red-500
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(220, 38, 38, 0.8)', // Red-600 with opacity
                    hoverBorderColor: 'rgba(220, 38, 38, 1)', // Solid Red-600
                },
            ],
        };
    }, [stats?.topFighters]); // Re-calculate only when topFighters data changes

    // --- Chart Options ---
    const fighterChartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false, // Allow setting height via container
        plugins: {
            legend: {
                display: false, // Hide legend for single dataset
            },
            title: {
                display: true,
                text: 'Top Fighters by Comment Count',
                color: '#E5E7EB', // gray-200 for title
                font: {
                    size: 16,
                    weight: 'bold', // Make title bold
                },
                padding: {
                    bottom: 20 // Add padding below title
                }
            },
            tooltip: {
                backgroundColor: 'rgba(31, 41, 55, 0.9)', // gray-800 background
                titleColor: '#F9FAFB', // gray-50
                bodyColor: '#D1D5DB', // gray-300
                borderColor: '#4B5563', // gray-600
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `${context.parsed.y} comment${context.parsed.y !== 1 ? 's' : ''}`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Comments',
                    color: '#9CA3AF', // gray-400
                    font: { size: 14 },
                },
                ticks: {
                    color: '#D1D5DB', // gray-300 for tick labels
                    stepSize: 1, // Ensure integer steps if counts are low
                    precision: 0 // Display whole numbers only
                },
                grid: {
                    color: 'rgba(75, 85, 99, 0.4)', // gray-600 with opacity
                },
            },
            x: {
                title: {
                    display: false, // Fighter names are clear enough
                    // text: 'Fighter',
                    // color: '#9CA3AF',
                },
                ticks: {
                    color: '#D1D5DB', // gray-300 for tick labels
                    // Auto-skip ticks if too many labels
                    autoSkip: true,
                    maxRotation: 45, // Rotate labels slightly if needed
                    minRotation: 0
                },
                grid: {
                    display: false, 
                },
            },
        },
    }), []); 

    // --- Render Loading State (no changes needed) ---
    if (loading) {
        return (
            <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-red-500">Admin Dashboard</h1>
                <Spinner />
                <p className="text-xl text-gray-400 mt-4">Loading statistics...</p>
            </main>
        );
    }

    // --- Render Error State (no changes needed) ---
    if (error) {
        return (
            <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-red-500">Admin Dashboard</h1>
                <div className="bg-gray-800 border border-red-600 rounded-lg p-6 max-w-md w-full text-center shadow-xl">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-red-400 mb-6">{error}</p>
                    <button
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => window.location.reload()}
                    >
                        <ArrowPathIcon className="h-5 w-5" /> Retry
                    </button>
                </div>
            </main>
        );
    }

    // --- Render Dashboard Content ---
    return (
        <>
        <Header/>
        <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen p-4 md:p-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-red-500 tracking-tight">Admin Dashboard</h1>
            {!stats ? (
                <p className="text-center text-gray-400 text-xl">No statistics data received from server.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {/* --- Other Stat Cards (no changes) --- */}
                    {/* Total Users */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50">
                        <div className="flex items-center gap-4 mb-3"> <UsersIcon className="h-8 w-8 text-red-500 flex-shrink-0" /> <h2 className="text-lg font-semibold text-gray-300 truncate">Total Users</h2> </div>
                        <p className="text-4xl font-bold text-white">{stats.totalUsers ?? 'N/A'}</p>
                    </div>
                    {/* Total Articles */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50">
                        <div className="flex items-center gap-4 mb-3"> <DocumentTextIcon className="h-8 w-8 text-red-500 flex-shrink-0" /> <h2 className="text-lg font-semibold text-gray-300 truncate">Total Articles</h2> </div>
                        <p className="text-4xl font-bold text-white">{stats.totalArticles ?? 'N/A'}</p>
                    </div>
                    {/* Top Author */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50">
                        <div className="flex items-center gap-4 mb-3"> <UserCircleIcon className="h-8 w-8 text-red-500 flex-shrink-0" /> <h2 className="text-lg font-semibold text-gray-300 truncate">Top Author</h2> </div>
                        {stats.topAuthor ? (<> <p className="text-2xl font-semibold text-white truncate">{stats.topAuthor.userName ?? 'Unknown'}</p> <p className="text-sm text-gray-400">{stats.topAuthor.articleCount ?? 0} Article{stats.topAuthor.articleCount !== 1 ? 's' : ''}</p> </>) : (<p className="text-gray-400 mt-2 text-center">No author data</p>)}
                    </div>
                    {/* Recent Users */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="flex items-center gap-3 mb-4"> <UserGroupIcon className="h-6 w-6 text-red-500 flex-shrink-0" /> <h2 className="text-xl font-semibold text-gray-200">Recent Users</h2> </div>
                        {stats.recentUsers && stats.recentUsers.length > 0 ? (<ul className="space-y-2 max-h-60 overflow-y-auto pr-2"> {stats.recentUsers.slice(0, 5).map((user, i) => (<li key={user?.email || i} className="p-2 hover:bg-gray-700/50 rounded-md transition-colors duration-150"> <p className="text-gray-100 font-medium truncate">{user?.userName ?? 'Unnamed User'}</p> <p className="text-xs text-gray-400 truncate">{user?.email ?? 'No email'}</p> </li>))} </ul>) : (<p className="text-gray-400 text-center italic mt-4">No recent users found.</p>)}
                    </div>
                    {/* Recent Events */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50 md:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4"> <CalendarDaysIcon className="h-6 w-6 text-red-500 flex-shrink-0" /> <h2 className="text-xl font-semibold text-gray-200">Recent Events</h2> </div>
                        {stats.recentEvents && stats.recentEvents.length > 0 ? (<ul className="space-y-3"> {stats.recentEvents.map((event) => (<li key={event?.id} className="p-2 hover:bg-gray-700/50 rounded-md transition-colors duration-150 flex justify-between items-center gap-4"> <span className="text-gray-100 font-medium truncate">{event?.name ?? 'Unnamed Event'}</span> <span className="text-sm text-gray-400 flex-shrink-0"> {event?.date ? new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No Date'} </span> </li>))} </ul>) : (<p className="text-gray-400 text-center italic mt-4">No recent events found.</p>)}
                    </div>
                    {/* --- End Other Stat Cards --- */}


                    {/* Top Fighters Chart --- REPLACES THE LIST --- */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-red-900/30 hover:border-red-700/50 md:col-span-2 lg:col-span-3 xl:col-span-4">
                        {/* Use ChartBarIcon if you want an icon in the title area, otherwise remove */}
                        {/* <div className="flex items-center gap-3 mb-4">
                             <ChartBarIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                            <h2 className="text-xl font-semibold text-gray-200">Top Fighters Analysis</h2>
                        </div> */}

                        {/* Render Chart or fallback message */}
                        {fighterChartData ? (
                            // Set a height for the chart container
                            <div className="h-72 md:h-80 lg:h-96">
                                <Bar options={fighterChartOptions} data={fighterChartData} />
                            </div>
                        ) : (
                            // Message if no fighter data specifically
                            <div className="flex flex-col items-center justify-center h-72 md:h-80 lg:h-96">
                                <ChartBarIcon className="h-16 w-16 text-gray-600 mb-4" />
                                <p className="text-gray-400 text-center italic mt-4">No fighter comment data available to display chart.</p>
                            </div>
                        )}
                    </div>
                    {/* --- End Top Fighters Chart --- */}

                </div>
            )}
        </main>
        <Footer/>
        </>
    );
};

export default AdminDashboard;