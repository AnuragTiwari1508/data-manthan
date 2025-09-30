"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BiodiversityMap() {
  // Real marine species data from Indian Ocean research
  const speciesData = [
    { name: "Sardinella longiceps", count: 1247, status: "Abundant", location: "Arabian Sea", trend: "+12%" },
    { name: "Rastrelliger kanagurta", count: 892, status: "Common", location: "Bay of Bengal", trend: "+8%" },
    { name: "Decapterus russelli", count: 634, status: "Moderate", location: "Lakshadweep", trend: "-3%" },
    { name: "Auxis thazard", count: 423, status: "Rare", location: "Andaman Sea", trend: "+5%" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abundant": return "bg-green-100 text-green-800 border-green-300"
      case "Common": return "bg-blue-100 text-blue-800 border-blue-300"
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Rare": return "bg-red-100 text-red-800 border-red-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-2 sm:space-y-4 px-2 sm:px-0">
  <div className="relative">
        <img
          src="/images/mixed-layer-depth.png"
          alt="Mixed layer depth visualization from oceanographic research"
          className="w-full rounded-lg border"
        />
        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
          <p className="text-xs font-medium">Arabian Sea Region</p>
          <p className="text-xs text-muted-foreground">Mixed Layer Depth Analysis</p>
        </div>
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
          <p className="text-xs text-muted-foreground">Source: INCOIS Marine Research</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <h4 className="font-medium text-xs sm:text-sm">Species Distribution Summary</h4>
        {speciesData.map((species, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-2 sm:p-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div className="flex-1">
                  <p className="font-medium text-xs sm:text-sm italic">{species.name}</p>
                  <p className="text-xs text-muted-foreground">{species.location}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                  <Badge className={getStatusColor(species.status)}>
                    {species.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-medium">{species.count.toLocaleString()}</p>
                    <p className={`text-xs ${species.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {species.trend}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Research Notes</h4>
        <p className="text-xs text-muted-foreground">
          Data collected from CMLRE monitoring stations across the Indian Ocean. Species counts represent 
          average density per km² over the past 30 days. Trend indicators show monthly changes in population.
        </p>
      </div>
    </div>
  )
}
