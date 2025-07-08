
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScatteredText } from '../ui/scattered-text';
import Image from 'next/image';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const certifications = [
  {
    title: 'Front-End Developer',
    issuer: 'Meta',
    year: '2025',
    image: '/meta/frontend.jpg',
    dataAiHint: 'certificate document',
  },
  {
    title: 'React Native',
    issuer: 'Meta',
    year: '2025',
    image: '/meta/reactnative.jpg',
    dataAiHint: 'certificate document',
  },
  {
    title: 'Devops and Sotware Engineering',
    issuer: 'IBM',
    year: '2025',
    image: '/ibm/devops.jpg',
    dataAiHint: 'certificate document',
  },
];

const cardVariants = {
  hover: ({ i, activeIndex, lastActiveIndex, isMobile }: { i: number; activeIndex: number | null, lastActiveIndex: number | null, isMobile: boolean }) => {
    const isActive = activeIndex === i;
    const isClicked = activeIndex !== null;

    const xOffsetMultiplier = isMobile ? 60 : 120;
    const fanRotateMultiplier = isMobile ? 5 : 10;
    const xOffset = (i - (certifications.length - 1) / 2) * xOffsetMultiplier;
    const fanRotate = (i - (certifications.length - 1) / 2) * fanRotateMultiplier;
    
    let zIndex;
    if (isActive) {
      zIndex = 99;
    } else if (activeIndex !== null) {
      // Other cards when one is active
      zIndex = certifications.length - Math.abs(i - (certifications.length - 1) / 2);
    } else {
      // When no card is active (fanned out)
      if (lastActiveIndex === null) {
        zIndex = certifications.length - Math.abs(i - (certifications.length - 1) / 2);
      } else {
        const reordered = certifications.map((_, idx) => idx).filter(idx => idx !== lastActiveIndex);
        reordered.push(lastActiveIndex);
        zIndex = reordered.indexOf(i);
      }
    }
    
    if (isActive) {
      // The selected card comes to the front
      return {
        x: 0,
        y: -50,
        scale: 1.2,
        rotate: 0,
        zIndex: zIndex,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      };
    }

    // This handles both hovering and the non-active cards when one is clicked
    return {
      x: xOffset,
      y: isClicked ? 10 : -30,
      scale: isClicked ? 0.9 : 1.1,
      rotate: fanRotate,
      zIndex: zIndex,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    };
  },
  rest: ({ i, initialRotate, lastActiveIndex }: { i: number; initialRotate: number; lastActiveIndex: number | null; }) => {
    let zIndex;
    if (lastActiveIndex === null) {
      zIndex = i;
    } else {
      const reordered = certifications.map((_, idx) => idx).filter(idx => idx !== lastActiveIndex);
      reordered.push(lastActiveIndex);
      zIndex = reordered.indexOf(i);
    }
    
    return {
      x: 0,
      y: 0,
      rotate: initialRotate,
      scale: 1,
      zIndex: zIndex,
      transition: {
        duration: 0.7,
        ease: 'backOut',
      },
    }
  },
};

const InteractiveCertificationCards = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    const initialRotations = useMemo(() => 
        certifications.map(() => (Math.random() - 0.5) * 5), 
    []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveIndex(null);
            }
        };

        const handleScroll = () => {
            if (activeIndex !== null) {
                setActiveIndex(null);
            }
        };

        if (activeIndex !== null) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [activeIndex]);

    const getAnimationState = () => {
      if (isMobile) return activeIndex !== null ? 'hover' : 'rest';
      return activeIndex !== null || isHovered ? 'hover' : 'rest';
    };

    const handleClick = (i: number) => {
        setActiveIndex(i);
        setLastActiveIndex(i);
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative w-[300px] h-[200px] sm:w-[350px] sm:h-[225px] cursor-pointer"
            onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
            onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
            animate={getAnimationState()}
            initial="rest"
        >
            <div className="absolute inset-[-20px] z-0 opacity-40 dark:opacity-30">
                <div
                    className="absolute -top-1/2 -left-1/2 w-72 h-72 bg-primary rounded-full blur-3xl animate-aurora-1"
                    style={{ animationDelay: '0s' }}
                />
                <div
                    className="absolute -bottom-1/2 -right-1/2 w-72 h-72 bg-accent rounded-full blur-3xl animate-aurora-2"
                    style={{ animationDelay: '2s' }}
                />
            </div>

            {certifications.map((cert, i) => (
            <motion.div
                key={cert.title}
                custom={{ i, activeIndex, lastActiveIndex, initialRotate: initialRotations[i], isMobile }}
                variants={cardVariants}
                onClick={() => handleClick(i)}
                className="absolute w-full h-full"
                style={{
                transformOrigin: 'bottom center',
                }}
            >
                <Card className="w-full h-full overflow-hidden shadow-2xl border-primary/20 group relative">
                  <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={cert.dataAiHint}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
                <CardContent className="relative p-4 sm:p-6 flex flex-col justify-end h-full">
                    <div>
                    <h3 className="text-md sm:text-lg font-bold text-foreground">{cert.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-2 text-right">{cert.year}</p>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            ))}
        </motion.div>
    );
};

export function Certifications() {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-24">
      <div className="text-center mb-12 px-4">
        <ScatteredText
          as="h2"
          text="My Certifications"
          className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl font-headline"
        />
        <ScatteredText
          as="p"
          text="A collection of my professional achievements. Hover over the stack to explore."
          className="mt-4 text-muted-foreground md:text-xl"
        />
      </div>
      <InteractiveCertificationCards />
    </div>
  );
}
