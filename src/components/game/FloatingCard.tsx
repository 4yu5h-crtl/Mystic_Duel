import React from "react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  className?: string;
  cardName: string;
  cardType: string;
  power: number;
  health: number;
  style?: React.CSSProperties;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  className, 
  cardName, 
  cardType, 
  power, 
  health,
  style
}) => {
  return (
    <div 
      className={cn(
        "w-36 h-48 glass-card border border-game-dark-purple overflow-hidden rounded-lg animate-float neon-purple-glow relative",
        className
      )}
      style={style}
    >
      <div className="h-32 bg-black/40 overflow-hidden">
        <img 
          src={`/cards/${cardName.toLowerCase().replace(/\s/g, '-')}.png`}
          alt={cardName}
          className="w-full h-full object-cover object-top"
        />
      </div>
      
      <div className="p-2 border-t border-game-dark-purple bg-black/60">
        <h3 className="font-bold text-xs text-white truncate">{cardName}</h3>
        <p className="text-white/70 text-xs truncate">{cardType}</p>
      </div>
      
      <div className="absolute bottom-0 right-0 left-0 flex justify-between px-2 py-1 bg-black/60">
        {power > 0 && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-game-neon-pink text-white text-xs font-bold">
            {power}
          </div>
        )}
        
        {health > 0 && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-game-neon-blue text-white text-xs font-bold ml-auto">
            {health}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCard;
