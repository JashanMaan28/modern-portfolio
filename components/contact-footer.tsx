"use client"

import { Button } from "@/components/ui/button"
import { GithubIcon, MailIcon } from "lucide-react"
import { useSectionReveal } from "@/hooks/use-section-reveal"

const socialLinks = [
  { icon: MailIcon, link: "mailto:jmaan1337@gmail.com", label: "Email", cursor: "EMAIL" },
  { icon: GithubIcon, link: "https://github.com/JashanMaan28", label: "GitHub", cursor: "GITHUB" },
]

export function ContactFooter() {
  const { ref, isVisible } = useSectionReveal()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer ref={ref} id="contact" className="relative">
      <div className="absolute inset-x-0 top-0 h-px w-full bg-border" />

      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 flex flex-col gap-4 pt-5 md:col-span-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Contact</span>
          <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
            Open for opportunities and collaboration.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((item, index) => (
              <Button
                key={`social-${item.label}-${index}`}
                size="icon"
                variant="outline"
                data-cursor={item.cursor}
                className={`h-8 w-8 bg-transparent transition-all duration-300 
                  hover:scale-110 hover:bg-foreground hover:text-background hover:border-foreground
                  active:scale-95
                  focus-visible:ring-ring focus-visible:ring-offset-background
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}
                `}
                style={{ transitionDelay: isVisible ? `${(index + 1) * 75}ms` : "0ms" }}
                asChild
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <item.icon className="size-3.5" />
                  <span className="sr-only">{item.label}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div
          className={`col-span-3 w-full md:col-span-1 transition-all duration-500 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs">Links</span>
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection("projects")}
              data-cursor="SCROLL"
              className="w-max text-sm text-left transition-all duration-200 hover:text-foreground hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              data-cursor="SCROLL"
              className="w-max text-sm text-left transition-all duration-200 hover:text-foreground hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("certificates")}
              data-cursor="SCROLL"
              className="w-max text-sm text-left transition-all duration-200 hover:text-foreground hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
            >
              Awards
            </button>
          </div>
        </div>
        <div
          className={`col-span-3 w-full md:col-span-1 transition-all duration-500 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs">Resources</span>
          <div className="mt-2 flex flex-col gap-2">
            <a
              data-cursor="OPEN"
              className="w-max text-sm transition-all duration-200 hover:text-foreground hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
              href="#"
            >
              Resume
            </a>
            <a
              data-cursor="OPEN"
              className="w-max text-sm transition-all duration-200 hover:text-foreground hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
              href="#"
            >
              Blog
            </a>
          </div>
        </div>
      </div>

      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      </div>

      <div
        className={`flex max-w-4xl flex-col justify-between gap-2 py-4 transition-all duration-500 ease-out delay-400 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-center font-light text-muted-foreground/60 text-sm">
          &copy; {new Date().getFullYear()} Alex Chen. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
