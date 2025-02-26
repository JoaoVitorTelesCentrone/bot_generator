import { MessageSquare, BarChart3, Zap, Globe, Code, Lock } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="w-full py-6 md:py-12 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to build powerful AI bots
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our platform provides all the tools you need to create, deploy,
              and manage intelligent chatbots for your business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Natural Conversations</h3>
            <p className="text-center text-muted-foreground">
              AI-powered bots that understand context and provide human-like
              responses.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Analytics Dashboard</h3>
            <p className="text-center text-muted-foreground">
              Track performance metrics and gain insights from customer
              interactions.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quick Setup</h3>
            <p className="text-center text-muted-foreground">
              Deploy your custom bot in minutes with our intuitive drag-and-drop
              builder.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Multi-channel Support</h3>
            <p className="text-center text-muted-foreground">
              Deploy your bots across website, mobile apps, and messaging
              platforms.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">API Integration</h3>
            <p className="text-center text-muted-foreground">
              Connect your bots to existing systems and third-party services.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Enterprise Security</h3>
            <p className="text-center text-muted-foreground">
              Bank-level encryption and compliance with data protection
              regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
