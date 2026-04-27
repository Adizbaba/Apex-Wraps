import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="max-w-4xl w-full flex flex-col items-start gap-8">
        <SectionLabel>Apex Wraps Branding</SectionLabel>
        <h1 className="text-6xl md:text-8xl font-headline text-white leading-tight">
          Precision <span className="text-orange">Aesthetic</span>
        </h1>
        <p className="font-subheading text-xl md:text-2xl text-white/80 font-bold">
          High-performance automotive transformations.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button variant="primary">Explore Portfolio</Button>
          <Button variant="outline">Request A Quote</Button>
        </div>
      </div>
    </main>
  );
}
