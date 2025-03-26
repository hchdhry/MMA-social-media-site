import { useState } from 'react';

const FighterCard = ({ fighterData }) => {
    const [showMore, setShowMore] = useState(false);
    const jwtToken = localStorage.getItem("token");
    const fighterId = fighterData.id;

    const handleClick = async () => {
        try {

            const response = await fetch(`http://localhost:5211/api/Gym/create?fighterId=${fighterId}`, {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },

            });

            if (response.ok) {
                alert('Fighter added to your favorites!');
            } else {
                const error = await response.json();
                alert(`Error adding fighter to favorites: ${error.title}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the fighter to your favorites.');
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">{fighterData.name}</h2>
            <p className="text-gray-400 mb-4">Record: {fighterData.wins}-{fighterData.losses}</p>
            {jwtToken && (
                <button onClick={handleClick} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 mb-4">
                    Add to Gym
                </button>
            )}
            <button
                onClick={() => setShowMore((prevState) => !prevState)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
                {showMore ? 'Show Less' : 'Show More'}
            </button>
            {showMore && (
                <>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <p className="text-gray-400">Age: {fighterData.age || '-'}</p>
                        <p className="text-gray-400">Stance: {fighterData.stance || '-'}</p>
                        <p className="text-gray-400">Height: {fighterData.height ? `${fighterData.height} cm` : '-'}</p>
                        <p className="text-gray-400">Weight: {fighterData.weight ? `${fighterData.weight} kg` : '-'}</p>
                        <p className="text-gray-400">Reach: {fighterData.reach ? `${fighterData.reach} cm` : '-'}</p>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 mb-2 text-white">Strike Stats</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-400">Significant Strikes/Min: {fighterData.significantStrikesLandedPerMinute?.toFixed(1) || '-'}</p>
                        <p className="text-gray-400">Strike Accuracy: {fighterData.significantStrikeAccuracy ? `${(fighterData.significantStrikeAccuracy * 100).toFixed(0)}%` : '-'}</p>
                        <p className="text-gray-400">Strikes Absorbed/Min: {fighterData.strikesAbsorbedPerMinute?.toFixed(1) || '-'}</p>
                        <p className="text-gray-400">Strike Defense: {fighterData.strikeDefense ? `${(fighterData.strikeDefense * 100).toFixed(0)}%` : '-'}</p>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 mb-2 text-white">Grappling Stats</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-400">Takedown Avg: {fighterData.takedownAverage?.toFixed(1) || '-'}</p>
                        <p className="text-gray-400">Takedown Accuracy: {fighterData.takedownAccuracy ? `${(fighterData.takedownAccuracy * 100).toFixed(0)}%` : '-'}</p>
                        <p className="text-gray-400">Takedown Defense: {fighterData.takedownDefense ? `${(fighterData.takedownDefense * 100).toFixed(0)}%` : '-'}</p>
                        <p className="text-gray-400">Submission Avg: {fighterData.submissionAverage?.toFixed(1) || '-'}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default FighterCard;