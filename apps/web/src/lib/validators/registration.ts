import * as z from 'zod'

export const registrationSchema = z.object({
  eventId: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  ticketCount: z.coerce.number().min(1, 'At least one ticket is required'),
  message: z.string().optional(),
})

export type RegistrationForm = z.infer<typeof registrationSchema>
