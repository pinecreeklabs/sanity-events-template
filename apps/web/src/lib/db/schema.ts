import {integer, pgTable, serial, text, timestamp, uniqueIndex, varchar} from 'drizzle-orm/pg-core'

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', {length: 255}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex('subscribers_email_idx').on(t.email),
  }),
)

export const attendees = pgTable(
  'attendees',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    sanityEventId: text('sanity_event_id').notNull(),
    email: varchar('email', {length: 255}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {mode: 'date'}).$onUpdate(() => new Date()),
  },
  (t) => ({
    sanityEventIdIdx: uniqueIndex('attendees_sanity_event_id_idx').on(t.email, t.sanityEventId),
  }),
)

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  sanityEventId: text('sanity_event_id').notNull(),
  attendeeId: integer('attendee_id').references(() => attendees.id, {
    onDelete: 'cascade',
  }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at', {mode: 'date'}).$onUpdate(() => new Date()),
})
