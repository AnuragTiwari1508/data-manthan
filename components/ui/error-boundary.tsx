"use client"

import React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return (
      <div className="p-2 sm:p-4">{this.props.children}</div>
    )
  }
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
          </div>
          <CardTitle className="text-destructive text-base sm:text-lg">Something went wrong</CardTitle>
          <CardDescription>
            An error occurred while loading the marine data system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-4">
          <div className="rounded-lg bg-muted p-2 sm:p-3">
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              {error.message || "Unknown error occurred"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function DataErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
          <h3 className="font-semibold text-destructive text-base sm:text-lg">Data Loading Error</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
          Failed to load marine research data. This could be due to a network issue or server error.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" onClick={resetError}>
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function NetworkErrorFallback() {
  return (
    <Card className="border-destructive/50">
      <CardContent className="p-3 sm:p-6 text-center">
        <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive mx-auto mb-2 sm:mb-3" />
        <h3 className="font-semibold text-destructive mb-1 sm:mb-2 text-base sm:text-lg">Network Connection Error</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
          Unable to connect to the marine data servers. Please check your internet connection.
        </p>
        <Button size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-3 w-3" />
          Retry Connection
        </Button>
      </CardContent>
    </Card>
  )
}
