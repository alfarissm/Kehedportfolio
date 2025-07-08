
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeXml, Palette, Server, Database, Cloud, GitBranch } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import { Ticker } from "@/components/ui/ticker";
import { cn } from "@/lib/utils";


const skills = [
  {
    icon: <CodeXml className="h-10 w-10 text-primary" />,
    title: "Frontend Development",
    description: "Building responsive and dynamic user interfaces with a focus on performance and accessibility.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "UI/UX & Styling",
    description: "Crafting visually appealing and intuitive designs that are a joy to use.",
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: "Backend Development",
    description: "Developing RESTful APIs and robust server-side logic to power applications.",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Databases",
    description: "Managing and querying data effectively for scalable and reliable applications.",
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: "DevOps & Deployment",
    description: "Ensuring smooth and automated deployment pipelines for continuous integration.",
  },
  {
    icon: <GitBranch className="h-10 w-10 text-primary" />,
    title: "Version Control",
    description: "Proficient in version control and collaborative development workflows.",
  },
];

const technologies = {
  "Programming Languages": ["Java", "JavaScript", "Python", "Swift", "TypeScript"],
  "Software & App Dev": ["React", "Flutter", "Kotlin", "SwiftUI"],
  "DevOps & Tools": ["Docker", "Git", "GitHub", "VS Code", "Figma", "Postman"]
};

const chartData = [
  { skillName: "Frontend", proficiency: 95, fill: "var(--color-frontend)" },
  { skillName: "UI/UX", proficiency: 90, fill: "var(--color-uiux)" },
  { skillName: "Backend", proficiency: 85, fill: "var(--color-backend)" },
  { skillName: "Databases", proficiency: 80, fill: "var(--color-databases)" },
  { skillName: "DevOps", proficiency: 75, fill: "var(--color-devops)" },
  { skillName: "Version Control", proficiency: 98, fill: "var(--color-versioncontrol)" },
];

const chartConfig = {
  proficiency: {
    label: "Proficiency",
  },
  frontend: {
    label: "Frontend",
    color: "hsl(var(--chart-1))",
  },
  uiux: {
    label: "UI/UX",
    color: "hsl(var(--chart-2))",
  },
  backend: {
    label: "Backend",
    color: "hsl(var(--chart-3))",
  },
  databases: {
    label: "Databases",
    color: "hsl(var(--chart-4))",
  },
  devops: {
    label: "DevOps",
    color: "hsl(var(--chart-5))",
  },
  versioncontrol: {
    label: "Version Control",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SkillCard = ({ skill }: { skill: (typeof skills)[0] }) => (
    <Card className="flex flex-col items-center text-center p-6 bg-background/30 backdrop-blur-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 h-full">
        <CardHeader className="p-0 mb-4">
            {skill.icon}
        </CardHeader>
        <CardContent className="p-0">
            <CardTitle className="text-xl font-bold mb-2">{skill.title}</CardTitle>
            <p className="text-muted-foreground">{skill.description}</p>
        </CardContent>
    </Card>
);


const HoverTicker = ({ category, items, direction, duration, invertColors }: { category: string; items: string[]; direction?: "left" | "right"; duration?: number; invertColors?: boolean; }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full border-b border-border cursor-pointer flex items-center"
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="category"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full flex items-center justify-center min-h-[6rem] sm:min-h-[8rem]"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-widest uppercase text-center">
              {category}
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="ticker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-full h-full flex items-center min-h-[6rem] sm:min-h-[8rem]",
              invertColors ? "bg-foreground text-background" : "bg-background text-foreground"
            )}
          >
            <Ticker
              items={items}
              duration={duration}
              direction={direction}
              itemClassName={cn(
                "font-semibold",
                invertColors ? "text-background" : "text-foreground"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
  });


  return (
    <section className="w-full bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">My Skillset</h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">A glimpse into my technical toolbox, from frontend frameworks to backend technologies.</p>
        </motion.div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="overflow-hidden mb-24 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex -ml-4">
                    {skills.map((skill, index) => (
                        <motion.div 
                            key={index} 
                            className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] min-w-0 pl-4"
                            variants={itemVariants}
                        >
                            <SkillCard skill={skill} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
      </div>

      <motion.div 
        className="text-center my-16 container mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Technologies I Use</h3>
        <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">Hover over each category to explore the tools and technologies I work with.</p>
      </motion.div>
      
      <motion.div
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="border-t border-border">
          {Object.entries(technologies).map(([category, items], index) => {
            const direction = index === 1 ? "right" : "left";
            const invertColors = true;
            
            return (
              <motion.div key={category} variants={itemVariants}>
                <HoverTicker
                  category={category}
                  items={items}
                  duration={25 + index * 5}
                  direction={direction}
                  invertColors={invertColors}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Skill Proficiency</h3>
                <p className="mt-2 text-muted-foreground md:text-lg">A visual representation of my confidence in each area.</p>
            </div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[400px]"
            >
                <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="skillName" />}
                />
                <Pie
                    data={chartData}
                    dataKey="proficiency"
                    nameKey="skillName"
                    innerRadius={80}
                    strokeWidth={5}
                    activeIndex={activeIndex}
                    activeShape={({ outerRadius = 0, ...props }) => (
                        <g>
                          <Sector {...props} outerRadius={outerRadius + 10} />
                        </g>
                    )}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                />
                </PieChart>
            </ChartContainer>
        </motion.div>
      </div>
    </section>
  );
}
