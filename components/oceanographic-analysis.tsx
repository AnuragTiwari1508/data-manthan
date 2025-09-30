"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  Globe, 
  TrendingUp, 
  Waves, 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
  Activity
} from "lucide-react"

// Real-time oceanographic data simulation
const realtimeOceanData = [
  { time: "00:00", temp: 28.5, salinity: 35.2, chlorophyll: 2.1, windSpeed: 5.2, waveHeight: 1.2 },
  { time: "03:00", temp: 28.3, salinity: 35.3, chlorophyll: 2.0, windSpeed: 4.8, waveHeight: 1.1 },
  { time: "06:00", temp: 28.1, salinity: 35.4, chlorophyll: 1.9, windSpeed: 5.5, waveHeight: 1.3 },
  { time: "09:00", temp: 28.7, salinity: 35.1, chlorophyll: 2.3, windSpeed: 6.1, waveHeight: 1.5 },
  { time: "12:00", temp: 29.2, salinity: 34.9, chlorophyll: 2.5, windSpeed: 6.8, waveHeight: 1.7 },
  { time: "15:00", temp: 29.5, salinity: 34.8, chlorophyll: 2.7, windSpeed: 7.2, waveHeight: 1.8 },
  { time: "18:00", temp: 29.1, salinity: 35.0, chlorophyll: 2.4, windSpeed: 6.5, waveHeight: 1.6 },
  { time: "21:00", temp: 28.8, salinity: 35.1, chlorophyll: 2.2, windSpeed: 5.9, waveHeight: 1.4 },
]

const monthlyTrends = [
  { month: "Jan", temp: 26.5, salinity: 35.2, chlorophyll: 0.8, productivity: 65 },
  { month: "Feb", temp: 27.1, salinity: 35.4, chlorophyll: 1.2, productivity: 72 },
  { month: "Mar", temp: 28.3, salinity: 35.1, chlorophyll: 1.8, productivity: 78 },
  { month: "Apr", temp: 29.2, salinity: 34.9, chlorophyll: 2.1, productivity: 85 },
  { month: "May", temp: 29.8, salinity: 34.7, chlorophyll: 2.4, productivity: 89 },
  { month: "Jun", temp: 28.9, salinity: 34.8, chlorophyll: 3.2, productivity: 95 },
  { month: "Jul", temp: 27.6, salinity: 35.0, chlorophyll: 4.1, productivity: 98 },
  { month: "Aug", temp: 27.2, salinity: 35.2, chlorophyll: 3.8, productivity: 94 },
  { month: "Sep", temp: 27.8, salinity: 35.1, chlorophyll: 2.9, productivity: 87 },
  { month: "Oct", temp: 28.4, salinity: 35.0, chlorophyll: 2.2, productivity: 81 },
  { month: "Nov", temp: 27.9, salinity: 35.3, chlorophyll: 1.5, productivity: 75 },
  { month: "Dec", temp: 26.8, salinity: 35.4, chlorophyll: 1.0, productivity: 68 },
]

const monitoringStations = [
  { 
    id: "INAS01", 
    name: "Kochi Offshore", 
    lat: "9.50°N", 
    lon: "75.80°E", 
    depth: "200m",
    status: "Active",
    lastUpdate: "2 mins ago",
    temp: 28.5,
    salinity: 35.2
  },
  { 
    id: "INAS02", 
    name: "Mangalore Coast", 
    lat: "12.90°N", 
    lon: "74.80°E", 
    depth: "150m",
    status: "Active",
    lastUpdate: "5 mins ago",
    temp: 27.8,
    salinity: 35.4
  },
  { 
    id: "INAS03", 
    name: "Mumbai Offshore", 
    lat: "19.10°N", 
    lon: "72.80°E", 
    depth: "180m",
    status: "Active",
    lastUpdate: "3 mins ago",
    temp: 28.9,
    salinity: 35.3
  },
  { 
    id: "INAS04", 
    name: "Goa Continental Shelf", 
    lat: "15.30°N", 
    lon: "73.90°E", 
    depth: "120m",
    status: "Maintenance",
    lastUpdate: "2 hours ago",
    temp: 29.1,
    salinity: 35.1
  }
]

export function OceanographicAnalysis() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedStation, setSelectedStation] = useState("INAS01")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const selectedStationData = monitoringStations.find(s => s.id === selectedStation)

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header with Real-time Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Globe className="mr-2 h-6 w-6 text-blue-600" />
            Oceanographic Analysis System
          </h1>
          <p className="text-muted-foreground">Real-time monitoring and analysis of Arabian Sea parameters</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            <Activity className="mr-1 h-3 w-3" />
            Live Data
          </Badge>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString()} IST
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Sea Surface Temperature</p>
                <p className="text-2xl font-bold text-blue-900">28.5°C</p>
                <p className="text-xs text-blue-600">+0.3°C from yesterday</p>
              </div>
              <Thermometer className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-700">Salinity</p>
                <p className="text-2xl font-bold text-cyan-900">35.2 PSU</p>
                <p className="text-xs text-cyan-600">+0.1 PSU from yesterday</p>
              </div>
              <Droplets className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Chlorophyll-a</p>
                <p className="text-2xl font-bold text-green-900">2.1 mg/m³</p>
                <p className="text-xs text-green-600">+0.2 mg/m³ from yesterday</p>
              </div>
              <Waves className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Wind Speed</p>
                <p className="text-2xl font-bold text-orange-900">6.2 m/s</p>
                <p className="text-xs text-orange-600">SW Direction</p>
              </div>
              <Wind className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Interface */}
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time Data</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="stations">Monitoring Stations</TabsTrigger>
          <TabsTrigger value="analysis">Advanced Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  24-Hour Temperature & Salinity Trends
                </CardTitle>
                <CardDescription>Hourly measurements from selected monitoring station</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    temp: { label: "Temperature (°C)", color: "hsl(var(--chart-1))" },
                    salinity: { label: "Salinity (PSU)", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realtimeOceanData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="temp" 
                        stroke="var(--color-chart-1)" 
                        strokeWidth={2}
                        name="Temperature (°C)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="salinity" 
                        stroke="var(--color-chart-2)" 
                        strokeWidth={2}
                        name="Salinity (PSU)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Waves className="mr-2 h-4 w-4" />
                  Chlorophyll & Wave Conditions
                </CardTitle>
                <CardDescription>Biological productivity and physical oceanography</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    chlorophyll: { label: "Chlorophyll-a", color: "hsl(var(--chart-3))" },
                    waveHeight: { label: "Wave Height", color: "hsl(var(--chart-4))" },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realtimeOceanData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="chlorophyll" 
                        stroke="var(--color-chart-3)" 
                        fill="var(--color-chart-3)"
                        fillOpacity={0.3}
                        name="Chlorophyll-a (mg/m³)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="waveHeight" 
                        stroke="var(--color-chart-4)" 
                        strokeWidth={2}
                        name="Wave Height (m)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Oceanographic Trends - Arabian Sea</CardTitle>
              <CardDescription>Long-term seasonal patterns and marine productivity index</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  temp: { label: "Temperature", color: "hsl(var(--chart-1))" },
                  chlorophyll: { label: "Chlorophyll", color: "hsl(var(--chart-2))" },
                  productivity: { label: "Productivity Index", color: "hsl(var(--chart-3))" },
                }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temp" 
                      stroke="var(--color-chart-1)" 
                      strokeWidth={3}
                      name="Temperature (°C)"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="chlorophyll" 
                      stroke="var(--color-chart-2)" 
                      strokeWidth={3}
                      name="Chlorophyll-a (mg/m³)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="var(--color-chart-3)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Productivity Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Monitoring Network Status
                </CardTitle>
                <CardDescription>Real-time status of INCOIS monitoring stations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringStations.map((station) => (
                    <div 
                      key={station.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedStation === station.id ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                      onClick={() => setSelectedStation(station.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{station.name}</h3>
                            <Badge variant={station.status === 'Active' ? 'default' : 'secondary'}>
                              {station.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {station.lat}, {station.lon} • Depth: {station.depth}
                          </p>
                          <p className="text-xs text-muted-foreground">Last update: {station.lastUpdate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{station.temp}°C</p>
                          <p className="text-xs text-muted-foreground">{station.salinity} PSU</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Station Details</CardTitle>
                <CardDescription>Selected: {selectedStationData?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedStationData && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Station ID</p>
                        <p className="text-muted-foreground">{selectedStationData.id}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge variant={selectedStationData.status === 'Active' ? 'default' : 'secondary'}>
                          {selectedStationData.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">Coordinates</p>
                        <p className="text-muted-foreground">{selectedStationData.lat}</p>
                        <p className="text-muted-foreground">{selectedStationData.lon}</p>
                      </div>
                      <div>
                        <p className="font-medium">Depth</p>
                        <p className="text-muted-foreground">{selectedStationData.depth}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Current Readings</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Temperature:</span>
                          <span className="font-medium">{selectedStationData.temp}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Salinity:</span>
                          <span className="font-medium">{selectedStationData.salinity} PSU</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Station Data
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Compass className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Current Analysis</h3>
                    <p className="text-sm text-muted-foreground">Ocean current patterns and velocities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium">Upwelling Index</h3>
                    <p className="text-sm text-muted-foreground">Coastal upwelling strength analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover-shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Seasonal Forecasting</h3>
                    <p className="text-sm text-muted-foreground">Long-term oceanographic predictions</p>
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
