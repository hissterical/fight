'use client';

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import FloralBackground from '@/components/FloralBackground';

export default function Home() {
  const [lastFightDate, setLastFightDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Load the last fight date from API on component mount
  useEffect(() => {
    fetch('/api/lastFightDate')
      .then(res => res.json())
      .then(data => {
        setLastFightDate(new Date(data.lastFightDate));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch last fight date:', error);
        setIsLoading(false);
      });
  }, []);

  // Reset the timer to current date/time
  const handleReset = async () => {
    const now = new Date();
    try {
      await fetch('/api/lastFightDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: now.toISOString() }),
      });
      setLastFightDate(now);
    } catch (error) {
      console.error('Failed to update last fight date:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floral Background */}
      <FloralBackground />
      
      {/* Main Content */}
      <main className="glass p-8 md:p-12 max-w-md w-full mx-auto">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Timer lastFightDate={lastFightDate} onReset={handleReset} />
        )}
      </main>
      
      <footer className="mt-8 text-center text-sm text-pink-700 opacity-80">
        <p>Days without the fun 💖</p>
      </footer>
    </div>
  );
}
