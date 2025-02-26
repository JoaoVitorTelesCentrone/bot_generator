/* eslint-disable react/no-unescaped-entities */
import { Button } from "antd";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-6 md:py-4 lg:py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Choose the plan that's right for your business. All plans include
              a 7-day free trial.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-muted-foreground">
                Perfect for small businesses
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>1 bot</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>1,000 conversations/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Website integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="relative flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Popular
            </div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-bold">Professional</h3>
              <p className="text-muted-foreground">Ideal for growing teams</p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>5 bots</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>10,000 conversations/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Website & messaging platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>API access</span>
                </li>
              </ul>
              <Button className="mt-6 w-full">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">For large organizations</p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited bots</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom analytics & reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>All integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom training & onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>SLA & premium support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
