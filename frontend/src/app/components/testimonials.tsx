/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by innovative companies
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              See what our customers are saying about their experience with
              BotBuilder.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                // eslint-disable-next-line react/no-unescaped-entities
                "BotBuilder has transformed our customer service. We've reduced
                response times by 80% while maintaining high customer
                satisfaction."
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  width={40}
                  height={40}
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">CTO, TechCorp</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "The ease of use is incredible. We built and deployed our first
                bot in less than a day, and it's already handling 40% of our
                support queries."
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  width={40}
                  height={40}
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Michael Chen</p>
                <p className="text-xs text-muted-foreground">
                  Product Manager, Retail Plus
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "The analytics dashboard gives us insights we never had before.
                We can see exactly how our customers interact with our bot and
                optimize accordingly."
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  width={40}
                  height={40}
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Emily Rodriguez</p>
                <p className="text-xs text-muted-foreground">
                  Marketing Director, GrowFast
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-center p-4">
                <Image
                  src="/placeholder-logo.svg"
                  width={120}
                  height={60}
                  alt={`Company logo ${i + 1}`}
                  className="max-h-12 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
