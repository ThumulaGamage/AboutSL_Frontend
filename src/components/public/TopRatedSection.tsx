import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Destination, Hotel, Restaurant } from '@/types';

interface LargeCardProps {
  item: Destination;
  index: number;
}

function LargeDestinationCard({ item, index }: LargeCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/destinations/${item.id}`)}
      className="group cursor-pointer relative rounded-3xl overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Container - Full height */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={item.heroImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            {item.region}
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          {item.quickSummary && (
            <p className="text-white/90 text-base leading-relaxed line-clamp-2 mb-4 max-w-2xl">
              {item.quickSummary}
            </p>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/40 transition-colors pointer-events-none" />
    </div>
  );
}

interface HotelCardProps {
  item: Hotel | Restaurant;
  type: 'hotel' | 'restaurant';
  index: number;
}

function HotelRestaurantCard({ item, type, index }: HotelCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'hotel') {
      navigate(`/stay-eat/hotels/${item.id}`);
    } else {
      navigate(`/stay-eat/restaurants/${item.id}`);
    }
  };

  const getPrice = () => {
    if (type === 'hotel') {
      const hotel = item as Hotel;
      return `${hotel.currency || '$'}${hotel.price}/night`;
    } else {
      const restaurant = item as Restaurant;
      return restaurant.priceRange || '$$';
    }
  };

  const getCategory = () => {
    if (type === 'hotel') return (item as Hotel).category;
    return (item as Restaurant).cuisine;
  };

  const getLocation = () => {
    if (type === 'hotel') return (item as Hotel).location?.region || 'Sri Lanka';
    return (item as Restaurant).location?.region || 'Sri Lanka';
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src={item.heroImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-foreground backdrop-blur-sm">
            {getCategory()}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground backdrop-blur-sm">
            {getPrice()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          {getLocation()}
        </div>
        
        <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        
        {item.quickSummary && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {item.quickSummary}
          </p>
        )}

        <button className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
          View Property Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
    </div>
  );
}

export function TopRatedSection() {
  const { destinations, hotels, restaurants } = useData();
  const navigate = useNavigate();

  const topDestinations = destinations
    .filter(d => d.status === 'active')
    .slice(0, 7);

  const topHotels = hotels
    .filter(h => h.status === 'active')
    .slice(0, 4);

  const topRestaurants = restaurants
    .filter(r => r.status === 'active')
    .slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Top Destinations - Bento Grid */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Title */}
          <div className="lg:col-span-5">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">✦ Curated Selection</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.05]">
              THE PLACES<br />
              <span className="text-muted-foreground/30">TO BE.</span>
            </h2>
          </div>
          
          {/* Right: Description */}
          <div className="lg:col-span-7 flex items-end">
            <div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Our 2026 guide features locations that define the current spirit of the island—from cloud forests to ancient temples, each destination tells a story.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Large Card - Spans 2 columns */}
          {topDestinations[0] && (
            <div className="lg:col-span-2">
              <LargeDestinationCard item={topDestinations[0]} index={0} />
            </div>
          )}
          
          {/* Medium Cards */}
          {topDestinations[1] && (
            <div className="lg:col-span-1">
              <LargeDestinationCard item={topDestinations[1]} index={1} />
            </div>
          )}
          {topDestinations[2] && (
            <div className="lg:col-span-1">
              <LargeDestinationCard item={topDestinations[2]} index={2} />
            </div>
          )}

          {/* Second Row */}
          {topDestinations[3] && (
            <div className="lg:col-span-1">
              <LargeDestinationCard item={topDestinations[3]} index={3} />
            </div>
          )}
          {topDestinations[4] && (
            <div className="lg:col-span-2">
              <LargeDestinationCard item={topDestinations[4]} index={4} />
            </div>
          )}
          {topDestinations[5] && (
            <div className="lg:col-span-1">
              <LargeDestinationCard item={topDestinations[5]} index={5} />
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            className="px-8 py-6 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full"
            onClick={() => navigate('/destinations')}
          >
            Explore All Places
          </Button>
        </div>
      </section>

      {/* Top Hotels - 2 Column Grid */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Title */}
          <div className="lg:col-span-5">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">✦ Signature Experiences</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.05]">
              THE ART OF<br />
              <span className="text-muted-foreground/30">STAYING.</span>
            </h2>
          </div>
          
          {/* Right: Description + Navigation */}
          <div className="lg:col-span-7 flex items-end justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Experience luxury and comfort in handpicked accommodations, from boutique hotels to beachfront resorts across Sri Lanka.
              </p>
            </div>
            <div className="hidden lg:flex gap-3 ml-6">
              <button className="p-3 rounded-full border-2 border-border hover:border-foreground transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-3 rounded-full border-2 border-border hover:border-foreground transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topHotels.map((hotel, index) => (
            <HotelRestaurantCard 
              key={hotel.id}
              item={hotel} 
              type="hotel" 
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            className="px-8 py-6 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full"
            onClick={() => navigate('/stay-eat')}
          >
            View Full Collection
          </Button>
        </div>
      </section>

      {/* Top Restaurants - 2 Column Grid */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Title */}
          <div className="lg:col-span-5">
            <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-4">✦ Culinary Journey</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.05]">
              FLAVORS OF<br />
              <span className="text-muted-foreground/30">THE ISLAND.</span>
            </h2>
          </div>
          
          {/* Right: Description + Navigation */}
          <div className="lg:col-span-7 flex items-end justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Savor authentic Sri Lankan cuisine and international flavors in carefully selected restaurants across the island.
              </p>
            </div>
            <div className="hidden lg:flex gap-3 ml-6">
              <button className="p-3 rounded-full border-2 border-border hover:border-foreground transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-3 rounded-full border-2 border-border hover:border-foreground transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topRestaurants.map((restaurant, index) => (
            <HotelRestaurantCard 
              key={restaurant.id}
              item={restaurant} 
              type="restaurant" 
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            className="px-8 py-6 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full"
            onClick={() => navigate('/stay-eat?tab=restaurants')}
          >
            View Full Collection
          </Button>
        </div>
      </section>
    </div>
  );
}