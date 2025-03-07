import { useState } from "react";
import { motion } from "framer-motion";

import DifficultyMenu from './components/DifficultyMenu';
import GameSummary from './components/GameSummary';
import GameTarget from './components/GameTarget';
import { useClickCounter } from './hooks/useGameTimer';
import { generateRandomPosition, calculateAverageReactionTime } from './utils/gameUtils';
import { springTransition } from './styles/transitions';

const Game = () => {
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const { clicksLeft, incrementClick, resetCounter } = useClickCounter(20, () => {
    setPlaying(false);
    setShowSummary(true);
  });

  const startGame = () => {
      setPlaying(true);
      setReactionTime(null);
      resetCounter();
      setReactionTimes([]);
      setShowSummary(false);
      moveTarget();
  };

  const moveTarget = () => {
      const newPosition = generateRandomPosition();
      setTargetPosition(newPosition);
      setStartTime(Date.now());
  };

  const handleClick = async () => {
      if (playing && startTime) {
          const newReactionTime = Date.now() - startTime;
          setReactionTime(newReactionTime);
          setReactionTimes(prev => [...prev, newReactionTime]);
          
          const newTotal = await incrementClick();
          if (newTotal < 20) {
              moveTarget();
          }
      }
  };

  const resetGame = () => {
      setPlaying(false);
      setReactionTime(null);
      setDifficulty(null);
      resetCounter();
      setReactionTimes([]);
      setShowSummary(false);
  };

  const restartGame = () => {
      setPlaying(false);
      setReactionTime(null);
      resetCounter();
      setReactionTimes([]);
      setShowSummary(false);
      startGame();
  };

  const averageReactionTime = calculateAverageReactionTime(reactionTimes);

  return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white overflow-hidden">
          {!difficulty && (
              <DifficultyMenu onSelectDifficulty={setDifficulty} />
          )}
          {difficulty && !playing && !showSummary && (
              <div className="flex flex-col gap-4 items-center">
                  <button
                      onClick={startGame}
                      className="w-40 h-20 font-bold text-4xl px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                  >
                      Play
                  </button>
                  <button
                      onClick={resetGame}
                      className="w-40 h-12 font-bold text-xl px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
                  >
                      Main Menu
                  </button>
              </div>
          )}
          {playing && (
              <>
                  <GameTarget
                      position={targetPosition}
                      difficulty={difficulty}
                      onClick={handleClick}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                      <button
                          onClick={restartGame}
                          className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                      >
                          Restart
                      </button>
                      <button
                          onClick={resetGame}
                          className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
                      >
                          Menu
                      </button>
                  </div>
                  <div className="absolute top-4 left-4 text-2xl font-bold">
                      Clicks Left: {clicksLeft}
                  </div>
              </>
          )}
          {showSummary && (
              <GameSummary
                  averageReactionTime={averageReactionTime}
                  reactionTimes={reactionTimes}
                  onPlayAgain={startGame}
                  onMainMenu={resetGame}
              />
          )}
          <motion.p 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: reactionTime ? 1 : 0, opacity: 1 }}
              transition={springTransition}  
              className="text-2xl mt-4 absolute bottom-10"
          >
              {reactionTime}ms
          </motion.p>
      </div>
  );
};

export default Game;
