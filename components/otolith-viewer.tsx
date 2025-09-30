"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCw, Ruler, MapPin } from "lucide-react"

export function OtolithViewer() {
  const [zoom, setZoom] = useState(100)
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [showLandmarks, setShowLandmarks] = useState(true)

  return (
  <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Viewer Controls */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
  <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs sm:text-sm font-medium">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(400, zoom + 25))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

  <div className="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0">
          <Button
            variant={showMeasurements ? "default" : "outline"}
            size="sm"
            onClick={() => setShowMeasurements(!showMeasurements)}
          >
            <Ruler className="mr-1 h-4 w-4" />
            Measurements
          </Button>
          <Button
            variant={showLandmarks ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLandmarks(!showLandmarks)}
          >
            <MapPin className="mr-1 h-4 w-4" />
            Landmarks
          </Button>
        </div>
      </div>

      {/* Otolith Image Viewer */}
      <div className="relative border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="aspect-[4/3] flex items-center justify-center p-2 sm:p-8">
          {/* Simulated otolith image */}
          <div
            className="relative bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 rounded-full border-4 border-gray-300 dark:border-gray-600"
            style={{
              width: `${zoom * 2}px`,
              height: `${zoom * 1.5}px`,
              transform: `scale(${zoom / 100})`,
            }}
          >
            {/* Otolith features */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gray-500 dark:bg-gray-300 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-2 bg-gray-600 dark:bg-gray-200 rounded-full opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* Landmark points */}
            {showLandmarks && (
              <>
                <div className="absolute top-2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-2 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-2 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2"></div>
              </>
            )}

            {/* Measurement lines */}
            {showMeasurements && (
              <>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-500 transform -translate-y-1/2"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-500 transform -translate-x-1/2"></div>
              </>
            )}
          </div>
        </div>

        {/* Image info overlay */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-2">
          <div className="text-xs space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Sample ID: OT-2024-001</Badge>
            </div>
            <div>Resolution: 2048x1536 px</div>
            <div>Scale: 0.05 mm/px</div>
          </div>
        </div>
      </div>

      {/* Analysis Tools */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
  <div className="space-y-2">
          <h4 className="font-medium text-sm">Contour Analysis</h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Smoothness:</span>
              <span>0.92</span>
            </div>
            <div className="flex justify-between">
              <span>Circularity:</span>
              <span>0.78</span>
            </div>
            <div className="flex justify-between">
              <span>Aspect Ratio:</span>
              <span>1.43</span>
            </div>
          </div>
        </div>

  <div className="space-y-2">
          <h4 className="font-medium text-sm">Shape Descriptors</h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Fourier 1:</span>
              <span>0.234</span>
            </div>
            <div className="flex justify-between">
              <span>Fourier 2:</span>
              <span>0.156</span>
            </div>
            <div className="flex justify-between">
              <span>Fourier 3:</span>
              <span>0.089</span>
            </div>
          </div>
        </div>

  <div className="space-y-2">
          <h4 className="font-medium text-sm">Quality Metrics</h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Focus Score:</span>
              <Badge variant="default">9.2/10</Badge>
            </div>
            <div className="flex justify-between">
              <span>Contrast:</span>
              <Badge variant="secondary">8.7/10</Badge>
            </div>
            <div className="flex justify-between">
              <span>Completeness:</span>
              <Badge variant="default">100%</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
