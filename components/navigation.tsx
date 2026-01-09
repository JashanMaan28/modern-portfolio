"use client"

import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun } from "lucide-react"
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
  { id: "experience", label: "Experience" },
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
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Improved scroll detection with proper throttling via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Triggers when section is in upper portion of viewport
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Don't update during programmatic scroll
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Handle scroll state for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Set active immediately on click
      setActiveSection(id)
      isScrollingRef.current = true

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)

      // Re-enable observer after scroll animation completes
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className="mx-auto max-w-5xl h-full" />
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* Top border line */}
      <div className="relative h-px w-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500"
          style={{ width: isScrolled ? "100%" : "1024px" }}
        />
      </div>

      <div className="mx-auto max-w-5xl lg:border-x border-border">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 text-foreground transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            aria-label="Go to home"
          >
            <JSLogo className="size-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5 rounded-full bg-muted/50 p-1">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    activeSection === item.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="ml-3 pl-3 border-l border-border">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full"
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                <Sun className="size-4 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={toggleTheme}
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 rounded-full">
                  <Menu className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        activeSection === item.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

      {/* Bottom border line */}
      <div className="relative h-px w-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500"
          style={{ width: isScrolled ? "100%" : "1024px" }}
        />
      </div>
    </nav>
  )
}
