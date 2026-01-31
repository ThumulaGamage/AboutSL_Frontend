import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Hotel } from '@/types';

interface HotelFormProps {
  hotel?: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (hotel: Partial<Hotel>) => Promise<void>;
}

export function HotelForm({ hotel, isOpen, onClose, onSave }: HotelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    name?: string;
    location?: {
      region: string;
      address: string;
      coordinates: { lat: number; lng: number };
    };
    category?: 'luxury' | 'mid-range' | 'budget';
    price?: number;
    currency?: string;
    heroImage?: string;
    photoGallery?: string[];
    quickSummary?: string;
    fullDescription?: string;
    amenities?: string[];
    websiteUrl?: string; // ✅ NEW
    rating?: number;
    reviewCount?: number;
    status?: 'active' | 'inactive' | 'draft';
  }>({
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
    websiteUrl: '', // ✅ NEW
    rating: 4.5,
    reviewCount: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (hotel) {
      // Extract URLs from photoGallery objects
      const photoUrls = (hotel.photoGallery || []).map(item => 
        typeof item === 'string' ? item : item.url
      );

      // Extract names from amenities objects
      const amenityNames = (hotel.amenities || []).map(item => 
        typeof item === 'string' ? item : item.name
      );

      setFormData({
        ...hotel,
        location: hotel.location || { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
        photoGallery: photoUrls,
        amenities: amenityNames,
        websiteUrl: hotel.websiteUrl || '', // ✅ NEW
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
        websiteUrl: '', // ✅ NEW
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
    
    // ✅ NEW: Validate website URL if provided
    if (formData.websiteUrl && formData.websiteUrl.trim()) {
      try {
        new URL(formData.websiteUrl);
      } catch {
        newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Transform to object format to match Hotel interface
      const photoGalleryObjects = (formData.photoGallery || [])
        .filter(url => url.trim())
        .map((url, index) => ({
          url: url,
          caption: '',
          order: index,
          publicId: ''
        }));

      const amenitiesObjects = (formData.amenities || [])
        .filter(a => a.trim())
        .map(name => ({
          name: name,
          icon: ''
        }));

      const submitData = {
        ...formData,
        ...(hotel?.id && { id: hotel.id }),
        photoGallery: photoGalleryObjects,
        amenities: amenitiesObjects,
        websiteUrl: formData.websiteUrl?.trim() || null, // ✅ NEW
      };

      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error('❌ Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {hotel ? 'Edit Hotel' : 'Add New Hotel'}
          </DialogTitle>
          <DialogDescription>
            Fill in the hotel details
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
                    location: { ...prev.location!, region: e.target.value }
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
                  location: { ...prev.location!, address: e.target.value }
                }))}
                placeholder="Full address"
              />
            </div>

            {/* ✅ NEW: Official Website */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Official Website URL
              </label>
              <Input
                value={formData.websiteUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://www.hotelwebsite.com"
                className={errors.websiteUrl ? 'border-destructive' : ''}
              />
              {errors.websiteUrl && <p className="text-xs text-destructive mt-1">{errors.websiteUrl}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Enter the hotel's official website (optional)
              </p>
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