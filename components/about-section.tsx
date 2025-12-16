"use client"

import { useSectionReveal } from "@/hooks/use-section-reveal"
import { AnimatedLine } from "@/components/animated-line"

export function AboutSection() {
  const { ref, isVisible } = useSectionReveal()

  return (
    <section ref={ref} id="about" className="relative">
      <div className="grid grid-cols-6 gap-6 p-4">
        <div
          className={`col-span-6 md:col-span-2 pt-4 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">About</span>
        </div>
        <div
          className={`col-span-6 md:col-span-4 py-4 transition-all duration-500 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <p className="text-muted-foreground text-sm leading-relaxed max-w-prose">
            I&apos;m a software developer passionate about building clean, efficient systems. Currently studying Computer
            Science and working on projects that bridge design and engineering. I believe in writing code that is both
            functional and maintainable, with a focus on Machine Learning and Data Sceince.
          </p>
          <br />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-prose">
            From machine learning algorithms to web applications, I'm constantly pushing the boundaries of what's possible 
            with modern technology. Every project is an opportunity to learn something new and create something meaningful.
          </p>
        </div>
      </div>
      <AnimatedLine progress={0.15} />
    </section>
  )
}
