"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"
import { Crosshair } from "@/components/geometric-accents"

const projects = [
  {
    title: "IDK",
    description: "idk what I should put here, not sure about it. After completing the website development I will put something here.",
    tech: "Next.js, WebSockets, PostgreSQL",
  },
  {
    title: "IDK - 2",
    description: "idk what I should put here, not sure about it. After completing the website development I will put something here",
    tech: "React, Go, InfluxDB",
  },
  {
    title: "IDK - 3",
    description: "idk what I should put here, not sure about it. After completing the website development I will put something here",
    tech: "TypeScript, Electron, SQLite",
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useSectionReveal(0.1)

  return (
    <section ref={ref} id="projects" className="relative scroll-mt-24">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 pt-4 transition-all duration-500 ease-out flex items-center gap-2 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <Crosshair className="relative" delay={200} />
          <span className="text-muted-foreground text-xs uppercase tracking-widest pl-6">Projects</span>
        </div>
        {projects.map((project, index) => (
          <Card
            key={project.title}
            data-cursor="VIEW"
            className={`group col-span-6 md:col-span-3 lg:col-span-2 border-border bg-card/50 cursor-pointer
              transition-all duration-300 ease-out
              hover:bg-card hover:border-muted-foreground/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20
              focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}
            `}
            style={{ transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground flex items-center justify-between">
                {project.title}
                <ArrowUpRight className="size-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
              <p className="font-mono text-xs text-muted-foreground/60 transition-colors duration-200 group-hover:text-muted-foreground">
                {project.tech}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <AnimatedLine progress={0.3} />
    </section>
  )
}
