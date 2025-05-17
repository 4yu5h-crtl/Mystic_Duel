import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface CardProps {
  card: {
    id: number;
    name: string;
    type: string;
    power: number;
    health: number;
    imageUrl: string;
  };
  isPlayable: boolean;
  flipped: boolean;
  onPlay: () => void;
  className?: string;
  inspectable?: boolean;
}

const GameCard: React.FC<CardProps> = ({ 
  card, 
  isPlayable, 
  flipped, 
  onPlay, 
  className,
  inspectable = false
}) => {
  const [isFlipping, setIsFlipping] = useState(flipped);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleCardClick = () => {
    if (isPlayable) {
      onPlay();
    }
  };
  
  const handleMouseEnter = () => {
    setHovered(true);
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
  };
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          ref={cardRef}
          className={cn(
            "card-container w-48 h-64 cursor-pointer relative",
            className,
            {
              "animate-card-hover": isPlayable || inspectable,
              "neon-purple-glow": isPlayable && hovered,
              "pointer-events-none": !isPlayable && !inspectable,
              "opacity-70": !isPlayable && !inspectable,
            }
          )}
          onClick={handleCardClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`card-inner w-full h-full ${isFlipping ? 'animate-card-flip' : ''}`}>
            <div className="card-front rounded-lg overflow-hidden glass-card border border-game-dark-purple">
              {/* Card image */}
              <div className="h-44 bg-black/40 overflow-hidden">
                <img 
                  src={card.imageUrl} 
                  alt={card.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                />
              </div>
              {/* Card name and type */}
              <div className="p-2 border-t border-game-dark-purple">
                <h3 className="font-bold text-sm text-white truncate">{card.name}</h3>
                <p className="text-white/70 text-xs">{card.type}</p>
              </div>
              {/* Card stats */}
              <div className="absolute bottom-0 right-0 left-0 flex justify-between px-2 py-1 bg-black/30">
                {card.power > 0 && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-game-neon-pink text-white text-xs font-bold">
                    {card.power}
                  </div>
                )}
                {card.health > 0 && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-game-neon-blue text-white text-xs font-bold ml-auto">
                    {card.health}
                  </div>
                )}
              </div>
              {/* Play overlay */}
              {isPlayable && hovered && (
                <div className="absolute inset-0 bg-game-neon-purple/20 flex items-center justify-center">
                  <span className="bg-game-neon-purple/80 px-4 py-1 rounded text-white font-bold">
                    Play
                  </span>
                </div>
              )}
            </div>
            <div className="card-back rounded-lg overflow-hidden glass-card border border-game-dark-purple">
              <div className="h-full bg-gradient-to-br from-game-dark-purple/80 to-game-card flex items-center justify-center">
                <div className="text-5xl text-gradient transform rotate-y-180">M</div>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        align="center" 
        side="top" 
        avoidCollisions={false}
        className="w-56 p-3 bg-black/90 border border-game-neon-purple shadow-xl rounded-lg flex items-center gap-3"
      >
        <img 
          src={card.imageUrl} 
          alt={card.name}
          className="w-12 h-16 object-cover rounded-md border border-game-dark-purple"
        />
        <div className="flex-1">
          <h3 className="font-bold text-base text-white mb-1 truncate">{card.name}</h3>
          <p className="text-white/70 text-xs mb-2">{card.type}</p>
          <div className="flex gap-2">
            {card.power > 0 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-game-neon-pink text-white text-xs font-bold">
                {card.power}
              </div>
            )}
            {card.health > 0 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-game-neon-blue text-white text-xs font-bold">
                {card.health}
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GameCard;
