import React from 'react';

const DifficultyMenu = ({ onSelectDifficulty }) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl mb-8">Select Difficulty</h1>
            <button
                onClick={() => onSelectDifficulty('easy')}
                className="w-40 h-16 font-bold text-2xl px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 transition"
            >
                Easy
            </button>
            <button
                onClick={() => onSelectDifficulty('medium')}
                className="w-40 h-16 font-bold text-2xl px-4 py-2 bg-yellow-500 rounded text-white hover:bg-yellow-600 transition"
            >
                Medium
            </button>
            <button
                onClick={() => onSelectDifficulty('hard')}
                className="w-40 h-16 font-bold text-2xl px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition"
            >
                Hard
            </button>
        </div>
    );
};

export default DifficultyMenu; 