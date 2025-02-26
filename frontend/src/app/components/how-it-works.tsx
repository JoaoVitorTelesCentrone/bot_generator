import Image from "next/image";
import { CheckCircle } from "lucide-react";

import img1 from "../assets/how1.jpg";
import img2 from "../assets/how4.jpg";
import img3 from "../assets/how6.jpg";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-6 md:py-6 lg:py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Build your bot in three simple steps
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our platform makes it easy to create, train, and deploy AI
              chatbots without any coding knowledge.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="text-xl font-bold">Design Your Bot</h3>
            <p className="text-center text-muted-foreground">
              Use our drag-and-drop interface to design conversation flows and
              bot responses.
            </p>
            <Image
              src={img1}
              width={300}
              height={200}
              alt="Bot design interface"
              className="rounded-lg border object-cover"
            />
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="text-xl font-bold">Train with AI</h3>
            <p className="text-center text-muted-foreground">
              Upload your content or connect to your knowledge base to train
              your bot.
            </p>
            <Image
              src={img2}
              width={300}
              height={200}
              alt="Bot training interface"
              className="rounded-lg border object-cover"
            />
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="text-xl font-bold">Deploy & Optimize</h3>
            <p className="text-center text-muted-foreground">
              Launch your bot across multiple channels and continuously improve
              with analytics.
            </p>
            <Image
              src={img3}
              width={300}
              height={200}
              alt="Bot deployment interface"
              className="rounded-lg border object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h3 className="text-4xl font-bold">
            Why businesses choose BotBuilder
          </h3>
          <ul className="grid gap-2 sm:grid-cols-3 ">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No coding required</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>24/7 customer support</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Reduce support costs</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Increase conversion rates</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Enterprise-grade security</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Seamless integrations</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
