"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Brain, Database, CheckCircle, AlertTriangle } from "lucide-react"

export function SpeciesClassification() {
  const classificationResults = [
    {
      species: "Sardinella longiceps",
      commonName: "Indian Oil Sardine",
      confidence: 95.2,
      family: "Clupeidae",
      habitat: "Coastal waters, Arabian Sea",
      status: "confirmed",
    },
    {
      species: "Sardinella gibbosa",
      commonName: "Goldstripe Sardine",
      confidence: 87.3,
      family: "Clupeidae",
      habitat: "Tropical Indo-Pacific",
      status: "possible",
    },
    {
      species: "Rastrelliger kanagurta",
      commonName: "Indian Mackerel",
      confidence: 72.1,
      family: "Scombridae",
      habitat: "Indo-Pacific waters",
      status: "unlikely",
    },
  ]

  const aiModels = [
    { name: "CNN Shape Classifier", accuracy: 94.2, status: "active" },
    { name: "Morphometric SVM", accuracy: 91.7, status: "active" },
    { name: "Fourier Descriptor RF", accuracy: 88.9, status: "active" },
    { name: "Ensemble Model", accuracy: 96.1, status: "primary" },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* AI Classification Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            AI Species Classification Results
          </CardTitle>
          <CardDescription>Multi-model ensemble prediction with confidence scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classificationResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{result.species}</h4>
                    <p className="text-sm text-muted-foreground">{result.commonName}</p>
                    <p className="text-xs text-muted-foreground">Family: {result.family}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{result.confidence}%</div>
                    <Badge
                      variant={
                        result.status === "confirmed"
                          ? "default"
                          : result.status === "possible"
                            ? "secondary"
                            : "outline"
                      }
                      className="mt-1"
                    >
                      {result.status === "confirmed" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {result.status === "possible" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Level</span>
                    <span>{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>

                <div className="mt-3 text-sm">
                  <p>
                    <strong>Habitat:</strong> {result.habitat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              AI Model Performance
            </CardTitle>
            <CardDescription>Individual model contributions to classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiModels.map((model, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{model.name}</p>
                    <p className="text-xs text-muted-foreground">Accuracy: {model.accuracy}%</p>
                  </div>
                  <Badge variant={model.status === "primary" ? "default" : "secondary"}>{model.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation & Quality Control</CardTitle>
            <CardDescription>Classification reliability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Image Quality Score</span>
                  <span>9.2/10</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Feature Extraction Completeness</span>
                  <span>98.5%</span>
                </div>
                <Progress value={98.5} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Model Consensus</span>
                  <span>94.7%</span>
                </div>
                <Progress value={94.7} className="h-2" />
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Validate Classification
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Request Expert Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
