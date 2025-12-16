"use client"

import { useEffect, useState, useCallback } from "react"

export function SmartCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches,
      )
    }
    checkMobile()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const interactiveElement = target.closest("[data-cursor]")

    if (interactiveElement) {
      const cursorLabel = interactiveElement.getAttribute("data-cursor")
      if (cursorLabel) {
        setLabel(cursorLabel)
        setIsVisible(true)
      }
    }
  }, [])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const relatedTarget = e.relatedTarget as HTMLElement | null
    const interactiveElement = target.closest("[data-cursor]")

    if (interactiveElement) {
      const nextInteractive = relatedTarget?.closest("[data-cursor]")
      if (!nextInteractive) {
        setIsVisible(false)
      }
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseout", handleMouseOut, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [handleMouseMove, handleMouseOver, handleMouseOut, isMobile])

  // Don't render on touch devices
  if (isMobile) return null

  return (
    <div
      className="pointer-events-none fixed z-[100] select-none"
      style={{
        left: position.x + 20,
        top: position.y + 20,
      }}
    >
      <span
        className={`
          inline-block font-mono text-[10px] uppercase tracking-widest text-muted-foreground
          transition-all duration-150 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
        `}
      >
        {label}
      </span>
    </div>
  )
}
