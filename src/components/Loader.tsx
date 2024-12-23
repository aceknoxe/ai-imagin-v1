"use client";

import { useEffect, useState } from 'react';

export default function Loader() {
  const [seconds, setSeconds] = useState(0);
  const expectedTime = 15; // Total expected seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev < expectedTime ? prev + 1 : prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 px-4 text-center">
      <div className="relative inline-block">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-primary border-l-transparent animate-[spin_1.5s_linear_infinite]"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-accent border-l-transparent animate-[spin_2s_linear_infinite] absolute inset-0"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-secondary border-l-transparent animate-[spin_2.5s_linear_infinite] absolute inset-0"></div>
      </div>
      
      <div className="flex flex-col items-center gap-2 w-full max-w-[280px] sm:max-w-[320px]">
        <p className="text-text text-base sm:text-lg">Generating your masterpiece...</p>
        <div className="w-full h-2 bg-background/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary via-accent to-primary"
            style={{ 
              width: `${(seconds / expectedTime) * 100}%`,
              transition: 'width 1s linear'
            }}
          />
        </div>
        <p className="text-text/70 text-xs sm:text-sm">
          Expected time: {Math.max(expectedTime - seconds, 0)}s
        </p>
      </div>
    </div>
  );
} 