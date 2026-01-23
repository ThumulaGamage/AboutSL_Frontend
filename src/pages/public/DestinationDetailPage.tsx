import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight, Mountain, Eye, Lightbulb, BookOpen, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { NearbyPlaces } from '@/components/public/NearbyPlaces';
import { SectionNav, generateDestinationSections } from '@/components/public/SectionNav';
import { Hotel, Restaurant } from '@/types';

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const destination = destinations.find(d => d.id === Number(id));

  // Debug: Log destination data
  useEffect(() => {
    if (destination) {
      console.log('📍 Destination Data:', destination);
      console.log('📋 Overview:', destination.overview);
      console.log('👀 What to See:', destination.whatToSee);
      console.log('📅 Best Time:', destination.bestTimeToVisit);
      console.log('🎯 Things to Do:', destination.thingsToDo);
      console.log('💡 Travel Tips:', destination.travelTips);
      console.log('📜 History:', destination.historyAndLegend);
    }
  }, [destination]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle sticky nav visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyNav(heroBottom < 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Destination not found</h1>
          <Button onClick={() => navigate('/destinations')}>Back to Destinations</Button>
        </div>
      </div>
    );
  }

  // Helper function to safely parse JSON if it's a string
  const parseIfString = (data: any) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return data;
  };

  // Parse all sections
  const overview = parseIfString(destination.overview);
  const whatToSee = parseIfString(destination.whatToSee);
  const bestTimeToVisit = parseIfString(destination.bestTimeToVisit);
  const thingsToDo = parseIfString(destination.thingsToDo);
  const travelTips = parseIfString(destination.travelTips);
  const historyAndLegend = parseIfString(destination.historyAndLegend);

  // Build images array
  const images = [
    destination.heroImage,
    ...(overview?.images || []),
    ...(whatToSee?.images || []),
    ...(bestTimeToVisit?.images || []),
    ...(thingsToDo?.images || []),
    ...(travelTips?.images || []),
    ...(historyAndLegend?.images || []),
  ].filter(Boolean);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const sections = generateDestinationSections({
    ...destination,
    overview,
    whatToSee,
    bestTimeToVisit,
    thingsToDo,
    travelTips,
    historyAndLegend,
  });

  const handleSelectHotel = (hotel: Hotel) => {
    navigate(`/stay-eat/hotels/${hotel.id}`);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    navigate(`/stay-eat/restaurants/${restaurant.id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Image Gallery */}
      <div ref={heroRef} className="relative h-[60vh] md:h-[70vh]">
        <img
          src={images[currentImageIndex]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentImageIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/destinations')}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground capitalize">
            {destination.category}
          </span>
        </div>
      </div>

      {/* Sticky Section Navigation */}
      <div className={`fixed top-20 left-0 right-0 z-40 transition-all duration-300 ${
        showStickyNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4">
          <SectionNav sections={sections} />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card rounded-3xl shadow-lg p-6 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-lg">{destination.region}</span>
              </div>
            </div>
          </div>

          {/* Inline Section Navigation (for mobile initial view) */}
          <div className="mb-8 md:hidden">
            <SectionNav sections={sections} />
          </div>

          {/* Overview Section */}
          {overview?.description && (
            <section id="overview" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Overview</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {overview.description}
              </p>
              {/* Show section images if they exist */}
              {overview.images && overview.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {overview.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Overview ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* What to See Section */}
          {whatToSee?.highlights && whatToSee.highlights.length > 0 && (
            <section id="what-to-see" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">What to See</h2>
              </div>
              {whatToSee.description && (
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                  {whatToSee.description}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whatToSee.highlights.map((highlight: any, i: number) => (
                  <div key={i} className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      {highlight.image && (
                        <img 
                          src={highlight.image} 
                          alt={highlight.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Show section images if they exist */}
              {whatToSee.images && whatToSee.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {whatToSee.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt={`What to See ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Best Time to Visit Section */}
          {(bestTimeToVisit?.season || bestTimeToVisit?.description) && (
            <section id="best-time" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Best Time to Visit
                </h2>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8">
                {bestTimeToVisit.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                    {bestTimeToVisit.description}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bestTimeToVisit.season && (
                    <div className="text-center p-4 bg-card rounded-xl">
                      <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-xs text-muted-foreground mb-1">Season</div>
                      <div className="font-semibold text-foreground text-sm">
                        {bestTimeToVisit.season}
                      </div>
                    </div>
                  )}
                  {bestTimeToVisit.months && (
                    <div className="text-center p-4 bg-card rounded-xl">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-xs text-muted-foreground mb-1">Best Months</div>
                      <div className="font-semibold text-foreground text-sm">
                        {bestTimeToVisit.months}
                      </div>
                    </div>
                  )}
                  {bestTimeToVisit.weatherInfo && (
                    <div className="text-center p-4 bg-card rounded-xl">
                      <Mountain className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-xs text-muted-foreground mb-1">Weather</div>
                      <div className="font-semibold text-foreground text-xs">
                        {bestTimeToVisit.weatherInfo}
                      </div>
                    </div>
                  )}
                </div>
                {/* Show section images if they exist */}
                {bestTimeToVisit.images && bestTimeToVisit.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {bestTimeToVisit.images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Best Time ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Things to Do Section */}
          {thingsToDo?.activities && thingsToDo.activities.length > 0 && (
            <section id="things-to-do" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Mountain className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Things to Do
                </h2>
              </div>
              {thingsToDo.description && (
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                  {thingsToDo.description}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {thingsToDo.activities.map((activity: any, i: number) => (
                  <div key={i} className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      {activity.image && (
                        <img 
                          src={activity.image} 
                          alt={activity.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                          {activity.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Show section images if they exist */}
              {thingsToDo.images && thingsToDo.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {thingsToDo.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Things to Do ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Travel Tips Section */}
          {travelTips?.tips && travelTips.tips.length > 0 && (
            <section id="travel-tips" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Travel Tips
                </h2>
              </div>
              {travelTips.description && (
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                  {travelTips.description}
                </p>
              )}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8">
                <ul className="space-y-3">
                  {travelTips.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
                {/* Show section images if they exist */}
                {travelTips.images && travelTips.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {travelTips.images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Travel Tip ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* History & Legend Section */}
          {(historyAndLegend?.description || historyAndLegend?.historicalFacts || historyAndLegend?.legends) && (
            <section id="history" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <ScrollText className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  History & Legend
                </h2>
              </div>
              <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-2xl p-6 md:p-8 border border-accent/10">
                {historyAndLegend.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                    {historyAndLegend.description}
                  </p>
                )}
                {historyAndLegend.historicalFacts && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Historical Facts</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {historyAndLegend.historicalFacts}
                    </p>
                  </div>
                )}
                {historyAndLegend.legends && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Legends</h4>
                    <p className="text-muted-foreground leading-relaxed italic whitespace-pre-line">
                      {historyAndLegend.legends}
                    </p>
                  </div>
                )}
                {/* Show section images if they exist */}
                {historyAndLegend.images && historyAndLegend.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {historyAndLegend.images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt={`History ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Nearby Places */}
          <section id="nearby" className="scroll-mt-32">
            <NearbyPlaces
              destination={{
                ...destination,
                nearbyHotels: (destination as any).nearbyHotels,
                nearbyRestaurants: (destination as any).nearbyRestaurants,
              }}
              onSelectHotel={handleSelectHotel}
              onSelectRestaurant={handleSelectRestaurant}
            />
          </section>
        </div>
      </div>
    </div>
  );
}