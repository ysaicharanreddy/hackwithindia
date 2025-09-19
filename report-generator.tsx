"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Share2, Mail, Clock, DollarSign } from "lucide-react"

interface ReportSection {
  id: string
  name: string
  description: string
  included: boolean
}

interface ReportConfig {
  title: string
  recipient: string
  format: "pdf" | "excel" | "presentation"
  sections: ReportSection[]
  notes: string
}

export function ReportGenerator() {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    title: "Financial Scenario Analysis",
    recipient: "",
    format: "pdf",
    notes: "",
    sections: [
      {
        id: "executive-summary",
        name: "Executive Summary",
        description: "High-level overview of key findings and recommendations",
        included: true,
      },
      {
        id: "scenario-analysis",
        name: "Scenario Analysis",
        description: "Detailed breakdown of tested scenarios and their outcomes",
        included: true,
      },
      {
        id: "financial-projections",
        name: "Financial Projections",
        description: "Cash flow forecasts and runway calculations",
        included: true,
      },
      {
        id: "risk-assessment",
        name: "Risk Assessment",
        description: "Potential risks and mitigation strategies",
        included: false,
      },
      {
        id: "recommendations",
        name: "Recommendations",
        description: "Actionable next steps based on analysis",
        included: true,
      },
      {
        id: "appendix",
        name: "Technical Appendix",
        description: "Detailed calculations and methodology",
        included: false,
      },
    ],
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<
    Array<{
      id: string
      title: string
      format: string
      createdAt: Date
      size: string
    }>
  >([
    {
      id: "1",
      title: "Q1 Budget Analysis",
      format: "PDF",
      createdAt: new Date("2024-01-15"),
      size: "2.3 MB",
    },
    {
      id: "2",
      title: "Hiring Impact Study",
      format: "Excel",
      createdAt: new Date("2024-01-10"),
      size: "1.8 MB",
    },
  ])

  const handleSectionToggle = (sectionId: string) => {
    setReportConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, included: !section.included } : section,
      ),
    }))
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newReport = {
      id: Date.now().toString(),
      title: reportConfig.title,
      format: reportConfig.format.toUpperCase(),
      createdAt: new Date(),
      size: "2.1 MB",
    }

    setGeneratedReports((prev) => [newReport, ...prev])
    setIsGenerating(false)
  }

  const includedSections = reportConfig.sections.filter((s) => s.included)
  const estimatedPages = Math.max(5, includedSections.length * 2 + 3)

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="report-title">Report Title</Label>
            <Input
              id="report-title"
              value={reportConfig.title}
              onChange={(e) => setReportConfig((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter report title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-format">Format</Label>
            <Select
              value={reportConfig.format}
              onValueChange={(value: "pdf" | "excel" | "presentation") =>
                setReportConfig((prev) => ({ ...prev, format: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="presentation">PowerPoint Presentation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Section Selection */}
        <div className="space-y-3">
          <Label>Report Sections</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reportConfig.sections.map((section) => (
              <div key={section.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={section.id}
                  checked={section.included}
                  onCheckedChange={() => handleSectionToggle(section.id)}
                />
                <div className="flex-1">
                  <Label htmlFor={section.id} className="font-medium cursor-pointer">
                    {section.name}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="report-notes">Additional Notes (Optional)</Label>
          <Textarea
            id="report-notes"
            value={reportConfig.notes}
            onChange={(e) => setReportConfig((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Add any specific requirements or context for the report..."
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Report Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-semibold">Report Preview</h3>
            <p className="text-sm text-muted-foreground">
              Estimated {estimatedPages} pages • {includedSections.length} sections
            </p>
          </div>
          <Badge variant="secondary">{reportConfig.format.toUpperCase()}</Badge>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">{reportConfig.title}</h4>
                  <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Included Sections:</p>
                <div className="flex flex-wrap gap-2">
                  {includedSections.map((section) => (
                    <Badge key={section.id} variant="outline">
                      {section.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateReport}
        disabled={isGenerating || includedSections.length === 0}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Clock className="w-4 h-4 mr-2 animate-spin" />
            Generating Report...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </>
        )}
      </Button>

      <Separator />

      {/* Recent Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-semibold">Recent Reports</h3>
          <Badge variant="outline">{generatedReports.length} reports</Badge>
        </div>

        <div className="space-y-3">
          {generatedReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{report.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Share Report</DialogTitle>
                          <DialogDescription>
                            Share "{report.title}" with team members or stakeholders
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="share-email">Email Address</Label>
                            <Input id="share-email" type="email" placeholder="Enter email address" />
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Copy Link
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing Info */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>
              Report generation is billed per report. Current usage: {generatedReports.length} reports this month.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
