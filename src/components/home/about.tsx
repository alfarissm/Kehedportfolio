import Image from 'next/image';

export function About() {
  return (
    <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1 flex justify-center">
                    <Image
                        src="https://placehold.co/400x400.png"
                        alt="Profile Picture"
                        width={400}
                        height={400}
                        className="rounded-full object-cover w-48 h-48 md:w-64 md:h-64 border-4 border-primary shadow-lg"
                        data-ai-hint="man portrait"
                    />
                    </div>
                    <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mb-4">
                        About Me
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                        I'm a frontend developer driven by a passion for creating beautiful, intuitive, and performant web experiences. With a keen eye for design and a deep understanding of modern web technologies, I specialize in turning complex problems into elegant, user-friendly solutions.
                    </p>
                    <p className="text-muted-foreground text-lg">
                        When I'm not coding, you can find me exploring new coffee shops, hiking, or contributing to open-source projects. I'm always eager to learn and grow, both as a developer and as a person.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
