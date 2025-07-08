
"use client"

import { Github, Linkedin, Instagram } from "lucide-react"
import AuroraBackground from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

// This variant animates the main container and staggers its direct children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

// This variant defines how the text elements (h2, p) slide in
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// This variant is for the icon container. It slides in like other items,
// AND it staggers the animation of the icons inside it.
const iconContainerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

// This variant defines the "pop-in" spring animation for each individual icon
const iconVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

export function ContactForm() {
  return (
    <section className="flex flex-col min-h-full relative overflow-hidden">
        <AuroraBackground />
      <div className="container mx-auto px-4 md:px-6 flex-grow flex items-center justify-center relative z-10">
        <motion.div 
            className="w-full py-12 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline"
                variants={itemVariants}
            >
                Connect With Me
            </motion.h2>
            <motion.p 
                className="mt-4 text-muted-foreground md:text-xl max-w-md mx-auto"
                variants={itemVariants}
            >
                You can find me on these platforms. Let's connect!
            </motion.p>
            {/* The icon container now has its own slide-in animation and staggers its children */}
            <motion.div 
                className="flex flex-wrap justify-center items-center gap-6 py-12"
                variants={iconContainerVariants}
            >
                <motion.a href="https://x.com/fishalwaysswim" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all p-4 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 duration-300" variants={iconVariants}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-10 w-10">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                </motion.a>
                <motion.a href="https://github.com/alfarissm" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all p-4 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 duration-300" variants={iconVariants}>
                    <Github className="h-10 w-10" />
                </motion.a>
                <motion.a href="https://www.linkedin.com/in/muhamad-al-fariz-957b26286/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all p-4 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 duration-300" variants={iconVariants}>
                    <Linkedin className="h-10 w-10" />
                </motion.a>
                <motion.a href="https://www.instagram.com/alffars11" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all p-4 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 duration-300" variants={iconVariants}>
                    <Instagram className="h-10 w-10" />
                </motion.a>
                <motion.a href="https://facebook.com/VanessaRinn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all p-4 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 duration-300" variants={iconVariants}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-10 w-10">
                        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.713c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"/>
                    </svg>
                </motion.a>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
