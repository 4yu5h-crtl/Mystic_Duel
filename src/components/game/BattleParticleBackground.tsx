import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  opacitySpeed: number;
  type: 'normal' | 'spark' | 'energy';
}

const BattleParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle settings
    const particleCount = 150; // More particles for battle scene
    const particles: Particle[] = [];
    
    // Colors for magical battle particles
    const colors = [
      'rgba(255, 0, 0, 0.7)',    // Red
      'rgba(255, 165, 0, 0.7)',  // Orange
      'rgba(255, 255, 0, 0.7)',  // Yellow
      'rgba(0, 255, 255, 0.7)',  // Cyan
      'rgba(138, 43, 226, 0.7)', // Purple
      'rgba(255, 105, 180, 0.7)', // Hot Pink
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const type = Math.random() > 0.7 
        ? (Math.random() > 0.5 ? 'spark' : 'energy') 
        : 'normal';
        
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'normal' 
          ? Math.random() * 3 + 1 
          : type === 'spark' 
            ? Math.random() * 2 + 0.5 
            : Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        opacitySpeed: Math.random() * 0.02 + 0.01,
        type
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update opacity
        particle.opacity += particle.opacitySpeed;
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.opacitySpeed = -particle.opacitySpeed;
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle based on type
        if (particle.type === 'normal') {
          // Draw normal particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace('0.7', particle.opacity.toString());
          ctx.fill();
          
          // Draw glow effect
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace('0.7', (particle.opacity * 0.3).toString());
          ctx.fill();
        } else if (particle.type === 'spark') {
          // Draw spark particle
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(
            particle.x + particle.speedX * 5, 
            particle.y + particle.speedY * 5
          );
          ctx.strokeStyle = particle.color.replace('0.7', particle.opacity.toString());
          ctx.lineWidth = particle.size;
          ctx.stroke();
          
          // Draw glow effect
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(
            particle.x + particle.speedX * 5, 
            particle.y + particle.speedY * 5
          );
          ctx.strokeStyle = particle.color.replace('0.7', (particle.opacity * 0.3).toString());
          ctx.lineWidth = particle.size * 2;
          ctx.stroke();
        } else if (particle.type === 'energy') {
          // Draw energy particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace('0.7', particle.opacity.toString());
          ctx.fill();
          
          // Draw energy rings
          for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * (1 + i * 0.5), 0, Math.PI * 2);
            ctx.strokeStyle = particle.color.replace('0.7', (particle.opacity * (1 - i * 0.2)).toString());
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      
      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      // Add occasional energy bursts
      if (Math.random() < 0.02) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        const burstColor = colors[Math.floor(Math.random() * colors.length)];
        const burstSize = Math.random() * 30 + 20;
        
        // Draw energy burst
        const gradient = ctx.createRadialGradient(
          burstX, burstY, 0,
          burstX, burstY, burstSize
        );
        gradient.addColorStop(0, burstColor.replace('0.7', '0.8'));
        gradient.addColorStop(1, burstColor.replace('0.7', '0'));
        
        ctx.beginPath();
        ctx.arc(burstX, burstY, burstSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add particles from burst
        for (let i = 0; i < 10; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 2;
          
          particles.push({
            x: burstX,
            y: burstY,
            size: Math.random() * 2 + 1,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            color: burstColor,
            opacity: 0.8,
            opacitySpeed: -0.01,
            type: 'spark'
          });
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default BattleParticleBackground; 