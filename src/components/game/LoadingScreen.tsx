
import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Entering the realm");
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const texts = [
          "Entering the realm",
          "Summoning creatures",
          "Charging mana crystals",
          "Preparing spells",
          "Forging artifacts"
        ];
        const currentIndex = texts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % texts.length;
        return texts[nextIndex];
      });
    }, 1000);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);
  
  return (
    <div className="loading-container flex flex-col items-center">
      <div className="loading-crystal mb-8"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-pulse-glow">
        {loadingText}...
      </h2>
      <div className="w-64 md:w-96 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-game-neon-purple to-game-neon-blue rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
