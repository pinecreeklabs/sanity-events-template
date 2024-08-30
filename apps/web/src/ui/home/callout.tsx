import {SubscribeForm} from '@/ui/subscribe'

export const Callout = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Don't Miss Out on Great Events
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our community and be the first to know about exciting events in your area.
              Whether you're into music, tech, food, or arts, we have something for everyone.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <SubscribeForm textColor="text-gray-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
