import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GameCard from "@/components/game/GameCard";
import LoadingScreen from "@/components/game/LoadingScreen";
import BattleParticleBackground from "@/components/game/BattleParticleBackground";

const CollectionPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const cardCollection = [
    { id: 1, name: "Shadow Wraith", type: "Creature", power: 5, health: 6, imageUrl: "/cards/shadow-wraith.png" },
    { id: 2, name: "Arcane Missile", type: "Spell", power: 3, health: 0, imageUrl: "/cards/arcane-missile.png" },
    { id: 3, name: "Crystal Shield", type: "Artifact", power: 0, health: 4, imageUrl: "/cards/crystal-shield.png" },
    { id: 4, name: "Mystic Dragon", type: "Creature", power: 7, health: 5, imageUrl: "/cards/mystic-dragon.png" },
    { id: 5, name: "Frost Giant", type: "Creature", power: 6, health: 8, imageUrl: "/cards/frost-gaint.png" },
    { id: 6, name: "Dark Ritual", type: "Creature", power: 4, health: 7, imageUrl: "/cards/dark-ritual.png" },
    { id: 7, name: "Demonic Minion", type: "Creature", power: 3, health: 3, imageUrl: "/cards/demonic-minion.png" },
    { id: 8, name: "Ancient Tome", type: "Artifact", power: 8, health: 0, imageUrl: "/cards/ancient-tome.png" },
    { id: 9, name: "Shadow Knight", type: "Champion", power: 8, health: 10, imageUrl: "/cards/shadow-knight.png" },
    { id: 10, name: "Arcane Bolt", type: "Spell", power: 7, health: 0, imageUrl: "/cards/arcane-bolt.png" },
    { id: 11, name: "Crystal Guardian", type: "Defender", power: 2, health: 12, imageUrl: "/cards/crystal-guardian.png" },
    { id: 12, name: "Celestial Phoenix", type: "Legendary", power: 12, health: 15, imageUrl: "/cards/celestial-phoenix.png" },
  ];
  
  const filteredCards = activeCategory === "all" 
    ? cardCollection 
    : cardCollection.filter(card => card.type.toLowerCase() === activeCategory);
  
  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen relative w-full bg-game-bg overflow-visible">
      {/* Magical battle particle background */}
      <BattleParticleBackground />
      
      {/* Dark overlay for better contrast */}
      <div className="fixed inset-0 bg-black/30 z-0"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gradient">Your Collection</h1>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["all", "creature", "spell", "artifact"].map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`capitalize ${
                activeCategory === category 
                  ? "bg-game-neon-purple hover:bg-game-neon-purple/80" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <div 
              key={card.id}
              className="animate-scale-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GameCard 
                card={card}
                isPlayable={false}
                onPlay={() => {}}
                flipped={false}
                className="mx-auto"
                inspectable={true}
              />
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredCards.length === 0 && (
          <div className="text-center glass-panel rounded-lg p-12 mt-8">
            <h3 className="text-xl font-bold text-white mb-4">No Cards Found</h3>
            <p className="text-white/70 mb-6">
              You don't have any cards in this category yet.
            </p>
            <Button
              onClick={() => setActiveCategory("all")}
              className="bg-game-neon-blue hover:bg-game-neon-blue/80"
            >
              View All Cards
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
