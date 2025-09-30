"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Microscope, BarChart3, Download, Eye, Zap, FileImage, Fish, Camera, Ruler, Calculator, Search, Filter, Settings } from "lucide-react"
import { OtolithViewer } from "@/components/otolith-viewer"
import { MorphometricsChart } from "@/components/morphometrics-chart"
import { SpeciesClassification } from "@/components/species-classification"
import Image from "next/image"
import { otolithAnalysisData, morphometricsData, marineSpeciesData } from "@/lib/dummyData"
import { fishPopulationModel } from "@/lib/marineGenetics"

export function OtolithAnalysisContent() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "processing" | "complete">("idle")
  const [selectedFish, setSelectedFish] = useState("")
  const [measurementMode, setMeasurementMode] = useState<"manual" | "auto">("auto")
  const [searchTerm, setSearchTerm] = useState("")
  const [ageFilter, setAgeFilter] = useState("all")
  const [autoAnalysis, setAutoAnalysis] = useState(true)
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(false)
  const [liveAnalysisData, setLiveAnalysisData] = useState<any>(null)
  const [aiProcessing, setAiProcessing] = useState(false)

  // Fetch real-time fish population and otolith data
  const fetchLiveAnalysisData = async () => {
    setAiProcessing(true)
    try {
      // Simulated real-time fish monitoring data
      const currentTime = new Date()
      const simulatedData = {
        totalFishAnalyzed: Math.floor(Math.random() * 500) + 200,
        averageAge: 3.2 + Math.random() * 2.8,
        growthRate: 0.8 + Math.random() * 0.4,
        populationHealth: 85 + Math.random() * 10,
        lastUpdate: currentTime.toISOString(),
        recentAnalyses: [
          {
            fishId: `FISH-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
            species: "Gadus morhua",
            estimatedAge: Math.floor(Math.random() * 8) + 2,
            length: 35 + Math.random() * 40,
            weight: 500 + Math.random() * 2000,
            confidence: 92 + Math.random() * 7,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          },
          {
            fishId: `FISH-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
            species: "Pleuronectes platessa",
            estimatedAge: Math.floor(Math.random() * 6) + 1,
            length: 25 + Math.random() * 30,
            weight: 200 + Math.random() * 800,
            confidence: 88 + Math.random() * 10,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          },
          {
            fishId: `FISH-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
            species: "Salmo salar",
            estimatedAge: Math.floor(Math.random() * 5) + 3,
            length: 45 + Math.random() * 35,
            weight: 800 + Math.random() * 1500,
            confidence: 95 + Math.random() * 4,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          }
        ],
        stockAssessment: {
          juveniles: Math.floor(Math.random() * 40) + 20, // %
          adults: Math.floor(Math.random() * 50) + 40, // %
          spawning: Math.floor(Math.random() * 20) + 10, // %
        },
        environmentalFactors: {
          waterTemp: 8 + Math.random() * 12,
          depth: Math.floor(Math.random() * 150) + 50,
          season: ["Spring", "Summer", "Autumn", "Winter"][Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 90)) % 4],
          fishingPressure: Math.random() * 100
        },
        aiModelStats: {
          accuracy: 92 + Math.random() * 6,
          processingTime: 0.5 + Math.random() * 1.5,
          totalPredictions: Math.floor(Math.random() * 10000) + 5000,
          modelVersion: "v2.1.3"
        }
      }

      setLiveAnalysisData(simulatedData)
    } catch (error) {
      console.error('Error fetching live analysis data:', error)
    } finally {
      setAiProcessing(false)
    }
  }

  // Real-time monitoring effect
  useEffect(() => {
    if (realTimeMonitoring) {
      fetchLiveAnalysisData()
      
      const interval = setInterval(() => {
        fetchLiveAnalysisData()
      }, 15000) // Update every 15 seconds
      
      return () => clearInterval(interval)
    }
  }, [realTimeMonitoring])

  const handleFileUpload = () => {
    setAnalysisStatus("processing")
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setAnalysisStatus("complete")
      }
    }, 200)
  }

  const runAgeAnalysis = () => {
    setAnalysisStatus("processing")
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisStatus("complete")
    }, 3000)
  }

  const filteredOtolithData = otolithAnalysisData.filter(item => {
    const matchesSearch = item.fishId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAge = !ageFilter || item.age.toString() === ageFilter
    return matchesSearch && matchesAge
  })

  const exportAnalysis = (format: string) => {
    const data = format === "morphometrics" ? morphometricsData : otolithAnalysisData
    const fileName = format === "morphometrics" ? "morphometric_data" : "otolith_analysis"
    
    if (format === "csv") {
      const csvData = otolithAnalysisData.map(item => 
        `${item.fishId},${item.species},${item.age},${item.length},${item.weight},${item.growthRate},${item.location}`
      ).join('\n')
      const blob = new Blob([csvData], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${fileName}.csv`
      a.click()
    } else {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${fileName}.json`
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
              <Fish className="h-6 w-6" />
              Otolith Shape Analysis
            </h2>
            <p className="text-sm opacity-80">AI-powered fish age and species identification</p>
          </div>
        </div>
        {/* Floating fish icons */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${30 + (i % 2) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + Math.random() * 2}s`,
            }}
          >
            <Fish className="h-4 w-4 text-white/40" />
          </div>
        ))}
      </div>

      {/* Header Section */}
  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-balance">Otolith Analysis Module</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-pretty">
            AI-powered otolith shape analysis and morphometrics for species identification
          </p>
        </div>
  <div className="flex flex-wrap gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={realTimeMonitoring}
              onCheckedChange={setRealTimeMonitoring}
              id="real-time-monitoring"
            />
            <label htmlFor="real-time-monitoring" className="text-sm font-medium">
              Live Monitoring {realTimeMonitoring && <Eye className="inline h-3 w-3 text-blue-500 ml-1" />}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={autoAnalysis}
              onCheckedChange={setAutoAnalysis}
              id="auto-analysis"
            />
            <label htmlFor="auto-analysis" className="text-sm font-medium">
              Auto Analysis
            </label>
          </div>
          <Button 
            variant="outline" 
            onClick={runAgeAnalysis}
            disabled={analysisStatus === "processing"}
          >
            {analysisStatus === "processing" ? <Zap className="mr-2 h-4 w-4 animate-pulse" /> : <Calculator className="mr-2 h-4 w-4" />}
            {analysisStatus === "processing" ? "Analyzing..." : "Age Analysis"}
          </Button>
          <Button variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Capture Image
          </Button>
          <Select onValueChange={exportAnalysis}>
            <SelectTrigger className="w-[180px]">
              <Download className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Export Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">Export as CSV</SelectItem>
              <SelectItem value="analysis">Analysis Results</SelectItem>
              <SelectItem value="morphometrics">Morphometric Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Configuration
          </CardTitle>
          <CardDescription>Configure otolith analysis parameters and filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fish ID, species, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-[110px] sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Age Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="2">2 Years</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="4">4+ Years</SelectItem>
              </SelectContent>
            </Select>
            <Select value={measurementMode} onValueChange={(value: "manual" | "auto") => setMeasurementMode(value)}>
              <SelectTrigger className="w-[110px] sm:w-[150px]">
                <Ruler className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Measurement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto Measure</SelectItem>
                <SelectItem value="manual">Manual Measure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Fish Population Monitoring */}
      {realTimeMonitoring && liveAnalysisData && (
        <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Live Fish Population Analysis
              {aiProcessing && <Zap className="h-4 w-4 animate-pulse text-yellow-500" />}
            </CardTitle>
            <CardDescription>
              Real-time AI-powered otolith analysis and population assessment
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                AI Model {liveAnalysisData.aiModelStats.modelVersion} - {liveAnalysisData.aiModelStats.accuracy.toFixed(1)}% accuracy
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Fish Analyzed</div>
                <div className="text-2xl font-bold text-blue-600">
                  {liveAnalysisData.totalFishAnalyzed}
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Avg Age</div>
                <div className="text-2xl font-bold text-green-600">
                  {liveAnalysisData.averageAge.toFixed(1)}y
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Growth Rate</div>
                <div className="text-2xl font-bold text-purple-600">
                  {liveAnalysisData.growthRate.toFixed(2)}
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Population Health</div>
                <div className="text-2xl font-bold text-emerald-600">
                  {liveAnalysisData.populationHealth.toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Microscope className="h-4 w-4" />
                  Recent AI Analysis Results
                </h4>
                <div className="space-y-2">
                  {liveAnalysisData.recentAnalyses.map((analysis: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{analysis.fishId}</div>
                        <div className="text-xs text-muted-foreground">
                          {analysis.species}
                        </div>
                        <div className="text-xs">
                          Age: {analysis.estimatedAge}y | L: {analysis.length.toFixed(0)}cm | W: {analysis.weight.toFixed(0)}g
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">
                          {analysis.confidence.toFixed(0)}% conf.
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(analysis.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Population Structure
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Juveniles (&lt;2y)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${liveAnalysisData.stockAssessment.juveniles}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{liveAnalysisData.stockAssessment.juveniles}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Adults (2-5y)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{width: `${liveAnalysisData.stockAssessment.adults}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{liveAnalysisData.stockAssessment.adults}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spawning (&gt;5y)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{width: `${liveAnalysisData.stockAssessment.spawning}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{liveAnalysisData.stockAssessment.spawning}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-sm mb-2">Environmental Conditions</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Water Temp: {liveAnalysisData.environmentalFactors.waterTemp.toFixed(1)}°C</div>
                    <div>Depth: {liveAnalysisData.environmentalFactors.depth}m</div>
                    <div>Season: {liveAnalysisData.environmentalFactors.season}</div>
                    <div>Pressure: {liveAnalysisData.environmentalFactors.fishingPressure.toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t text-center">
              <div className="text-xs text-muted-foreground">
                AI Processing Time: {liveAnalysisData.aiModelStats.processingTime.toFixed(1)}s avg | 
                Total Predictions: {liveAnalysisData.aiModelStats.totalPredictions.toLocaleString()} | 
                Last Updated: {new Date(liveAnalysisData.lastUpdate).toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results Overview */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {filteredOtolithData.slice(0, 4).map((item, idx) => (
          <Card key={idx} className="ocean-glass hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{item.fishId}</p>
                <p className="text-lg font-bold">{item.species}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <span>Age: {item.age}y</span>
                  <span>L: {item.length}cm</span>
                  <span>W: {item.weight}g</span>
                  <span>GR: {item.growthRate}</span>
                </div>
                <Badge 
                  className="mt-2" 
                  variant={item.age <= 2 ? "default" : item.age <= 4 ? "secondary" : "outline"}
                >
                  {item.age <= 2 ? "Young" : item.age <= 4 ? "Adult" : "Mature"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Species Database */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5" />
            Species Database
          </CardTitle>
          <CardDescription>Reference database for species identification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {marineSpeciesData.map((species, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{species.species}</h4>
                  <Badge variant={species.status === "Stable" ? "default" : species.status === "Common" ? "secondary" : "destructive"}>
                    {species.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium">Scientific:</span> {species.scientificName}</p>
                  <p><span className="font-medium">Habitat:</span> {species.habitat}</p>
                  <p><span className="font-medium">Depth:</span> {species.depth}</p>
                  <p><span className="font-medium">Distribution:</span> {species.distribution}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Otolith Image Upload
          </CardTitle>
          <CardDescription>Upload high-resolution otolith images for automated analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
            <div className="space-y-2 sm:space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  Drag and drop otolith images here, or click to browse
                </p>
                <Button onClick={handleFileUpload} disabled={analysisStatus === "processing"}>
                  {analysisStatus === "processing" ? "Processing..." : "Select Images"}
                </Button>
              </div>

              {analysisStatus === "processing" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Processing images...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>

            <div className="space-y-2 sm:space-y-4">
              <div>
                <Label htmlFor="species">Expected Species (Optional)</Label>
                <Input id="species" placeholder="e.g., Sardinella longiceps" />
              </div>
              <div>
                <Label htmlFor="location">Collection Location</Label>
                <Input id="location" placeholder="e.g., Arabian Sea, Kochi" />
              </div>
              <div>
                <Label htmlFor="date">Collection Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisStatus === "complete" && (
  <Tabs defaultValue="viewer" className="space-y-2 sm:space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
            <TabsTrigger value="viewer" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Otolith Viewer
            </TabsTrigger>
            <TabsTrigger value="morphometrics" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Morphometrics
            </TabsTrigger>
            <TabsTrigger value="classification" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              AI Classification
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center">
              <Microscope className="mr-2 h-4 w-4" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-2 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Interactive Otolith Viewer</CardTitle>
                  <CardDescription>Zoom, measure, and annotate otolith features</CardDescription>
                </CardHeader>
                <CardContent>
                  <OtolithViewer />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis</CardTitle>
                  <CardDescription>Automated feature extraction results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Image Quality</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contour Detection</span>
                      <Badge variant="default">98.5%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Landmark Points</span>
                      <Badge variant="secondary">24 detected</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Basic Measurements</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Length:</span>
                        <span>12.4 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span>8.7 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span>84.2 mm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Perimeter:</span>
                        <span>38.6 mm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="morphometrics" className="space-y-2 sm:space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Morphometric Analysis</CardTitle>
                <CardDescription>Shape descriptors and statistical analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <MorphometricsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classification" className="space-y-2 sm:space-y-4">
            <SpeciesClassification />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-2 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reference Database</CardTitle>
                  <CardDescription>Compare with known specimens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Sardinella longiceps</p>
                        <p className="text-xs text-muted-foreground">Indian Oil Sardine</p>
                      </div>
                      <Badge variant="default">95.2% match</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Sardinella gibbosa</p>
                        <p className="text-xs text-muted-foreground">Goldstripe Sardine</p>
                      </div>
                      <Badge variant="secondary">87.3% match</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Rastrelliger kanagurta</p>
                        <p className="text-xs text-muted-foreground">Indian Mackerel</p>
                      </div>
                      <Badge variant="outline">72.1% match</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistical Comparison</CardTitle>
                  <CardDescription>Morphometric differences analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Shape Index Similarity</span>
                        <span>94.7%</span>
                      </div>
                      <Progress value={94.7} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fourier Descriptor Match</span>
                        <span>91.3%</span>
                      </div>
                      <Progress value={91.3} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Landmark Alignment</span>
                        <span>88.9%</span>
                      </div>
                      <Progress value={88.9} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
