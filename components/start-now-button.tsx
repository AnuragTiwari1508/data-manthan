"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

interface StartNowButtonProps {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function StartNowButton({ 
  onClick, 
  className,
  children = "Start Now",
  variant = "primary",
  size = "lg"
}: StartNowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    onClick?.()
  }

  const baseClasses = "relative overflow-hidden group transition-all duration-500 ease-out font-semibold"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25",
    secondary: "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white border-0 shadow-lg hover:shadow-teal-500/25",
    ghost: "bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-300"
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  }

  return (
        <Button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {/* Animated background waves */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {/* Ripple effect on click */}
        {isClicked && (
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 animate-ping" />
        )}
      </div>

      {/* Water bubble animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1 left-2 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100" />
        <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white/30 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-1 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce delay-500" />
      </div>

      {/* Content */}
         <span className="relative z-10 flex items-center gap-2 sm:gap-3">
        <Waves 
          className={cn(
            "transition-all duration-300",
            isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
          )} 
          size={size === "lg" ? 20 : size === "md" ? 18 : 16} 
        />
        
        <span className={cn(
          "transition-all duration-300",
          isHovered && "translate-x-1"
        )}>
          {children}
        </span>
        
        <ArrowRight 
          className={cn(
            "transition-all duration-300",
            isHovered ? "translate-x-2 scale-110" : "translate-x-0 scale-100"
          )} 
          size={size === "lg" ? 20 : size === "md" ? 18 : 16} 
        />
      </span>

      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        variant === "primary" && "shadow-lg shadow-cyan-500/50",
        variant === "secondary" && "shadow-lg shadow-teal-500/50",
        variant === "ghost" && "shadow-lg shadow-cyan-400/30"
      )} />
    </Button>
  )
}

// Floating Start Now Button for hero sections
export function FloatingStartButton({ 
  onClick, 
  className,
  children = "Start Exploring" 
}: StartNowButtonProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Floating animation container */}
      <div className="animate-float">
        <StartNowButton
          onClick={onClick}
          variant="primary"
          size="lg"
          className="transform hover:scale-105 transition-transform duration-300"
        >
          {children}
        </StartNowButton>
      </div>
      
      {/* Floating particles around button */}
      <div className="absolute -inset-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping animation-delay-1000" />
        <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400/40 rounded-full animate-ping animation-delay-2000" />
        <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-ping animation-delay-3000" />
      </div>
    </div>
  )
}