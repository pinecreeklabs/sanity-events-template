import {SubscribeForm} from '@/ui/subscribe'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
      <Image src="/hero.png" alt="Conf 2024" fill className="object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Discover Amazing Events Near You
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Join thousands of people and experience the best events in your area. From concerts to
              workshops, we've got you covered.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  )
}
