import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Ancient Wonders',
    subtitle: 'Discover Sigiriya Rock Fortress',
    description: 'Climb the legendary Lion Rock and explore 1,500-year-old frescoes'
  },
  {
    image: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Pristine Beaches',
    subtitle: 'Relax on Golden Shores',
    description: 'Sun-kissed coastlines and crystal-clear tropical waters await'
  },
  {
    image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Wildlife Safari',
    subtitle: 'Experience Yala National Park',
    description: 'Home to the highest density of leopards in the world'
  },
  {
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Misty Mountains',
    subtitle: 'Explore the Hill Country',
    description: 'Rolling tea plantations and breathtaking mountain vistas'
  },
  {
    image: 'https://images.pexels.com/photos/12891725/pexels-photo-12891725.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Cultural Heritage',
    subtitle: 'Walk Through History',
    description: 'Ancient temples and UNESCO World Heritage Sites'
  }
];

export function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float" />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-110'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className={`transition-all duration-700 delay-200 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
                      Discover Sri Lanka
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 text-shadow-lg leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-4 font-light">
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      size="lg" 
                      className="sunset-gradient text-white font-semibold px-8 py-6 text-lg shadow-glow-accent hover:opacity-90 transition-all hover:scale-105"
                      onClick={() => navigate('/destinations')}
                    >
                      Start Exploring
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="glass border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                      onClick={() => navigate('/about')}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full glass hover:bg-white/20 transition-all z-30 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full glass hover:bg-white/20 transition-all z-30 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'w-12 bg-secondary' 
                      : 'w-8 bg-white/40 group-hover:bg-white/60'
                  }`} />
                  {index === currentSlide && (
                    <div className="absolute inset-0 h-1 rounded-full bg-secondary/50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Play/Pause & Slide Counter */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full glass hover:bg-white/20 transition-all"
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 text-white" />
                ) : (
                  <Pause className="w-4 h-4 text-white" />
                )}
              </button>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-white font-medium">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="text-white/50 mx-2">/</span>
                <span className="text-white/50">
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden md:block">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
