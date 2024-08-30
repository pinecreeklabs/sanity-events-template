'use server'

import {db} from '@/lib/db'
import {subscriptions} from '@/lib/db/schema'
import {SubscriptionForm} from '@/lib/validators/subscription'

export const subscribe = async (data: SubscriptionForm) => {
  console.log('data', data)
  await db.insert(subscriptions).values({email: data.email}).onConflictDoNothing()
  return
}
