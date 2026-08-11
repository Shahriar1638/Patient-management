import { Download } from "lucide-react"
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
import inventory from "@/data/inventory.json"

const statusVariant: Record<string, "default" | "destructive" | "outline"> = {
  "in-stock": "default",
  "low-stock": "destructive",
  "out-of-stock": "outline",
}

const statusLabel: Record<string, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
}

export default function InventoryPage() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-4 md:mt-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
            Medicine Inventory
          </h1>
          <p className="text-body-md text-muted-foreground">
            Dr. Sarah Jenkins - Cardiology
          </p>
        </div>
        <Button variant="outline" size="lg" className="w-fit gap-2 font-medium">
          <Download data-icon="inline-start" />
          Download Prescription PDF
        </Button>
      </div>
      <Card className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-2 border-b border-border pb-6">
          <h2 className="font-heading text-headline-lg font-semibold text-primary">
            Prescribed Medicines
          </h2>
          <p className="text-body-md text-muted-foreground">
            Your current prescriptions with brand and generic names, dosage
            instructions, and unit pricing.
          </p>
        </CardContent>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 text-label-caps uppercase tracking-wider">
                  Medication
                </TableHead>
                <TableHead className="text-label-caps uppercase tracking-wider">
                  Generic Name
                </TableHead>
                <TableHead className="text-label-caps uppercase tracking-wider">
                  Dosage
                </TableHead>
                <TableHead className="text-label-caps uppercase tracking-wider">
                  Prescribed By
                </TableHead>
                <TableHead className="text-label-caps uppercase tracking-wider">
                  Unit Price
                </TableHead>
                <TableHead className="text-label-caps uppercase tracking-wider">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.genericName}
                  </TableCell>
                  <TableCell>{item.dosage}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.prescribedBy}
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.discount}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>
                      {statusLabel[item.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
