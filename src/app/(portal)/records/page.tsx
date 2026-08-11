import { Download, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { A4DocumentDialog } from "@/components/documents/a4-document-dialog"
import { DoctorVisitSheet } from "@/components/documents/doctor-visit-sheet"
import { LabReportSheet } from "@/components/documents/lab-report-sheet"
import { labIconByType, labStatusLabel } from "@/lib/lab-reports"
import records from "@/data/records.json"

export default function RecordsPage() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <h1 className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
          Medical Records
        </h1>
        <p className="text-body-md text-muted-foreground">
          Securely view and manage your digital prescriptions and laboratory
          diagnostic results.
        </p>
      </div>
      <Tabs defaultValue="rx">
        <TabsList
          variant="line"
          className="mb-8 w-full justify-start gap-8 border-b border-border bg-transparent"
        >
          <TabsTrigger
            value="rx"
            className="font-heading text-base font-semibold data-active:text-primary"
          >
            Doctor Visit Reports
          </TabsTrigger>
          <TabsTrigger
            value="labs"
            className="font-heading text-base font-semibold data-active:text-primary"
          >
            Test &amp; Diagnostic Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rx">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-label-caps uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="text-label-caps uppercase tracking-wider">
                      Doctor
                    </TableHead>
                    <TableHead className="text-label-caps uppercase tracking-wider">
                      Specialty
                    </TableHead>
                    <TableHead className="text-label-caps uppercase tracking-wider">
                      Diagnosis
                    </TableHead>
                    <TableHead className="text-label-caps uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-label-caps uppercase tracking-wider">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.rxRows.map((row) => (
                    <TableRow key={row.diagnosis}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-3">
                          <span className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-bold">
                            {row.initials}
                          </span>
                          <span className="font-medium">{row.doctor}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.specialty}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.diagnosis}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.status === "active" ? "default" : "secondary"
                          }
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <A4DocumentDialog
                          title="Doctor Visit Report"
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Download ${row.diagnosis} PDF`}
                              className="text-primary"
                            >
                              <Download />
                            </Button>
                          }
                        >
                          <DoctorVisitSheet row={row} />
                        </A4DocumentDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="labs">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {records.labResults.map((lab) => {
              const LabIcon = labIconByType[lab.type]
              return (
                <Card key={lab.title} className="flex flex-col">
                  <CardContent className="flex flex-grow flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                        <LabIcon className="size-5" />
                      </span>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge
                          variant={
                            lab.status === "ready" ? "default" : "secondary"
                          }
                        >
                          {labStatusLabel[lab.status]}
                        </Badge>
                        <span className="text-label-caps text-muted-foreground">
                          {lab.orderId} · {lab.date}
                        </span>
                      </div>
                    </div>
                    <p className="font-heading text-lg font-semibold">
                      {lab.title}
                    </p>
                    <p className="flex-grow text-sm text-muted-foreground">
                      {lab.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 font-medium uppercase tracking-wide text-primary"
                      >
                        <FileText data-icon="inline-start" />
                        View Full Result
                      </Button>
                      <A4DocumentDialog
                        title="Lab Report"
                        description="Your diagnostic report, ready to print on A4."
                        trigger={
                          <Button
                            variant="outline"
                            size="lg"
                            aria-label={`Download ${lab.title}`}
                            className="font-medium uppercase tracking-wide text-primary"
                          >
                            <Download />
                          </Button>
                        }
                      >
                        <LabReportSheet lab={lab} />
                      </A4DocumentDialog>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}