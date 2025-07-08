
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetTheme = theme === "light" ? "dark" : "light"
    const isReverse = targetTheme === "light" // Shrink animation when switching to light

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(targetTheme)
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    
    if (isReverse) {
      document.documentElement.classList.add('theme-transition-reverse');
    }

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(targetTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(${endRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isReverse ? clipPath : clipPath.reverse(),
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: isReverse
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      )
    })

    transition.finished.finally(() => {
        if (isReverse) {
            document.documentElement.classList.remove('theme-transition-reverse');
        }
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </TooltipContent>
    </Tooltip>
  )
}
