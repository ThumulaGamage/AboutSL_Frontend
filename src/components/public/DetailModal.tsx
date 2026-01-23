import { useState } from 'react';
import { X, MapPin, Clock, DollarSign, Calendar, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Destination, Hotel, Restaurant } from '@/data/sampleData';

interface DetailModalProps {
  item: Destination | Hotel | Restaurant | null;
  type: 'destination' | 'hotel' | 'restaurant';
  isOpen: boolean;
  onClose: () => void;
}

export function DetailModal({ item, type, isOpen, onClose }: DetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const images = [item.heroImage, ...(Array.isArray(item.photoGallery) ? item.photoGallery : [])];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderDestinationContent = () => {
    const dest = item as Destination;
    return (
      <>
        {/* Description */}
        {dest.fullDescription && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">About This Place</h3>
            <div className="prose prose-sm text-muted-foreground">
              {dest.fullDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {dest.highlights && dest.highlights.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Special Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dest.highlights.map((highlight, i) => (
                <div key={i} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{highlight.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visit Info */}
        {dest.visitInfo && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Visitor Information</h3>
            <div className="bg-muted rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {dest.visitInfo.bestTime && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Best Time</div>
                      <div className="text-sm font-medium text-foreground">{dest.visitInfo.bestTime}</div>
                    </div>
                  </div>
                )}
                {dest.visitInfo.timeRequired && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Time Required</div>
                      <div className="text-sm font-medium text-foreground">{dest.visitInfo.timeRequired}</div>
                    </div>
                  </div>
                )}
                {dest.visitInfo.entryFee && (
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Entry Fee</div>
                      <div className="text-sm font-medium text-foreground">{dest.visitInfo.entryFee}</div>
                    </div>
                  </div>
                )}
              </div>
              {dest.visitInfo.tips && dest.visitInfo.tips.length > 0 && (
                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Tips & Recommendations</h4>
                  <ul className="space-y-2">
                    {dest.visitInfo.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderHotelContent = () => {
    const hotel = item as Hotel;
    return (
      <>
        {hotel.description && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">About This Hotel</h3>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>
        )}

        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, i) => (
                <span key={i} className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {hotel.pricePerNight && (
          <div className="bg-secondary/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground text-sm">Starting from</span>
                <div className="text-3xl font-bold text-foreground">${hotel.pricePerNight}</div>
                <span className="text-muted-foreground text-sm">per night</span>
              </div>
              <Button className="golden-gradient text-secondary-foreground font-semibold">
                Check Availability
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderRestaurantContent = () => {
    const restaurant = item as Restaurant;
    return (
      <>
        {restaurant.description && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">About This Restaurant</h3>
            <p className="text-muted-foreground">{restaurant.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          {restaurant.cuisine && (
            <div className="bg-muted rounded-lg p-4">
              <span className="text-muted-foreground text-sm">Cuisine</span>
              <div className="font-semibold text-foreground">{restaurant.cuisine}</div>
            </div>
          )}
          {restaurant.specialty && (
            <div className="bg-muted rounded-lg p-4">
              <span className="text-muted-foreground text-sm">Specialty</span>
              <div className="font-semibold text-foreground">{restaurant.specialty}</div>
            </div>
          )}
        </div>

        {restaurant.averagePrice && (
          <div className="bg-secondary/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground text-sm">Average meal</span>
                <div className="text-3xl font-bold text-foreground">${restaurant.averagePrice}</div>
                <span className="text-muted-foreground text-sm">per person</span>
              </div>
              <Button className="golden-gradient text-secondary-foreground font-semibold">
                Make Reservation
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-card custom-scrollbar">
        {/* Image Gallery */}
        <div className="relative h-80 md:h-96">
          <img
            src={images[currentImageIndex]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 overlay-gradient opacity-30" />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-primary-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImageIndex ? 'bg-primary-foreground' : 'bg-primary-foreground/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-2">
              <h2 className="font-display text-3xl font-bold text-foreground">{item.name}</h2>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>
                {type === 'destination' 
                  ? (item as Destination).region 
                  : type === 'hotel' 
                    ? (item as Hotel).location 
                    : (item as Restaurant).location}
              </span>
            </div>
          </div>

          {/* Type-specific content */}
          {type === 'destination' && renderDestinationContent()}
          {type === 'hotel' && renderHotelContent()}
          {type === 'restaurant' && renderRestaurantContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}