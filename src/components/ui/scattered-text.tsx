
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScatteredTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 100,
    rotate: (Math.random() - 0.5) * 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export function ScatteredText({ text, className, as: Component = 'div' }: ScatteredTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const MotionComponent = motion(Component);


  const characters = text.split('').map((char, index) => {
    // Treat space as a non-breaking space for layout purposes
    if (char === ' ') {
      return <span key={index}>&nbsp;</span>;
    }
    return (
      <motion.span
        key={index}
        variants={defaultAnimations}
        className="inline-block"
      >
        {char}
      </motion.span>
    );
  });

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.05 }}
      aria-label={text}
      className={cn(className)}
    >
      {characters}
    </MotionComponent>
  );
}
