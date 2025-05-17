
import React, { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-game-bg"></div>
      
      {/* Parallax layers */}
      <div 
        className="absolute inset-0 bg-[url('https://source.unsplash.com/featured/1920x1080?dark,mountains,fog')] bg-cover bg-center opacity-20"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      ></div>
      
      <div 
        className="absolute inset-0 bg-[url('https://source.unsplash.com/featured/1920x1080?fog,mist')] bg-cover bg-center opacity-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      
      {/* Radial gradients for glow effects */}
      <div 
        className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-game-neon-purple/5 blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      ></div>
      
      <div 
        className="absolute top-[60%] right-[15%] w-64 h-64 rounded-full bg-game-neon-blue/5 blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      ></div>
      
      {/* Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
            boxShadow: `0 0 ${Math.random() * 4 + 2}px ${Math.random() > 0.5 ? "#9b87f5" : "#1EAEDB"}`,
            transform: `translateY(${scrollY * (Math.random() * -0.3)}px)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ParallaxBackground;
