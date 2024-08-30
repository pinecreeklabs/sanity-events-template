import * as z from 'zod'

export const subscriptionSchema = z.object({
  email: z.string().email(),
})

export type SubscriptionForm = z.infer<typeof subscriptionSchema>
