"use client"

import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"

interface Experience {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    company: "Tech Innovations Inc.",
    role: "Software Engineer",
    period: "2023 - Present",
    description:
      "Building scalable web applications and APIs. Leading frontend architecture decisions and mentoring junior developers on best practices.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    company: "Digital Solutions Co.",
    role: "Frontend Developer",
    period: "2022 - 2023",
    description:
      "Developed responsive user interfaces and improved application performance. Collaborated with design team to implement pixel-perfect components.",
    technologies: ["Next.js", "Tailwind CSS", "GraphQL"],
  },
  {
    company: "StartUp Labs",
    role: "Software Development Intern",
    period: "2021 - 2022",
    description:
      "Contributed to full-stack development projects and gained hands-on experience with modern web technologies and agile methodologies.",
    technologies: ["JavaScript", "React", "Python"],
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useSectionReveal()

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-24">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 md:col-span-2 py-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Experience</span>
        </div>
        <div className="col-span-6 md:col-span-4 py-4">
          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-[7px] top-2 bottom-2 w-px bg-border transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              }`}
              style={{ transformOrigin: "top" }}
            />

            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`relative pl-8 pb-8 last:pb-0 group transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
                }`}
                style={{ transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms" }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-border bg-background transition-all duration-200 ease-out group-hover:border-foreground group-hover:scale-110 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: isVisible ? `${(index + 1) * 100 + 50}ms` : "0ms" }}
                >
                  <Briefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 ease-out" />
                </div>

                {/* Experience card */}
                <div
                  tabIndex={0}
                  data-cursor="VIEW"
                  className="rounded-md border border-border bg-card/30 p-4 transition-all duration-200 ease-out hover:bg-card/50 hover:border-muted-foreground/30 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{exp.role}</h3>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs font-mono font-normal px-2 py-0.5 transition-colors duration-200 ease-out hover:bg-foreground hover:text-background hover:border-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatedLine progress={0.25} />
    </section>
  )
}
