import { ImageSlideshow } from '@/components/public/ImageSlideshow';
import { TopRatedSection } from '@/components/public/TopRatedSection';
import { AboutSection } from '@/components/public/AboutSection';

export function HomePage() {
  return (
    <div className="relative">
      {/* Hero Slideshow */}
      <ImageSlideshow />
      
      {/* Top Rated Section */}
      <div className="relative bg-background">
        {/* Decorative top wave */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-foreground/5 to-transparent" />
        
        <div className="container mx-auto px-4 py-20 md:py-28">
          <TopRatedSection />
        </div>
      </div>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}