import { MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Destination, Hotel, Restaurant } from '@/data/sampleData';

interface PreviewCardProps {
  item: Destination | Hotel | Restaurant;
  type: 'destination' | 'hotel' | 'restaurant';
  onViewDetails: () => void;
  index: number;
}

export function PreviewCard({ item, type, onViewDetails, index }: PreviewCardProps) {
  const navigate = useNavigate();

  const getSubtitle = () => {
    if (type === 'destination') {
      return (item as Destination).region;
    } else if (type === 'hotel') {
      return (item as Hotel).location?.region || (item as Hotel).location || 'Sri Lanka';
    } else {
      return (item as Restaurant).location || 'Sri Lanka';
    }
  };

  const getCategory = () => {
    if (type === 'destination') {
      return (item as Destination).category;
    } else if (type === 'hotel') {
      return (item as Hotel).category;
    } else {
      return (item as Restaurant).cuisine;
    }
  };

  const getPrice = () => {
    if (type === 'hotel') {
      const hotel = item as Hotel;
      const currency = hotel.currency || '$';
      const price = hotel.pricePerNight || hotel.price;
      return price ? `${currency}${price}/night` : null;
    } else if (type === 'restaurant') {
      const restaurant = item as Restaurant;
      const price = restaurant.averagePrice;
      return price ? `$${price} avg` : null;
    }
    return null;
  };

  const getHighlights = () => {
    if (type === 'destination') {
      const dest = item as Destination;
      if (!dest.highlights || !Array.isArray(dest.highlights)) return [];
      return dest.highlights.slice(0, 3).map(h => h.title);
    } else if (type === 'hotel') {
      const hotel = item as Hotel;
      if (!hotel.amenities || !Array.isArray(hotel.amenities)) return [];
      return hotel.amenities.slice(0, 3);
    } else {
      const restaurant = item as Restaurant;
      return restaurant.specialty ? [restaurant.specialty] : [];
    }
  };

  const handleClick = () => {
    if (type === 'destination') {
      navigate(`/destinations/${item.id}`);
    } else if (type === 'hotel') {
      navigate(`/stay-eat/hotels/${item.id}`);
    } else if (type === 'restaurant') {
      navigate(`/stay-eat/restaurants/${item.id}`);
    }
  };

  const highlights = getHighlights();

  return (
    <div 
      onClick={handleClick}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift opacity-0 animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.heroImage}
          alt={item.name}
          className="w-full h-full object-cover image-zoom"
        />
        <div className="absolute inset-0 overlay-gradient opacity-40" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
            {getCategory()}
          </span>
        </div>

        {/* Price Badge (for hotels/restaurants) */}
        {getPrice() && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {getPrice()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            {getSubtitle()}
          </div>
        </div>

        {/* Summary */}
        {item.quickSummary && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {item.quickSummary}
          </p>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {highlights.map((highlight, i) => (
              <span 
                key={i}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          View Full Details
        </Button>
      </div>
    </div>
  );
}