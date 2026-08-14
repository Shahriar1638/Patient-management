import { BlogDirectory } from "@/components/blogs/blog-directory"
import posts from "@/data/blogs.json"
import doctors from "@/data/doctors.json"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>
}) {
  const { doctor } = await searchParams
  const doctorId = doctor && doctors.some((item) => item.id === doctor) ? doctor : undefined
  const matched = doctorId ? doctors.find((item) => item.id === doctorId) : undefined
  const doctorName = matched
    ? `Dr. ${matched.firstName} ${matched.lastName}`
    : undefined

  return (
    <div className="flex flex-col gap-8">
      <BlogDirectory posts={posts} doctorId={doctorId} doctorName={doctorName} />
    </div>
  )
}