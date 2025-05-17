import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParallaxBackground from "@/components/game/ParallaxBackground";
import FloatingCard from "@/components/game/FloatingCard";
import LoadingScreen from "@/components/game/LoadingScreen";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    // Handle scroll effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-[200vh] relative overflow-hidden">
      <ParallaxBackground />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-16"
        style={{
          backgroundImage: "url('/vid.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient mb-6 animate-fade-in opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.2s" }}>
            MYSTIC Duel
          </h1>
          <p className="text-xl md:text-2xl text-center text-white/80 max-w-2xl mb-10 animate-fade-in opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.4s" }}>
            Enter the realm of arcane battles and strategic mastery
          </p>
          {/* Floating cards with parallax effect */}
          <div className="w-full flex justify-center gap-12 mt-8 mb-8 pointer-events-none">
            <FloatingCard 
              className="parallax-medium"
              cardName="Shadow Wraith"
              cardType="Creature"
              power={7}
              health={4}
              style={{ transform: `translateY(${scrollY * -0.2}px)` }}
            />
            <FloatingCard 
              className="parallax-slow"
              cardName="Arcane Bolt"
              cardType="Spell"
              power={5}
              health={0}
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            />
            <FloatingCard 
              className="parallax-fast"
              cardName="Crystal Guardian"
              cardType="Defender"
              power={2}
              health={8}
              style={{ transform: `translateY(${scrollY * -0.3}px)` }}
            />
          </div>
        </div>
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            <Link to="/battle">
              <Button className="bg-game-neon-purple hover:bg-game-neon-purple/80 text-white px-8 py-6 rounded-lg text-xl flex items-center gap-2 hover-scale neon-purple-glow">
                Begin Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
      </section>
      
      {/* Features Section */}
      <section 
        className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-16 glass-panel"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
          <span className="text-gradient">Epic Card Battles Await</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          <FeatureCard 
            title="Strategic Gameplay" 
            description="Master the art of card combinations and tactical thinking"
            delay={0.1}
          />
          <FeatureCard 
            title="Stunning Visuals" 
            description="Immerse yourself in beautifully crafted fantasy artwork and animations"
            delay={0.3}
          />
          <FeatureCard 
            title="Mystical Powers" 
            description="Unleash devastating spells and summon powerful creatures"
            delay={0.5}
          />
          <FeatureCard 
            title="Build Your Deck" 
            description="Collect rare cards and customize your deck for victory"
            delay={0.7}
          />
          <FeatureCard 
            title="Rise in Rank" 
            description="Challenge opponents and climb the leaderboard"
            delay={0.9}
          />
          <FeatureCard 
            title="Epic Adventures" 
            description="Embark on quests to unlock legendary cards and abilities"
            delay={1.1}
          />
        </div>
        
        <div className="mt-16 animate-fade-in opacity-0" style={{ animationDelay: "1.3s" }}>
          <Link to="/collection">
            <Button className="bg-game-neon-blue hover:bg-game-neon-blue/80 text-white px-8 py-6 rounded-lg text-xl flex items-center gap-2 hover-scale neon-blue-glow">
              View Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, delay = 0 }: { title: string, description: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`glass-card p-6 rounded-lg hover-scale hover-glow transition-all duration-300 
        ${isVisible ? 'animate-scale-up opacity-0' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

export default Index;
