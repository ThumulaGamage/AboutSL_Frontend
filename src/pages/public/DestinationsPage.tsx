import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, X, ChevronLeft, ChevronRight, Clock, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';
import { categories, Destination, Hotel, Restaurant } from '@/data/sampleData';
import { NearbyPlaces } from '@/components/public/NearbyPlaces';

export function DestinationsPage() {
  const { destinations } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedNearbyItem, setSelectedNearbyItem] = useState<Hotel | Restaurant | null>(null);
  const [nearbyItemType, setNearbyItemType] = useState<'hotel' | 'restaurant'>('hotel');
  const [nearbyModalOpen, setNearbyModalOpen] = useState(false);

  const categoryList = ['all', ...categories.destinations];

  const filteredDestinations = useMemo(() => {
    let items = destinations.filter(d => d.status === 'active');

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query) ||
        d.quickSummary.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());
    }

    return items;
  }, [destinations, searchQuery, activeCategory]);

  const handleViewDetails = (dest: Destination) => {
    setSelectedDestination(dest);
    setCurrentImageIndex(0);
    setDetailOpen(true);
  };

  const images = selectedDestination ? [selectedDestination.heroImage, ...selectedDestination.photoGallery] : [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Explore Destinations
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Discover Sri Lanka's most breathtaking destinations, from ancient wonders to natural paradises
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> destinations
        </p>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift opacity-0 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                onClick={() => handleViewDetails(dest)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover image-zoom"
                  />
                  <div className="absolute inset-0 overlay-gradient opacity-40" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
                      {dest.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {dest.region}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{dest.quickSummary}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <MapPin className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-card custom-scrollbar">
          {selectedDestination && (
            <>
              {/* Image Gallery */}
              <div className="relative h-80 md:h-96">
                <img
                  src={images[currentImageIndex]}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 overlay-gradient opacity-30" />
                
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

                <button
                  onClick={() => setDetailOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="mb-2">
                    <h2 className="font-display text-3xl font-bold text-foreground">{selectedDestination.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedDestination.region}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">About This Place</h3>
                  <div className="prose prose-sm text-muted-foreground">
                    {selectedDestination.fullDescription.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Special Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDestination.highlights.map((highlight, i) => (
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

                {/* Visit Info */}
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Visitor Information</h3>
                  <div className="bg-muted rounded-lg p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Best Time</div>
                          <div className="text-sm font-medium text-foreground">{selectedDestination.visitInfo.bestTime}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Time Required</div>
                          <div className="text-sm font-medium text-foreground">{selectedDestination.visitInfo.timeRequired}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Entry Fee</div>
                          <div className="text-sm font-medium text-foreground">{selectedDestination.visitInfo.entryFee}</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Tips & Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedDestination.visitInfo.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>


                {/* Nearby Places */}
                <NearbyPlaces
                  destination={selectedDestination}
                  onSelectHotel={(hotel) => {
                    setSelectedNearbyItem(hotel);
                    setNearbyItemType('hotel');
                    setNearbyModalOpen(true);
                  }}
                  onSelectRestaurant={(restaurant) => {
                    setSelectedNearbyItem(restaurant);
                    setNearbyItemType('restaurant');
                    setNearbyModalOpen(true);
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Nearby Item Modal */}
      <Dialog open={nearbyModalOpen} onOpenChange={setNearbyModalOpen}>
        <DialogContent className="max-w-2xl p-0 bg-card">
          {selectedNearbyItem && (
            <>
              <div className="relative h-64">
                <img
                  src={selectedNearbyItem.heroImage}
                  alt={selectedNearbyItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setNearbyModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">{selectedNearbyItem.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedNearbyItem.location}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {nearbyItemType === 'hotel' 
                    ? (selectedNearbyItem as Hotel).description 
                    : (selectedNearbyItem as Restaurant).description}
                </p>
                {nearbyItemType === 'hotel' ? (
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div>
                      <span className="text-muted-foreground text-sm">Starting from</span>
                      <div className="text-2xl font-bold text-foreground">${(selectedNearbyItem as Hotel).pricePerNight}/night</div>
                    </div>
                    <Button className="golden-gradient text-secondary-foreground">Check Availability</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div>
                      <span className="text-muted-foreground text-sm">Average meal</span>
                      <div className="text-2xl font-bold text-foreground">${(selectedNearbyItem as Restaurant).averagePrice}/person</div>
                    </div>
                    <Button className="golden-gradient text-secondary-foreground">Make Reservation</Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
