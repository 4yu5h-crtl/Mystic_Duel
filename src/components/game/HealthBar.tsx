
import React from "react";

interface HealthBarProps {
  current: number;
  max: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  // Determine color based on health percentage
  const getHealthColor = () => {
    if (percentage > 60) return "from-green-500 to-green-400";
    if (percentage > 30) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };
  
  return (
    <div className="relative w-36 h-6">
      <div className="absolute inset-0 bg-black/40 rounded-full overflow-hidden border border-white/20">
        <div 
          className={`h-full bg-gradient-to-r ${getHealthColor()} transition-all duration-500 rounded-full`}
          style={{ 
            width: `${percentage}%`,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3) inset"
          }}
        ></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
        {current}/{max}
      </div>
    </div>
  );
};

export default HealthBar;
