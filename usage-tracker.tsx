"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Activity, DollarSign, FileText, Calculator, TrendingUp, Clock, CreditCard } from "lucide-react"

interface UsageData {
  scenariosSimulated: number
  reportsGenerated: number
  forecastsViewed: number
  totalCost: number
  monthlyLimit: {
    scenarios: number
    reports: number
  }
}

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7"]

export function UsageTracker() {
  const [usage, setUsage] = useState<UsageData>({
    scenariosSimulated: 47,
    reportsGenerated: 12,
    forecastsViewed: 89,
    totalCost: 23.5,
    monthlyLimit: {
      scenarios: 100,
      reports: 25,
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  // Mock daily usage data for the chart
  const dailyUsage = [
    { day: "Mon", scenarios: 8, reports: 2, cost: 4.2 },
    { day: "Tue", scenarios: 12, reports: 1, cost: 5.8 },
    { day: "Wed", scenarios: 6, reports: 3, cost: 6.9 },
    { day: "Thu", scenarios: 15, reports: 2, cost: 7.5 },
    { day: "Fri", scenarios: 6, reports: 4, cost: 8.2 },
    { day: "Sat", scenarios: 0, reports: 0, cost: 0 },
    { day: "Sun", scenarios: 0, reports: 0, cost: 0 },
  ]

  // Usage breakdown for pie chart
  const usageBreakdown = [
    { name: "Scenario Simulations", value: usage.scenariosSimulated, cost: 14.1 },
    { name: "Report Generation", value: usage.reportsGenerated, cost: 9.4 },
    { name: "Data Updates", value: 23, cost: 0 }, // Free tier
  ]

  const scenarioProgress = (usage.scenariosSimulated / usage.monthlyLimit.scenarios) * 100
  const reportProgress = (usage.reportsGenerated / usage.monthlyLimit.reports) * 100

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-red-500"
    if (progress >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Usage</span>
            <Badge variant="secondary" className="ml-1">
              {usage.totalCost.toFixed(2)}
            </Badge>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Usage Dashboard
            </DialogTitle>
            <DialogDescription>Track your CFO Helper usage and billing for this month</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Scenarios</p>
                      <p className="text-2xl font-bold text-primary">{usage.scenariosSimulated}</p>
                      <p className="text-xs text-muted-foreground">of {usage.monthlyLimit.scenarios} limit</p>
                    </div>
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <div className="mt-4">
                    <Progress value={scenarioProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{scenarioProgress.toFixed(0)}% used</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reports</p>
                      <p className="text-2xl font-bold text-primary">{usage.reportsGenerated}</p>
                      <p className="text-xs text-muted-foreground">of {usage.monthlyLimit.reports} limit</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div className="mt-4">
                    <Progress value={reportProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{reportProgress.toFixed(0)}% used</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold text-primary">{usage.totalCost.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <div className="mt-4">
                    <Badge variant="secondary" className="w-full justify-center">
                      Pay-per-use billing
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Daily Usage Trend</CardTitle>
                <CardDescription>Your activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyUsage}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          value,
                          name === "scenarios" ? "Scenarios" : name === "reports" ? "Reports" : "Cost (₹)",
                        ]}
                      />
                      <Bar dataKey="scenarios" fill="#059669" name="scenarios" />
                      <Bar dataKey="reports" fill="#10b981" name="reports" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Usage Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Usage Breakdown</CardTitle>
                  <CardDescription>How you're using CFO Helper</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {usageBreakdown.map((entry, index) => (
                            <Cell key={`cell-{index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number, name: string) => [value, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {usageBreakdown.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value}</span>
                          <span className="text-muted-foreground">{item.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Billing Details</CardTitle>
                  <CardDescription>Flexprice integration billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="text-sm">Scenario Simulation</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">0.30 each</div>
                        <div className="text-xs text-muted-foreground">{usage.scenariosSimulated} × 0.30</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm">Report Generation</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">0.75 each</div>
                        <div className="text-xs text-muted-foreground">{usage.reportsGenerated} × 0.75</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm">Data Updates</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Free</div>
                        <div className="text-xs text-muted-foreground">Pathway integration</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between font-semibold">
                    <span>Total This Month</span>
                    <span className="text-primary">{usage.totalCost.toFixed(2)}</span>
                  </div>

                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <CreditCard className="w-4 h-4" />
                    View Full Billing History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Usage Alerts */}
            {(scenarioProgress >= 75 || reportProgress >= 75) && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Usage Alert</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        You're approaching your monthly limits. Consider upgrading your plan or monitoring usage more
                        closely.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Upgrade Plan
                        </Button>
                        <Button size="sm" variant="ghost">
                          Set Alerts
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
