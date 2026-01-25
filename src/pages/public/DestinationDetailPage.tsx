import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowLeft, Mountain, Eye, Lightbulb, CheckCircle, ScrollText, Hotel as HotelIcon, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Destination, Hotel, Restaurant } from '@/types';

const API_URL = 'http://localhost:5000/api';

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Fetch individual destination with nearby places
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/destinations/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setDestination(data.data);
        }
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestination();
      window.scrollTo(0, 0);
    }
  }, [id]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'what-to-see', 'best-time', 'things-to-do', 'travel-tips', 'history', 'where-to-stay', 'where-to-eat'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [destination]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading destination...</p>
        </div>
      </div>
    );
  }

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

  const overview = destination.overview;
  const whatToSee = destination.whatToSee;
  const bestTimeToVisit = destination.bestTimeToVisit;
  const thingsToDo = destination.thingsToDo;
  const travelTips = destination.travelTips;
  const historyAndLegend = destination.historyAndLegend;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  // Generate sections for navigation
  const sections = [];
  if (overview?.description) sections.push({ id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> });
  if (whatToSee?.highlights?.length) sections.push({ id: 'what-to-see', label: 'What to See', icon: <Eye className="w-4 h-4" /> });
  if (bestTimeToVisit?.season || bestTimeToVisit?.description) sections.push({ id: 'best-time', label: 'Best Time to Visit', icon: <Calendar className="w-4 h-4" /> });
  if (thingsToDo?.activities?.length) sections.push({ id: 'things-to-do', label: 'Things to Do', icon: <Mountain className="w-4 h-4" /> });
  if (travelTips?.tips?.length) sections.push({ id: 'travel-tips', label: 'Travel Tips', icon: <Lightbulb className="w-4 h-4" /> });
  if (historyAndLegend?.description) sections.push({ id: 'history', label: 'History & Legend', icon: <ScrollText className="w-4 h-4" /> });
  if (destination.nearbyHotels?.length) sections.push({ id: 'where-to-stay', label: 'Where to Stay', icon: <HotelIcon className="w-4 h-4" /> });
  if (destination.nearbyRestaurants?.length) sections.push({ id: 'where-to-eat', label: 'Where to Eat', icon: <UtensilsCrossed className="w-4 h-4" /> });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <button
          onClick={() => navigate('/destinations')}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Back to all posts</span>
        </button>

        <div className="absolute top-24 right-4 md:right-8">
          <span className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground capitalize">
            {destination.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{destination.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Left Sidebar Navigation */}
      <div className="flex">
        {/* Left Sidebar - Section Navigation (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 p-8">
            <h3 className="font-display text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Jump to Section
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content - Positioned Left of Center */}
        <div className="flex-1 flex justify-center px-4 md:px-8 py-12 md:py-20">
          <div className="w-full max-w-7xl flex justify-start">
            <div className="w-full max-w-3xl lg:ml-0 lg:mr-auto lg:pr-24">
             
          

              {/* Overview Section */}
              {overview?.description && (
                <section id="overview" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      Overview
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
                    {overview.description}
                  </p>
                  {overview.images && overview.images.length > 0 && (
                    <div className="space-y-6">
                      {overview.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Overview ${i + 1}`}
                          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* What to See Section */}
              {whatToSee?.highlights && whatToSee.highlights.length > 0 && (
                <section id="what-to-see" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <Eye className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      What to See
                    </h2>
                  </div>
                  {whatToSee.description && (
                    <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {whatToSee.description}
                    </p>
                  )}
                  <div className="space-y-6 mb-6">
                    {whatToSee.highlights.map((highlight: any, i: number) => (
                      <div key={i} className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          {highlight.image && (
                            <img 
                              src={highlight.image} 
                              alt={highlight.title}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                              {highlight.title}
                            </h4>
                            <p className="text-muted-foreground text-base">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {whatToSee.images && whatToSee.images.length > 0 && (
                    <div className="space-y-6">
                      {whatToSee.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          alt={`What to See ${i + 1}`}
                          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Best Time to Visit Section */}
              {(bestTimeToVisit?.season || bestTimeToVisit?.description) && (
                <section id="best-time" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
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
                        <div className="text-center p-6 bg-card rounded-xl">
                          <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                          <div className="text-sm text-muted-foreground mb-2">Season</div>
                          <div className="font-semibold text-foreground text-base">
                            {bestTimeToVisit.season}
                          </div>
                        </div>
                      )}
                      {bestTimeToVisit.months && (
                        <div className="text-center p-6 bg-card rounded-xl">
                          <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                          <div className="text-sm text-muted-foreground mb-2">Best Months</div>
                          <div className="font-semibold text-foreground text-base">
                            {bestTimeToVisit.months}
                          </div>
                        </div>
                      )}
                      {bestTimeToVisit.weatherInfo && (
                        <div className="text-center p-6 bg-card rounded-xl">
                          <Mountain className="w-10 h-10 text-primary mx-auto mb-3" />
                          <div className="text-sm text-muted-foreground mb-2">Weather</div>
                          <div className="font-semibold text-foreground text-sm">
                            {bestTimeToVisit.weatherInfo}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Things to Do Section */}
              {thingsToDo?.activities && thingsToDo.activities.length > 0 && (
                <section id="things-to-do" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Mountain className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      Things to Do
                    </h2>
                  </div>
                  {thingsToDo.description && (
                    <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {thingsToDo.description}
                    </p>
                  )}
                  <div className="space-y-6">
                    {thingsToDo.activities.map((activity: any, i: number) => (
                      <div key={i} className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          {activity.image && (
                            <img 
                              src={activity.image} 
                              alt={activity.title}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                              {activity.title}
                            </h4>
                            <p className="text-muted-foreground text-base">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {thingsToDo.images && thingsToDo.images.length > 0 && (
                    <div className="space-y-6 mt-6">
                      {thingsToDo.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Things to Do ${i + 1}`}
                          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Travel Tips Section */}
              {travelTips?.tips && travelTips.tips.length > 0 && (
                <section id="travel-tips" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      Travel Tips
                    </h2>
                  </div>
                  {travelTips.description && (
                    <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {travelTips.description}
                    </p>
                  )}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8">
                    <ul className="space-y-4">
                      {travelTips.tips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-base">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* History & Legend Section */}
              {(historyAndLegend?.description || historyAndLegend?.historicalFacts || historyAndLegend?.legends) && (
                <section id="history" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <ScrollText className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
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
                        <h4 className="font-semibold text-foreground mb-2 text-lg">Historical Facts</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {historyAndLegend.historicalFacts}
                        </p>
                      </div>
                    )}
                    {historyAndLegend.legends && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-lg">Legends</h4>
                        <p className="text-muted-foreground leading-relaxed italic whitespace-pre-line">
                          {historyAndLegend.legends}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Where to Stay Section */}
              {destination.nearbyHotels && destination.nearbyHotels.length > 0 && (
                <section id="where-to-stay" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HotelIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      Where to Stay
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.nearbyHotels.slice(0, 4).map((hotel: any) => (
                      <div
                        key={hotel.id}
                        onClick={() => navigate(`/stay-eat/hotels/${hotel.id}`)}
                        className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={hotel.heroImage}
                            alt={hotel.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {hotel.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {hotel.distanceToDestination} {hotel.distanceUnit} away
                          </p>
                          <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                            View Details
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Where to Eat Section */}
              {destination.nearbyRestaurants && destination.nearbyRestaurants.length > 0 && (
                <section id="where-to-eat" className="mb-20 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <UtensilsCrossed className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      Where to Eat
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.nearbyRestaurants.slice(0, 4).map((restaurant: any) => (
                      <div
                        key={restaurant.id}
                        onClick={() => navigate(`/stay-eat/restaurants/${restaurant.id}`)}
                        className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={restaurant.heroImage}
                            alt={restaurant.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {restaurant.distanceToDestination} {restaurant.distanceUnit} away
                          </p>
                          <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                            View Details
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}