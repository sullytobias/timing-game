import React from 'react';
import { motion } from 'framer-motion';
import { springTransition } from '../styles/transitions';
import { getSphereSize } from '../utils/gameUtils';

const GameTarget = ({ position, difficulty, onClick }) => {
    return (
        <motion.div
            className={`${getSphereSize(difficulty)} bg-red-500 rounded-full absolute cursor-pointer`}
            style={{
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springTransition}
            onClick={onClick}
            key={`${position.x}-${position.y}`}
        />
    );
};

export default GameTarget; 