import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { InteractiveMap } from '@/components/maps/InteractiveMap';
import { MapPin, Navigation, Eye } from 'lucide-react';
import { Destination } from '@/types';
import { useNavigate } from 'react-router-dom';

export function MapPage() {
  const { destinations } = useData();
  const navigate = useNavigate();
  const activeDestinations = destinations.filter(d => d.status === 'active');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);

  const handleDestinationHover = (destination: Destination | null) => {
    setHoveredDestination(destination);
    if (destination) {
      setSelectedDestination(destination);
    }
  };

  const handleDestinationClick = (destination: Destination) => {
    navigate(`/destinations/${destination.id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAgNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-primary-foreground/80 font-semibold uppercase tracking-widest text-sm mb-4">
            <Navigation className="w-4 h-4 inline-block mr-2" />
            Navigate
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Interactive Map
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Explore Sri Lanka's destinations on the map. Hover for preview, click to view details.
          </p>
        </div>
      </div>

      {/* Map + Sidebar Container */}
      <div className="h-[calc(100vh-280px)] flex">
        {/* Destinations List - Left Sidebar */}
        <div className="w-80 bg-card border-r border-border overflow-hidden flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border bg-muted/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              Destinations
            </h2>
            <p className="text-muted-foreground text-sm">
              {activeDestinations.length} locations
            </p>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-3">
              {activeDestinations.map((destination) => (
                <button
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination)}
                  onMouseEnter={() => handleDestinationHover(destination)}
                  onMouseLeave={() => handleDestinationHover(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-200 group relative ${
                    selectedDestination?.id === destination.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      selectedDestination?.id === destination.id
                        ? 'text-primary-foreground'
                        : 'text-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {destination.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        selectedDestination?.id === destination.id
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}>
                        {destination.region}
                      </p>
                    </div>
                    <Eye className={`w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      selectedDestination?.id === destination.id
                        ? 'text-primary-foreground'
                        : 'text-primary'
                    }`} />
                  </div>

                  {/* Hover Preview Card */}
                  {hoveredDestination?.id === destination.id && (
                    <div className="absolute left-full ml-3 top-0 w-80 bg-card shadow-2xl rounded-xl border border-border overflow-hidden z-50 animate-fade-in pointer-events-none">
                      <div className="relative h-40">
                        <img
                          src={destination.heroImage}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
                            {destination.category}
                          </span>
                        </div>

                        {/* Title on Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="font-display text-xl font-bold text-white mb-1">
                            {destination.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <MapPin className="w-4 h-4" />
                            {destination.region}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-4">
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {destination.overview?.description || 'Explore this beautiful destination'}
                        </p>
                        <div className="mt-4 text-primary text-sm font-medium flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Click to view details
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map - Right Side (Larger) */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-card">
            <InteractiveMap 
              destinations={activeDestinations}
              selectedDestination={selectedDestination}
              onMarkerClick={handleDestinationClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}