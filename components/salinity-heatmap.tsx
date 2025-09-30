"use client"

import { Badge } from "@/components/ui/badge"
import { salinityHeatmapData } from "@/lib/dummyData"

export function SalinityHeatmap() {
  const getColorIntensity = (value: number) => {
    const min = 34.7
    const max = 35.5
    const intensity = (value - min) / (max - min)
    return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
  <div className="grid grid-cols-5 gap-1 aspect-square">
        {salinityHeatmapData.flat().map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-xs font-medium rounded border water-droplet hover:scale-110 transition-transform cursor-pointer"
            style={{ backgroundColor: getColorIntensity(value) }}
          >
            {value}
          </div>
        ))}
      </div>

  <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}></div>
          <span>34.7 PSU</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 1)" }}></div>
          <span>35.5 PSU</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-xs sm:text-sm">Salinity Zones</h4>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span>Coastal Waters</span>
            <Badge variant="outline">34.7-35.0 PSU</Badge>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span>Open Ocean</span>
            <Badge variant="secondary">35.1-35.3 PSU</Badge>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span>High Salinity</span>
            <Badge variant="default">35.4-35.5 PSU</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
