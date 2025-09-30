"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart3, Database, Microscope, Dna, Map, FileText, Settings, Activity, Fish, Waves, Brain, Users, GitBranch, ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

// Main navigation items (always visible)
const mainMenuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/", active: false },
  { icon: Waves, label: "Data Visualization", href: "/data-visualization", active: false },
  { icon: Database, label: "INCOIS Portal", href: "/incois-portal", active: false },
  { icon: Activity, label: "Ocean Analysis", href: "/oceanographic-analysis", active: false },
  { icon: Dna, label: "eDNA Processing", href: "/edna-processing", active: false },
  { icon: Fish, label: "Otolith Analysis", href: "/otolith-analysis", active: false },
  { icon: Users, label: "Community", href: "/community", active: false },
]

// Dropdown menu items (in "More" dropdown)
const dropdownMenuItems = [
  { icon: GitBranch, label: "Collaboration", href: "/collaboration", active: false },
  { icon: Brain, label: "Fish Classification", href: "https://aqua-ai-omega.vercel.app", active: false, external: true },
  { icon: Settings, label: "Settings", href: "#", active: false },
]

export function TopNavbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="bg-slate-900/80 border-b border-cyan-500/20 sticky top-16 z-40 backdrop-blur-md w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-auto md:h-16 gap-2 md:gap-0">
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Main navigation items */}
            {mainMenuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/10 cursor-pointer border-0 bg-transparent">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                More
                <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-slate-900 border-slate-700 z-50"
              >
                {dropdownMenuItems.map((item) => {
                  const isActive = !item.external && pathname === item.href
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center w-full px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/10"
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center w-full px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/10"
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Desktop right side - removed Settings since it's now in dropdown */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Space for future desktop-only features */}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {/* Main menu items */}
              {mainMenuItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors w-full ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
              {/* Dropdown items in mobile */}
              <div className="pt-2 border-t border-border">
                {dropdownMenuItems.map((item) => {
                  const isActive = !item.external && pathname === item.href
                  const Icon = item.icon
                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </a>
                    )
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors w-full ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
