"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

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
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-5xl lg:border-x border-border">
        <div className="relative h-px w-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500",
              isScrolled ? "w-full" : "w-0",
            )}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => scrollToSection("hero")}
            data-cursor="HOME"
            className="font-medium text-foreground text-sm transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            JS
          </button>

          <div className="flex items-center gap-1">
            {navItems.slice(1, -1).map((item) => (
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
          </div>
        </div>

        <div className="relative h-px w-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-500",
              isScrolled ? "w-full" : "w-1/2",
            )}
          />
        </div>
      </div>
    </nav>
  )
}
