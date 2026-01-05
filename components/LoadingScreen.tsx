
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">OLIPOP</h1>
      </div>
      <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-xs font-mono tracking-widest text-neutral-500 uppercase">
        Preloading Assets {progress}%
      </p>
    </div>
  );
};

export default LoadingScreen;
