"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Waves, Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text = "Loading..." }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
        <span className="text-xs sm:text-sm text-muted-foreground">{text}</span>
      </div>
    </div>
  )
}

export function OceanLoader({ text = "Processing marine data..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="relative mb-2 sm:mb-4">
        <div className="ocean-spinner h-8 w-8 sm:h-12 sm:w-12"></div>
        <Waves className="absolute inset-0 h-8 w-8 sm:h-12 sm:w-12 text-primary animate-pulse" />
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

export function DataLoadingSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header skeleton */}
      <div className="space-y-1 sm:space-y-2">
        <Skeleton className="h-6 sm:h-8 w-1/3" />
        <Skeleton className="h-3 sm:h-4 w-2/3" />
      </div>
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2 sm:p-4">
              <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 mb-1 sm:mb-2" />
              <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 mb-1 sm:mb-2" />
              <Skeleton className="h-2 sm:h-3 w-20 sm:w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chart skeleton */}
      <Card>
        <CardContent className="p-3 sm:p-6">
          <Skeleton className="h-40 sm:h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export function ChartLoadingSkeleton() {
  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="space-y-1 sm:space-y-2">
        <Skeleton className="h-4 sm:h-6 w-1/4" />
        <Skeleton className="h-3 sm:h-4 w-1/2" />
      </div>
      <Skeleton className="h-40 sm:h-64 w-full" />
    </div>
  )
}
