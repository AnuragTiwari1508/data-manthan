"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { 
  Map, 
  Layers, 
  Download, 
  Calendar, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  FileText,
  Globe,
  Waves,
  Thermometer,
  Droplets
} from "lucide-react"

export function IncoisDataPortal() {
  // Updated component with dark transparent UI
  const [selectedDataset, setSelectedDataset] = useState("SST")
  const [selectedRegion, setSelectedRegion] = useState("arabian-sea")
  const [selectedDate, setSelectedDate] = useState("2025-09-19")
  const [isAnimating, setIsAnimating] = useState(false)
  const [contourLevels, setContourLevels] = useState([20])
  const [showContours, setShowContours] = useState(true)
  const [mapProjection, setMapProjection] = useState("mercator")

  const datasets = [
    { id: "SST", name: "Sea Surface Temperature", unit: "°C", icon: Thermometer },
    { id: "SSS", name: "Sea Surface Salinity", unit: "PSU", icon: Droplets },
    { id: "CHL", name: "Chlorophyll-a", unit: "mg/m³", icon: Waves },
    { id: "SSH", name: "Sea Surface Height", unit: "m", icon: Globe },
    { id: "WIND", name: "Wind Speed", unit: "m/s", icon: Waves },
    { id: "CURR", name: "Ocean Currents", unit: "m/s", icon: Map }
  ]

  const regions = [
    { id: "arabian-sea", name: "Arabian Sea", bounds: "30°-120°E, -30°-30°N" },
    { id: "bay-of-bengal", name: "Bay of Bengal", bounds: "80°-100°E, 5°-25°N" },
    { id: "indian-ocean", name: "Indian Ocean", bounds: "30°-120°E, -40°-30°N" },
    { id: "global", name: "Global Ocean", bounds: "0°-360°E, -90°-90°N" }
  ]

  const analysisTools = [
    { id: "plot", name: "2D Plot", description: "Generate color-filled contour plots" },
    { id: "animate", name: "Animation", description: "Time series animation" },
    { id: "timeseries", name: "Time Series", description: "Extract point time series" },
    { id: "profile", name: "Vertical Profile", description: "Depth profile analysis" },
    { id: "compare", name: "Compare", description: "Compare datasets or time periods" },
    { id: "correlation", name: "Correlation", description: "Statistical correlation analysis" }
  ]

  const currentDataset = datasets.find(d => d.id === selectedDataset)
  const Icon = currentDataset?.icon || Map

  return (
  <div className="min-h-screen bg-transparent px-2 sm:px-0">
      {/* Header - INCOIS Style */}
      <div className="bg-gradient-to-r from-blue-950/90 to-slate-900/90 text-white p-4 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/placeholder-logo.png" 
                alt="INCOIS Logo" 
                className="h-12 w-12 rounded-full bg-white/10 p-1"
              />
              <div>
                <h1 className="text-xl font-bold">INCOIS Live Access Server</h1>
                <p className="text-sm text-blue-200">Indian National Centre for Ocean Information Services</p>
              </div>
            </div>
            <div className="text-right text-sm text-blue-200">
              <p>भारतीय राष्ट्रीय महासागर सूचना सेवा केन्द्र</p>
              <p>Ministry of Earth Sciences, Govt. of India</p>
            </div>
          </div>
        </div>
      </div>

  <div className="container mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        {/* Control Panel */}
        <Card className="shadow-lg bg-slate-900/80 backdrop-blur-sm border-slate-800">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900/90 text-white border-b border-slate-800">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Data Selection & Analysis Controls
            </CardTitle>
            <CardDescription className="text-blue-100">
              Configure datasets, spatial domain, temporal range, and analysis parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="dataset" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                <TabsTrigger value="dataset" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Dataset</TabsTrigger>
                <TabsTrigger value="spatial" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Spatial</TabsTrigger>
                <TabsTrigger value="temporal" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Temporal</TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="dataset" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {datasets.map((dataset) => {
                    const DatasetIcon = dataset.icon
                    return (
                      <Card 
                        key={dataset.id}
                        className={`cursor-pointer transition-all hover:shadow-md bg-slate-900/90 border-slate-800 ${
                          selectedDataset === dataset.id ? 'ring-2 ring-blue-500 bg-blue-900/90' : ''
                        }`}
                        onClick={() => setSelectedDataset(dataset.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <DatasetIcon className={`h-8 w-8 ${selectedDataset === dataset.id ? 'text-blue-400' : 'text-blue-600'}`} />
                            <div>
                              <h3 className="font-medium text-white">{dataset.name}</h3>
                              <p className="text-sm text-blue-300">Unit: {dataset.unit}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="spatial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="region">Predefined Regions</Label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {regions.find(r => r.id === selectedRegion)?.bounds}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="projection">Map Projection</Label>
                      <Select value={mapProjection} onValueChange={setMapProjection}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mercator">Mercator</SelectItem>
                          <SelectItem value="robinson">Robinson</SelectItem>
                          <SelectItem value="orthographic">Orthographic</SelectItem>
                          <SelectItem value="stereographic">Stereographic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lon-min">Longitude Min</Label>
                        <Input id="lon-min" type="number" defaultValue="30" />
                      </div>
                      <div>
                        <Label htmlFor="lon-max">Longitude Max</Label>
                        <Input id="lon-max" type="number" defaultValue="120" />
                      </div>
                      <div>
                        <Label htmlFor="lat-min">Latitude Min</Label>
                        <Input id="lat-min" type="number" defaultValue="-30" />
                      </div>
                      <div>
                        <Label htmlFor="lat-max">Latitude Max</Label>
                        <Input id="lat-max" type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="temporal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" defaultValue="2025-01-01" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="time-step">Time Step</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisTools.map((tool) => (
                    <Card key={tool.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <Button size="sm" className="mt-3 w-full">
                          Select
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch checked={showContours} onCheckedChange={setShowContours} />
                    <Label>Show Contours</Label>
                  </div>
                  <div className="flex-1">
                    <Label>Contour Levels: {contourLevels[0]}°C</Label>
                    <Slider
                      value={contourLevels}
                      onValueChange={setContourLevels}
                      max={35}
                      min={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Map View */}
          <Card className="lg:col-span-3 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-blue-600" />
                <CardTitle>{currentDataset?.name} - {regions.find(r => r.id === selectedRegion)?.name}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setIsAnimating(!isAnimating)}
                >
                  {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                {/* Mock Oceanographic Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Globe className="h-16 w-16 text-blue-500 mx-auto animate-spin" />
                    <div>
                      <h3 className="font-medium">Generating Visualization...</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentDataset?.name} data for {selectedDate}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Color Scale Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
                  <div className="text-xs font-medium mb-2">{currentDataset?.unit}</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-8 bg-gradient-to-t from-blue-600 to-red-600"></div>
                    <div className="text-xs space-y-1">
                      <div>35</div>
                      <div>25</div>
                      <div>15</div>
                    </div>
                  </div>
                </div>

                {/* Coordinates Display */}
                <div className="absolute top-4 left-4 bg-white/90 p-2 rounded text-xs">
                  Lat: 15.00°N, Lon: 75.00°E
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Data Source: INCOIS Operational Oceanography</span>
                <span>Updated: {selectedDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Side Panel */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="mr-2 h-4 w-4" />
                Data Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bathymetry</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Coastlines</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grid Lines</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stations</span>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-medium text-sm">Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Info className="mr-2 h-4 w-4" />
                    Dataset Info
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Time Series
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset View
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-3">Current Values</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <Badge variant="secondary">28.5°C</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Salinity:</span>
                    <Badge variant="secondary">35.2 PSU</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Chlorophyll:</span>
                    <Badge variant="secondary">2.1 mg/m³</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4 border-t">
          <p>© 2025 Indian National Centre for Ocean Information Services (INCOIS)</p>
          <p>Ministry of Earth Sciences, Government of India</p>
        </div>
      </div>
    </div>
  )
}
