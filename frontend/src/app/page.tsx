import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import HowItWorks from "./components/how-it-works";
import Pricing from "./components/pricing";
import About from "./components/about";
import Footer from "./components/footer";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}
