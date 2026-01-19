import { useState } from 'react';
import { MapPin, Star, X } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Destination } from '@/data/sampleData';

export function MapPage() {
  const { destinations } = useData();
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const activeDestinations = destinations.filter(d => d.status === 'active');

  const getPosition = (coordinates: { lat: number; lng: number }) => {
    const minLat = 5.9;
    const maxLat = 9.8;
    const minLng = 79.5;
    const maxLng = 81.9;
    
    const x = ((coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - coordinates.lat) / (maxLat - minLat)) * 100;
    
    return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
  };

  const handleMarkerClick = (dest: Destination) => {
    setSelectedDestination(dest);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Interactive Map
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore Sri Lanka's destinations on the map. Click on any marker to learn more.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative bg-card rounded-2xl border border-border overflow-hidden" style={{ minHeight: '70vh' }}>
          {/* Sri Lanka Map SVG */}
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full"
            style={{ minHeight: '70vh' }}
          >
            {/* Background */}
            <rect width="100" height="120" fill="hsl(var(--muted) / 0.3)" />
            
            {/* Ocean Pattern */}
            <pattern id="ocean" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="0.5" fill="hsl(var(--primary) / 0.1)" />
            </pattern>
            <rect width="100" height="120" fill="url(#ocean)" />

            {/* Island Shape */}
            <path
              d="M 50 5 
                 C 60 8, 75 15, 78 25
                 C 82 35, 85 45, 82 55
                 C 80 65, 75 75, 70 85
                 C 65 95, 55 105, 50 110
                 C 45 105, 35 95, 30 85
                 C 25 75, 20 65, 18 55
                 C 15 45, 18 35, 22 25
                 C 25 15, 40 8, 50 5"
              fill="hsl(var(--primary) / 0.15)"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
            />

            {/* Destination Markers */}
            {activeDestinations.map((dest) => {
              const pos = getPosition(dest.coordinates);
              return (
                <g
                  key={dest.id}
                  className="cursor-pointer"
                  onClick={() => handleMarkerClick(dest)}
                >
                  {/* Pulse Animation */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="4"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="0.5"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="6"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Marker Pin */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="2.5"
                    fill="hsl(var(--secondary))"
                    className="transition-all hover:r-3"
                  />
                  
                  {/* Label */}
                  <text
                    x={pos.x + 5}
                    y={pos.y + 1}
                    fontSize="3"
                    fill="hsl(var(--foreground))"
                    className="font-sans pointer-events-none font-medium"
                  >
                    {dest.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2 text-sm">Legend</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span>Destination</span>
            </div>
          </div>

          {/* Destination Count */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{activeDestinations.length}</span> destinations
            </span>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md p-0 bg-card overflow-hidden">
          {selectedDestination && (
            <>
              <div className="relative h-48">
                <img
                  src={selectedDestination.heroImage}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 overlay-gradient opacity-40" />
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 transition-colors"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {selectedDestination.name}
                </h3>
                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDestination.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    {selectedDestination.rating}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {selectedDestination.quickSummary}
                </p>
                <Button 
                  className="w-full golden-gradient text-secondary-foreground font-semibold"
                  onClick={() => {
                    setPreviewOpen(false);
                    navigate('/destinations');
                  }}
                >
                  View Full Details
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
