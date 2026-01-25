import { MapPin, ArrowRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Destination, Hotel, Restaurant } from '@/types';

interface TopRatedCardProps {
  item: Destination | Hotel | Restaurant;
  type: 'destination' | 'hotel' | 'restaurant';
  index: number;
}

function TopRatedCard({ item, type, index }: TopRatedCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'destination') {
      navigate(`/destinations/${item.id}`);
    } else if (type === 'hotel') {
      navigate(`/stay-eat/hotels/${item.id}`);
    } else {
      navigate(`/stay-eat/restaurants/${item.id}`);
    }
  };

  // Helper functions for type-safe access
  const getDescription = () => {
    if (type === 'destination') {
      const dest = item as Destination;
      return dest.quickSummary || dest.overview?.description || dest.fullDescription?.slice(0, 100);
    } else if (type === 'hotel') {
      const hotel = item as Hotel;
      return hotel.quickSummary || hotel.overview?.description || hotel.fullDescription?.slice(0, 100);
    } else {
      const restaurant = item as Restaurant;
      return restaurant.quickSummary || restaurant.specialty || restaurant.fullDescription?.slice(0, 100);
    }
  };

  const getPrice = () => {
    if (type === 'hotel') {
      const hotel = item as Hotel;
      const currency = hotel.currency || '$';
      const price = hotel.price || hotel.pricePerNight;
      return price ? `${currency}${price}` : null;
    } else if (type === 'restaurant') {
      const restaurant = item as Restaurant;
      return restaurant.priceRange || '$$';
    }
    return null;
  };

  const getBadge = () => {
    if (type === 'destination') return (item as Destination).category;
    if (type === 'hotel') return (item as Hotel).category;
    return (item as Restaurant).cuisine;
  };

  const getLocation = () => {
    if (type === 'destination') return (item as Destination).region;
    if (type === 'hotel') return (item as Hotel).location?.region || 'Sri Lanka';
    return (item as Restaurant).location?.region || 'Sri Lanka';
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer card-modern relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.heroImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-foreground backdrop-blur-sm capitalize">
            {getBadge()}
          </span>
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors text-shadow">
            {item.name}
          </h3>
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {getLocation()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {getDescription()}
        </p>
        
        <div className="flex items-center justify-between">
          {type === 'hotel' && getPrice() && (
            <div className="text-lg font-bold text-primary">
              {getPrice()}
              <span className="text-sm text-muted-foreground font-normal">/night</span>
            </div>
          )}
          {type === 'restaurant' && getPrice() && (
            <div className="text-lg font-bold text-primary">
              {getPrice()}
            </div>
          )}
          {type === 'destination' && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Featured</span>
            </div>
          )}
          <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
            {type === 'restaurant' ? 'View Menu' : 'Explore'} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
    </div>
  );
}

export function TopRatedSection() {
  const { destinations, hotels, restaurants } = useData();
  const navigate = useNavigate();

  const topDestinations = destinations
    .filter(d => d.status === 'active')
    .slice(0, 4);

  const topHotels = hotels
    .filter(h => h.status === 'active')
    .slice(0, 4);

  const topRestaurants = restaurants
    .filter(r => r.status === 'active')
    .slice(0, 4);

  return (
    <div className="space-y-32">
      {/* Top Destinations - Editorial Style */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">✦ Explore Places</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
              THE PLACES
              <span className="block text-muted-foreground/40">TO BE.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted-foreground text-lg mb-4">
              Discover Sri Lanka's most breathtaking destinations, from ancient ruins to pristine beaches and misty highlands.
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-foreground hover:text-primary font-semibold uppercase tracking-wider text-sm group"
              onClick={() => navigate('/destinations')}
            >
              Explore All Places
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDestinations.map((dest, index) => (
            <div 
              key={dest.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <TopRatedCard 
                item={dest} 
                type="destination" 
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button 
            className="w-full gap-2 sunset-gradient text-white"
            onClick={() => navigate('/destinations')}
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Top Hotels & Stays - Editorial Style */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">✦ Where to Stay</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
              THE ART OF
              <span className="block text-muted-foreground/40">STAYING.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted-foreground text-lg mb-4">
              Experience luxury and comfort in handpicked accommodations, from boutique hotels to beachfront resorts.
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-foreground hover:text-secondary font-semibold uppercase tracking-wider text-sm group"
              onClick={() => navigate('/stay-eat')}
            >
              View All Stays
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topHotels.map((hotel, index) => (
            <div 
              key={hotel.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <TopRatedCard 
                item={hotel} 
                type="hotel" 
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button 
            className="w-full gap-2 sunset-gradient text-white"
            onClick={() => navigate('/stay-eat')}
          >
            View All Hotels & Stays <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Top Restaurants - Editorial Style */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-4">✦ Where to Dine</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
              FLAVORS OF
              <span className="block text-muted-foreground/40">THE ISLAND.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted-foreground text-lg mb-4">
              Savor authentic Sri Lankan cuisine and international flavors in carefully selected restaurants across the island.
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-foreground hover:text-accent font-semibold uppercase tracking-wider text-sm group"
              onClick={() => navigate('/stay-eat?tab=restaurants')}
            >
              View All Restaurants
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRestaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <TopRatedCard 
                item={restaurant} 
                type="restaurant" 
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button 
            className="w-full gap-2 sunset-gradient text-white"
            onClick={() => navigate('/stay-eat?tab=restaurants')}
          >
            View All Restaurants <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}