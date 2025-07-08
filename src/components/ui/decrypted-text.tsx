
"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
  text: string;
  onAnimationComplete?: () => void;
  className?: string;
  isLoaded?: boolean;
}

export function DecryptedText({
  text,
  onAnimationComplete,
  className,
  isLoaded = false,
}: DecryptedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const animationCompleted = useRef(false);

  const handleAnimationComplete = useCallback(() => {
    if (!animationCompleted.current) {
      animationCompleted.current = true;
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  }, [onAnimationComplete]);


  useEffect(() => {
    if (isLoaded && isInView) {
        const timer = setTimeout(() => {
            handleAnimationComplete();
        }, 300); 
        return () => clearTimeout(timer);
    }
  }, [isLoaded, isInView, handleAnimationComplete]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isLoaded && isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={cn("text-lg md:text-xl text-foreground", className)}
    >
      {text}
    </motion.p>
  );
}
