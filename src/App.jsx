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
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white overflow-hidden">
          <h1 className="text-3xl mb-4 absolute top-5">Reaction Time Game</h1>
          {!playing && (
              <button
                  onClick={startGame}
                  className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition absolute top-20"
              >
                  Start
              </button>
          )}
          {playing && (
              <motion.div
                  className="w-10 h-10 bg-red-500 rounded-full absolute cursor-pointer"
                  style={{
                      top: `${targetPosition.y}vh`,
                      left: `${targetPosition.x}vw`,
                      transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  onClick={handleClick}
                  key={`${targetPosition.x}-${targetPosition.y}`}
              ></motion.div>
          )}
          {reactionTime !== null && (
              <p className="mt-4 absolute bottom-10">
                  Reaction Time: {reactionTime}ms
              </p>
          )}
      </div>
  );
};

export default Game;
