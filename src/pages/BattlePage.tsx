import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GameCard from "@/components/game/GameCard";
import HealthBar from "@/components/game/HealthBar";
import TurnIndicator from "@/components/game/TurnIndicator";
import AttackAnimation from "@/components/game/AttackAnimation";
import GameOverScreen from "@/components/game/GameOverScreen";
import LoadingScreen from "@/components/game/LoadingScreen";
import BattleParticleBackground from "@/components/game/BattleParticleBackground";

const BattlePage = () => {
  const [loading, setLoading] = useState(true);
  const [playerHealth, setPlayerHealth] = useState(30);
  const [enemyHealth, setEnemyHealth] = useState(30);
  const [currentTurn, setCurrentTurn] = useState<"player" | "enemy">("player");
  const [attackAnimation, setAttackAnimation] = useState<{
    active: boolean;
    attacker: "player" | "enemy";
    type: "slash" | "magic";
  }>({ active: false, attacker: "player", type: "slash" });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const playerCards = [
    { id: 1, name: "Shadow Knight", type: "Creature", power: 5, health: 6, imageUrl: "/cards/shadow-wraith.png" },
    { id: 2, name: "Arcane Missile", type: "Spell", power: 3, health: 0, imageUrl: "/cards/arcane-missile.png" },
    { id: 3, name: "Crystal Guardian", type: "Defender", power: 2, health: 12, imageUrl: "/cards/crystal-guardian.png" },
    { id: 4, name: "Mystic Dragon", type: "Creature", power: 7, health: 5, imageUrl: "/cards/mystic-dragon.png" },
  ];
  
  const enemyCards = [
    { id: 5, name: "Frost Giant", type: "Defender", power: 6, health: 8, imageUrl: "/cards/frost-gaint.png" },
    { id: 6, name: "Dark Ritual", type: "Spell", power: 3, health: 0, imageUrl: "/cards/dark-ritual.png" },
    { id: 7, name: "Demonic Minion", type: "Creature", power: 5, health: 10, imageUrl: "/cards/demonic-minion.png" },
  ];
  
  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Check for win/lose condition
    if (playerHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("enemy");
    } else if (enemyHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("player");
    }
    
    // Enemy turn logic
    if (currentTurn === "enemy" && !gameOver) {
      const enemyTurnTimer = setTimeout(() => {
        // Simulate enemy attack
        executeEnemyTurn();
      }, 1500);
      
      return () => clearTimeout(enemyTurnTimer);
    }
  }, [currentTurn, playerHealth, enemyHealth, gameOver]);
  
  const executeEnemyTurn = () => {
    // Simulate enemy attack
    setAttackAnimation({
      active: true,
      attacker: "enemy",
      type: Math.random() > 0.5 ? "slash" : "magic"
    });
    
    // Resolve attack after animation
    setTimeout(() => {
      setAttackAnimation({ active: false, attacker: "enemy", type: "slash" });
      const damage = Math.floor(Math.random() * 5) + 3;
      setPlayerHealth((prev) => Math.max(0, prev - damage));
      setCurrentTurn("player");
    }, 800);
  };
  
  const handleCardPlay = (cardId: number) => {
    if (currentTurn !== "player" || gameOver) return;
    
    // Find the played card
    const playedCard = playerCards.find((card) => card.id === cardId);
    if (!playedCard) return;
    
    // Trigger attack animation
    setAttackAnimation({
      active: true,
      attacker: "player",
      type: playedCard.type === "Spell" ? "magic" : "slash",
    });
    
    // Resolve attack after animation
    setTimeout(() => {
      setAttackAnimation({ active: false, attacker: "player", type: "slash" });
      setEnemyHealth((prev) => Math.max(0, prev - playedCard.power));
      setCurrentTurn("enemy");
    }, 800);
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (gameOver) {
    return <GameOverScreen winner={winner === "player"} onRestart={() => window.location.reload()} />;
  }
  
  return (
    <div className="min-h-screen relative w-full bg-game-bg overflow-hidden">
      {/* Magical battle particle background */}
      <BattleParticleBackground />
      
      {/* Dark overlay for better contrast */}
      <div className="fixed inset-0 bg-black/40 z-0"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Button>
          </Link>
          <TurnIndicator currentTurn={currentTurn} />
        </div>
        
        {/* Battle Field */}
        <div className="glass-panel rounded-lg p-6 mb-8 relative">
          {/* Attack animation overlay */}
          {attackAnimation.active && (
            <AttackAnimation 
              type={attackAnimation.type} 
              attacker={attackAnimation.attacker} 
            />
          )}
          
          {/* Enemy side */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Enemy</h2>
              <HealthBar current={enemyHealth} max={30} />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {enemyCards.map((card) => (
                <div key={card.id} className="w-full sm:w-auto">
                  <GameCard 
                    card={card} 
                    isPlayable={false}
                    onPlay={() => {}}
                    flipped={false}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Divider */}
          <div className="relative py-4 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-game-card text-white/60 text-sm rounded-full">
                Battlefield
              </span>
            </div>
          </div>
          
          {/* Player side */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">You</h2>
              <HealthBar current={playerHealth} max={30} />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {playerCards.map((card) => (
                <div key={card.id} className="w-full sm:w-auto">
                  <GameCard 
                    card={card}
                    isPlayable={currentTurn === "player"}
                    onPlay={() => handleCardPlay(card.id)}
                    flipped={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            disabled={currentTurn !== "player" || gameOver}
            onClick={() => setCurrentTurn("enemy")}
            className="bg-game-neon-purple hover:bg-game-neon-purple/80 text-white hover-scale"
          >
            End Turn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
