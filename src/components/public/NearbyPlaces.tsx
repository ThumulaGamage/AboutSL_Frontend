import { MapPin, Hotel, UtensilsCrossed } from 'lucide-react';
import { Destination, Hotel as HotelType, Restaurant } from '@/types';

interface NearbyPlacesProps {
  destination: Destination & {
    nearbyHotels?: HotelType[];
    nearbyRestaurants?: Restaurant[];
  };
  onSelectHotel: (hotel: HotelType) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export function NearbyPlaces({ destination, onSelectHotel, onSelectRestaurant }: NearbyPlacesProps) {
  // Get nearby places from the destination object (populated by backend)
  const nearbyHotels = (destination.nearbyHotels || []).filter(h => h.status === 'active');
  const nearbyRestaurants = (destination.nearbyRestaurants || []).filter(r => r.status === 'active');

  if (nearbyHotels.length === 0 && nearbyRestaurants.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/50 rounded-xl">
        <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No nearby accommodations or restaurants found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nearby Accommodations & Dining
        </h2>
        <p className="text-muted-foreground mt-2">
          Discover places to stay and eat near this destination
        </p>
      </div>

      {/* Nearby Stays */}
      {nearbyHotels.length > 0 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-primary" />
            Nearby Stays ({nearbyHotels.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyHotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-border hover:border-primary/50"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={hotel.heroImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
                      {hotel.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{hotel.location?.region || 'Sri Lanka'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="text-sm font-semibold text-primary">
                      {hotel.currency || '$'}{hotel.price}/night
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Eats */}
      {nearbyRestaurants.length > 0 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            Nearby Dining ({nearbyRestaurants.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-border hover:border-primary/50"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={restaurant.heroImage}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
                      {restaurant.cuisine}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h4>
                  {restaurant.specialty && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {restaurant.specialty}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{restaurant.location?.region || 'Sri Lanka'}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {restaurant.priceRange || '$$'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}