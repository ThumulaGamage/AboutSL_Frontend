import { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useData } from '@/contexts/DataContext';
import { Hotel, Destination } from '@/types';

interface HotelFormProps {
  hotel?: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (hotel: Partial<Hotel>) => Promise<void>;
}

export function HotelForm({ hotel, isOpen, onClose, onSave }: HotelFormProps) {
  const { destinations } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Hotel>>({
    name: '',
    location: { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
    category: 'mid-range',
    price: 100,
    currency: 'USD',
    heroImage: '',
    photoGallery: [],
    quickSummary: '',
    fullDescription: '',
    amenities: [],
    nearbyDestinations: [],
    rating: 4.5,
    reviewCount: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | ''>('');
  const [distance, setDistance] = useState<string>('');

  useEffect(() => {
    if (hotel) {
      setFormData({
        ...hotel,
        location: hotel.location || { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
        photoGallery: hotel.photoGallery || [],
        amenities: hotel.amenities || [],
        nearbyDestinations: hotel.nearbyDestinations || [],
      });
    } else {
      setFormData({
        name: '',
        location: { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
        category: 'mid-range',
        price: 100,
        currency: 'USD',
        heroImage: '',
        photoGallery: [],
        quickSummary: '',
        fullDescription: '',
        amenities: [],
        nearbyDestinations: [],
        rating: 4.5,
        reviewCount: 0,
        status: 'active',
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [hotel, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.location?.region?.trim()) newErrors.location = 'Location region is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.heroImage?.trim()) newErrors.heroImage = 'Hero image URL is required';
    if (!formData.fullDescription?.trim()) newErrors.fullDescription = 'Full description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        ...(hotel?.id && { id: hotel.id }),
        photoGallery: (formData.photoGallery || []).filter(url => url.trim()),
        amenities: (formData.amenities || []).filter(a => a.trim()),
      };

      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNearbyDestination = () => {
    if (!selectedDestinationId || !distance) return;
    
    const dest = destinations.find(d => d.id === selectedDestinationId);
    if (!dest) return;

    const newNearby = {
      destinationId: selectedDestinationId as number,
      destinationName: dest.name,
      distance: parseFloat(distance),
      unit: 'km'
    };

    setFormData(prev => ({
      ...prev,
      nearbyDestinations: [...(prev.nearbyDestinations || []), newNearby]
    }));

    setSelectedDestinationId('');
    setDistance('');
    setShowDestinationSelector(false);
  };

  const removeNearbyDestination = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nearbyDestinations: (prev.nearbyDestinations || []).filter((_, i) => i !== index)
    }));
  };

  // Available destinations (not already added)
  const availableDestinations = destinations.filter(d => 
    d.status === 'active' && 
    !(formData.nearbyDestinations || []).some(nd => nd.destinationId === d.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {hotel ? 'Edit Hotel' : 'Add New Hotel'}
          </DialogTitle>
          <DialogDescription>
            Fill in the hotel details including nearby destinations
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Heritance Kandalama"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Region *</label>
                <Input
                  value={formData.location?.region || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...(prev.location || {}), region: e.target.value }
                  }))}
                  placeholder="e.g., Dambulla"
                  className={errors.location ? 'border-destructive' : ''}
                />
                {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category || 'mid-range'}
                  onValueChange={(value: 'luxury' | 'mid-range' | 'budget') => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="mid-range">Mid-Range</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Price per Night</label>
                <div className="flex gap-2">
                  <Input
                    className="w-20"
                    value={formData.currency || 'USD'}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    placeholder="USD"
                  />
                  <Input
                    type="number"
                    value={formData.price || 100}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    min={0}
                    className={errors.price ? 'border-destructive' : ''}
                  />
                </div>
                {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.location?.address || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...(prev.location || {}), address: e.target.value }
                }))}
                placeholder="Full address"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Status</label>
              <Switch
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))
                }
              />
              <span className="text-sm text-muted-foreground">
                {formData.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h3 className="font-semibold">Images</h3>
            
            <div>
              <label className="text-sm font-medium">Hero Image URL *</label>
              <Input
                value={formData.heroImage || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className={errors.heroImage ? 'border-destructive' : ''}
              />
              {errors.heroImage && <p className="text-xs text-destructive mt-1">{errors.heroImage}</p>}
              {formData.heroImage && (
                <img src={formData.heroImage} alt="Preview" className="mt-2 h-20 rounded object-cover" />
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Gallery Images</label>
              {(formData.photoGallery || []).map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newGallery = [...(formData.photoGallery || [])];
                      newGallery[index] = e.target.value;
                      setFormData(prev => ({ ...prev, photoGallery: newGallery }));
                    }}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      photoGallery: (prev.photoGallery || []).filter((_, i) => i !== index)
                    }))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setFormData(prev => ({
                  ...prev,
                  photoGallery: [...(prev.photoGallery || []), '']
                }))}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4 bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
            <h3 className="font-semibold">Descriptions</h3>
            
            <div>
              <label className="text-sm font-medium">Quick Summary</label>
              <Textarea
                value={formData.quickSummary || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, quickSummary: e.target.value }))}
                placeholder="A brief summary for preview cards"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Full Description *</label>
              <Textarea
                value={formData.fullDescription || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                placeholder="Detailed description of the hotel..."
                rows={4}
                className={errors.fullDescription ? 'border-destructive' : ''}
              />
              {errors.fullDescription && <p className="text-xs text-destructive mt-1">{errors.fullDescription}</p>}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
            <h3 className="font-semibold">Amenities</h3>
            
            {(formData.amenities || []).map((amenity, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={amenity}
                  onChange={(e) => {
                    const newAmenities = [...(formData.amenities || [])];
                    newAmenities[index] = e.target.value;
                    setFormData(prev => ({ ...prev, amenities: newAmenities }));
                  }}
                  placeholder="e.g., WiFi, Pool, Spa"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    amenities: (prev.amenities || []).filter((_, i) => i !== index)
                  }))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setFormData(prev => ({
                ...prev,
                amenities: [...(prev.amenities || []), '']
              }))}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Amenity
            </Button>
          </div>

          {/* Nearby Destinations */}
          <div className="space-y-4 bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearby Destinations
            </h3>
            
            {/* List of added destinations */}
            <div className="space-y-2">
              {(formData.nearbyDestinations || []).map((nearby, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div>
                    <div className="font-medium">{nearby.destinationName}</div>
                    <div className="text-sm text-muted-foreground">
                      {nearby.distance} {nearby.unit} away
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeNearbyDestination(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add new destination */}
            {!showDestinationSelector ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDestinationSelector(true)}
                disabled={availableDestinations.length === 0}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Nearby Destination
              </Button>
            ) : (
              <div className="space-y-3 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Destination</label>
                  <Select
                    value={selectedDestinationId.toString()}
                    onValueChange={(value) => setSelectedDestinationId(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a destination..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDestinations.map(dest => (
                        <SelectItem key={dest.id} value={dest.id.toString()}>
                          {dest.name} ({dest.region})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Distance (km)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g., 5.5"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={addNearbyDestination}
                    disabled={!selectedDestinationId || !distance}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowDestinationSelector(false);
                      setSelectedDestinationId('');
                      setDistance('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {availableDestinations.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No more destinations available to add
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (hotel ? 'Update Hotel' : 'Create Hotel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}