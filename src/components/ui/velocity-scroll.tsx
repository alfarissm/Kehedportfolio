"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface ParallaxProps {
  children: React.ReactNode;
  default_velocity: number;
  className?: string;
}

function ParallaxText({ children, default_velocity, className }: ParallaxProps) {
    // A higher baseDuration means a slower animation. Adjust this to fine-tune speed.
    const baseDuration = 80; 
    const duration = baseDuration / Math.abs(default_velocity);

    const xRange = default_velocity > 0 ? ["0%", "-50%"] : ["-50%", "0%"];

    return (
        <div className="w-full overflow-hidden whitespace-nowrap">
            <motion.div
                className={cn("flex whitespace-nowrap", className)}
                animate={{ x: xRange }}
                transition={{
                    ease: "linear",
                    duration: duration,
                    repeat: Infinity,
                }}
            >
                {/* We duplicate the content to create the seamless looping effect */}
                <span className="flex-shrink-0">{children}</span>
                <span className="flex-shrink-0">{children}</span>
            </motion.div>
        </div>
    );
}

interface VelocityScrollProps {
  text?: string;
  default_velocity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function VelocityScroll({
  text,
  default_velocity = 5,
  className,
  children,
}: VelocityScrollProps) {
  const content = children ? children : <>{text}&nbsp;</>;

  // We repeat the content to ensure it's wider than the viewport for a smooth marquee effect.
  const repeatedContent = React.useMemo(() => {
    const repeater = text ? 4 : 1;
    return (
        <div className="flex">
            {Array.from({ length: repeater }).map((_, i) => (
                <React.Fragment key={i}>{content}</React.Fragment>
            ))}
        </div>
    )
  }, [content, text])

  return (
    <ParallaxText default_velocity={default_velocity} className={className}>
      {repeatedContent}
    </ParallaxText>
  );
}
