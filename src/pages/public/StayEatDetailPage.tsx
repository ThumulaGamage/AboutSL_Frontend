import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight, Phone, Globe, UtensilsCrossed, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Hotel, Restaurant } from '@/types';

export function StayEatDetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { hotels, restaurants } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isHotel = type === 'hotels';
  const item: Hotel | Restaurant | undefined = isHotel 
    ? hotels.find(h => h.id === Number(id))
    : restaurants.find(r => r.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {isHotel ? 'Hotel' : 'Restaurant'} not found
          </h1>
          <Button onClick={() => navigate('/stay-eat')}>Back to Stay & Eat</Button>
        </div>
      </div>
    );
  }

  // Build images array from heroImage and photoGallery
  let galleryImages: string[] = [];
  
  if (item.photoGallery) {
    if (typeof item.photoGallery === 'string') {
      try {
        const parsed = JSON.parse(item.photoGallery);
        galleryImages = Array.isArray(parsed) 
          ? parsed.map(img => typeof img === 'string' ? img : img.url).filter(Boolean)
          : [];
      } catch {
        galleryImages = [];
      }
    } else if (Array.isArray(item.photoGallery)) {
      galleryImages = item.photoGallery.map(img => 
        typeof img === 'string' ? img : img.url
      ).filter(Boolean);
    }
  }
  
  const images = [item.heroImage, ...galleryImages].filter(Boolean);
  
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const hotel = item as Hotel;
  const restaurant = item as Restaurant;

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <img
          src={images[currentImageIndex]}
          alt={item.name}
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
          onClick={() => navigate('/stay-eat')}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Category & Price Badge */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground capitalize">
            {isHotel ? hotel.category : restaurant.cuisine}
          </span>
          <span className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {isHotel 
              ? `${hotel.currency || '$'}${hotel.price}/night` 
              : `${restaurant.priceRange || '$$'}`
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-card rounded-3xl shadow-lg p-6 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {item.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-lg">{item.location?.region || 'Sri Lanka'}</span>
                  </div>
                </div>
              </div>
              {isHotel ? <Bed className="w-12 h-12 text-primary" /> : <UtensilsCrossed className="w-12 h-12 text-primary" />}
            </div>
            {item.quickSummary && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {item.quickSummary}
              </p>
            )}
          </div>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              About
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {item.fullDescription}
            </p>
          </section>

          {/* Hotel-specific sections */}
          {isHotel && hotel.amenities && (() => {
            let amenitiesList: any[] = [];
            if (typeof hotel.amenities === 'string') {
              try {
                amenitiesList = JSON.parse(hotel.amenities);
              } catch {
                amenitiesList = [];
              }
            } else if (Array.isArray(hotel.amenities)) {
              amenitiesList = hotel.amenities;
            }
            
            return amenitiesList.length > 0 ? (
              <section className="mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenitiesList.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">
                        {typeof amenity === 'string' ? amenity : amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null;
          })()}

          {/* Restaurant-specific sections */}
          {!isHotel && restaurant.specialty && (
            <section className="mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Specialty
              </h2>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                <p className="text-lg text-foreground font-medium">
                  {restaurant.specialty}
                </p>
              </div>
            </section>
          )}

          {!isHotel && restaurant.menuHighlights && (() => {
            let menuList: any[] = [];
            if (typeof restaurant.menuHighlights === 'string') {
              try {
                menuList = JSON.parse(restaurant.menuHighlights);
              } catch {
                menuList = [];
              }
            } else if (Array.isArray(restaurant.menuHighlights)) {
              menuList = restaurant.menuHighlights;
            }
            
            return menuList.length > 0 ? (
              <section className="mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Menu Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuList.map((dish, i) => (
                    <div key={i} className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl p-6">
                      {typeof dish === 'string' ? (
                        <p className="text-foreground font-medium">{dish}</p>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-display text-lg font-semibold text-foreground">
                              {dish.name}
                            </h4>
                            {dish.price && (
                              <span className="text-primary font-semibold">
                                ${dish.price}
                              </span>
                            )}
                          </div>
                          {dish.description && (
                            <p className="text-muted-foreground text-sm">
                              {dish.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ) : null;
          })()}

          {/* Hours (Restaurant) */}
          {!isHotel && restaurant.hours && (() => {
            let hoursObj: Record<string, string> = {};
            if (typeof restaurant.hours === 'string') {
              try {
                hoursObj = JSON.parse(restaurant.hours);
              } catch {
                hoursObj = {};
              }
            } else if (typeof restaurant.hours === 'object' && restaurant.hours !== null) {
              hoursObj = restaurant.hours;
            }
            
            const hoursEntries = Object.entries(hoursObj);
            return hoursEntries.length > 0 ? (
              <section className="mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Opening Hours
                </h2>
                <div className="bg-muted/50 rounded-2xl p-6">
                  <div className="space-y-3">
                    {hoursEntries.map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-foreground font-medium capitalize">{day}</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null;
          })()}

          {/* Contact Information */}
          {(item.contact || item.websiteUrl) && (
            <section className="mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                <div className="space-y-4">
                  {item.location?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">Address</div>
                        <div className="text-muted-foreground">{item.location.address}</div>
                      </div>
                    </div>
                  )}
                  {item.contact?.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">Phone</div>
                        <a 
                          href={`tel:${item.contact.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {item.contact?.email && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <a 
                          href={`mailto:${item.contact.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.contact.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {/* ✅ NEW: Official Website Button */}
                  {item.websiteUrl && (
                    <div className="pt-4 border-t border-border">
                      <Button
                        onClick={() => window.open(item.websiteUrl, '_blank', 'noopener,noreferrer')}
                        className="w-full text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 text-primary-foreground"
                        size="lg"
                      >
                        <Globe className="w-5 h-5" />
                        Visit Official Website
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Location Map Placeholder */}
          {item.location?.coordinates?.lat && item.location?.coordinates?.lng && (
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Location
              </h2>
              <div className="bg-muted/50 rounded-2xl p-8 text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Coordinates: {item.location.coordinates.lat.toFixed(4)}, {item.location.coordinates.lng.toFixed(4)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Map integration coming soon
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}