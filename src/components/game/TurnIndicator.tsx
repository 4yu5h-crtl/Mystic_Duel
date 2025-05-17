
import React from "react";

interface TurnIndicatorProps {
  currentTurn: "player" | "enemy";
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ currentTurn }) => {
  return (
    <div className="glass-panel py-2 px-4 rounded-lg flex items-center space-x-2">
      <div className="text-white font-bold">Turn:</div>
      <div className={`text-white font-bold animate-pulse-glow ${
        currentTurn === "player" ? "text-game-neon-purple" : "text-game-neon-pink"
      }`}>
        {currentTurn === "player" ? "Your Turn" : "Enemy Turn"}
      </div>
    </div>
  );
};

export default TurnIndicator;
