import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Restaurant } from '@/types';

interface RestaurantFormProps {
  restaurant?: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Partial<Restaurant>) => Promise<void>;
}

export function RestaurantForm({ restaurant, isOpen, onClose, onSave }: RestaurantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    name?: string;
    location?: {
      region: string;
      address: string;
      coordinates: { lat: number; lng: number };
    };
    cuisine?: string;
    specialty?: string;
    price?: number;
    priceRange?: string;
    heroImage?: string;
    photoGallery?: string[];
    quickSummary?: string;
    fullDescription?: string;
    menuHighlights?: string[];
    websiteUrl?: string; // ✅ NEW
    rating?: number;
    reviewCount?: number;
    status?: 'active' | 'inactive' | 'draft';
  }>({
    name: '',
    location: { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
    cuisine: '',
    specialty: '',
    price: 15,
    priceRange: '$$',
    heroImage: '',
    photoGallery: [],
    quickSummary: '',
    fullDescription: '',
    menuHighlights: [],
    websiteUrl: '', // ✅ NEW
    rating: 4.5,
    reviewCount: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (restaurant) {
      // Extract URLs from photoGallery objects
      const photoUrls = (restaurant.photoGallery || []).map(item => 
        typeof item === 'string' ? item : item.url
      );

      // Extract menu highlights
      const menuItems = (restaurant.menuHighlights || []).map(item =>
        typeof item === 'string' ? item : item.name
      );

      setFormData({
        ...restaurant,
        location: restaurant.location || { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
        photoGallery: photoUrls,
        menuHighlights: menuItems,
        websiteUrl: restaurant.websiteUrl || '', // ✅ NEW
      });
    } else {
      setFormData({
        name: '',
        location: { region: '', address: '', coordinates: { lat: 0, lng: 0 } },
        cuisine: '',
        specialty: '',
        price: 15,
        priceRange: '$$',
        heroImage: '',
        photoGallery: [],
        quickSummary: '',
        fullDescription: '',
        menuHighlights: [],
        websiteUrl: '', // ✅ NEW
        rating: 4.5,
        reviewCount: 0,
        status: 'active',
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [restaurant, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.location?.region?.trim()) newErrors.location = 'Location region is required';
    if (!formData.cuisine?.trim()) newErrors.cuisine = 'Cuisine type is required';
    if (!formData.specialty?.trim()) newErrors.specialty = 'Specialty is required';
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
      // Transform to object format
      const photoGalleryObjects = (formData.photoGallery || [])
        .filter(url => url.trim())
        .map((url, index) => ({
          url: url,
          caption: '',
          order: index,
          publicId: ''
        }));

      const menuHighlightsObjects = (formData.menuHighlights || [])
        .filter(item => item.trim())
        .map(name => ({
          name: name,
          description: '',
          price: 0
        }));

      const submitData = {
        ...formData,
        ...(restaurant?.id && { id: restaurant.id }),
        photoGallery: photoGalleryObjects,
        menuHighlights: menuHighlightsObjects,
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
            {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
          <DialogDescription>
            Fill in the restaurant details
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
                  placeholder="e.g., The Lake Restaurant"
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
                <label className="text-sm font-medium">Cuisine Type *</label>
                <Select
                  value={formData.cuisine || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, cuisine: value }))}
                >
                  <SelectTrigger className={errors.cuisine ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select cuisine type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sri Lankan">Sri Lankan</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
                {errors.cuisine && <p className="text-xs text-destructive mt-1">{errors.cuisine}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Specialty *</label>
                <Input
                  value={formData.specialty || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                  placeholder="e.g., Rice & Curry"
                  className={errors.specialty ? 'border-destructive' : ''}
                />
                {errors.specialty && <p className="text-xs text-destructive mt-1">{errors.specialty}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Average Price ($)</label>
                <Input
                  type="number"
                  value={formData.price || 15}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  min={0}
                  className={errors.price ? 'border-destructive' : ''}
                />
                {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Price Range</label>
                <Select
                  value={formData.priceRange || '$$'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ (Budget)</SelectItem>
                    <SelectItem value="$$">$$ (Moderate)</SelectItem>
                    <SelectItem value="$$$">$$$ (Upscale)</SelectItem>
                    <SelectItem value="$$$$">$$$$ (Fine Dining)</SelectItem>
                  </SelectContent>
                </Select>
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
                placeholder="https://www.restaurantwebsite.com"
                className={errors.websiteUrl ? 'border-destructive' : ''}
              />
              {errors.websiteUrl && <p className="text-xs text-destructive mt-1">{errors.websiteUrl}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Enter the restaurant's official website (optional)
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
                placeholder="Detailed description of the restaurant..."
                rows={4}
                className={errors.fullDescription ? 'border-destructive' : ''}
              />
              {errors.fullDescription && <p className="text-xs text-destructive mt-1">{errors.fullDescription}</p>}
            </div>
          </div>

          {/* Menu Highlights */}
          <div className="space-y-4 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
            <h3 className="font-semibold">Menu Highlights</h3>
            
            {(formData.menuHighlights || []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newMenu = [...(formData.menuHighlights || [])];
                    newMenu[index] = e.target.value;
                    setFormData(prev => ({ ...prev, menuHighlights: newMenu }));
                  }}
                  placeholder="e.g., Grilled Fish, Rice & Curry"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    menuHighlights: (prev.menuHighlights || []).filter((_, i) => i !== index)
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
                menuHighlights: [...(prev.menuHighlights || []), '']
              }))}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Menu Item
            </Button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (restaurant ? 'Update Restaurant' : 'Create Restaurant')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}