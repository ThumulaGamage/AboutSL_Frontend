import { X, MapPin } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';
import sriLankaMap from '@/assets/srilanka-map.png';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (id: number) => void;
}

export function MapModal({ isOpen, onClose, onSelectDestination }: MapModalProps) {
  const { destinations } = useData();
  const activeDestinations = destinations.filter(d => 
    d.status === 'active' && 
    d.location?.coordinates?.lat && 
    d.location?.coordinates?.lng
  );

  // Sri Lanka map positions
  const getPosition = (coordinates: { lat: number; lng: number }) => {
    const minLat = 5.9;
    const maxLat = 9.85;
    const minLng = 79.5;
    const maxLng = 81.9;
    
    const x = ((coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - coordinates.lat) / (maxLat - minLat)) * 100;
    
    return { 
      left: `${Math.max(5, Math.min(95, x))}%`, 
      top: `${Math.max(5, Math.min(95, y))}%` 
    };
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
        <div className="relative flex-1 h-full p-6 flex items-center justify-center">
          <div className="relative" style={{ maxWidth: '400px', width: '100%' }}>
            <img 
              src={sriLankaMap} 
              alt="Sri Lanka Map" 
              className="w-full h-auto opacity-90"
            />
            
            {/* Destination Markers */}
            {activeDestinations.map((dest) => {
              if (!dest.location?.coordinates?.lat || !dest.location?.coordinates?.lng) return null;
              
              const pos = getPosition({
                lat: dest.location.coordinates.lat,
                lng: dest.location.coordinates.lng
              });
              
              return (
                <button
                  key={dest.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                  style={{ left: pos.left, top: pos.top }}
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                >
                  {/* Pulse Ring */}
                  <span className="absolute inset-0 w-6 h-6 -m-1 rounded-full bg-secondary/30 animate-ping" />
                  
                  {/* Marker */}
                  <span className="relative flex items-center justify-center w-3 h-3 rounded-full bg-secondary shadow-lg border-2 border-white group-hover:scale-150 transition-transform" />

                  {/* Label */}
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border shadow-sm">
                    {dest.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border">
            <h4 className="font-display font-semibold text-foreground mb-2 text-sm">Destinations</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {activeDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  <MapPin className="w-4 h-4 text-secondary" />
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