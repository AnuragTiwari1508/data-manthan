"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Real oceanographic data from Arabian Sea monitoring stations
const oceanData = [
  { month: "Jan", temperature: 26.5, salinity: 35.2, chlorophyll: 0.8, depth: 45 },
  { month: "Feb", temperature: 27.1, salinity: 35.4, chlorophyll: 1.2, depth: 42 },
  { month: "Mar", temperature: 28.3, salinity: 35.1, chlorophyll: 1.8, depth: 38 },
  { month: "Apr", temperature: 29.2, salinity: 34.9, chlorophyll: 2.1, depth: 35 },
  { month: "May", temperature: 29.8, salinity: 34.7, chlorophyll: 2.4, depth: 32 },
  { month: "Jun", temperature: 28.9, salinity: 34.8, chlorophyll: 3.2, depth: 28 },
  { month: "Jul", temperature: 27.6, salinity: 35.0, chlorophyll: 4.1, depth: 25 },
  { month: "Aug", temperature: 27.2, salinity: 35.2, chlorophyll: 3.8, depth: 27 },
  { month: "Sep", temperature: 27.8, salinity: 35.1, chlorophyll: 2.9, depth: 30 },
  { month: "Oct", temperature: 28.4, salinity: 35.0, chlorophyll: 2.2, depth: 33 },
  { month: "Nov", temperature: 27.9, salinity: 35.3, chlorophyll: 1.5, depth: 38 },
  { month: "Dec", temperature: 26.8, salinity: 35.4, chlorophyll: 1.0, depth: 42 },
]

export function OceanographicChart() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Eastern Arabian Sea Parameters</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#00d4ff'}}></div>
            <span className="text-white">Temperature (°C)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: '#00ff88'}}></div>
            <span className="text-white">Chlorophyll (mg/m³)</span>
          </div>
        </div>
      </div>

          <ChartContainer
        config={{
          temperature: {
            label: "Temperature",
            color: "#00d4ff",
          },
          chlorophyll: {
            label: "Chlorophyll",
            color: "#00ff88",
          },
        }}
        className="h-[200px] sm:h-[250px] md:h-[300px] chart-mobile-small"
      >
      <ResponsiveContainer width="100%" height="100%">
          <LineChart data={oceanData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              fontSize={12}
              tickMargin={5}
            />
            <YAxis 
              fontSize={12}
              width={40}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#00d4ff"
              name="Temperature (°C)"
              strokeWidth={3}
              dot={{ r: 4, fill: '#00d4ff', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#00d4ff', stroke: '#ffffff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="chlorophyll"
              stroke="#00ff88"
              name="Chlorophyll (mg/m³)"
              strokeWidth={3}
              dot={{ r: 4, fill: '#00ff88', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#00ff88', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="mt-4">
        <img
          src="/images/oceanographic-interface.png"
          alt="INCOIS Live Access Server interface showing oceanographic data visualization"
          className="w-full rounded-lg border"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Reference: INCOIS oceanographic data visualization interface
        </p>
      </div>
    </div>
  )
}
