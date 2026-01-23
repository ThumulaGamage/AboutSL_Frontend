import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/sampleData';
import logoGif from '@/assets/aboutsl-logo.gif';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586613835259-8fd2b8d851c5?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-8 animate-fade-in-up uppercase tracking-wider">
              <span>✦ Discover Sri Lanka</span>
            </div>

            {/* Main Heading - Bold Editorial Style */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up stagger-1 leading-[1.1]">
              EXPERIENCE
              <span className="block text-secondary">THE SOUL</span>
              <span className="block">OF SRI LANKA</span>
            </h1>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up stagger-2">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base uppercase tracking-wider"
                onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Exploring
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap gap-8 animate-fade-in-up stagger-3">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="hidden lg:flex flex-col gap-4 animate-fade-in-up stagger-4">
            {/* Watch Journey Card */}
            <div className="bg-primary rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-primary/90 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <div>
                <div className="text-primary-foreground font-semibold uppercase tracking-wider text-sm">Watch the</div>
                <div className="text-primary-foreground font-display text-xl font-bold">Journey</div>
              </div>
            </div>

            {/* Logo Display */}
            <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
              <img 
                src={logoGif} 
                alt="AboutSL Logo" 
                className="w-full h-auto brightness-0 invert opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
        </div>
      </div>
    </section>
  );
}