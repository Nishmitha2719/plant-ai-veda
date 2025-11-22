import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import heroImage from "@/assets/hero-plants.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">
              AyurGenix AI
            </span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl text-foreground">
            Identify Ayurvedic Plants with{" "}
            <span className="text-primary">AI Precision</span>
          </h1>
          
          <p className="mb-8 text-lg leading-relaxed md:text-xl text-muted-foreground max-w-2xl">
            Traditional knowledge meets modern technology. Upload a leaf sample and let our 
            AI accurately identify medicinal plants, their properties, and therapeutic uses. 
            Eliminating human error in plant identification for safer, more effective Ayurvedic medicine.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg shadow-custom-lg hover:shadow-custom-md transition-all"
            >
              Identify a Plant
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg"
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-3">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-primary">98%+</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Plant Species</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl font-bold text-primary">Instant</div>
              <div className="text-sm text-muted-foreground">Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
