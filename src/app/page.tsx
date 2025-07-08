'use client';

import { useState } from "react";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { ContactForm } from "@/components/home/contact-form";
import { Preloader } from "@/components/home/preloader";
import { AnimatePresence, motion } from "framer-motion";

export type Section = 'hero' | 'skills' | 'projects' | 'contact';

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const MotionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
    >
        {children}
    </motion.div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col h-screen">
      <Preloader onFinished={() => setIsLoaded(true)} />
      
      <Header 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <MotionWrapper key="hero" className="w-full h-full">
              <Hero onSectionChange={handleSectionChange} isLoaded={isLoaded} />
            </MotionWrapper>
          )}
          {activeSection === 'skills' && (
             <MotionWrapper key="skills" className="w-full h-full overflow-y-auto">
              <Skills />
            </MotionWrapper>
          )}
          {activeSection === 'projects' && (
            <MotionWrapper key="projects" className="w-full h-full overflow-y-auto">
              <Projects />
            </MotionWrapper>
          )}
          {activeSection === 'contact' && (
            <MotionWrapper key="contact" className="w-full h-full">
              <ContactForm />
            </MotionWrapper>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
