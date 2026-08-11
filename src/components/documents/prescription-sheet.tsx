import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
import inventory from "@/data/inventory.json"
import patients from "@/data/patients.json"

const patient = patients[0]
const totalCost = inventory.reduce((sum, item) => sum + item.price, 0)

export function PrescriptionSheet() {
  return (
    <div className="flex min-h-[260mm] flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo="RX-2026-001" />

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Patient</SheetSectionTitle>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Name
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              DOB
            </p>
            <p className="text-sm font-medium text-foreground">{patient.dob}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Blood Type
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.bloodType}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Allergies
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.allergies.length > 0
                ? patient.allergies.join(", ")
                : "None"}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Prescribed Medicines</SheetSectionTitle>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-300 text-left">
              <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Medication
              </th>
              <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Generic
              </th>
              <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Dosage
              </th>
              <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Prescribed By
              </th>
              <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Unit Price
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr
                key={item.id}
                className="border-b border-neutral-200 last:border-0"
              >
                <td className="py-2.5 pr-3">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">
                  {item.genericName}
                </td>
                <td className="py-2.5 pr-3">{item.dosage}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">
                  {item.prescribedBy}
                </td>
                <td className="py-2.5 text-right font-semibold text-foreground">
                  ${item.price.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="py-3 text-right font-semibold">
                Estimated Total
              </td>
              <td className="py-3 text-right font-heading text-base font-bold text-primary">
                ${totalCost.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Instructions</SheetSectionTitle>
        <p className="text-sm text-muted-foreground">
          Take all medicines exactly as directed. Store at room temperature away
          from direct sunlight and keep out of reach of children. If you miss a
          dose, do not double it — contact your pharmacy or physician for
          guidance.
        </p>
      </section>

      <SheetFooter />
    </div>
  )
}
