'use server'

import {db} from '@/lib/db'
import {attendees, tickets} from '@/lib/db/schema'
import {RegistrationForm} from '@/lib/validators/registration'

export const registerForEvent = async (data: RegistrationForm) => {
  const {eventId, name, email, ticketCount, message} = data

  const attendee = await db
    .insert(attendees)
    .values({
      name,
      email,
      sanityEventId: eventId,
    })
    .returning()

  if (!attendee) {
    return {error: 'Failed to register'}
  }

  const userTickets = Array.from({length: ticketCount}, () => ({
    attendeeId: attendee[0].id,
    sanityEventId: eventId,
    notes: message ?? null,
  }))

  await db.insert(tickets).values(userTickets)

  return {success: 'Registration successful'}
}
