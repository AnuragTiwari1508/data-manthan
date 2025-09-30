"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const diversityData = [
  { depth: 0, shannon: 3.2, simpson: 0.85, chao1: 167 },
  { depth: 500, shannon: 3.4, simpson: 0.87, chao1: 172 },
  { depth: 1000, shannon: 3.6, simpson: 0.89, chao1: 178 },
  { depth: 1500, shannon: 3.5, simpson: 0.88, chao1: 175 },
  { depth: 2000, shannon: 3.3, simpson: 0.86, chao1: 169 },
]

const rarefactionData = [
  { reads: 0, species: 0 },
  { reads: 1000, species: 45 },
  { reads: 5000, species: 89 },
  { reads: 10000, species: 124 },
  { reads: 20000, species: 145 },
  { reads: 50000, species: 156 },
  { reads: 100000, species: 162 },
  { reads: 200000, species: 165 },
]

export function BiodiversityMetrics() {
  return (
    <div className="space-y-2 sm:space-y-6 px-2 sm:px-0">
      {/* Key Diversity Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shannon Diversity</CardTitle>
            <CardDescription>Species diversity index</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">3.42</div>
            <div className="text-sm text-muted-foreground">High diversity (H' &gt; 3.0)</div>
            <Badge variant="default" className="mt-2">
              Excellent
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Simpson Index</CardTitle>
            <CardDescription>Dominance measure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">0.87</div>
            <div className="text-sm text-muted-foreground">Low dominance (1-D = 0.87)</div>
            <Badge variant="secondary" className="mt-2">
              Good
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chao1 Richness</CardTitle>
            <CardDescription>Estimated species richness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">174</div>
            <div className="text-sm text-muted-foreground">Estimated total species</div>
            <Badge variant="outline" className="mt-2">
              89% sampled
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Diversity Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rarefaction Curve</CardTitle>
            <CardDescription>Species accumulation with sampling effort</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                species: {
                  label: "Species Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rarefactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="reads" label={{ value: "Sequencing Depth", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Species Count", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="species"
                    stroke="var(--color-chart-1)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diversity vs Sampling Depth</CardTitle>
            <CardDescription>Shannon diversity across sequencing depths</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                shannon: {
                  label: "Shannon Index",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diversityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="depth" label={{ value: "Sampling Depth", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Shannon Index", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="shannon" fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ecological Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Ecological Assessment</CardTitle>
          <CardDescription>Biodiversity indicators and ecosystem health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Evenness (J')</h4>
              <div className="text-2xl font-bold">0.78</div>
              <Badge variant="default">High</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Dominance (D)</h4>
              <div className="text-2xl font-bold">0.13</div>
              <Badge variant="secondary">Low</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Margalef Richness</h4>
              <div className="text-2xl font-bold">12.4</div>
              <Badge variant="default">High</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Fisher's Alpha</h4>
              <div className="text-2xl font-bold">34.7</div>
              <Badge variant="secondary">Moderate</Badge>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Ecosystem Health Assessment</h4>
            <p className="text-sm text-muted-foreground">
              The high Shannon diversity (3.42) and low dominance (0.13) indicate a healthy, well-balanced marine
              ecosystem. The rarefaction curve suggests adequate sampling coverage with ~89% of estimated species
              detected. These metrics are consistent with productive coastal waters in the Arabian Sea region.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
