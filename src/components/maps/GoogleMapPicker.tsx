import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GoogleMapPickerProps {
  coordinates: { lat: number; lng: number };
  onCoordinatesChange: (coords: { lat: number; lng: number }) => void;
  height?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

// Sri Lanka center coordinates
const sriLankaCenter = { lat: 7.8731, lng: 80.7718 };

// Using a placeholder API key - users should provide their own
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export function GoogleMapPicker({ 
  coordinates, 
  onCoordinatesChange, 
  height = '300px' 
}: GoogleMapPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(coordinates.lat ? coordinates : sriLankaCenter);
  const [isSearching, setIsSearching] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      setMapCenter(coordinates);
    }
  }, [coordinates]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newCoords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      onCoordinatesChange(newCoords);
    }
  }, [onCoordinatesChange]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !isLoaded) return;
    
    setIsSearching(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ 
        address: `${searchQuery}, Sri Lanka` 
      });
      
      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        const newCoords = { lat: location.lat(), lng: location.lng() };
        setMapCenter(newCoords);
        onCoordinatesChange(newCoords);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Fallback UI when API key is not provided
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="space-y-4">
        <div 
          className="bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-6"
          style={{ height }}
        >
          <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-4">
            Google Maps API key not configured.
            <br />
            <span className="text-sm">Enter coordinates manually below.</span>
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Latitude</label>
              <Input
                type="number"
                step="0.0001"
                value={coordinates.lat || ''}
                onChange={(e) => onCoordinatesChange({ 
                  ...coordinates, 
                  lat: parseFloat(e.target.value) || 0 
                })}
                placeholder="e.g., 7.9519"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Longitude</label>
              <Input
                type="number"
                step="0.0001"
                value={coordinates.lng || ''}
                onChange={(e) => onCoordinatesChange({ 
                  ...coordinates, 
                  lng: parseFloat(e.target.value) || 0 
                })}
                placeholder="e.g., 80.7519"
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Add VITE_GOOGLE_MAPS_API_KEY to enable interactive map selection
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-center" style={{ height }}>
        Error loading Google Maps. Please check your API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className="bg-muted rounded-xl flex items-center justify-center"
        style={{ height }}
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search location in Sri Lanka..."
            className="pl-10"
          />
        </div>
        <Button 
          type="button" 
          onClick={handleSearch} 
          disabled={isSearching}
          size="sm"
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </Button>
      </div>

      {/* Map */}
      <div style={{ height }} className="rounded-xl overflow-hidden border border-border">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={coordinates.lat ? 12 : 8}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}
        >
          {coordinates.lat && coordinates.lng && (
            <Marker
              position={coordinates}
              animation={google.maps.Animation.DROP}
            />
          )}
        </GoogleMap>
      </div>

      {/* Coordinates Display */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          Lat: {coordinates.lat?.toFixed(4) || 'Not set'}
        </span>
        <span>Lng: {coordinates.lng?.toFixed(4) || 'Not set'}</span>
      </div>
    </div>
  );
}