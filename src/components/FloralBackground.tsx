'use client';

import { useEffect, useState } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  animationDuration: number;
}

export default function FloralBackground() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  
  useEffect(() => {
    // Generate random flowers for the background
    const flowerColors = [
      '#FFB6C1', // Light pink
      '#FFC0CB', // Pink
      '#FF69B4', // Hot pink
      '#FADADD', // Pale pink
      '#FFEBCD', // Blanched almond
      '#FFFACD', // Lemon chiffon
      '#E6E6FA', // Lavender
      '#D8BFD8', // Thistle
    ];
    
    const newFlowers: Flower[] = [];
    const flowerCount = Math.max(10, Math.floor(window.innerWidth / 100));
    
    for (let i = 0; i < flowerCount; i++) {
      newFlowers.push({
        id: i,
        x: Math.random() * 100, // percentage across screen
        y: Math.random() * 100, // percentage down screen
        size: 30 + Math.random() * 50, // size between 30-80px
        rotation: Math.random() * 360, // random rotation
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        animationDuration: 15 + Math.random() * 20, // between 15-35s
      });
    }
    
    setFlowers(newFlowers);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-float"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            transform: `rotate(${flower.rotation}deg)`,
            animationDuration: `${flower.animationDuration}s`,
            animationDelay: `${flower.id * 0.5}s`,
          }}
        >
          <svg
            width={flower.size}
            height={flower.size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple flower shape */}
            <circle cx="50" cy="50" r="15" fill="#FFEB3B" /> {/* Center */}
            <path
              d="M50 10 C60 25, 75 25, 50 50 C25 25, 40 25, 50 10"
              fill={flower.color}
              opacity="0.8"
            />
            <path
              d="M50 10 C40 25, 25 25, 50 50 C75 25, 60 25, 50 10"
              fill={flower.color}
              opacity="0.8"
              transform="rotate(90 50 50)"
            />
            <path
              d="M50 10 C40 25, 25 25, 50 50 C75 25, 60 25, 50 10"
              fill={flower.color}
              opacity="0.8"
              transform="rotate(180 50 50)"
            />
            <path
              d="M50 10 C40 25, 25 25, 50 50 C75 25, 60 25, 50 10"
              fill={flower.color}
              opacity="0.8"
              transform="rotate(270 50 50)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}