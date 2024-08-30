import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {sanityFetch} from '@/lib/sanity/client'
import {urlFor} from '@/lib/sanity/image'
import {EVENT_QUERY} from '@/lib/sanity/queries'
import {Event} from '@/lib/sanity/types'
import {Footer} from '@/ui/footer'
import {Header} from '@/ui/header'
import {CalendarDays, Clock, DollarSign, MapPin} from 'lucide-react'
import Link from 'next/link'

import {EventClient} from './client'

type EventPageProps = {
  params: {
    slug: string
  }
}

const pluralize = (str: string, count: number) => {
  return count > 1 ? `${str}s` : str
}

export default async function EventPage({params}: EventPageProps) {
  const event: (Event & {relatedEvents: Event[]}) | null = await sanityFetch({
    query: EVENT_QUERY,
    params: {slug: params.slug},
    revalidate: 10,
  })

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{event.title}</h1>
                <img
                  alt={event.title}
                  className="w-full aspect-video object-cover rounded-lg"
                  height="400"
                  src={urlFor(event.image).width(800).height(400).url()}
                  style={{
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                  width="800"
                />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {event.startAt
                        ? new Date(event.startAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {event.startAt
                        ? new Date(event.startAt).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })
                        : 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{event.price ? `${event.price}` : 'Free'}</span>
                  </div>
                </div>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  {event.description}
                </p>
              </div>
              <div className="space-y-4">
                <EventClient eventId={event._id} />
                <Card>
                  <CardHeader>
                    <CardTitle>{`Event ${pluralize('Speaker', event.speakers?.length || 0)}`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.speakers?.map((speaker: any) => (
                      <div className="flex items-center space-x-4 py-2" key={speaker.name}>
                        <Avatar>
                          {speaker.headshot ? (
                            <AvatarImage
                              alt={speaker.name}
                              src={urlFor(speaker.headshot).width(60).height(60).url()}
                            />
                          ) : (
                            <AvatarFallback>{speaker.name.charAt(0).toUpperCase()}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{speaker.name}</h3>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Related Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.relatedEvents.map((relatedEvent: any, index: number) => (
                <Link href={`/events/${relatedEvent.slug.current}`} key={index}>
                  <Card key={index}>
                    <CardContent className="p-4">
                      <img
                        alt={relatedEvent.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        height="200"
                        src={urlFor(relatedEvent.image).width(300).height(200).url()}
                        style={{
                          aspectRatio: '300/200',
                          objectFit: 'cover',
                        }}
                        width="300"
                      />
                      <h3 className="font-semibold mb-2">{relatedEvent.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span>
                          {new Date(relatedEvent.startAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{relatedEvent.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
