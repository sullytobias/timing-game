import { useState } from "react";
import { motion } from "framer-motion";

const Game = () => {
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [playing, setPlaying] = useState(false);

  const generateRandomPosition = () => {
    return {
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
    };
  };

  const startGame = () => {
    setPlaying(true);
    setReactionTime(null);
    moveTarget();
  };

  const moveTarget = () => {
    const newPosition = generateRandomPosition();
    setTargetPosition(newPosition);
    setStartTime(Date.now());
  };

  const handleClick = () => {
    if (playing && startTime) {
      setReactionTime(Date.now() - startTime);
      moveTarget();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Reaction Time Game</h1>
      <button 
        onClick={startGame} 
        className="mb-4 px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
      >Start</button>
      <div className="relative w-80 h-80 border border-white">
        {playing && (
          <motion.div
            className="w-10 h-10 bg-red-500 rounded-full absolute cursor-pointer"
            style={{
              top: `${targetPosition.y}%`,
              left: `${targetPosition.x}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={handleClick}
          ></motion.div>
        )}
      </div>
      {reactionTime !== null && <p className="mt-4">Reaction Time: {reactionTime}ms</p>}
    </div>
  );
};

export default Game;
