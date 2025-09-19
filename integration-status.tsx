"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Zap, Database, DollarSign, RefreshCw } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  status: "connected" | "disconnected" | "syncing"
  lastSync?: Date
  dataPoints?: number
  type: "billing" | "data"
}

export function IntegrationStatus() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "flexprice",
      name: "Flexprice",
      description: "Usage-based billing and cost tracking",
      status: "connected",
      lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      type: "billing",
    },
    {
      id: "pathway",
      name: "Pathway",
      description: "Real-time financial data updates",
      status: "connected",
      lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      dataPoints: 1247,
      type: "data",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshIntegration = async (integrationId: string) => {
    setIsRefreshing(true)
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId ? { ...integration, status: "syncing" as const } : integration,
      ),
    )

    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              status: "connected" as const,
              lastSync: new Date(),
              dataPoints: integration.dataPoints ? integration.dataPoints + Math.floor(Math.random() * 50) : undefined,
            }
          : integration,
      ),
    )
    setIsRefreshing(false)
  }

  const getStatusIcon = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "syncing":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case "disconnected":
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
      case "syncing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Syncing</Badge>
      case "disconnected":
        return <Badge variant="destructive">Disconnected</Badge>
    }
  }

  const formatLastSync = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `{diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `{Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {integration.type === "billing" ? (
                    <DollarSign className="w-5 h-5 text-primary" />
                  ) : (
                    <Database className="w-5 h-5 text-primary" />
                  )}
                  <CardTitle className="text-lg font-serif">{integration.name}</CardTitle>
                </div>
                {getStatusIcon(integration.status)}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(integration.status)}
              </div>

              {integration.lastSync && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-sm font-medium">{formatLastSync(integration.lastSync)}</span>
                </div>
              )}

              {integration.dataPoints && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Points</span>
                  <span className="text-sm font-medium">{integration.dataPoints.toLocaleString()}</span>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRefreshIntegration(integration.id)}
                disabled={isRefreshing || integration.status === "syncing"}
                className="w-full"
              >
                {integration.status === "syncing" ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Integration Details</CardTitle>
          <CardDescription>How CFO Helper integrates with external services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flexprice Integration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Flexprice Integration</h3>
              <Badge variant="outline">Billing</Badge>
            </div>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Tracks usage-based billing for scenario simulations and report generation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Billing per scenario:</span>
                  <span className="ml-2 text-muted-foreground">0.30</span>
                </div>
                <div>
                  <span className="font-medium">Billing per report:</span>
                  <span className="ml-2 text-muted-foreground">0.75</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pathway Integration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Pathway Integration</h3>
              <Badge variant="outline">Data</Badge>
            </div>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Provides real-time financial data updates to keep forecasts current and accurate.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Update frequency:</span>
                  <span className="ml-2 text-muted-foreground">Every 5 minutes</span>
                </div>
                <div>
                  <span className="font-medium">Data sources:</span>
                  <span className="ml-2 text-muted-foreground">Bank accounts, expenses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Data Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Live Data Impact</CardTitle>
          <CardDescription>How fresh data from Pathway affects your scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Zap className="w-4 h-4" />
            <AlertDescription>
              <strong>Real-time updates enabled:</strong> Your financial forecasts automatically incorporate the latest
              expense and revenue data from connected accounts. Last update:{" "}
              {formatLastSync(integrations.find((i) => i.id === "pathway")?.lastSync || new Date())}
            </AlertDescription>
          </Alert>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Current Month Expenses</p>
                <p className="text-xs text-muted-foreground">Updated from bank feeds</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">47,230</p>
                <p className="text-xs text-green-600">↓ 3% from last month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Revenue Recognition</p>
                <p className="text-xs text-muted-foreground">Automated from payment systems</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">52,100</p>
                <p className="text-xs text-green-600">↑ 8% from last month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Cash Position</p>
                <p className="text-xs text-muted-foreground">Real-time bank balance</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">487,650</p>
                <p className="text-xs text-muted-foreground">As of 2 minutes ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
