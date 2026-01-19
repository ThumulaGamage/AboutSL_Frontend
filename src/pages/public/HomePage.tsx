import { useState } from 'react';
import { ImageSlideshow } from '@/components/public/ImageSlideshow';
import { TopRatedSection } from '@/components/public/TopRatedSection';
import { AboutSection } from '@/components/public/AboutSection';
import { DetailModal } from '@/components/public/DetailModal';
import { Destination, Hotel } from '@/data/sampleData';

export function HomePage() {
  const [selectedItem, setSelectedItem] = useState<Destination | Hotel | null>(null);
  const [selectedType, setSelectedType] = useState<'destination' | 'hotel'>('destination');
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleSelectItem = (item: Destination | Hotel, type: 'destination' | 'hotel') => {
    setSelectedItem(item);
    setSelectedType(type);
    setDetailModalOpen(true);
  };

  return (
    <div className="relative">
      {/* Hero Slideshow */}
      <ImageSlideshow />
      
      {/* Top Rated Section */}
      <div className="relative bg-background">
        {/* Decorative top wave */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-foreground/5 to-transparent" />
        
        <div className="container mx-auto px-4 py-20 md:py-28">
          <TopRatedSection onSelectItem={handleSelectItem} />
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        type={selectedType}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </div>
  );
}
