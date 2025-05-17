
import React from "react";

interface AttackAnimationProps {
  type: "slash" | "magic";
  attacker: "player" | "enemy";
}

const AttackAnimation: React.FC<AttackAnimationProps> = ({ type, attacker }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {type === "slash" ? (
        <div className={`absolute ${attacker === "player" ? "bottom-1/4" : "top-1/4"} left-1/2 transform -translate-x-1/2`}>
          <div className="w-32 h-32 md:w-48 md:h-48 animate-attack-slash">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10,50 L90,50" 
                stroke={attacker === "player" ? "#9b87f5" : "#D946EF"} 
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                className="animate-attack-slash"
              />
              <path 
                d="M30,20 L90,50 L30,80" 
                stroke={attacker === "player" ? "#9b87f5" : "#D946EF"} 
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className={`absolute ${attacker === "player" ? "bottom-1/3" : "top-1/3"} left-1/2 transform -translate-x-1/2`}>
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-game-neon-blue to-game-neon-purple rounded-full opacity-70 animate-pulse-glow"></div>
            <div className="absolute inset-2 bg-gradient-to-tr from-game-neon-pink to-game-neon-blue rounded-full opacity-60 animate-spin-slow"></div>
            <div className="absolute inset-4 bg-white rounded-full opacity-50 animate-pulse-glow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttackAnimation;
