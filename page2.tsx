import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BudgetSimulator } from "@/components/budget-simulator"
import { ForecastChart } from "@/components/forecast-chart"
import { UsageTracker } from "@/components/usage-tracker"
import { ReportGenerator } from "@/components/report-generator"
import { Calculator, TrendingUp, FileText, Users, Settings } from "lucide-react"
import Link from "next/link"

export default function CFOHelperDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-balance">CFO Helper</h1>
                <p className="text-sm text-muted-foreground">Financial Planning Made Simple</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                Beta Version
              </Badge>
              <Link href="/integrations">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Integrations</span>
                </Button>
              </Link>
              <UsageTracker />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-balance mb-4">Make Informed Financial Decisions</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Simulate budget scenarios, forecast outcomes, and generate reports to guide your business decisions with
            confidence.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Budget Simulator - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <CardTitle className="font-serif">Budget Scenario Simulator</CardTitle>
                </div>
                <CardDescription>
                  Adjust your spending, hiring, and pricing to see real-time impact on your budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetSimulator />
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-serif">Current Runway</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">8.5 months</div>
                <p className="text-sm text-muted-foreground">Based on current burn rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-serif">Team Size</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">12 people</div>
                <p className="text-sm text-muted-foreground">Current headcount</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-serif">Reports Generated</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">23</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="font-serif">Financial Forecast</CardTitle>
              </div>
              <CardDescription>Projected cash flow and runway based on current scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastChart />
            </CardContent>
          </Card>

          {/* Report Generator */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle className="font-serif">Generate Report</CardTitle>
              </div>
              <CardDescription>Export your scenarios and forecasts as shareable reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportGenerator />
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Scenario Planning</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Test different hiring, spending, and pricing scenarios to understand their impact
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Real-time Forecasting</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                See immediate visual feedback on how changes affect your runway and budget
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold mb-2">Shareable Reports</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Generate professional reports to share with stakeholders and investors
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="font-serif font-semibold">CFO Helper</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Powered by Flexprice & Pathway</span>
              <Badge variant="outline">v1.0.0</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
