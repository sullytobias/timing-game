export const generateRandomPosition = () => {
    return {
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
    };
};

export const getSphereSize = (difficulty) => {
    switch(difficulty) {
        case 'easy': return 'w-16 h-16';
        case 'medium': return 'w-10 h-10';
        case 'hard': return 'w-6 h-6';
        default: return 'w-10 h-10';
    }
};

export const calculateAverageReactionTime = (reactionTimes) => {
    return reactionTimes.length > 0
        ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
        : 0;
}; 