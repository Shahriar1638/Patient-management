export type Doctor = {
  id: string
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
}