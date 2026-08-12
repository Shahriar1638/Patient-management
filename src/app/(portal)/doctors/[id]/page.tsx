import { notFound } from "next/navigation"

import { DoctorDetails } from "@/components/doctors/doctor-details"
import doctors from "@/data/doctors.json"

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: doctor.id }))
}

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const doctor = doctors.find((item) => item.id === id)

  if (!doctor) {
    notFound()
  }

  return <DoctorDetails doctor={doctor} />
}
