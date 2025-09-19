"use client"
const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};


import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface BudgetScenario {
  teamSize: number
  monthlySpending: number
  productPrice: number
  currentCash: number
  monthlyRevenue: number
  burnRate: number
  runway: number
}

export function BudgetSimulator() {
  const [scenario, setScenario] = useState<BudgetScenario>({
    teamSize: 12,
    monthlySpending: 50000,
    productPrice: 99,
    currentCash: 500000,
    monthlyRevenue: 35000,
    burnRate: 15000,
    runway: 8.5,
  })

  const [scenarioCount, setScenarioCount] = useState(0)

  // Calculate derived values when inputs change
  useEffect(() => {
    const avgSalary = 8000 // Average monthly salary per person
    const fixedCosts = 15000 // Fixed monthly costs (office, tools, etc.)
    const totalSalaryCosts = scenario.teamSize * avgSalary
    const totalMonthlyCosts = totalSalaryCosts + fixedCosts + scenario.monthlySpending

    // Estimate revenue based on price (simplified model)
    const estimatedCustomers = Math.max(1, Math.floor(scenario.monthlyRevenue / scenario.productPrice))
    const newMonthlyRevenue = estimatedCustomers * scenario.productPrice

    const newBurnRate = totalMonthlyCosts - newMonthlyRevenue
    const newRunway = newBurnRate > 0 ? scenario.currentCash / newBurnRate : 999

    setScenario((prev) => ({
      ...prev,
      monthlyRevenue: newMonthlyRevenue,
      burnRate: Math.max(0, newBurnRate),
      runway: Math.min(999, newRunway),
    }))
  }, [scenario.teamSize, scenario.monthlySpending, scenario.productPrice])

  const handleSliderChange = (field: keyof BudgetScenario, value: number[]) => {
    setScenario((prev) => ({ ...prev, [field]: value[0] }))
    setScenarioCount((prev) => prev + 1)
  }

  const getRunwayStatus = () => {
    if (scenario.runway > 12) return { color: "bg-green-500", text: "Healthy", icon: CheckCircle }
    if (scenario.runway > 6) return { color: "bg-yellow-500", text: "Caution", icon: AlertTriangle }
    return { color: "bg-red-500", text: "Critical", icon: AlertTriangle }
  }

  const runwayStatus = getRunwayStatus()

  return (
    <div className="space-y-6">
      {/* Scenario Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Size */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Team Size</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-primary">{scenario.teamSize} people</div>
            <Slider
              value={[scenario.teamSize]}
              onValueChange={(value) => handleSliderChange("teamSize", value)}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>50</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Spending */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Extra Spending</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-primary">{scenario.monthlySpending.toLocaleString()}</div>
            <Slider
              value={[scenario.monthlySpending]}
              onValueChange={(value) => handleSliderChange("monthlySpending", value)}
              max={100000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>100k</span>
            </div>
          </CardContent>
        </Card>

        {/* Product Price */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Product Price</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-primary">{scenario.productPrice}</div>
            <Slider
              value={[scenario.productPrice]}
              onValueChange={(value) => handleSliderChange("productPrice", value)}
              max={500}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>500</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">{scenario.monthlyRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Burn</p>
                <p className="text-2xl font-bold text-red-600">{scenario.burnRate.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Runway</p>
                <p className="text-2xl font-bold">{scenario.runway.toFixed(1)} months</p>
              </div>
              <runwayStatus.icon className={`w-8 h-8 text-white`} />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className={`{runwayStatus.color} text-white`}>
                {runwayStatus.text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scenarios Tested</p>
                <p className="text-2xl font-bold text-primary">{scenarioCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Scenario Insights</CardTitle>
          <CardDescription>Key takeaways from your current scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scenario.runway < 6 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Critical Runway Warning</p>
                  <p className="text-sm text-red-700">
                    Your runway is below 6 months. Consider reducing costs or increasing revenue.
                  </p>
                </div>
              </div>
            )}

            {scenario.burnRate <= 0 && (
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Profitable Scenario</p>
                  <p className="text-sm text-green-700">Congratulations! This scenario generates positive cash flow.</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Team Impact</p>
                <p className="text-sm text-blue-700">
                  Each additional team member costs approximately 8,000/month in salary plus benefits.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
