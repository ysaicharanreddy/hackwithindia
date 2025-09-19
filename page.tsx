import { IntegrationStatus } from "@/components/integration-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-serif font-bold">Integrations</h1>
                <p className="text-sm text-muted-foreground">Manage your external service connections</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Zap className="w-3 h-3" />
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <IntegrationStatus />
      </main>
    </div>
  )
}
