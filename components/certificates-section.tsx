"use client"

import { Award, Trophy, GraduationCap } from "lucide-react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"

const certificates = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2024", icon: Award },
  { title: "Dean's List", issuer: "University of Technology", year: "2023", icon: GraduationCap },
  { title: "Hackathon Winner", issuer: "DevConf 2023", year: "2023", icon: Trophy },
]

export function CertificatesSection() {
  const { ref, isVisible } = useSectionReveal()

  return (
    <section ref={ref} id="certificates" className="relative scroll-mt-24">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 md:col-span-2 pt-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Certificates & Awards</span>
        </div>
        <div className="col-span-6 md:col-span-4">
          {certificates.map((cert, index) => (
            <div
              key={cert.title}
              className={`relative group transition-all duration-300 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
              }`}
              style={{ transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms" }}
            >
              {index > 0 && <div className="absolute inset-x-0 top-0 h-px bg-border" />}
              <div
                tabIndex={0}
                data-cursor="VIEW"
                className="flex items-center justify-between py-4 px-2 -mx-2 rounded-md transition-colors duration-200 hover:bg-muted/30 cursor-default focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <div className="flex items-center gap-3">
                  <cert.icon className="size-4 text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-foreground">
                      {cert.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                  {cert.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AnimatedLine progress={0.85} />
    </section>
  )
}
