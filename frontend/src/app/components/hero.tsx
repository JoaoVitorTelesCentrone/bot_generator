import Link from "next/link";
import { Button } from "antd";
import Image from "next/image";
import img from "../assets/hero1.jpg";

export default function Hero() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-12 xl:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Build AI Bots for Your Business in Minutes
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create custom AI chatbots without coding. Automate customer
                service, lead generation, and more with our intuitive bot
                builder platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button>
                <Link href="/signup">Start Building for Free</Link>
              </Button>
              <Button>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <svg
                  className="mr-1 h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-1 h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>7-day free trial</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
              <Image
                src={img}
                width={400}
                height={500}
                alt="Bot builder interface preview"
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 rounded-lg" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/90 rounded-lg shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 8V4H8" />
                      <rect width="16" height="12" x="4" y="8" rx="2" />
                      <path d="M2 14h2" />
                      <path d="M20 14h2" />
                      <path d="M15 13v2" />
                      <path d="M9 13v2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">BotBuilder Assistant</p>
                    <p className="text-sm text-muted-foreground">
                      How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
