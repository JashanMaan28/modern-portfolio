"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { AnimatedLine } from "@/components/animated-line"
import { CornerBracket } from "@/components/geometric-accents"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative pt-16 scroll-mt-24">
      <AnimatedLine position="top" progress={0} />
      <div className="grid grid-cols-6 gap-6 p-4">
        <div className="col-span-6 flex flex-col gap-4 py-16 md:py-24 relative">
          <CornerBracket position="top-left" className="-top-4 -left-4" delay={500} />
          <CornerBracket position="bottom-right" className="-bottom-4 -right-4" delay={700} />
          <h1
            className={`text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Jashanpreet Singh
          </h1>
          <p
            className={`font-mono text-muted-foreground text-sm transition-all duration-700 ease-out delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Student / Developer / Builder
          </p>
          <div
            className={`flex gap-3 pt-4 transition-all duration-700 ease-out delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("projects")}
              data-cursor="VIEW"
              className="transition-all duration-200 ease-out hover:scale-105 active:scale-95 bg-transparent"
            >
              View Projects
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection("contact")}
              data-cursor="CONTACT"
              className="transition-all duration-200 ease-out hover:scale-105 active:scale-95"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
      <AnimatedLine position="bottom" progress={0.05} />
    </section>
  )
}
