'use client';

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import FloralBackground from '@/components/FloralBackground';

export default function Home() {
  const [lastFightDate, setLastFightDate] = useState<Date>(new Date());

  // Load the last fight date from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem('lastFightDate');
    if (savedDate) {
      setLastFightDate(new Date(savedDate));
    }
  }, []);

  // Reset the timer to current date/time
  const handleReset = () => {
    const now = new Date();
    setLastFightDate(now);
    localStorage.setItem('lastFightDate', now.toISOString());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floral Background */}
      <FloralBackground />
      
      {/* Main Content */}
      <main className="glass p-8 md:p-12 max-w-md w-full mx-auto">
        <Timer lastFightDate={lastFightDate} onReset={handleReset} />
      </main>
      
      <footer className="mt-8 text-center text-sm text-pink-700 opacity-80">
        <p>Track your peaceful days with love and harmony 💖</p>
      </footer>
    </div>
  );
}
