
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Portfolio />
      <Services />
    </main>
  );
}
