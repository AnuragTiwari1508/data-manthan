"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const phylumData = [
  { name: "Chordata", value: 342, percentage: 27.4, color: "hsl(var(--chart-1))" },
  { name: "Arthropoda", value: 289, percentage: 23.2, color: "hsl(var(--chart-2))" },
  { name: "Mollusca", value: 156, percentage: 12.5, color: "hsl(var(--chart-3))" },
  { name: "Cnidaria", value: 134, percentage: 10.7, color: "hsl(var(--chart-4))" },
  { name: "Annelida", value: 98, percentage: 7.9, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 228, percentage: 18.3, color: "hsl(var(--muted))" },
]

const speciesData = [
  { species: "Sardinella longiceps", reads: 45678, percentage: 18.4 },
  { species: "Rastrelliger kanagurta", reads: 34567, percentage: 13.9 },
  { species: "Decapterus russelli", reads: 23456, percentage: 9.4 },
  { species: "Auxis thazard", reads: 18765, percentage: 7.5 },
  { species: "Scomberomorus commerson", reads: 15432, percentage: 6.2 },
  { species: "Caranx ignobilis", reads: 12345, percentage: 5.0 },
  { species: "Lutjanus argentimaculatus", reads: 9876, percentage: 4.0 },
  { species: "Epinephelus malabaricus", reads: 8765, percentage: 3.5 },
]

export function TaxonomicComposition() {
  return (
    <div className="space-y-8 px-2 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Phylum Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Phylum Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Taxonomic composition at phylum level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "ASV Count",
                },
              }}
              className="h-48 sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={phylumData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {phylumData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Species */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Most Abundant Species</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Top detected species by read count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {speciesData.slice(0, 6).map((species, index) => (
                <div key={index} className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{species.species}</span>
                    <span>{species.percentage}%</span>
                  </div>
                  <Progress value={species.percentage} className="h-1.5 sm:h-2" />
                  <div className="text-[10px] sm:text-xs text-muted-foreground">{species.reads.toLocaleString()} reads</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Species List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Species Detection Results</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Complete list of identified species with confidence scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {speciesData.map((species, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg gap-2 sm:gap-0">
                <div className="flex-1">
                  <p className="font-medium text-xs sm:text-sm">{species.species}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {species.reads.toLocaleString()} reads ({species.percentage}%)
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <Badge
                    variant={species.percentage > 10 ? "default" : species.percentage > 5 ? "secondary" : "outline"}
                  >
                    {species.percentage > 10 ? "High" : species.percentage > 5 ? "Medium" : "Low"}
                  </Badge>
                  <Badge variant="outline">
                    {species.percentage > 15
                      ? "99%"
                      : species.percentage > 10
                        ? "95%"
                        : species.percentage > 5
                          ? "90%"
                          : "85%"} {" "}
                    conf.
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Taxonomic Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">1,247</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Total ASVs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">156</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Species Identified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">23</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Families</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-primary">8</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Phyla</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
