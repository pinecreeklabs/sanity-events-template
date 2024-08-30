'use client'

import {registerForEvent} from '@/app/actions/registration'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {type RegistrationForm, registrationSchema} from '@/lib/validators/registration'
import {zodResolver} from '@hookform/resolvers/zod'
import {Loader2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'

type EventClientProps = {
  eventId: string
}

const SubmitButton = ({pending}: {pending: boolean}) => {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Registering...' : 'Register Now'}
    </Button>
  )
}

export const EventClient = ({eventId}: EventClientProps) => {
  const [pending, setPending] = useState(false)

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      eventId,
      name: '',
      email: '',
      ticketCount: 1,
      message: '',
    },
  })

  const onSubmit = async (data: RegistrationForm) => {
    try {
      setPending(true)
      await registerForEvent({...data, eventId})
      toast.success('You have been registered for this event')
    } catch (error) {
      toast.error('Failed to register for this event')
    } finally {
      setPending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for this Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <FormField name="name" render={({field}) => <Input {...field} />} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <FormField name="email" render={({field}) => <Input {...field} />} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Number of Tickets</FormLabel>
              <FormDescription>At least one ticket is required.</FormDescription>
              <FormControl>
                <FormField
                  name="ticketCount"
                  render={({field}) => <Input {...field} type="number" min="1" />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormDescription>Any dietary restrictions or accessibility needs?</FormDescription>
              <FormControl>
                <FormField name="message" render={({field}) => <Textarea {...field} />} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <SubmitButton pending={pending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
