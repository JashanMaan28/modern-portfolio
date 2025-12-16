"use client"

import { Badge } from "@/components/ui/badge"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Go",
  "Docker",
  "Git",
  "Tailwind CSS",
  "GraphQL",
  "Redis",
  "AWS",
]

export function SkillsSection() {
  const { ref, isVisible } = useSectionReveal()

  return (
    <section ref={ref} id="skills" className="relative">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 md:col-span-2 pt-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Tech Stack</span>
        </div>
        <div className="col-span-6 md:col-span-4 py-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                variant="outline"
                data-cursor={skill.toUpperCase()}
                className={`font-mono text-xs font-normal cursor-default
                  transition-all duration-300 ease-out
                  hover:bg-foreground hover:text-background hover:scale-110 hover:border-foreground
                  active:scale-95
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}
                `}
                style={{ transitionDelay: isVisible ? `${index * 10}ms` : "0ms" }}
                tabIndex={0}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <AnimatedLine progress={0.5} />
    </section>
  )
}
