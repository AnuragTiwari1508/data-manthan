"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SlidingContentProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SlidingContent({ children, className, delay = 0 }: SlidingContentProps) {
  return (
    <div 
      className={cn(
        "slide-content rounded-lg p-4 sm:p-6 m-2 sm:m-4 text-white",
        "border border-cyan-500/20 shadow-lg shadow-cyan-500/10",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface UnderWaterLayoutProps {
  children: ReactNode
  showParticles?: boolean
}

export function UnderWaterLayout({ children, showParticles = true }: UnderWaterLayoutProps) {
  return (
    <div className="min-h-screen relative px-2 sm:px-0">
      {/* Underwater particles */}
      {showParticles && (
        <div className="underwater-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      )}
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}