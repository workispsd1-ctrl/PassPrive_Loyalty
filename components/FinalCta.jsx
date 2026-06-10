import React from 'react'

const FinalCta = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-14 text-center backdrop-blur-xl sm:px-10 sm:py-20">
          {/* glows */}
          <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Turn first visits into{' '}
              <span className="text-primary">lifelong regulars</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join 500+ local businesses already using Druto to bring customers
              back, again and again.
            </p>

            <div className="mx-auto mt-9 w-full max-w-md sm:w-fit sm:max-w-none">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a href="/signup" className="inline-flex w-full rounded-md bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-600 sm:w-auto justify-center">
                  Start Your Free Trial
                </a>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have a business?{' '}
                <a
                  href="/signin"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
