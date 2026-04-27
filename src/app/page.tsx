
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Fleet } from "@/components/fleet";
import { Testimonials } from "@/components/testimonials";
import { Blog } from "@/components/blog";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { QuoteCalculator } from "@/components/quote-calculator";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Portfolio />
      <BeforeAfterSlider />
      <Services />
      <QuoteCalculator />
      <Process />
      <Fleet />
      <Testimonials />
      <Blog />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
