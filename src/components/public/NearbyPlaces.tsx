import { MapPin, Hotel, UtensilsCrossed } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { Destination, Hotel as HotelType, Restaurant } from '@/data/sampleData';

interface NearbyPlacesProps {
  destination: Destination;
  onSelectHotel: (hotel: HotelType) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export function NearbyPlaces({ destination, onSelectHotel, onSelectRestaurant }: NearbyPlacesProps) {
  const { hotels, restaurants } = useData();

  const nearbyHotels = hotels.filter(h => 
    destination.relatedHotels.includes(h.id) && h.status === 'active'
  );

  const nearbyRestaurants = restaurants.filter(r => 
    destination.relatedRestaurants.includes(r.id) && r.status === 'active'
  );

  if (nearbyHotels.length === 0 && nearbyRestaurants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 mt-8">
      {/* Nearby Stays */}
      {nearbyHotels.length > 0 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-primary" />
            Nearby Stays
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyHotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className="flex gap-4 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <img
                  src={hotel.heroImage}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{hotel.name}</h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-semibold text-primary">${hotel.pricePerNight}/night</span>
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
            Nearby Eats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className="flex gap-4 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <img
                  src={restaurant.heroImage}
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{restaurant.name}</h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    <span className="truncate">{restaurant.cuisine} • {restaurant.specialty}</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-semibold text-primary">${restaurant.averagePrice} avg</span>
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
