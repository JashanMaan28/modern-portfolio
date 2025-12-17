"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useSectionReveal } from "@/hooks/use-section-reveal"

interface AccentProps {
  className?: string
  delay?: number
}

interface CornerBracketProps extends AccentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function CornerBracket({ position, className, delay = 0 }: CornerBracketProps) {
  const { ref, isVisible } = useSectionReveal(0.1)
  
  const isTop = position.includes("top")
  const isLeft = position.includes("left")
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("absolute w-8 h-8 pointer-events-none", className)}
      style={{
        top: isTop ? 0 : undefined,
        bottom: !isTop ? 0 : undefined,
        left: isLeft ? 0 : undefined,
        right: !isLeft ? 0 : undefined,
      }}
    >
      {/* Horizontal Line */}
      <div className={cn(
        "absolute h-px bg-border transition-all duration-700 ease-out",
        isTop ? "top-0" : "bottom-0",
        isLeft ? "left-0 origin-left" : "right-0 origin-right"
      )}
      style={{ 
        width: isVisible ? "100%" : "0%",
        transitionDelay: `${delay}ms`
      }} 
      />
      
      {/* Vertical Line */}
      <div className={cn(
        "absolute w-px bg-border transition-all duration-700 ease-out",
        isLeft ? "left-0" : "right-0",
        isTop ? "top-0 origin-top" : "bottom-0 origin-bottom"
      )}
      style={{ 
        height: isVisible ? "100%" : "0%",
        transitionDelay: `${delay + 100}ms`
      }} 
      />
    </div>
  )
}

export function Crosshair({ className, delay = 0 }: AccentProps) {
  const { ref, isVisible } = useSectionReveal(0.1)
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("absolute w-4 h-4 pointer-events-none", className)}
    >
      <div className={cn(
        "absolute top-1/2 left-0 w-full h-px bg-border transition-all duration-500",
        isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
      )} 
      style={{ transitionDelay: `${delay}ms` }}
      />
      <div className={cn(
        "absolute left-1/2 top-0 h-full w-px bg-border transition-all duration-500",
        isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      )} 
      style={{ transitionDelay: `${delay}ms` }}
      />
    </div>
  )
}
