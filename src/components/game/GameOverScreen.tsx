import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface GameOverScreenProps {
  winner: boolean; // true if player won, false if enemy won
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner, onRestart }) => {
  useEffect(() => {
    // Add confetti or animation effects
    if (winner) {
      createConfetti();
    }
  }, [winner]);
  
  const createConfetti = () => {
    // Create confetti elements programmatically
    const container = document.createElement("div");
    container.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute rounded-sm";
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.background = getRandomColor();
      confetti.style.top = "-20px";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      
      // Animation
      confetti.animate(
        [
          { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
          { 
            transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, 
            opacity: 0 
          }
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.4, 0, 1, 1)"
        }
      );
      
      container.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        if (container.contains(confetti)) {
          container.removeChild(confetti);
        }
        
        // Clean up the container when all confetti are removed
        if (container.childNodes.length === 0) {
          document.body.removeChild(container);
        }
      }, 5000);
    }
  };
  
  const getRandomColor = () => {
    const colors = [
      "#9b87f5", // Purple
      "#1EAEDB", // Blue
      "#D946EF", // Pink
      "#FFD700", // Gold
      "#ffffff", // White
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-game-bg relative overflow-hidden 
      ${winner ? "animate-screen-shake" : ""}`}>
      <div className="parallax-bg" style={{ 
        backgroundImage: `url('https://source.unsplash.com/featured/1920x1080?${winner ? 'victory,celebration' : 'dark,defeat,ruins'}')`,
        opacity: 0.15
      }}></div>
      
      <div className="glass-panel p-8 md:p-12 rounded-lg w-11/12 max-w-lg text-center relative z-10 animate-scale-up">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 
          ${winner ? 'text-game-gold animate-victory-bounce' : 'text-game-neon-pink'}`}>
          {winner ? 'Victory!' : 'Defeat'}
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 mb-8">
          {winner 
            ? 'You have defeated your opponent. Glory awaits!' 
            : 'Your journey ends here... for now.'}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            onClick={onRestart}
            className={`${winner 
              ? 'bg-game-gold hover:bg-game-gold/80' 
              : 'bg-game-neon-purple hover:bg-game-neon-purple/80'} 
              text-white px-6 py-2 hover-scale`}
          >
            Battle Again
          </Button>
          
          <Link to="/">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Main Menu
            </Button>
          </Link>
        </div>
        
        {/* Animated background elements */}
        {!winner && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-game-neon-pink rounded-full blur-md animate-pulse-glow"
                style={{
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.4 + 0.1,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverScreen;
