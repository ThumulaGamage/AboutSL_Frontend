import { useData } from '@/contexts/DataContext';
import { InteractiveMap } from '@/components/maps/InteractiveMap';

export function MapPage() {
  const { destinations } = useData();
  const activeDestinations = destinations.filter(d => d.status === 'active');

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
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg" style={{ height: '75vh' }}>
          <InteractiveMap destinations={activeDestinations} />
        </div>

        {/* Destination count */}
        <div className="mt-4 text-center">
          <span className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{activeDestinations.length}</span> destinations
          </span>
        </div>
      </div>
    </div>
  );
}