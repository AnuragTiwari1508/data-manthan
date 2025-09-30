"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Thermometer, Droplets } from "lucide-react"

export function InteractiveOceanMap() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null)

  const stations = [
    { id: "AS01", name: "Kochi Offshore", lat: "9.5°N", lon: "75.8°E", temp: 28.5, salinity: 35.2 },
    { id: "AS02", name: "Mangalore Coast", lat: "12.9°N", lon: "74.8°E", temp: 27.8, salinity: 35.4 },
    { id: "AS03", name: "Goa Shelf", lat: "15.3°N", lon: "73.9°E", temp: 29.1, salinity: 35.1 },
    { id: "AS04", name: "Mumbai Offshore", lat: "19.1°N", lon: "72.8°E", temp: 28.9, salinity: 35.3 },
  ]

  return (
  <div className="space-y-2 sm:space-y-4 px-2 sm:px-0">
      {/* Map Container */}
  <div className="relative h-64 sm:h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/oceanographic-interface.png"
            alt="Ocean map background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Station markers */}
        {stations.map((station, index) => (
          <Button
            key={station.id}
            variant={selectedStation === station.id ? "default" : "secondary"}
            size="sm"
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              index === 0
                ? "top-3/4 left-1/4"
                : index === 1
                  ? "top-2/3 left-1/3"
                  : index === 2
                    ? "top-1/2 left-2/5"
                    : "top-1/3 left-1/2"
            }`}
            onClick={() => setSelectedStation(selectedStation === station.id ? null : station.id)}
          >
            <MapPin className="mr-1 h-3 w-3" />
            {station.id}
          </Button>
        ))}

        {/* Legend */}
  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2 text-xs sm:text-sm">
          <h4 className="font-medium text-sm">Temperature (°C)</h4>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
            <span className="text-xs">26-30</span>
          </div>
        </div>
      </div>

      {/* Station Details */}
      {selectedStation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stations
            .filter((station) => station.id === selectedStation)
            .map((station) => (
              <div key={station.id} className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">
                    {station.name} ({station.id})
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        Location
                      </span>
                      <span>
                        {station.lat}, {station.lon}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Thermometer className="mr-1 h-3 w-3" />
                        Temperature
                      </span>
                      <Badge variant="secondary">{station.temp}°C</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Droplets className="mr-1 h-3 w-3" />
                        Salinity
                      </span>
                      <Badge variant="outline">{station.salinity} PSU</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
