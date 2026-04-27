import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <Ticker />
      
      {/* Placeholder sections for scrolling demo */}
      <section className="h-screen flex items-center justify-center border-t border-white/5">
        <div className="text-center">
          <h2 className="text-4xl font-headline text-white mb-4">Our Services</h2>
          <p className="text-muted-foreground">Scroll more to see the transitions.</p>
        </div>
      </section>
    </main>
  );
}
