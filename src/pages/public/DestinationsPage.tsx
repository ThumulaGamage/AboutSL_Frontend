import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import destinationHeader from '@/assets/destination.jpeg';

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
      {/* Header with Image Only */}
      <div className="relative overflow-hidden h-[300px] md:h-[400px]">
        <img
          src={destinationHeader}
          alt="Sri Lanka Destinations"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base bg-card border-border rounded-xl"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          {categoryList.map((category) => (
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

        {/* Results Count */}
        <p className="text-muted-foreground text-lg mb-8">
          Showing <span className="font-bold text-foreground text-xl">{filteredDestinations.length}</span> destinations
        </p>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest, index) => (
              <div
                key={dest.id}
                onClick={() => handleViewDetails(dest.id)}
                className="group cursor-pointer relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground backdrop-blur-sm">
                      {dest.category}
                    </span>
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {dest.region}
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                      {dest.overview?.description || 'Explore this beautiful destination'}
                    </p>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/40 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border">
            <MapPin className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3">No destinations found</h3>
            <p className="text-muted-foreground text-lg">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}