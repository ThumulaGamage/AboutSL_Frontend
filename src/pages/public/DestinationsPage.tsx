import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';

export function DestinationsPage() {
  const { destinations } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Define categories directly (matching your backend types)
  const categoryList = ['all', 'beach', 'nature', 'cultural', 'wildlife'];

  const filteredDestinations = useMemo(() => {
    let items = destinations.filter(d => d.status === 'active');

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query) ||
        (d.overview?.description && d.overview.description.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());
    }

    return items;
  }, [destinations, searchQuery, activeCategory]);

  const handleViewDetails = (id: number) => {
    navigate(`/destinations/${id}`);
  };

  

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
                onClick={() => handleViewDetails(dest.id)}
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
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {dest.overview?.description || 'Explore this beautiful destination'}
                  </p>
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
    </div>
  );
}