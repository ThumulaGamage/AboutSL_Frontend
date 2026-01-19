import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Destination, Hotel } from '@/data/sampleData';

interface TopRatedCardProps {
  item: Destination | Hotel;
  type: 'destination' | 'hotel';
  onClick: () => void;
  index: number;
}

function TopRatedCard({ item, type, onClick, index }: TopRatedCardProps) {
  return (
    <div 
      onClick={onClick}
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
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-foreground backdrop-blur-sm">
            {type === 'destination' ? (item as Destination).category : (item as Hotel).category}
          </span>
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors text-shadow">
            {item.name}
          </h3>
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {type === 'destination' ? (item as Destination).region : (item as Hotel).location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {item.quickSummary}
        </p>
        
        <div className="flex items-center justify-between">
          {type === 'hotel' && (
            <div className="text-lg font-bold text-primary">
              ${(item as Hotel).pricePerNight}
              <span className="text-sm text-muted-foreground font-normal">/night</span>
            </div>
          )}
          {type === 'destination' && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Featured</span>
            </div>
          )}
          <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
    </div>
  );
}

interface TopRatedSectionProps {
  onSelectItem: (item: Destination | Hotel, type: 'destination' | 'hotel') => void;
}

export function TopRatedSection({ onSelectItem }: TopRatedSectionProps) {
  const { destinations, hotels } = useData();
  const navigate = useNavigate();

  const topDestinations = destinations
    .filter(d => d.status === 'active')
    .slice(0, 4);

  const topHotels = hotels
    .filter(h => h.status === 'active')
    .slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Top Destinations */}
      <section className="relative">
        {/* Background Decoration */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Featured Destinations
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Featured <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Discover Sri Lanka's most loved places, handpicked by thousands of travelers
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all group"
            onClick={() => navigate('/destinations')}
          >
            View All Destinations 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
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
                onClick={() => onSelectItem(dest, 'destination')}
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

      {/* Top Hotels & Stays */}
      <section className="relative">
        {/* Background Decoration */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Premium Stays
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Featured <span className="text-gradient">Hotels & Stays</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Premium accommodations for an unforgettable journey through paradise
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex gap-2 border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-all group"
            onClick={() => navigate('/stay-eat')}
          >
            View All Stays 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
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
                onClick={() => onSelectItem(hotel, 'hotel')}
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
    </div>
  );
}
