'use client';

import { useState, useEffect } from 'react';

interface PreloaderProps {
  onFinished: () => void;
}

export function Preloader({ onFinished }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          onFinished();
          setIsExiting(true);
          setTimeout(() => {
            setIsRendered(false);
            document.body.style.overflow = '';
          }, 800);
          return 100;
        }
        return prevCount + 1;
      });
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onFinished]);


  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background ${
        isExiting ? 'preloader-exit-active' : ''
      }`}
    >
       <div className="relative">
            <h1 className="text-9xl font-bold font-headline text-foreground/20 tabular-nums select-none">
                {count}%
            </h1>
            <h1 
                className="absolute inset-0 text-9xl font-bold font-headline text-primary tabular-nums overflow-hidden select-none"
                style={{ 
                    clipPath: `inset(${100 - count}% 0 0 0)`
                }}
            >
                {count}%
            </h1>
        </div>
    </div>
  );
}
