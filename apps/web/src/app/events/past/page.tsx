import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {sanityFetch} from '@/lib/sanity/client'
import {urlFor} from '@/lib/sanity/image'
import {PAST_EVENTS_QUERY} from '@/lib/sanity/queries'
import {Event, Speaker} from '@/lib/sanity/types'
import {Footer} from '@/ui/footer'
import {Header} from '@/ui/header'
import Link from 'next/link'

type PastEvent = Event & {speakers: Speaker[]}

export default async function PastEventsPage() {
  const pastEvents: PastEvent[] = await sanityFetch({query: PAST_EVENTS_QUERY, revalidate: 60})

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8">Past Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastEvents.map((event: PastEvent, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={urlFor(event.image).width(320).height(180).url()}
                      alt={event.title || 'Event Image'}
                      width={320}
                      height={180}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold mb-2">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      {event.speakers?.map((speaker: Speaker, index: number) => (
                        <div className="flex items-center space-x-4 py-2" key={index}>
                          <Avatar>
                            {speaker.headshot ? (
                              <AvatarImage
                                alt={speaker.name}
                                src={urlFor(speaker.headshot).width(60).height(60).url()}
                              />
                            ) : (
                              <AvatarFallback>
                                {speaker.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  {event.recordingLink && (
                    <CardFooter className="p-4 pt-0">
                      <Link href={event.recordingLink} target="_blank">
                        <Button variant="outline" className="w-full">
                          Watch the Recording
                        </Button>
                      </Link>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
