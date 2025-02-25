import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                We're on a mission to make AI accessible to every business
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                BotBuilder was founded in 2022 by a team of AI experts and
                business leaders who saw the potential for AI chatbots to
                transform customer interactions. We believe that every business,
                regardless of size or technical expertise, should be able to
                harness the power of AI.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-muted-foreground">
                  Businesses using our platform
                </div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-3xl font-bold">10M+</div>
                <div className="text-muted-foreground">
                  Customer conversations handled
                </div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-muted-foreground">
                  Customer satisfaction rate
                </div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-muted-foreground">
                  Support for your business
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid gap-6 sm:grid-cols-2">
              <Image
                src="/placeholder.svg?height=300&width=250"
                width={250}
                height={300}
                alt="Team member"
                className="mx-auto aspect-[3/4] overflow-hidden rounded-xl object-cover object-center sm:aspect-[4/5]"
              />
              <Image
                src="/placeholder.svg?height=300&width=250"
                width={250}
                height={300}
                alt="Team member"
                className="mx-auto aspect-[3/4] overflow-hidden rounded-xl object-cover object-center sm:aspect-[4/5] sm:translate-y-10"
              />
              <Image
                src="/placeholder.svg?height=300&width=250"
                width={250}
                height={300}
                alt="Team member"
                className="mx-auto aspect-[3/4] overflow-hidden rounded-xl object-cover object-center sm:aspect-[4/5] sm:translate-y-5"
              />
              <Image
                src="/placeholder.svg?height=300&width=250"
                width={250}
                height={300}
                alt="Team member"
                className="mx-auto aspect-[3/4] overflow-hidden rounded-xl object-cover object-center sm:aspect-[4/5] sm:translate-y-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
