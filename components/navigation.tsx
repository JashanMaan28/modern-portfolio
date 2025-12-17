"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { JSLogo } from "@/components/logo"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub" },
  { id: "certificates", label: "Awards" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Throttle section detection
      if (window.scrollY % 10 !== 0) return

      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark"
    
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const target = e.currentTarget
    const { top, left, width, height } = target.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  if (!mounted) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="relative h-px w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500"
          )}
          style={{ width: isScrolled ? "100%" : "1024px", maxWidth: isScrolled ? "100%" : "100%" }}
        />
      </div>
      <div className="mx-auto max-w-5xl lg:border-x border-border">

        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => scrollToSection("hero")}
            data-cursor="HOME"
            className="font-medium text-foreground text-sm transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            aria-label="Go to home"
          >
            <JSLogo className="size-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-cursor="SCROLL"
                className={cn(
                  "relative px-3 py-1.5 text-xs transition-all duration-200 rounded-sm",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-foreground transition-all duration-300",
                    activeSection === item.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                  )}
                />
              </button>
            ))}
            
            <div className="ml-2 pl-2 border-l border-border">
               <Button
                variant="ghost"
                size="icon"
                className="group/toggle extend-touch-target size-8"
                onClick={toggleTheme}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 3l0 18" />
                  <path d="M12 9l4.65 -4.65" />
                  <path d="M12 14.3l7.37 -7.37" />
                  <path d="M12 19.6l8.85 -8.85" />
                </svg>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
             <Button
                variant="ghost"
                size="icon"
                className="group/toggle extend-touch-target size-8"
                onClick={toggleTheme}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 3l0 18" />
                  <path d="M12 9l4.65 -4.65" />
                  <path d="M12 14.3l7.37 -7.37" />
                  <path d="M12 19.6l8.85 -8.85" />
                </svg>
                <span className="sr-only">Toggle theme</span>
              </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <Menu className="size-4.5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "text-left text-lg font-medium transition-colors hover:text-primary",
                        activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
      <div className="relative h-px w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500"
          )}
          style={{ width: isScrolled ? "100%" : "1024px", maxWidth: isScrolled ? "100%" : "100%" }}
        />
      </div>
    </nav>
  )
}
