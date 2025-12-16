"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches,
      )
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const updatePosition = useCallback(() => {
    setPosition((prev) => {
      const dx = targetRef.current.x - prev.x
      const dy = targetRef.current.y - prev.y
      // Smooth lerp for fluid movement
      return {
        x: prev.x + dx * 0.15,
        y: prev.y + dy * 0.15,
      }
    })
    rafRef.current = requestAnimationFrame(updatePosition)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveElement = target.closest("a, button, [data-cursor], input, textarea, select, [role='button']")
      setIsHovering(!!interactiveElement)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)

    rafRef.current = requestAnimationFrame(updatePosition)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, isVisible, updatePosition])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer ring */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`
            rounded-full border border-foreground/50
            transition-all duration-200 ease-out
            ${isHovering ? "w-10 h-10 opacity-100" : "w-6 h-6 opacity-60"}
            ${isVisible ? "scale-100" : "scale-0"}
          `}
        />
      </div>

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`
            rounded-full bg-foreground
            transition-all duration-150 ease-out
            ${isHovering ? "w-1 h-1" : "w-1.5 h-1.5"}
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>
    </>
  )
}
