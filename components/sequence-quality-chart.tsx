"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Bar, BarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const qualityData = [
  { position: 1, quality: 38, count: 2847392 },
  { position: 50, quality: 37, count: 2834156 },
  { position: 100, quality: 35, count: 2789234 },
  { position: 150, quality: 33, count: 2723456 },
  { position: 200, quality: 30, count: 2634567 },
  { position: 250, quality: 28, count: 2456789 },
  { position: 300, quality: 25, count: 2234567 },
]

const lengthDistribution = [
  { length: "100-150", count: 234567, percentage: 8.2 },
  { length: "150-200", count: 567890, percentage: 19.9 },
  { length: "200-250", count: 1234567, percentage: 43.4 },
  { length: "250-300", count: 678901, percentage: 23.8 },
  { length: "300-350", count: 123456, percentage: 4.3 },
  { length: ">350", count: 8011, percentage: 0.3 },
]

export function SequenceQualityChart() {
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
        {/* Quality Score Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quality Score by Position</h3>
          <ChartContainer
            config={{
              quality: {
                label: "Quality Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" label={{ value: "Position (bp)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Quality Score", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="quality"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Read Length Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Read Length Distribution</h3>
          <ChartContainer
            config={{
              count: {
                label: "Read Count",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lengthDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="length" label={{ value: "Length (bp)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Quality Summary */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-primary">Q32.4</div>
          <div className="text-sm text-muted-foreground">Mean Quality</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-primary">78.5%</div>
          <div className="text-sm text-muted-foreground">Reads Passed QC</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-primary">245 bp</div>
          <div className="text-sm text-muted-foreground">Mean Length</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-primary">1.2%</div>
          <div className="text-sm text-muted-foreground">Error Rate</div>
        </div>
      </div>
    </div>
  )
}
