export const generateRandomPosition = () => {
    const topBoundary = 15;
    const bottomBoundary = 85; 
    const sideBoundary = 10;
    
    const safeWidth = 100 - (sideBoundary * 2);
    const safeHeight = bottomBoundary - topBoundary;
    
    return {
        x: sideBoundary + (Math.random() * safeWidth),
        y: topBoundary + (Math.random() * safeHeight),
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