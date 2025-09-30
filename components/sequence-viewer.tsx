"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, Search, Filter, Dna, Eye, BarChart3, FileText } from "lucide-react"

interface SequenceViewerProps {
  sequences?: Array<{
    id: string
    sequence: string
    quality: number
    species?: string
    length: number
  }>
}

export function SequenceViewer({ sequences = [] }: SequenceViewerProps) {
  const [selectedSequence, setSelectedSequence] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterQuality, setFilterQuality] = useState("all")
  const [viewMode, setViewMode] = useState<"raw" | "formatted" | "colored">("colored")

  // Sample sequences if none provided
  const defaultSequences = [
    {
      id: "SEQ-001",
      sequence: "ATGGCACACCTAACACTAACCGTAAACGAAGGAATCGGTGCAATAATGTCTGGAATGGATGTAGACGACGGTGTTTACACTAAAGGTCGTGGTAATCTCGGTGGATTCGGAACTGAAATGGATAATGGTGATACAGGTCGTGGAATGGGAGGAATGAAT",
      quality: 98.5,
      species: "Gadus morhua",
      length: 658
    },
    {
      id: "SEQ-002", 
      sequence: "CGGTTGGATCACCTCCTAAATCGAACGAGACTCTTGGCACTGTAACCAAGAACATGAAGTAACGAACGAACGATCAAGACCCTATGGAGCTTAGAATAAACGATGATAACCTAGTAACTATCGCCTACATCTCTAACAACGATAGAGACGAAACACC",
      quality: 94.3,
      species: "Thunnus albacares",
      length: 1500
    },
    {
      id: "SEQ-003",
      sequence: "ATGTCTGGTAATGGATGTGGACGACGGTGTTTACACTAAAGGTCGTGGTAATCTCGGTGGATTCGGAACTGAAATGGATAATGGTGATACAGGTCGTGGAATGGGAGGAATGAATCGTGGAATGATCCTACTGACTTCCACGGTATTACCCAC",
      quality: 91.8,
      species: "Lutjanus campechanus", 
      length: 650
    }
  ]

  const displaySequences = sequences.length > 0 ? sequences : defaultSequences
  const currentSequence = displaySequences.find(seq => seq.id === selectedSequence) || displaySequences[0]

  const formatSequence = (sequence: string, mode: string) => {
    switch (mode) {
      case "formatted":
        return sequence.match(/.{1,10}/g)?.join(" ") || sequence
      case "colored":
        return sequence.split("").map((base, index) => (
          <span 
            key={index}
            className={`${getBaseColor(base)} font-mono text-sm`}
          >
            {base}
          </span>
        ))
      default:
        return sequence
    }
  }

  const getBaseColor = (base: string) => {
    switch (base.toUpperCase()) {
      case "A": return "text-red-500"
      case "T": return "text-blue-500" 
      case "G": return "text-green-500"
      case "C": return "text-orange-500"
      default: return "text-gray-500"
    }
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 95) return "bg-green-500"
    if (quality >= 90) return "bg-yellow-500"
    if (quality >= 80) return "bg-orange-500"
    return "bg-red-500"
  }

  const copySequence = async () => {
    if (currentSequence) {
      await navigator.clipboard.writeText(currentSequence.sequence)
    }
  }

  const downloadSequence = () => {
    if (currentSequence) {
      const content = `>${currentSequence.id} ${currentSequence.species || 'Unknown species'}\n${currentSequence.sequence}`
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${currentSequence.id}.fasta`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const analyzeSequence = () => {
    if (!currentSequence) return null

    const sequence = currentSequence.sequence
    const length = sequence.length
    const aCount = (sequence.match(/A/g) || []).length
    const tCount = (sequence.match(/T/g) || []).length
    const gCount = (sequence.match(/G/g) || []).length
    const cCount = (sequence.match(/C/g) || []).length
    
    const gcContent = ((gCount + cCount) / length * 100).toFixed(1)
    const atContent = ((aCount + tCount) / length * 100).toFixed(1)

    return {
      length,
      gcContent: parseFloat(gcContent),
      atContent: parseFloat(atContent),
      baseComposition: { A: aCount, T: tCount, G: gCount, C: cCount }
    }
  }

  const sequenceAnalysis = analyzeSequence()

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="flex-1">
          <Label htmlFor="sequence-select">Select Sequence</Label>
          <Select value={selectedSequence} onValueChange={setSelectedSequence}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a sequence to view" />
            </SelectTrigger>
            <SelectContent>
              {displaySequences.map((seq) => (
                <SelectItem key={seq.id} value={seq.id}>
                  {seq.id} - {seq.species || 'Unknown'} (Q: {seq.quality})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

  <div className="flex gap-1 sm:gap-2">
          <Input
            placeholder="Search sequences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="text-xs sm:text-sm">
          <TabsTrigger value="colored">Colored</TabsTrigger>
          <TabsTrigger value="formatted">Formatted</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
        </TabsList>

        <TabsContent value={viewMode} className="space-y-2 sm:space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Dna className="h-5 w-5" />
                    {currentSequence?.id}
                  </CardTitle>
                  <CardDescription>
                    {currentSequence?.species} • Length: {currentSequence?.length} bp
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getQualityColor(currentSequence?.quality || 0)} text-white`}>
                    Q: {currentSequence?.quality}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={copySequence}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadSequence}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 w-full rounded border p-2 sm:p-4">
                <div className="font-mono text-sm leading-relaxed break-all">
                  {viewMode === "colored" ? (
                    <div className="flex flex-wrap">
                      {formatSequence(currentSequence?.sequence || "", viewMode)}
                    </div>
                  ) : (
                    formatSequence(currentSequence?.sequence || "", viewMode)
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {sequenceAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sequence Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Length</Label>
                      <p className="text-2xl font-bold">{sequenceAnalysis.length} bp</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">GC Content</Label>
                      <p className="text-2xl font-bold">{sequenceAnalysis.gcContent}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Base Composition</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <div className="text-center">
                        <div className="text-red-500 font-bold text-lg">A</div>
                        <div className="text-sm">{sequenceAnalysis.baseComposition.A}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-500 font-bold text-lg">T</div>
                        <div className="text-sm">{sequenceAnalysis.baseComposition.T}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-500 font-bold text-lg">G</div>
                        <div className="text-sm">{sequenceAnalysis.baseComposition.G}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-500 font-bold text-lg">C</div>
                        <div className="text-sm">{sequenceAnalysis.baseComposition.C}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Sequence Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Species</Label>
                    <p className="font-medium">{currentSequence?.species || 'Unknown'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Quality Score</Label>
                    <p className="font-medium">{currentSequence?.quality}/100</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">AT Content</Label>
                    <p className="font-medium">{sequenceAnalysis.atContent}%</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Sequence Type</Label>
                    <p className="font-medium">DNA</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
