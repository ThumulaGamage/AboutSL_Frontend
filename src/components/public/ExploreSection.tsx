import { useState, useMemo } from 'react';
import { Search, MapPin, Hotel, UtensilsCrossed, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PreviewCard } from './PreviewCard';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Destination, Hotel as HotelType, Restaurant } from '@/types';

interface ExploreSectionProps {
  selectedDestinationId?: number | null;
  onClearSelection: () => void;
}

type TabType = 'destinations' | 'hotels' | 'restaurants';
type ItemType = Destination | HotelType | Restaurant;

export function ExploreSection({ selectedDestinationId, onClearSelection }: ExploreSectionProps) {
  const { destinations, hotels, restaurants } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Handle pre-selected destination from map
  useMemo(() => {
    if (selectedDestinationId) {
      const dest = destinations.find(d => d.id === selectedDestinationId);
      if (dest) {
        navigate(`/destinations/${dest.id}`);
        onClearSelection();
      }
    }
  }, [selectedDestinationId, destinations, navigate, onClearSelection]);

  // Define categories
  const destinationCategories = ['all', 'beach', 'nature', 'cultural', 'wildlife'];
  const hotelCategories = ['all', 'luxury', 'mid-range', 'budget'];
  const restaurantCategories = ['all', 'sri lankan', 'seafood', 'international', 'vegetarian'];

  const currentCategories = activeTab === 'destinations' 
    ? destinationCategories 
    : activeTab === 'hotels' 
    ? hotelCategories 
    : restaurantCategories;

  // Get active items and filter
  const filteredItems = useMemo(() => {
    let items: ItemType[] = [];
    
    if (activeTab === 'destinations') {
      items = destinations.filter(d => d.status === 'active');
    } else if (activeTab === 'hotels') {
      items = hotels.filter(h => h.status === 'active');
    } else {
      items = restaurants.filter(r => r.status === 'active');
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDescription = item.overview?.description?.toLowerCase().includes(query) || 
                                   item.quickSummary?.toLowerCase().includes(query) ||
                                   item.fullDescription?.toLowerCase().includes(query);
        
        if ('region' in item) {
          return matchesName || matchesDescription || item.region.toLowerCase().includes(query);
        }
        if ('location' in item && item.location?.region) {
          return matchesName || matchesDescription || item.location.region.toLowerCase().includes(query);
        }
        return matchesName || matchesDescription;
      });
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      items = items.filter(item => {
        if (activeTab === 'destinations' && 'category' in item) {
          return item.category.toLowerCase() === activeCategory.toLowerCase();
        }
        if (activeTab === 'hotels' && 'category' in item) {
          return item.category.toLowerCase() === activeCategory.toLowerCase();
        }
        if (activeTab === 'restaurants' && 'cuisine' in item) {
          return item.cuisine.toLowerCase().includes(activeCategory.toLowerCase());
        }
        return false;
      });
    }

    return items;
  }, [activeTab, destinations, hotels, restaurants, searchQuery, activeCategory]);


  const handleViewDetails = (item: ItemType) => {
  if (activeTab === 'destinations') {
    navigate(`/destinations/${item.id}`);
  } else if (activeTab === 'hotels') {
    navigate(`/stay-eat/hotels/${item.id}`);
  } else {
    navigate(`/stay-eat/restaurants/${item.id}`);
  }
};

  return (
    <section id="explore" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header - Bold Editorial */}
        <div className="mb-16">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">✦ Discover</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6">
            DISCOVER THE
            <span className="block text-muted-foreground/40">UNTAMED HEART</span>
            <span className="block">OF SOUTH ASIA.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Pearl of the Indian Ocean, Sri Lanka is a tapestry of ancient ruins, hidden waterfalls, and untouched beaches. With pristine forests and wildlife-rich safari routes.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as TabType); setActiveCategory('all'); }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <TabsList className="bg-card border border-border h-auto p-1 rounded-xl">
              <TabsTrigger 
                value="destinations" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <MapPin className="w-4 h-4" />
                Destinations
              </TabsTrigger>
              <TabsTrigger 
                value="hotels"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Hotel className="w-4 h-4" />
                Hotels
              </TabsTrigger>
              <TabsTrigger 
                value="restaurants"
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Restaurants
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search places..."
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

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> results
            </p>
          </div>

          {/* Content Grid */}
          <TabsContent value="destinations" className="mt-0">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <PreviewCard
                    key={item.id}
                    item={item}
                    type="destination"
                    onViewDetails={() => handleViewDetails(item)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <MapPin className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotels" className="mt-0">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <PreviewCard
                    key={item.id}
                    item={item}
                    type="hotel"
                    onViewDetails={() => handleViewDetails(item)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Hotel className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No hotels found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="restaurants" className="mt-0">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <PreviewCard
                    key={item.id}
                    item={item}
                    type="restaurant"
                    onViewDetails={() => handleViewDetails(item)}
                    index={index}
                  />
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
    </section>
  );
}