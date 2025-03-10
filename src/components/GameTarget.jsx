import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { springTransition } from '../styles/transitions';
import { getSphereSize } from '../utils/gameUtils';

const GameTarget = ({ position, difficulty, onClick }) => {
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        const handleResize = () => {
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const topBoundary = (15 / 100) * viewportHeight; 
            const bottomBoundary = (85 / 100) * viewportHeight; 
            const sideBoundary = (10 / 100) * viewportWidth; 

            const x = (position.x / 100) * viewportWidth;
            const y = (position.y / 100) * viewportHeight;

            const size = difficulty === 'easy' ? 64 : 
                        difficulty === 'medium' ? 40 : 24;

            const maxX = viewportWidth - sideBoundary - size;
            const minX = sideBoundary + size;
            const maxY = bottomBoundary - size;
            const minY = topBoundary + size;

            // Adjust position to stay within bounds
            const adjustedX = Math.min(Math.max(x, minX), maxX);
            const adjustedY = Math.min(Math.max(y, minY), maxY);

            setAdjustedPosition({ x: adjustedX, y: adjustedY });
        };

        // Initial adjustment
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [position, difficulty]);

    return (
        <motion.div
            className={`${getSphereSize(difficulty)} bg-red-500 rounded-full fixed cursor-pointer`}
            style={{
                top: `${adjustedPosition.y}px`,
                left: `${adjustedPosition.x}px`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springTransition}
            onClick={onClick}
            key={`${adjustedPosition.x}-${adjustedPosition.y}`}
        />
    );
};

export default GameTarget; 