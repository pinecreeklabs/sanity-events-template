import {Button} from '@/components/ui/button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {sanityFetch} from '@/lib/sanity/client'
import {urlFor} from '@/lib/sanity/image'
import {UPCOMING_EVENTS_QUERY} from '@/lib/sanity/queries'
import {Event} from '@/lib/sanity/types'
import {Footer} from '@/ui/footer'
import {Header} from '@/ui/header'
import {Hero} from '@/ui/home'
import {Callout} from '@/ui/home'
import {CalendarDays, MapPin} from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const events: Event[] = await sanityFetch({query: UPCOMING_EVENTS_QUERY, revalidate: 60})

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Upcoming Events
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt={event.title}
                      className="w-full h-48 object-cover mb-4"
                      height="200"
                      src={urlFor(event.image).width(300).height(200).url()}
                      style={{
                        aspectRatio: '300/200',
                        objectFit: 'cover',
                      }}
                      width="300"
                    />
                    <div className="flex items-center mb-2">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {new Date(event.startAt).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/events/${event.slug.current}`}>
                      <Button className="w-full">Learn More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Callout />
      </main>
      <Footer />
    </div>
  )
}
