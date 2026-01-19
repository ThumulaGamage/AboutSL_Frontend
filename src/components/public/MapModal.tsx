import { X, MapPin } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (id: string) => void;
}

export function MapModal({ isOpen, onClose, onSelectDestination }: MapModalProps) {
  const { destinations } = useData();
  const activeDestinations = destinations.filter(d => d.status === 'active');

  // Sri Lanka map positions (simplified)
  const getPosition = (coordinates: { lat: number; lng: number }) => {
    // Map coordinates to percentage positions on the SVG
    const minLat = 5.9;
    const maxLat = 9.8;
    const minLng = 79.5;
    const maxLng = 81.9;
    
    const x = ((coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - coordinates.lat) / (maxLat - minLat)) * 100;
    
    return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Explore Sri Lanka
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Map Container */}
        <div className="relative flex-1 h-full bg-primary/5">
          {/* Sri Lanka Outline (Simplified SVG) */}
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full"
            style={{ maxHeight: 'calc(80vh - 80px)' }}
          >
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
              strokeWidth="1"
            />

            {/* Destination Markers */}
            {activeDestinations.map((dest) => {
              const pos = getPosition(dest.coordinates);
              return (
                <g
                  key={dest.id}
                  className="cursor-pointer"
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                >
                  {/* Marker Pin */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="3"
                    fill="hsl(var(--accent))"
                    className="animate-pulse"
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  
                  {/* Label */}
                  <text
                    x={pos.x + 8}
                    y={pos.y + 1}
                    fontSize="4"
                    fill="hsl(var(--foreground))"
                    className="font-sans pointer-events-none"
                  >
                    {dest.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h4 className="font-semibold text-foreground mb-2 text-sm">Destinations</h4>
            <div className="space-y-2">
              {activeDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  <MapPin className="w-4 h-4 text-accent" />
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
