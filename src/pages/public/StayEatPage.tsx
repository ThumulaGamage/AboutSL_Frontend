import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Hotel, UtensilsCrossed, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import stayEatHeader from '@/assets/stay and eat.png';

type TabType = 'hotels' | 'restaurants';

export function StayEatPage() {
  const { hotels, restaurants } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as TabType | null;
  
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl || 'hotels');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Define categories directly
  const hotelCategories = ['all', 'luxury', 'mid-range', 'budget'];
  const restaurantCategories = ['all', 'sri lankan', 'international', 'asian', 'seafood', 'vegetarian'];
  const currentCategories = activeTab === 'hotels' ? hotelCategories : restaurantCategories;

  const filteredStays = useMemo(() => {
    let items = hotels.filter(h => h.status === 'active');

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(h =>
        h.name.toLowerCase().includes(query) ||
        (h.location?.region && h.location.region.toLowerCase().includes(query)) ||
        (h.quickSummary && h.quickSummary.toLowerCase().includes(query))
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
        (r.location?.region && r.location.region.toLowerCase().includes(query)) ||
        r.cuisine.toLowerCase().includes(query) ||
        (r.quickSummary && r.quickSummary.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter(r => r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    return items;
  }, [restaurants, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header with Image Only */}
      <div className="relative overflow-hidden h-[300px] md:h-[400px]">
        <img
          src={stayEatHeader}
          alt="Stay & Eat in Sri Lanka"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as TabType); setActiveCategory('all'); setSearchQuery(''); }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <TabsList className="bg-card border-2 border-border h-auto p-2 rounded-2xl shadow-lg">
              <TabsTrigger 
                value="hotels" 
                className="data-[state=active]:bg-foreground data-[state=active]:text-background px-8 py-4 rounded-xl font-bold text-base"
              >
                <Hotel className="w-5 h-5 mr-3" />
                Hotels
              </TabsTrigger>
              <TabsTrigger 
                value="restaurants"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background px-8 py-4 rounded-xl font-bold text-base"
              >
                <UtensilsCrossed className="w-5 h-5 mr-3" />
                Restaurants
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'hotels' ? 'hotels' : 'restaurants'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-card border-border rounded-xl"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {currentCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-foreground text-background shadow-lg scale-105'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border-2 border-border hover:border-foreground'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Hotels Tab */}
          <TabsContent value="hotels">
            <p className="text-muted-foreground text-lg mb-8">
              Showing <span className="font-bold text-foreground text-xl">{filteredStays.length}</span> hotels
            </p>

            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStays.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    onClick={() => navigate(`/stay-eat/hotels/${hotel.id}`)}
                    className="group cursor-pointer relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Image Container */}
                    <div className="relative h-[320px] overflow-hidden">
                      <img
                        src={hotel.heroImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-5 left-5">
                        <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-white text-foreground backdrop-blur-sm">
                          {hotel.category}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-5 right-5">
                        <span className="px-4 py-2 text-sm font-bold rounded-full bg-primary text-primary-foreground backdrop-blur-sm flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {hotel.currency || '$'}{hotel.price}/night
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {hotel.location?.region || 'Sri Lanka'}
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {hotel.name}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {hotel.quickSummary || hotel.fullDescription?.slice(0, 120) + '...'}
                      </p>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border">
                <Hotel className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-3">No hotels found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants">
            <p className="text-muted-foreground text-lg mb-8">
              Showing <span className="font-bold text-foreground text-xl">{filteredEats.length}</span> restaurants
            </p>

            {filteredEats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEats.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    onClick={() => navigate(`/stay-eat/restaurants/${restaurant.id}`)}
                    className="group cursor-pointer relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Image Container */}
                    <div className="relative h-[320px] overflow-hidden">
                      <img
                        src={restaurant.heroImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-5 left-5">
                        <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-white text-foreground backdrop-blur-sm">
                          {restaurant.cuisine}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-5 right-5">
                        <span className="px-4 py-2 text-sm font-bold rounded-full bg-primary text-primary-foreground backdrop-blur-sm">
                          {restaurant.priceRange || '$$'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {restaurant.location?.region || 'Sri Lanka'}
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {restaurant.name}
                      </h3>
                      
                      {restaurant.specialty && (
                        <p className="text-primary text-sm font-semibold mb-3">
                          {restaurant.specialty}
                        </p>
                      )}
                      
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {restaurant.quickSummary || restaurant.fullDescription?.slice(0, 120) + '...'}
                      </p>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border">
                <UtensilsCrossed className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-3">No restaurants found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}