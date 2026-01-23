import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Ancient Wonders',
    subtitle: 'Discover Sigiriya Rock Fortress',
    description: 'Climb the legendary Lion Rock and explore 1,500-year-old frescoes',
    badge: 'Historical Sites'
  },
  {
    image: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Pristine Beaches',
    subtitle: 'Relax on Golden Shores',
    description: 'Sun-kissed coastlines and crystal-clear tropical waters await',
    badge: 'Beach Paradise'
  },
  {
    image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Wildlife Safari',
    subtitle: 'Experience Yala National Park',
    description: 'Home to the highest density of leopards in the world',
    badge: 'Wildlife'
  },
  {
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Misty Mountains',
    subtitle: 'Explore the Hill Country',
    description: 'Rolling tea plantations and breathtaking mountain vistas',
    badge: 'Hill Country'
  },
  {
    image: 'https://images.pexels.com/photos/12891725/pexels-photo-12891725.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Cultural Heritage',
    subtitle: 'Walk Through History',
    description: 'Ancient temples and UNESCO World Heritage Sites',
    badge: 'Culture & Heritage'
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

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Ken Burns Effect */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Multi-layer Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content - Outside of slides map so it's always interactive */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0 delay-300' 
                    : 'opacity-0 translate-y-12 absolute pointer-events-none'
                }`}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-white text-sm font-medium tracking-wider uppercase">
                    {slide.badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                  {slide.title}
                </h1>
                
                {/* Subtitle */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-6 font-light">
                  {slide.subtitle}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA Buttons - Fixed to always be clickable */}
                {index === currentSlide && (
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-6 text-base shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105 group"
                      onClick={() => navigate('/destinations')}
                    >
                      Start Exploring
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-6 text-base shadow-2xl transition-all hover:scale-105"
                      onClick={() => navigate('/about')}
                    >
                      Learn More
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all z-30 group disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all z-30 group disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2 md:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className="group relative disabled:cursor-not-allowed"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'w-10 md:w-12 bg-white' 
                      : 'w-6 md:w-8 bg-white/40 group-hover:bg-white/60'
                  }`} />
                  {index === currentSlide && (
                    <div className="absolute inset-0 h-1 rounded-full bg-white/50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Play/Pause & Counter */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 md:p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-white" />
                ) : (
                  <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-white" />
                )}
              </button>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                <span className="text-white font-semibold text-sm md:text-base">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="text-white/50 mx-1 md:mx-2">/</span>
                <span className="text-white/70 text-sm md:text-base">
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-30 hidden md:block">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/70 text-xs uppercase tracking-widest font-medium">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-white/70 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}