"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Map, 
  Fish, 
  Dna
} from "lucide-react"

const mobileNavItems = [
  { icon: BarChart3, label: "Dashboard", href: "/", shortLabel: "Home" },
  { icon: Map, label: "Data Viz", href: "/data-visualization", shortLabel: "Data" },
  { icon: Fish, label: "Otolith", href: "/otolith-analysis", shortLabel: "Fish" },
  { icon: Dna, label: "eDNA", href: "/edna-processing", shortLabel: "DNA" },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-grid">
        {mobileNavItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={index} 
              href={item.href}
              className={`mobile-nav-item ${isActive ? 'active' : ''} tap-highlight`}
            >
              <item.icon className="mobile-nav-icon h-5 w-5" />
              <span className="mobile-nav-label">{item.shortLabel}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}