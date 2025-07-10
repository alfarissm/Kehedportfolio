'use client'
import { useState, useRef } from 'react'
import { Button } from '../ui/button'
import { Home, CodeXml, Briefcase, MessageSquare, Music, Pause } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "../theme-toggle"
import type { Section } from '@/app/page'
import { useToast } from '@/hooks/use-toast'

interface HeaderProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const navItems: { id: Section, label: string, icon: React.ReactNode }[] = [
    { id: 'hero', label: 'Home', icon: <Home className="size-5" /> },
    { id: 'skills', label: 'Skills', icon: <CodeXml className="size-5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="size-5" /> },
    { id: 'contact', label: 'Connect', icon: <MessageSquare className="size-5" /> },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
        toast({
          variant: "destructive",
          title: "Audio Error",
          description: "Could not play the music file.",
        });
        setIsPlaying(false);
      }
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <audio ref={audioRef} src="/music/Tate McRae - Just Keep Watching (From F1 The Movie) [Official Audio].mp3" loop />
        <nav className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 p-2 shadow-lg backdrop-blur-lg">
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeSection === item.id ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-full"
                  onClick={() => onSectionChange(item.id)}
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{item.label}</TooltipContent>
            </Tooltip>
          ))}
          
          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="size-5" /> : <Music className="size-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isPlaying ? 'Pause Music' : 'Play Music'}</TooltipContent>
          </Tooltip>

          <ThemeToggle />
        </nav>
      </header>
    </TooltipProvider>
  )
}
