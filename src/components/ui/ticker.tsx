
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// TickerItem handles the hover effect for a single word.
const TickerItem = ({ text, className }: { text: string; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants for the "original" text characters (animating upwards)
  const topVariants = {
    initial: { y: 0 },
    hovered: { y: "-100%" },
  };

  // Animation variants for the "hover" text characters (animating in from below)
  const bottomVariants = {
    initial: { y: "100%" },
    hovered: { y: 0 },
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hovered={isHovered}
      className={cn(
        "relative flex-shrink-0 whitespace-nowrap overflow-hidden cursor-pointer",
        "text-xl sm:text-2xl md:text-3xl",
        className
      )}
      aria-label={text}
    >
      {/* Container for the original text */}
      <motion.div className="flex" aria-hidden="true">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={topVariants}
            animate={isHovered ? "hovered" : "initial"}
            transition={{ duration: 0.25, ease: "easeInOut", delay: i * 0.025 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Container for the text that appears on hover */}
      <motion.div className="absolute inset-0 flex text-primary" aria-hidden="true">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={bottomVariants}
            animate={isHovered ? "hovered" : "initial"}
            transition={{ duration: 0.25, ease: "easeInOut", delay: i * 0.025 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

interface TickerProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
  direction?: "left" | "right";
}

export function Ticker({
  items,
  className,
  itemClassName,
  duration = 50,
  direction = "left",
}: TickerProps) {
  const controls = useAnimationControls();
  // To make it seamless, we need to repeat the items enough times to fill any screen width.
  const repetitionFactor = 4;
  const allItems = Array(repetitionFactor).fill(items).flat();

  const xRange = direction === "left" ? ["0%", `-${100 / repetitionFactor}%`] : [`-${100 / repetitionFactor}%`, "0%"];

  useEffect(() => {
    // Start the continuous animation
    controls.set({ x: xRange[0] });
    controls.start({
      x: xRange[1],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, duration, xRange]);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <motion.div
        className="flex gap-2 sm:gap-4"
        animate={controls}
      >
        {allItems.map((item, index) => (
          <TickerItem key={index} text={item} className={itemClassName} />
        ))}
      </motion.div>
    </div>
  );
}
