import { notFound } from "next/navigation"

import { DoctorDetails } from "@/components/doctors/doctor-details"
import doctors from "@/data/doctors.json"
import posts from "@/data/blogs.json"
import type { Doctor } from "@/lib/types"

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: doctor.id }))
}

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const doctor = doctors.find((item) => item.id === id) as Doctor | undefined

  if (!doctor) {
    notFound()
  }

  const doctorPosts = posts.filter((post) => post.doctorId === id)

  return <DoctorDetails doctor={doctor} posts={doctorPosts} />
}
