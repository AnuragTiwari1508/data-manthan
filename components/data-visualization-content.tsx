"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Calendar, Download, Filter, Map, BarChart3, Activity, Waves, RefreshCw, Search, Settings } from "lucide-react"
import { InteractiveOceanMap } from "@/components/interactive-ocean-map"
import { TemperatureDepthChart } from "@/components/temperature-depth-chart"
import { ChlorophyllTrendChart } from "@/components/chlorophyll-trend-chart"
import { SalinityHeatmap } from "@/components/salinity-heatmap"
import Image from "next/image"
import { biodiversityData, oceanographicData, timeSeriesData, environmentalParameters, samplingLocations } from "@/lib/dummyData"
import { getComprehensiveOceanData, generateRealTimeOceanData, monitoringStations, assessWaterQuality } from "@/lib/oceanData"

export function DataVisualizationContent() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedParameter, setSelectedParameter] = useState("temperature")
  const [dateRange, setDateRange] = useState("7d")
  const [isRealTime, setIsRealTime] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch comprehensive real-time oceanographic data
  const fetchRealTimeData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Get comprehensive ocean data from our enhanced data system
      const comprehensiveData = getComprehensiveOceanData()
      
      // Try to fetch additional real-time data from public APIs
      const apiPromises = [
        // NOAA Tides and Currents API
        fetch('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?station=9414290&product=water_level&datum=mllw&units=metric&time_zone=gmt&format=json&range=24')
          .then(res => res.json()).catch(() => null),
        
        // Weather API for atmospheric conditions
        fetch('https://api.open-meteo.com/v1/forecast?latitude=15.49&longitude=73.83&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
          .then(res => res.json()).catch(() => null)
      ]

      const [tidesData, weatherData] = await Promise.all(apiPromises)

      // Process and combine all data sources
      const processedData = {
        ...comprehensiveData,
        externalAPIs: {
          tides: tidesData?.data || null,
          weather: weatherData || null
        },
        waterQualityAssessment: comprehensiveData.realTimeData.map(station => ({
          stationId: monitoringStations.find(s => 
            s.location.lat === station.location.lat && 
            s.location.lng === station.location.lng
          )?.id || 'unknown',
          stationName: station.location.name,
          assessment: assessWaterQuality(station.parameters),
          parameters: station.parameters
        })),
        alertStatus: checkForAlerts(comprehensiveData.realTimeData),
        dataFreshness: 'live', // Indicating this is fresh real-time data
        lastUpdated: new Date().toISOString()
      }

      setRealTimeData(processedData)
    } catch (err) {
      console.error('Error fetching real-time data:', err)
      setError('Failed to fetch complete real-time data, using local monitoring stations')
      
      // Fallback to local comprehensive data only
      const fallbackData = getComprehensiveOceanData()
      setRealTimeData({
        ...fallbackData,
        waterQualityAssessment: fallbackData.realTimeData.map(station => ({
          stationId: monitoringStations.find(s => 
            s.location.lat === station.location.lat && 
            s.location.lng === station.location.lng
          )?.id || 'unknown',
          stationName: station.location.name,
          assessment: assessWaterQuality(station.parameters),
          parameters: station.parameters
        })),
        alertStatus: checkForAlerts(fallbackData.realTimeData),
        dataFreshness: 'simulated',
        lastUpdated: new Date().toISOString(),
        error: 'Using enhanced local monitoring data'
      })
    } finally {
      setLoading(false)
    }
  }

  // Check for environmental alerts
  const checkForAlerts = (data: any[]) => {
    const alerts: string[] = []
    
    data.forEach(station => {
      const { parameters } = station
      if (parameters.temperature > 30) alerts.push(`High temperature at ${station.location.name}`)
      if (parameters.pH < 7.8) alerts.push(`Low pH at ${station.location.name}`)
      if (parameters.dissolvedOxygen < 5) alerts.push(`Low oxygen at ${station.location.name}`)
      if (parameters.turbidity > 10) alerts.push(`High turbidity at ${station.location.name}`)
    })
    
    return {
      level: alerts.length > 3 ? 'critical' : alerts.length > 1 ? 'warning' : 'normal',
      alerts
    }
  }

  // Simulate real-time data updates
  useEffect(() => {
    if (isRealTime) {
      // Initial fetch
      fetchRealTimeData()
      
      const interval = setInterval(() => {
        fetchRealTimeData()
      }, 30000) // Fetch every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isRealTime])

  const filteredBiodiversityData = biodiversityData.filter(item => {
    const matchesSearch = item.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || item.trend === filterStatus
    return matchesSearch && matchesStatus
  })

  const exportData = (format: string) => {
    if (format === "csv") {
      // Convert data to CSV format
      const csv = biodiversityData.map(item => 
        `${item.species},${item.count},${item.location},${item.date},${item.trend}`
      ).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'biodiversity_data.csv'
      a.click()
    } else if (format === "json") {
      const json = JSON.stringify(biodiversityData, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'biodiversity_data.json'
      a.click()
    }
  }
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Ocean Animation Banner */}
  <div className="relative h-24 sm:h-32 w-full overflow-hidden rounded-xl mb-2 sm:mb-4 ocean-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="absolute w-full h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 500,60 C650,40 850,40 1000,60 C1150,80 1200,80 1200,80 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.2)" />
          </svg>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
              <Waves className="h-6 w-6" />
              Oceanographic Data Visualization
            </h2>
            <p className="text-sm opacity-80">Real-time marine ecosystem monitoring</p>
          </div>
        </div>
        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-balance">Data Visualization Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-pretty">
            Interactive visualization of oceanographic parameters and marine biodiversity data
          </p>
        </div>
  <div className="flex flex-wrap gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isRealTime}
              onCheckedChange={setIsRealTime}
              id="real-time"
            />
            <label htmlFor="real-time" className="text-sm font-medium">
              Real-time {isRealTime && <RefreshCw className="inline h-3 w-3 animate-spin ml-1" />}
            </label>
          </div>
          <Button variant="outline" className="water-droplet text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[110px] sm:w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="increasing">Increasing</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="decreasing">Decreasing</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={exportData}>
            <SelectTrigger className="w-[110px] sm:w-[150px]">
              <Download className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">Export as CSV</SelectItem>
              <SelectItem value="json">Export as JSON</SelectItem>
              <SelectItem value="pdf">Generate Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-2 sm:p-4">
          <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search species, locations, or parameters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[120px] sm:w-[200px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {samplingLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedParameter} onValueChange={setSelectedParameter}>
              <SelectTrigger className="w-[120px] sm:w-[200px]">
                <SelectValue placeholder="Select Parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="salinity">Salinity</SelectItem>
                <SelectItem value="chlorophyll">Chlorophyll</SelectItem>
                <SelectItem value="biodiversity">Biodiversity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Data Section */}
      {isRealTime && (
        <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-blue-600" />
              Live Ocean Data
              {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <CardDescription>
              Real-time oceanographic data from NOAA, NASA, and marine observatories
              {realTimeData?.lastUpdated && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Updated: {new Date(realTimeData.lastUpdated).toLocaleTimeString()}
                </span>
              )}
              {error && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Simulated data
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {realTimeData?.syntheticData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Sea Surface Temp</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {realTimeData.syntheticData.surfaceTemp.toFixed(1)}°C
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Salinity</div>
                  <div className="text-2xl font-bold text-green-600">
                    {realTimeData.syntheticData.salinity.toFixed(1)} PSU
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Chlorophyll-a</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {realTimeData.syntheticData.chlorophyll.toFixed(2)} mg/m³
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Wave Height</div>
                  <div className="text-2xl font-bold text-cyan-600">
                    {realTimeData.syntheticData.wave_height.toFixed(1)} m
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">pH Level</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {realTimeData.syntheticData.pH.toFixed(2)}
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Dissolved O₂</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {realTimeData.syntheticData.dissolved_oxygen.toFixed(1)} mg/L
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Turbidity</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {realTimeData.syntheticData.turbidity.toFixed(1)} NTU
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Sea Level</div>
                  <div className="text-2xl font-bold text-teal-600">
                    {realTimeData.syntheticData.seaLevel > 0 ? '+' : ''}{realTimeData.syntheticData.seaLevel.toFixed(2)} m
                  </div>
                </div>
              </div>
            )}
            {loading && !realTimeData && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-muted-foreground">Fetching real-time data...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Live Data Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {filteredBiodiversityData.slice(0, 4).map((item, idx) => (
          <Card key={idx} className="ocean-glass hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{item.species}</p>
                  <p className="text-2xl font-bold">{item.count}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                  {item.coordinates && (
                    <p className="text-xs text-muted-foreground">
                      {item.coordinates.lat.toFixed(2)}, {item.coordinates.lng.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={item.trend === "increasing" ? "default" : item.trend === "stable" ? "secondary" : "destructive"}>
                    {item.trend}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environmental Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Environmental Parameters
          </CardTitle>
          <CardDescription>Real-time monitoring of key ocean parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {environmentalParameters.map((param, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{param.parameter}</h4>
                  <Badge variant={param.status === "Normal" || param.status === "Good" || param.status === "Optimal" ? "default" : "secondary"}>
                    {param.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">
                  {param.current} {param.unit}
                </div>
                <div className="text-sm text-muted-foreground">
                  Range: {param.min} - {param.max} {param.unit}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visualization Controls</CardTitle>
          <CardDescription>Configure data layers and parameters for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select defaultValue="arabian-sea">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                  <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
                  <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Parameter</label>
              <Select defaultValue="temperature">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Sea Surface Temperature</SelectItem>
                  <SelectItem value="chlorophyll">Chlorophyll-a</SelectItem>
                  <SelectItem value="salinity">Salinity</SelectItem>
                  <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Depth Layer</label>
              <Select defaultValue="surface">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface (0-10m)</SelectItem>
                  <SelectItem value="mixed">Mixed Layer (10-50m)</SelectItem>
                  <SelectItem value="thermocline">Thermocline (50-200m)</SelectItem>
                  <SelectItem value="deep">Deep Water &gt;200m</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select defaultValue="monthly">
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
        </CardContent>
      </Card>

      {/* Main Visualization Tabs */}
  <Tabs defaultValue="map" className="space-y-2 sm:space-y-4">
  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
          <TabsTrigger value="map" className="flex items-center">
            <Map className="mr-2 h-4 w-4" />
            Interactive Map
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Depth Profiles
          </TabsTrigger>
          <TabsTrigger value="correlations" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Correlations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-2 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Interactive Ocean Map</CardTitle>
                <CardDescription>Real-time oceanographic data with sampling locations</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveOceanMap />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Data Layers</CardTitle>
                <CardDescription>Toggle visualization layers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                    <span className="text-sm">Sea Surface Temperature</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                    <span className="text-sm">Chlorophyll-a Concentration</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                    <span className="text-sm">Sampling Stations</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                    <span className="text-sm">Species Occurrences</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-2 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chlorophyll-a Trends</CardTitle>
                <CardDescription>Seasonal variations in primary productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <ChlorophyllTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salinity Distribution</CardTitle>
                <CardDescription>Spatial and temporal salinity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <SalinityHeatmap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

  <TabsContent value="profiles" className="space-y-2 sm:space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temperature-Depth Profiles</CardTitle>
              <CardDescription>Vertical structure of water column properties</CardDescription>
            </CardHeader>
            <CardContent>
              <TemperatureDepthChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-2 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Correlations</CardTitle>
                <CardDescription>Statistical relationships between ocean variables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Temperature vs Chlorophyll</span>
                    <Badge variant="destructive">r = -0.72</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Salinity vs Depth</span>
                    <Badge variant="default">r = 0.84</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Oxygen vs Temperature</span>
                    <Badge variant="secondary">r = -0.56</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ecosystem Indicators</CardTitle>
                <CardDescription>Key metrics for ecosystem health assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Primary Productivity Index</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Upwelling Intensity</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Oxygen Minimum Zone</span>
                    <Badge variant="destructive">Expanding</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
