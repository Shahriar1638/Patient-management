export type Doctor = {
  id: string
  image?: string
  gender: "male" | "female"
  firstName: string
  lastName: string
  specialty: string
  title: string
  phone: string
  email: string
  departmentId: string
  room: string
  availability: string[]
  patientsCount: number
  rating: number
  clinic: string
  fee: number
  nextAvailable: string
  videoConsult: boolean
  description: string
  qualifications: string[]
  estimatedTurnTime: string
  timings: string
  days: string
  slotStart: string
  slotEnd: string
}

export type Booking = {
  doctorId: string
  doctorName: string
  specialty: string
  patientName: string
  date: string
  dateLong: string
  time: string
  serial: number
  fee: number
  room: string
  clinic: string
  estimatedTurnTime: string
}

export type BlogPost = {
  id: string
  doctorId: string
  title: string
  excerpt: string
  category: string
  author: string
  authorTitle: string
  date: string
  readTime: string
  image: string
  featured: boolean
  content: string[]
}
