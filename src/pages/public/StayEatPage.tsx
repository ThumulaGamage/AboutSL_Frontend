import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Hotel, UtensilsCrossed, DollarSign, X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';
import { categories, Hotel as HotelType, Restaurant } from '@/data/sampleData';

type TabType = 'stays' | 'eats';

export function StayEatPage() {
  const { hotels, restaurants } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<HotelType | Restaurant | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const stayCategories = ['all', ...categories.hotels];
  const eatCategories = ['all', ...categories.restaurants];
  const currentCategories = activeTab === 'stays' ? stayCategories : eatCategories;

  const filteredStays = useMemo(() => {
    let items = hotels.filter(h => h.status === 'active');

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(h =>
        h.name.toLowerCase().includes(query) ||
        h.location.toLowerCase().includes(query) ||
        h.quickSummary.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter(h => h.category.toLowerCase() === activeCategory.toLowerCase());
    }

    return items;
  }, [hotels, searchQuery, activeCategory]);

  const filteredEats = useMemo(() => {
    let items = restaurants.filter(r => r.status === 'active');

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.quickSummary.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter(r => r.cuisine.toLowerCase() === activeCategory.toLowerCase());
    }

    return items;
  }, [restaurants, searchQuery, activeCategory]);

  const handleViewDetails = (item: HotelType | Restaurant) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setDetailOpen(true);
  };

  const images = selectedItem ? [selectedItem.heroImage, ...selectedItem.photoGallery] : [];
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const isHotel = (item: HotelType | Restaurant): item is HotelType => 'pricePerNight' in item;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Stay & Eat
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Find the perfect accommodation and dining experiences for your Sri Lankan adventure
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as TabType); setActiveCategory('all'); setSearchQuery(''); }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <TabsList className="bg-card border border-border h-auto p-1 rounded-xl">
              <TabsTrigger 
                value="stays" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Hotel className="w-4 h-4" />
                Stays
              </TabsTrigger>
              <TabsTrigger 
                value="eats"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Eats
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {currentCategories.map((category) => (
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

          {/* Stays Tab */}
          <TabsContent value="stays" className="mt-0">
            <p className="text-muted-foreground mb-6">
              Showing <span className="font-semibold text-foreground">{filteredStays.length}</span> stays
            </p>
            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift opacity-0 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                    onClick={() => handleViewDetails(hotel)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={hotel.heroImage} alt={hotel.name} className="w-full h-full object-cover image-zoom" />
                      <div className="absolute inset-0 overlay-gradient opacity-40" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
                          {hotel.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${hotel.pricePerNight}/night
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">{hotel.quickSummary}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Hotel className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No stays found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* Eats Tab */}
          <TabsContent value="eats" className="mt-0">
            <p className="text-muted-foreground mb-6">
              Showing <span className="font-semibold text-foreground">{filteredEats.length}</span> restaurants
            </p>
            {filteredEats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEats.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift opacity-0 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                    onClick={() => handleViewDetails(restaurant)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={restaurant.heroImage} alt={restaurant.name} className="w-full h-full object-cover image-zoom" />
                      <div className="absolute inset-0 overlay-gradient opacity-40" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground capitalize">
                          {restaurant.cuisine}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${restaurant.averagePrice} avg
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {restaurant.location}
                      </div>
                      <div className="flex items-center gap-2 mb-3 text-muted-foreground text-sm">
                        <span>{restaurant.specialty}</span>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">{restaurant.quickSummary}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <UtensilsCrossed className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No restaurants found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-card custom-scrollbar">
          {selectedItem && (
            <>
              {/* Image Gallery */}
              <div className="relative h-80 md:h-96">
                <img
                  src={images[currentImageIndex]}
                  alt={selectedItem.name}
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
                    <h2 className="font-display text-3xl font-bold text-foreground">{selectedItem.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedItem.location}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    About This {isHotel(selectedItem) ? 'Hotel' : 'Restaurant'}
                  </h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>

                {isHotel(selectedItem) ? (
                  <>
                    <div className="mb-8">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.amenities.map((amenity, i) => (
                          <span key={i} className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground text-sm">Starting from</span>
                          <div className="text-3xl font-bold text-foreground">${selectedItem.pricePerNight}</div>
                          <span className="text-muted-foreground text-sm">per night</span>
                        </div>
                        <Button className="golden-gradient text-secondary-foreground font-semibold">
                          Check Availability
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-muted rounded-lg p-4">
                        <span className="text-muted-foreground text-sm">Cuisine</span>
                        <div className="font-semibold text-foreground">{(selectedItem as Restaurant).cuisine}</div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <span className="text-muted-foreground text-sm">Specialty</span>
                        <div className="font-semibold text-foreground">{(selectedItem as Restaurant).specialty}</div>
                      </div>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground text-sm">Average meal</span>
                          <div className="text-3xl font-bold text-foreground">${(selectedItem as Restaurant).averagePrice}</div>
                          <span className="text-muted-foreground text-sm">per person</span>
                        </div>
                        <Button className="golden-gradient text-secondary-foreground font-semibold">
                          Make Reservation
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
