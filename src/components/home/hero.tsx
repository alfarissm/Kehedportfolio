'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { useState, useCallback, useRef } from "react";
import type { Section } from "@/app/page";
import { motion } from "framer-motion";

interface HeroProps {
  onSectionChange: (section: Section) => void;
  isLoaded: boolean;
}

export function Hero({ onSectionChange, isLoaded }: HeroProps) {
  const [showButtons, setShowButtons] = useState(false);
  const animationCompletedHandled = useRef(false);

  const descriptionText = "Hi, I'm Alfaris, a frontend developer passionate about React, building beautiful, performant, and accessible user interfaces.";

  const handleAnimationComplete = useCallback(() => {
    if (!animationCompletedHandled.current) {
        animationCompletedHandled.current = true;
        setShowButtons(true);
    }
  }, []);

  return (
    <section className="w-full h-screen flex items-center relative overflow-hidden">
        {/* Gooey background effect */}
        <div className="goo-container">
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div
            className="goo-circle"
            style={{
              width: '25vmax', height: '25vmax', top: '10%', left: '10%',
              '--x-1': 20, '--y-1': -15, '--s-1': 1.1,
              '--x-2': -10, '--y-2': 25, '--s-2': 0.8,
              '--x-3': 15, '--y-3': 30, '--s-3': 1.2,
              animationDelay: '0s'
            } as React.CSSProperties}
          />
          <div
            className="goo-circle"
            style={{
              width: '30vmax', height: '30vmax', top: '60%', left: '50%',
              '--x-1': -25, '--y-1': -20, '--s-1': 0.7,
              '--x-2': 30, '--y-2': 10, '--s-2': 1.3,
              '--x-3': -20, '--y-3': -15, '--s-3': 1,
              animationDelay: '-2s'
            } as React.CSSProperties}
          />
            <div
            className="goo-circle"
            style={{
              width: '20vmax', height: '20vmax', top: '20%', left: '70%',
              '--x-1': -15, '--y-1': 20, '--s-1': 1.2,
              '--x-2': 10, '--y-2': -25, '--s-2': 0.9,
              '--x-3': -25, '--y-3': 10, '--s-3': 1.1,
              animationDelay: '-4s'
            } as React.CSSProperties}
          />
          <div
            className="goo-circle"
            style={{
              width: '35vmax', height: '35vmax', top: '40%', left: '0%',
              '--x-1': 20, '--y-1': 20, '--s-1': 1,
              '--x-2': -10, '--y-2': -25, '--s-2': 1.2,
              '--x-3': 15, '--y-3': -10, '--s-3': 0.8,
              animationDelay: '-6s'
            } as React.CSSProperties}
          />
        </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <VelocityScroll
            text="Code Meets"
            default_velocity={5}
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
          />
          <VelocityScroll
            text="Creativity"
            default_velocity={-5}
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
          />
          <div className="mt-6 max-w-3xl mx-auto min-h-[120px] flex flex-col items-center">
            <DecryptedText 
              text={descriptionText}
              onAnimationComplete={handleAnimationComplete}
              isLoaded={isLoaded}
            />
            {showButtons && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  className="group border border-primary/20 bg-background/50 shadow-lg backdrop-blur-lg hover:bg-background/75 text-foreground"
                  onClick={() => onSectionChange('projects')}
                >
                    View My Work <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => onSectionChange('contact')}
                  className="border border-primary/20 bg-background/50 shadow-lg backdrop-blur-lg hover:bg-background/75 text-foreground"
                >
                  Connect
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
