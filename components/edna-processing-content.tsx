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
import { Upload, Dna, BarChart3, Download, Database, Zap, FileText, Microscope, Waves, Play, Pause, Settings, Search, Filter } from "lucide-react"
import { SequenceQualityChart } from "@/components/sequence-quality-chart"
import { TaxonomicComposition } from "@/components/taxonomic-composition"
import { BiodiversityMetrics } from "@/components/biodiversity-metrics"
import { SequenceViewer } from "@/components/sequence-viewer"
import Image from "next/image"
import { ednaProcessingData, geneticSequenceData, marineSpeciesData } from "@/lib/dummyData"
import { simulateGeneticAnalysis, enhancedGeneticSequences, calculateBiodiversityIndices, ednaPipelineStages, generateRandomDNASequence } from "@/lib/marineGenetics"

export function EdnaProcessingContent() {
  const [processingStage, setProcessingStage] = useState<"upload" | "processing" | "complete">("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedSample, setSelectedSample] = useState("")
  const [pipelineStep, setPipelineStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [qualityFilter, setQualityFilter] = useState("all")
  const [realTimeSequencing, setRealTimeSequencing] = useState(false)
  const [liveSequenceData, setLiveSequenceData] = useState<any>(null)
  const [sequencingProgress, setSequencingProgress] = useState(0)

  // Fetch real-time genetic data from public databases
  const fetchLiveSequenceData = async () => {
    try {
      // NCBI GenBank API for marine species sequences
      const ncbiResponse = await fetch(
        'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=nuccore&term=marine+species+environmental+DNA&retmax=10&retmode=json'
      ).catch(() => null)

      // Simulated real-time sequencing data
      const currentTime = new Date()
      const simulatedData = {
        totalSequences: Math.floor(Math.random() * 1000) + 500,
        qualityScore: 85 + Math.random() * 10,
        speciesDetected: Math.floor(Math.random() * 50) + 20,
        novelSequences: Math.floor(Math.random() * 10),
        lastUpdate: currentTime.toISOString(),
        recentFinds: [
          {
            species: "Mytilus edulis",
            sequence: "ATCGATCGATCGTAGCTAG",
            quality: 92,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          },
          {
            species: "Calanus finmarchicus", 
            sequence: "GCTAGCTAGCTAGCTGAT",
            quality: 88,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          },
          {
            species: "Salmo salar",
            sequence: "TGATCGATCGATCGCTAG",
            quality: 95,
            timestamp: new Date(currentTime.getTime() - Math.random() * 3600000).toISOString()
          }
        ],
        biodiversityIndex: 0.7 + Math.random() * 0.3,
        environmentalConditions: {
          temperature: 12 + Math.random() * 8,
          salinity: 32 + Math.random() * 4,
          pH: 7.9 + Math.random() * 0.3,
          depth: Math.floor(Math.random() * 200) + 10
        }
      }

      setLiveSequenceData(simulatedData)
    } catch (error) {
      console.error('Error fetching live sequence data:', error)
    }
  }

  // Real-time sequencing effect
  useEffect(() => {
    if (realTimeSequencing) {
      fetchLiveSequenceData()
      
      const interval = setInterval(() => {
        fetchLiveSequenceData()
        setSequencingProgress(prev => (prev + 1) % 100)
      }, 10000) // Update every 10 seconds
      
      return () => clearInterval(interval)
    }
  }, [realTimeSequencing])

  const handleSequenceUpload = () => {
    setProcessingStage("processing")
    setIsProcessing(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setProcessingStage("complete")
        setIsProcessing(false)
      }
    }, 300)
  }

  const runPipeline = () => {
    setIsProcessing(true)
    const steps = ["Quality Control", "Denoising", "Clustering", "Taxonomic Assignment", "Analysis Complete"]
    let currentStep = 0
    
    const stepInterval = setInterval(() => {
      currentStep++
      setPipelineStep(currentStep)
      if (currentStep >= steps.length) {
        clearInterval(stepInterval)
        setIsProcessing(false)
      }
    }, 2000)
  }

  const filteredSequenceData = geneticSequenceData.filter(seq => {
    const matchesSearch = seq.sequenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seq.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesQuality = !qualityFilter || seq.quality >= parseInt(qualityFilter)
    return matchesSearch && matchesQuality
  })

  const exportResults = (format: string) => {
    const data = format === "sequences" ? geneticSequenceData : ednaProcessingData
    const fileName = format === "sequences" ? "sequence_data" : "edna_results"
    
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.json`
    a.click()
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Ocean Animation Banner */}
      <div className="relative h-32 w-full overflow-hidden rounded-xl mb-4 ocean-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="absolute w-full h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 500,60 C650,40 850,40 1000,60 C1150,80 1200,80 1200,80 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.2)" />
          </svg>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
              <Dna className="h-6 w-6" />
              Environmental DNA Analysis
            </h2>
            <p className="text-sm opacity-80">Marine biodiversity through genetic sequencing</p>
          </div>
        </div>
        {/* Floating DNA helixes animation */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Microscope className="h-4 w-4 text-white/40" />
          </div>
        ))}
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">eDNA Processing System</h1>
          <p className="text-muted-foreground text-pretty">
            Environmental DNA analysis pipeline for marine biodiversity assessment
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={realTimeSequencing}
              onCheckedChange={setRealTimeSequencing}
              id="real-time-seq"
            />
            <label htmlFor="real-time-seq" className="text-sm font-medium">
              Live Sequencing {realTimeSequencing && <Zap className="inline h-3 w-3 text-yellow-500 ml-1" />}
            </label>
          </div>
          <Button 
            variant="outline" 
            onClick={runPipeline}
            disabled={isProcessing}
          >
            {isProcessing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isProcessing ? "Processing..." : "Run Pipeline"}
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Select onValueChange={exportResults}>
            <SelectTrigger className="w-[180px]">
              <Download className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Export Results" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequences">Sequence Data</SelectItem>
              <SelectItem value="samples">Sample Results</SelectItem>
              <SelectItem value="taxonomy">Taxonomic Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Processing Pipeline Status */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Processing Pipeline
            </CardTitle>
            <CardDescription>Current analysis step: {pipelineStep}/5</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(pipelineStep / 5) * 100} className="w-full" />
            <div className="mt-2 text-sm text-muted-foreground">
              Step {pipelineStep}: {["Quality Control", "Denoising", "Clustering", "Taxonomic Assignment", "Analysis Complete"][pipelineStep - 1]}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sample Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Sample Management
          </CardTitle>
          <CardDescription>Manage and analyze eDNA samples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search samples or species..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={qualityFilter} onValueChange={setQualityFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Quality Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quality</SelectItem>
                <SelectItem value="95">95%+ Quality</SelectItem>
                <SelectItem value="90">90%+ Quality</SelectItem>
                <SelectItem value="85">85%+ Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Sequencing Data */}
      {realTimeSequencing && liveSequenceData && (
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              Live DNA Sequencing
              <Progress value={sequencingProgress} className="w-32 ml-auto" />
            </CardTitle>
            <CardDescription>
              Real-time environmental DNA detection and analysis
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Last update: {new Date(liveSequenceData.lastUpdate).toLocaleTimeString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Sequences</div>
                <div className="text-2xl font-bold text-green-600">
                  {liveSequenceData.totalSequences.toLocaleString()}
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Quality Score</div>
                <div className="text-2xl font-bold text-blue-600">
                  {liveSequenceData.qualityScore.toFixed(1)}%
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Species Detected</div>
                <div className="text-2xl font-bold text-purple-600">
                  {liveSequenceData.speciesDetected}
                </div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Biodiversity Index</div>
                <div className="text-2xl font-bold text-cyan-600">
                  {liveSequenceData.biodiversityIndex.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Recent Sequence Identifications
              </h4>
              <div className="space-y-2">
                {liveSequenceData.recentFinds.map((find: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{find.species}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {find.sequence}...
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Q: {find.quality}%</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(find.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Temperature</div>
                  <div className="font-semibold">{liveSequenceData.environmentalConditions.temperature.toFixed(1)}°C</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Salinity</div>
                  <div className="font-semibold">{liveSequenceData.environmentalConditions.salinity.toFixed(1)} PSU</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">pH</div>
                  <div className="font-semibold">{liveSequenceData.environmentalConditions.pH.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Depth</div>
                  <div className="font-semibold">{liveSequenceData.environmentalConditions.depth}m</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sample Data Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {ednaProcessingData.map((item, idx) => (
          <Card key={idx} className="ocean-glass hover:scale-105 transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{item.sampleId}</p>
                <p className="text-2xl font-bold">{item.quality}%</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Seq: {item.sequences.toLocaleString()}</span>
                  <span>Sp: {item.species}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Upload & Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Sample Upload & Metadata
          </CardTitle>
          <CardDescription>Upload FASTQ files and provide sample metadata following MIxS standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Dna className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">Upload FASTQ files (paired-end sequencing data)</p>
                <Button onClick={handleSequenceUpload} disabled={processingStage === "processing"}>
                  {processingStage === "processing" ? "Processing..." : "Select FASTQ Files"}
                </Button>
              </div>

              {processingStage === "processing" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality Control</span>
                      <span>{Math.min(uploadProgress, 25)}%</span>
                    </div>
                    <Progress value={Math.min(uploadProgress, 25)} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sequence Filtering</span>
                      <span>{Math.max(0, Math.min(uploadProgress - 25, 25))}%</span>
                    </div>
                    <Progress value={Math.max(0, Math.min(uploadProgress - 25, 25))} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taxonomic Assignment</span>
                      <span>{Math.max(0, Math.min(uploadProgress - 50, 25))}%</span>
                    </div>
                    <Progress value={Math.max(0, Math.min(uploadProgress - 50, 25))} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Biodiversity Analysis</span>
                      <span>{Math.max(0, uploadProgress - 75)}%</span>
                    </div>
                    <Progress value={Math.max(0, uploadProgress - 75)} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sample-id">Sample ID</Label>
                  <Input id="sample-id" placeholder="AS-eDNA-2024-001" />
                </div>
                <div>
                  <Label htmlFor="collection-date">Collection Date</Label>
                  <Input id="collection-date" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" placeholder="12.9716° N" />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" placeholder="74.7965° E" />
                </div>
              </div>

              <div>
                <Label htmlFor="depth">Sampling Depth (m)</Label>
                <Input id="depth" placeholder="10" type="number" />
              </div>

              <div>
                <Label htmlFor="primer">Target Gene/Primer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primer set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16s">16S rRNA (bacteria)</SelectItem>
                    <SelectItem value="18s">18S rRNA (eukaryotes)</SelectItem>
                    <SelectItem value="coi">COI (metazoans)</SelectItem>
                    <SelectItem value="12s">12S rRNA (fish)</SelectItem>
                    <SelectItem value="its">ITS (fungi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="environment">Environment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coastal">Coastal water</SelectItem>
                    <SelectItem value="offshore">Offshore water</SelectItem>
                    <SelectItem value="estuary">Estuarine</SelectItem>
                    <SelectItem value="sediment">Marine sediment</SelectItem>
                    <SelectItem value="coral">Coral reef</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Results */}
      {processingStage === "complete" && (
        <Tabs defaultValue="quality" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="quality" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Quality Control
            </TabsTrigger>
            <TabsTrigger value="taxonomy" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              Taxonomy
            </TabsTrigger>
            <TabsTrigger value="biodiversity" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Biodiversity
            </TabsTrigger>
            <TabsTrigger value="sequences" className="flex items-center">
              <Dna className="mr-2 h-4 w-4" />
              Sequences
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quality" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sequence Quality Metrics</CardTitle>
                  <CardDescription>Quality scores and filtering statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <SequenceQualityChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Summary</CardTitle>
                  <CardDescription>Pipeline statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raw Reads</span>
                      <Badge variant="outline">2,847,392</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quality Filtered</span>
                      <Badge variant="secondary">2,234,156</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Merged Pairs</span>
                      <Badge variant="secondary">1,987,432</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Unique ASVs</span>
                      <Badge variant="default">1,247</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Quality Thresholds</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Min Quality Score:</span>
                        <span>Q30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Length:</span>
                        <span>150 bp</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Expected Errors:</span>
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="space-y-4">
            <TaxonomicComposition />
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-4">
            <BiodiversityMetrics />
          </TabsContent>

          <TabsContent value="sequences" className="space-y-4">
            <SequenceViewer />
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export Options</CardTitle>
                  <CardDescription>Download processed data in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    ASV Table (CSV)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Taxonomic Assignments (TSV)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Representative Sequences (FASTA)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Phylogenetic Tree (Newick)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    BIOM Format
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Integration</CardTitle>
                  <CardDescription>Submit to public repositories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Submit to IndOBIS
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Export to GBIF
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Submit to NCBI SRA
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Microscope className="mr-2 h-4 w-4" />
                    Generate Darwin Core Archive
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
