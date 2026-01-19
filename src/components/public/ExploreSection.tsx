import { useState, useMemo } from 'react';
import { Search, MapPin, Hotel, UtensilsCrossed, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PreviewCard } from './PreviewCard';
import { DetailModal } from './DetailModal';
import { useData } from '@/contexts/DataContext';
import { categories, Destination, Hotel as HotelType, Restaurant } from '@/data/sampleData';

interface ExploreSectionProps {
  selectedDestinationId?: string | null;
  onClearSelection: () => void;
}

type TabType = 'destinations' | 'hotels' | 'restaurants';
type ItemType = Destination | HotelType | Restaurant;

export function ExploreSection({ selectedDestinationId, onClearSelection }: ExploreSectionProps) {
  const { destinations, hotels, restaurants } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Handle pre-selected destination from map
  useMemo(() => {
    if (selectedDestinationId) {
      const dest = destinations.find(d => d.id === selectedDestinationId);
      if (dest) {
        setSelectedItem(dest);
        setDetailModalOpen(true);
        onClearSelection();
      }
    }
  }, [selectedDestinationId, destinations, onClearSelection]);

  // Get active items and filter
  const filteredItems = useMemo(() => {
    let items: ItemType[] = [];
    let categoryField: string = '';
    
    if (activeTab === 'destinations') {
      items = destinations.filter(d => d.status === 'active');
      categoryField = 'category';
    } else if (activeTab === 'hotels') {
      items = hotels.filter(h => h.status === 'active');
      categoryField = 'category';
    } else {
      items = restaurants.filter(r => r.status === 'active');
      categoryField = 'cuisine';
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.quickSummary.toLowerCase().includes(query) ||
        ('region' in item && item.region.toLowerCase().includes(query)) ||
        ('location' in item && item.location.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      items = items.filter(item => {
        const value = (item as any)[categoryField];
        return value?.toLowerCase() === activeCategory.toLowerCase();
      });
    }

    return items;
  }, [activeTab, destinations, hotels, restaurants, searchQuery, activeCategory]);

  const handleViewDetails = (item: ItemType) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const currentCategories = categories[activeTab] || ['all'];

  return (
    <section id="explore" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Amazing Places
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From ancient wonders to pristine beaches, find your perfect Sri Lankan adventure
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

        {/* Detail Modal */}
        <DetailModal
          item={selectedItem}
          type={
            selectedItem && 'region' in selectedItem 
              ? 'destination' 
              : selectedItem && 'pricePerNight' in selectedItem 
                ? 'hotel' 
                : 'restaurant'
          }
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
      </div>
    </section>
  );
}
