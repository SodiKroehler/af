import { z } from "zod"

export const bookingRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  occasion: z.string().min(1, "Occasion is required"),
  notes: z.string().optional(),
})

export type BookingRequestData = z.infer<typeof bookingRequestSchema>
