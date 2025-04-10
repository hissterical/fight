'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  lastFightDate: Date;
  onReset: () => void;
}

export default function Timer({ lastFightDate, onReset }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const difference = now.getTime() - lastFightDate.getTime();
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    // Calculate immediately and then set up interval
    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [lastFightDate]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-pink-600 drop-shadow-md">
        Time Since Last Fight
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <TimeUnit value={timeElapsed.days} label="Days" />
        <TimeUnit value={timeElapsed.hours} label="Hours" />
        <TimeUnit value={timeElapsed.minutes} label="Minutes" />
        <TimeUnit value={timeElapsed.seconds} label="Seconds" />
      </div>
      
      <button 
        onClick={onReset}
        className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full 
                 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Reset timer :/
      </button>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-md 
                  rounded-lg p-4 shadow-lg border border-pink-200">
      <span className="text-3xl md:text-4xl font-bold text-pink-500">{value}</span>
      <span className="text-sm text-pink-700">{label}</span>
    </div>
  );
}