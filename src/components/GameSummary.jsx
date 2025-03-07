import React from 'react';

const GameSummary = ({ averageReactionTime, reactionTimes, onPlayAgain, onMainMenu }) => {
    return (
        <div className="flex flex-col items-center gap-4 p-8 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Game Summary</h2>
            <div className="text-xl mb-4">
                Average Reaction Time: {averageReactionTime}ms
            </div>
            <div className="max-h-48 overflow-y-auto mb-4">
                <h3 className="text-lg font-semibold mb-2">All Reaction Times:</h3>
                {reactionTimes.map((time, index) => (
                    <div key={index} className="text-center">
                        Click {index + 1}: {time}ms
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onPlayAgain}
                    className="px-6 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                >
                    Play Again
                </button>
                <button
                    onClick={onMainMenu}
                    className="px-6 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
                >
                    Main Menu
                </button>
            </div>
        </div>
    );
};

export default GameSummary; 