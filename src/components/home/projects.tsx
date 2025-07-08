import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScatteredText } from "@/components/ui/scattered-text";
import { Certifications } from "./certifications";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Tuang E-commerce Platform",
    description:
      "A complete e-commerce platform built with Next.js, featuring a product catalog, shopping cart, and secure checkout process.",
    image: "/projects/Big/tuang.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    liveUrl: "https://www.tuang.site",
    dataAiHint: "online store",
    type: "Big Project",
  },
  {
    title: "Paddle Mini Game",
    description:
      "A simple paddle-themed mini game built with HTML, CSS, and JavaScript. Great for practicing basic programming logic.",
    image: "/projects/Mini/paddle.png",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://github.com/alfarissm/Simple-Project.git",
    dataAiHint: "Mini Game",
    type: "Mini Project",
  },
  {
    title: "Mini Snake Game",
    description:
      "A classic snake game in mini version built with Python. Test your speed and reflexes!",
    image: "/projects/Mini/snack.png",
    tags: ["Python"],
    liveUrl: "https://github.com/alfarissm/Simple-Project.git",
    dataAiHint: "Mini Game",
    type: "Mini Project",
  },
  {
    title: "Nutri8",
    description:
      "A prototype design for a health and nutrition-focused app featuring community interaction and daily recommendations. Created using Figma and Canva.",
    image: "/projects/Mini/Nutri8.png",
    tags: ["Figma", "Canva"],
    liveUrl:
      "https://www.figma.com/design/UnHyCG80rga74HoP0hEGrb/Interaksi-Manusia-Komputer---Nutri8?node-id=311-7853&p=f&t=7aDEJVsjcTbYFE9K-0",
    dataAiHint: "Prototype",
    type: "Mini Project",
  },
];

const projectLayouts = [
  "md:row-span-2",
  "",
  "",
  "md:col-span-2",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


export function Projects() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Certifications />
        <div className="text-center mb-12">
          <ScatteredText 
            as="h2"
            text="Featured Projects" 
            className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl font-headline"
          />
          <ScatteredText
            as="p"
            text="Here are some of the projects I'm proud of."
            className="mt-4 text-muted-foreground md:text-xl"
          />
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={cn("min-h-[250px] md:min-h-[400px]", projectLayouts[index % projectLayouts.length])}
              variants={itemVariants}
            >
              <Card className="overflow-hidden group relative h-full">
                <Badge variant="secondary" className="absolute top-4 right-4 z-10">{project.type}</Badge>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={project.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <CardTitle className="text-lg md:text-2xl font-bold mb-2 text-primary-foreground">{project.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-neutral-300 mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button asChild variant="secondary" className="group/button text-xs md:text-sm h-8 md:h-10 px-3 md:px-4">
                    <Link href={project.liveUrl}>
                      View Project <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
