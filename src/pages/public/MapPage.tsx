import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { InteractiveMap } from '@/components/maps/InteractiveMap';
import { MapPin, Eye } from 'lucide-react';
import { Destination } from '@/types';
import { useNavigate } from 'react-router-dom';
import mapHeader from '@/assets/Map header.png';

export function MapPage() {
  const { destinations } = useData();
  const navigate = useNavigate();

  const activeDestinations = destinations.filter(d => d.status === 'active');

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const [hoveredDestination, setHoveredDestination] =
    useState<Destination | null>(null);

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
    <div className="min-h-screen bg-background pt-20">
      {/* Header Image */}
      <div className="relative overflow-hidden h-[250px] md:h-[400px]">
        <img
          src={mapHeader}
          alt="Interactive Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Map + Sidebar */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col max-h-[45vh] lg:max-h-none">
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border bg-muted/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              Destinations
            </h2>
            <p className="text-muted-foreground text-sm">
              {activeDestinations.length} locations
            </p>
          </div>

          {/* Destination List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            {activeDestinations.map(destination => (
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
                  <MapPin
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      selectedDestination?.id === destination.id
                        ? 'text-primary-foreground'
                        : 'text-primary'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {destination.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        selectedDestination?.id === destination.id
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {destination.region}
                    </p>
                  </div>
                  <Eye
                    className={`w-4 h-4 opacity-0 group-hover:opacity-100 ${
                      selectedDestination?.id === destination.id
                        ? 'text-primary-foreground'
                        : 'text-primary'
                    }`}
                  />
                </div>

                {/* Hover Preview (Desktop Only) */}
                {hoveredDestination?.id === destination.id && (
                  <div className="hidden lg:block absolute left-full ml-3 top-0 w-80 bg-card shadow-2xl rounded-xl border border-border overflow-hidden z-50 animate-fade-in pointer-events-none">
                    <div className="relative h-40">
                      <img
                        src={destination.heroImage}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-primary text-primary-foreground">
                          {destination.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="text-xl font-bold">
                          {destination.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm opacity-80">
                          <MapPin className="w-4 h-4" />
                          {destination.region}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {destination.overview?.description ||
                          'Explore this beautiful destination'}
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

        {/* Map Section */}
        <div className="flex-1 relative min-h-[65vh] lg:min-h-full">
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