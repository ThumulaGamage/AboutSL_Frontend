import { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Destination } from '@/types';
import sriLankaMap from '@/assets/srilanka-map.png';

interface InteractiveMapProps {
  destinations: Destination[];
  selectedDestination?: Destination | null;
  onMarkerClick?: (destination: Destination) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Sri Lanka center
const sriLankaCenter = { lat: 7.8731, lng: 80.7718 };

// Sri Lanka bounds
const sriLankaBounds = {
  north: 9.85,
  south: 5.9,
  east: 81.9,
  west: 79.5,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export function InteractiveMap({ destinations, selectedDestination, onMarkerClick }: InteractiveMapProps) {
  const [infoWindowDest, setInfoWindowDest] = useState<Destination | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Center map on selected destination and show info window
  useEffect(() => {
    if (selectedDestination && selectedDestination.location?.coordinates && mapRef.current) {
      mapRef.current.panTo({
        lat: selectedDestination.location.coordinates.lat,
        lng: selectedDestination.location.coordinates.lng
      });
      mapRef.current.setZoom(11);
      setInfoWindowDest(selectedDestination);
    }
  }, [selectedDestination]);

  const handleMarkerClick = useCallback((destination: Destination) => {
    if (onMarkerClick) {
      onMarkerClick(destination);
    }
  }, [onMarkerClick]);

  const handleInfoWindowClose = useCallback(() => {
    setInfoWindowDest(null);
  }, []);

  // Filter destinations with valid coordinates
  const validDestinations = destinations.filter(
    d => d.location?.coordinates?.lat && d.location?.coordinates?.lng
  );

  // Fallback to artistic map when no API key
  if (!GOOGLE_MAPS_API_KEY) {
    return <FallbackMap destinations={validDestinations} selectedDestination={selectedDestination} onDestinationClick={onMarkerClick} />;
  }

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/50">
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive font-medium">Failed to load Google Maps</p>
          <p className="text-sm text-muted-foreground mt-2">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={sriLankaCenter}
      zoom={8}
      onLoad={onLoad}
      options={{
        restriction: {
          latLngBounds: sriLankaBounds,
          strictBounds: false,
        },
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }],
          },
        ],
      }}
    >
      {validDestinations.map((dest) => {
        const isSelected = selectedDestination?.id === dest.id;
        return (
          <Marker
            key={dest.id}
            position={{
              lat: dest.location.coordinates.lat!,
              lng: dest.location.coordinates.lng!
            }}
            onClick={() => handleMarkerClick(dest)}
            onMouseOver={() => setHoveredId(dest.id)}
            onMouseOut={() => setHoveredId(null)}
            animation={isSelected ? google.maps.Animation.BOUNCE : undefined}
            icon={{
              url: 'data:image/svg+xml,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
                  <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 28 20 28s20-16.954 20-28C40 8.954 31.046 0 20 0z" fill="${isSelected ? '#f59e0b' : '#0D9488'}"/>
                  <circle cx="20" cy="18" r="8" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(isSelected ? 48 : 40, isSelected ? 58 : 48),
              anchor: new google.maps.Point(isSelected ? 24 : 20, isSelected ? 58 : 48),
            }}
          />
        );
      })}

      {infoWindowDest && infoWindowDest.location?.coordinates?.lat && (
        <InfoWindow
          position={{
            lat: infoWindowDest.location.coordinates.lat,
            lng: infoWindowDest.location.coordinates.lng!
          }}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="p-1 max-w-[280px]">
            <img
              src={infoWindowDest.heroImage}
              alt={infoWindowDest.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-foreground text-lg mb-1">
              {infoWindowDest.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {infoWindowDest.region}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {infoWindowDest.overview?.description || 'Explore this beautiful destination'}
            </p>
            <button
              onClick={() => handleMarkerClick(infoWindowDest)}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

// Fallback artistic map component
function FallbackMap({ destinations, selectedDestination, onDestinationClick }: { 
  destinations: Destination[]; 
  selectedDestination?: Destination | null;
  onDestinationClick?: (destination: Destination) => void;
}) {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);

  const getPosition = (coordinates: { lat: number; lng: number }) => {
    const minLat = 5.9;
    const maxLat = 9.85;
    const minLng = 79.5;
    const maxLng = 81.9;

    const x = ((coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - coordinates.lat) / (maxLat - minLat)) * 100;

    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`,
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="absolute inset-4 flex items-center justify-center">
        <div className="relative" style={{ maxWidth: '500px', width: '100%' }}>
          <img
            src={sriLankaMap}
            alt="Sri Lanka Map"
            className="w-full h-auto opacity-90"
          />

          {destinations.map((dest) => {
            if (!dest.location?.coordinates?.lat || !dest.location?.coordinates?.lng) return null;
            
            const isSelected = selectedDestination?.id === dest.id;
            const pos = getPosition({
              lat: dest.location.coordinates.lat,
              lng: dest.location.coordinates.lng
            });
            
            return (
              <button
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: pos.left, top: pos.top }}
                onClick={() => onDestinationClick?.(dest)}
                onMouseEnter={() => setHoveredDestination(dest)}
                onMouseLeave={() => setHoveredDestination(null)}
              >
                {isSelected && (
                  <span className="absolute inset-0 w-10 h-10 -m-3 rounded-full bg-amber-500/50 animate-ping" />
                )}
                <span className={`relative flex items-center justify-center rounded-full shadow-lg border-2 border-white dark:border-background group-hover:scale-125 transition-all ${
                  isSelected 
                    ? 'w-6 h-6 bg-amber-500 animate-bounce' 
                    : 'w-4 h-4 bg-secondary'
                }`}>
                  <MapPin className={`text-white ${isSelected ? 'w-4 h-4' : 'w-2.5 h-2.5'}`} />
                </span>
                <span className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
                  {dest.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hover Preview Card */}
      {hoveredDestination && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-card/95 backdrop-blur-md rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in z-20">
          <div className="relative h-28">
            <img
              src={hoveredDestination.heroImage}
              alt={hoveredDestination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="p-3">
            <h3 className="font-display text-base font-bold text-foreground mb-1">
              {hoveredDestination.name}
            </h3>
            <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {hoveredDestination.region}
              </div>
            </div>
            <p className="text-muted-foreground text-xs line-clamp-2">
              {hoveredDestination.overview?.description || 'Explore this destination'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}