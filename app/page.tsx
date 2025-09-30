"use client"

import { Header } from "@/components/header"
import { TopNavbar } from "@/components/top-navbar"
import { DashboardContent } from "@/components/dashboard-content"
import { UnderWaterLayout, SlidingContent } from "@/components/underwater-layout"
import { FloatingStartButton } from "@/components/start-now-button"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function HomePage() {
  const scrollToContent = () => {
    document.querySelector('#main-content')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <UnderWaterLayout>
      <div className="min-h-screen">
        <SlidingContent delay={0}>
          <Header />
        </SlidingContent>
        
        <SlidingContent delay={200}>
          <TopNavbar />
        </SlidingContent>

        {/* Hero Section - Mobile Optimized */}
        <SlidingContent delay={400} className="hero-mobile text-center py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-8">
              Data Manthan
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 mb-3 md:mb-4">
              Advanced Marine Research Platform
            </p>
            <p className="text-sm sm:text-base md:text-lg text-cyan-200 mb-8 md:mb-12 max-w-3xl mx-auto px-2">
              Dive deep into oceanic data with cutting-edge AI-powered analysis, real-time monitoring, and comprehensive marine research tools
            </p>
            <FloatingStartButton onClick={scrollToContent}>
              <span className="hidden sm:inline">Explore Ocean Data</span>
              <span className="sm:hidden">Explore Data</span>
            </FloatingStartButton>
          </div>
        </SlidingContent>

        <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 mobile-content">
          <SlidingContent delay={600}>
            <DashboardContent />
          </SlidingContent>
        </main>
        
        {/* Mobile Navigation - Only visible on small screens */}
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </UnderWaterLayout>
  )
}
