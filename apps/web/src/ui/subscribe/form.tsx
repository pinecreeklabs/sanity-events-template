'use client'

import {subscribe} from '@/app/actions/subscription'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {SubscriptionForm, subscriptionSchema} from '@/lib/validators/subscription'
import {zodResolver} from '@hookform/resolvers/zod'
import {Loader2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'

type SubscribeFormProps = {
  textColor?: string
}

const SubmitButton = ({pending}: {pending: boolean}) => {
  return (
    <Button disabled={pending} type="submit" className="border-2">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Subscribing' : 'Subscribe'}
    </Button>
  )
}

export const SubscribeForm = ({textColor = 'text-white'}: SubscribeFormProps) => {
  const [pending, setPending] = useState(false)

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: SubscriptionForm) => {
    try {
      setPending(true)
      await subscribe(data)
      toast.success('You have been subscribed to our newsletter')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.')
    } finally {
      setPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem className="max-w-lg flex-1">
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton pending={pending} />
      </form>
      <p className={`text-xs ${textColor}`}>By signing up, you agree to our Terms of Service.</p>
    </Form>
  )
}
