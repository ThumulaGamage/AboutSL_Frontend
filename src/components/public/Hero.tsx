import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/sampleData';

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
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-secondary/20 blur-xl animate-float" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-accent/20 blur-xl animate-float stagger-2" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in-up">
            <span className="text-2xl">🌴</span>
            <span className="text-primary-foreground/90 font-medium">Welcome to Paradise</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up stagger-1">
            Explore Sri Lanka's
            <span className="block text-gradient">Hidden Treasures</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Discover ancient wonders, pristine beaches, lush tea estates, and unforgettable wildlife adventures in the Pearl of the Indian Ocean.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up stagger-3">
            <Button 
              size="lg" 
              className="golden-gradient text-secondary-foreground font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Exploring
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up stagger-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
        </div>
      </div>
    </section>
  );
}
