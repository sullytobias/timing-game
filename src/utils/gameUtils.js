export const generateRandomPosition = () => {
    const margin = 10; 
    
    const safeWidth = 100 - (margin * 2);
    const safeHeight = 100 - (margin * 2);
    
    return {
        x: margin + (Math.random() * safeWidth),
        y: margin + (Math.random() * safeHeight),
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