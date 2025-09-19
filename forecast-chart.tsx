"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

// Mock data for different forecast scenarios
const generateForecastData = (scenario: "conservative" | "optimistic" | "current") => {
  const baseData = [
    { month: "Jan", cash: 500000, revenue: 35000, expenses: 50000 },
    { month: "Feb", cash: 485000, revenue: 38000, expenses: 53000 },
    { month: "Mar", cash: 470000, revenue: 42000, expenses: 57000 },
    { month: "Apr", cash: 455000, revenue: 45000, expenses: 60000 },
    { month: "May", cash: 440000, revenue: 48000, expenses: 63000 },
    { month: "Jun", cash: 425000, revenue: 52000, expenses: 67000 },
  ]

  const multipliers = {
    conservative: { revenue: 0.8, expenses: 1.1 },
    current: { revenue: 1.0, expenses: 1.0 },
    optimistic: { revenue: 1.3, expenses: 0.9 },
  }

  const mult = multipliers[scenario]

  return baseData.map((item, index) => {
    const adjustedRevenue = Math.round(item.revenue * mult.revenue * (1 + index * 0.05))
    const adjustedExpenses = Math.round(item.expenses * mult.expenses)
    const netCashFlow = adjustedRevenue - adjustedExpenses
    const adjustedCash = index === 0 ? item.cash : Math.max(0, baseData[index - 1].cash + netCashFlow)

    return {
      ...item,
      revenue: adjustedRevenue,
      expenses: adjustedExpenses,
      cash: adjustedCash,
      netCashFlow,
    }
  })
}

export function ForecastChart() {
  const [selectedScenario, setSelectedScenario] = useState<"conservative" | "optimistic" | "current">("current")
  const [chartType, setChartType] = useState<"cash" | "revenue" | "comparison">("cash")

  const forecastData = generateForecastData(selectedScenario)
  const conservativeData = generateForecastData("conservative")
  const optimisticData = generateForecastData("optimistic")
  const currentData = generateForecastData("current")

  // Combine data for comparison view
  const comparisonData = currentData.map((item, index) => ({
    month: item.month,
    conservative: conservativeData[index]?.cash || 0,
    current: item.cash,
    optimistic: optimisticData[index]?.cash || 0,
  }))

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case "conservative":
        return "#ef4444" // red
      case "current":
        return "#059669" // emerald
      case "optimistic":
        return "#10b981" // light emerald
      default:
        return "#059669"
    }
  }

  const lastDataPoint = forecastData[forecastData.length - 1]
  const firstDataPoint = forecastData[0]
  const cashChange = lastDataPoint.cash - firstDataPoint.cash
  const isPositive = cashChange >= 0

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Scenario:</span>
        {(["conservative", "current", "optimistic"] as const).map((scenario) => (
          <Button
            key={scenario}
            variant={selectedScenario === scenario ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedScenario(scenario)}
            className="capitalize"
          >
            {scenario}
          </Button>
        ))}
      </div>

      {/* Chart Type Tabs */}
      <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cash">Cash Flow</TabsTrigger>
          <TabsTrigger value="revenue">Revenue vs Expenses</TabsTrigger>
          <TabsTrigger value="comparison">Scenario Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="cash" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold">Cash Runway Projection</h3>
              <p className="text-sm text-muted-foreground">6-month cash flow forecast</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`font-semibold {isPositive ? "text-green-600" : "text-red-600"}`}>
                  {isPositive ? "+" : ""}{cashChange.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">6-month change</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis
  tickFormatter={(value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }
/>

                <Tooltip
                  formatter={(value: number) => [`{value.toLocaleString()}`, "Cash"]}
                  labelStyle={{ color: "#374151" }}
                />
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke={getScenarioColor(selectedScenario)}
                  fill={getScenarioColor(selectedScenario)}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div>
            <h3 className="font-serif font-semibold">Revenue vs Expenses</h3>
            <p className="text-sm text-muted-foreground">Monthly income and spending breakdown</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis
  tickFormatter={(value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }
/>

                <Tooltip
                  formatter={(value: number, name: string) => [
                    `{value.toLocaleString()}`,
                    name === "revenue" ? "Revenue" : "Expenses",
                  ]}
                />
                <Bar dataKey="revenue" fill="#10b981" name="revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div>
            <h3 className="font-serif font-semibold">Scenario Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare cash runway across different scenarios</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis
  tickFormatter={(value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }
/>

                <Tooltip
                  formatter={(value: number, name: string) => [
                    `{value.toLocaleString()}`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="conservative"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Conservative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <span className="text-sm">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm">Optimistic</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{lastDataPoint.cash.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Projected Cash (6mo)</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{lastDataPoint.revenue.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{lastDataPoint.expenses.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Monthly Expenses</p>
        </div>
      </div>
    </div>
  )
}
