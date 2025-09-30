import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, FileText, Download, Activity, Fish, Dna, Waves, RefreshCw, Calendar, MapPin } from "lucide-react"
import { OceanographicChart } from "@/components/oceanographic-chart"
import { BiodiversityMap } from "@/components/biodiversity-map"
import { TemperatureDepthChart } from "@/components/temperature-depth-chart"
import { ChlorophyllTrendChart } from "@/components/chlorophyll-trend-chart"
import { SalinityHeatmap } from "@/components/salinity-heatmap"
import { biodiversityData, oceanographicData, ednaProcessingData, otolithAnalysisData } from "@/lib/mockDataService"

export function DashboardContent() {
  return (
    <div className="space-y-2 sm:space-y-6 px-2 sm:px-0">
      {/* Ocean Animation Banner */}
  <div className="relative h-28 sm:h-40 w-full overflow-hidden rounded-xl mb-3 sm:mb-6 ocean-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="absolute w-full h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 500,60 C650,40 850,40 1000,60 C1150,80 1200,80 1200,80 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.2)" />
          </svg>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl font-bold flex items-center gap-3 justify-center mb-2">
              <Waves className="h-8 w-8" />
              CMLRE Marine Research Platform
            </h1>
            <p className="text-lg opacity-90">Centre for Marine Living Resources and Ecology</p>
            <p className="text-sm opacity-70 mt-1">Real-time oceanographic monitoring and marine biodiversity analysis</p>
          </div>
        </div>
        {/* Floating marine life icons */}
        {[Fish, Dna, Waves, MapPin].map((Icon, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Icon className="h-5 w-5 text-white/30" />
          </div>
        ))}
      </div>

  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Research Dashboard</h2>
          <p className="text-muted-foreground">Real-time marine data monitoring and analysis platform</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="mr-1 h-3 w-3" />
            System Active
          </Badge>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics - Mobile Optimized */}
      <div className="grid mobile-grid-cards md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mobile-content">
        <Card className="ocean-glass hover:scale-105 transition-all duration-300 card-mobile tap-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm md:text-base font-medium">Species Recorded</CardTitle>
            <Fish className="h-5 w-5 md:h-4 md:w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{biodiversityData.reduce((acc, item) => acc + item.count, 0)}</div>
            <p className="text-xs md:text-sm text-muted-foreground">+12% from last month</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="ocean-glass hover:scale-105 transition-all duration-300 card-mobile tap-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm md:text-base font-medium">eDNA Samples</CardTitle>
            <Dna className="h-5 w-5 md:h-4 md:w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{ednaProcessingData.length}</div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Avg quality: {Math.round(ednaProcessingData.reduce((acc, item) => acc + item.qualityScore, 0) / ednaProcessingData.length)}%
            </p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="ocean-glass hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otolith Analysis</CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{otolithAnalysisData.length}</div>
            <p className="text-xs text-muted-foreground">Fish specimens analyzed</p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="ocean-glass hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocean Parameters</CardTitle>
            <Waves className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{oceanographicData.length}</div>
            <p className="text-xs text-muted-foreground">Active monitoring stations</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="ocean-glass">
          <CardHeader>
            <CardTitle>Temperature-Depth Profile</CardTitle>
            <CardDescription>Vertical ocean temperature distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <TemperatureDepthChart />
          </CardContent>
        </Card>

        <Card className="ocean-glass">
          <CardHeader>
            <CardTitle>Chlorophyll Trends</CardTitle>
            <CardDescription>Seasonal chlorophyll-a concentration</CardDescription>
          </CardHeader>
          <CardContent>
            <ChlorophyllTrendChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 ocean-glass">
          <CardHeader>
            <CardTitle>Recent Biodiversity Observations</CardTitle>
            <CardDescription>Latest species recordings from field stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {biodiversityData.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center space-x-3">
                    <Fish className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">{item.scientificName}</p>
                      <p className="text-sm text-muted-foreground">{item.commonName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.count}</p>
                    <Badge variant={item.conservationStatus === "LC" ? "secondary" : item.conservationStatus === "NT" ? "default" : "destructive"}>
                      {item.conservationStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="ocean-glass">
          <CardHeader>
            <CardTitle>Salinity Distribution</CardTitle>
            <CardDescription>Regional salinity heatmap</CardDescription>
          </CardHeader>
          <CardContent>
            <SalinityHeatmap />
          </CardContent>
        </Card>
      </div>

      {/* Data Processing Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Ingestion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Oceanographic</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Validation</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>OBIS Sync</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
