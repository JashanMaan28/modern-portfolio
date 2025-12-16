"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useSectionReveal } from "@/hooks/use-section-reveal"

interface AnimatedLineProps {
  position?: "top" | "bottom"
  progress?: number
  className?: string
}

export function AnimatedLine({ position = "bottom", progress = 0, className }: AnimatedLineProps) {
  const { ref, isVisible } = useSectionReveal(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 h-px pointer-events-none",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ width: "100vw" }}
    >
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 h-full bg-border transition-all duration-1000 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          width: isVisible ? "100%" : "0%",
          transitionDelay: isVisible ? `${progress * 200}ms` : "0ms",
        }}
      />
    </div>
  )
}
