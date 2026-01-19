import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Restaurant } from '@/data/sampleData';

interface RestaurantFormProps {
  restaurant?: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Restaurant) => void;
}

export function RestaurantForm({ restaurant, isOpen, onClose, onSave }: RestaurantFormProps) {
  const [formData, setFormData] = useState<Partial<Restaurant>>({
    name: '',
    location: '',
    cuisine: '',
    specialty: '',
    averagePrice: 15,
    heroImage: '',
    photoGallery: [''],
    quickSummary: '',
    description: '',
    rating: 4.5,
    reviewCount: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
    } else {
      setFormData({
        name: '',
        location: '',
        cuisine: '',
        specialty: '',
        averagePrice: 15,
        heroImage: '',
        photoGallery: [''],
        quickSummary: '',
        description: '',
        rating: 4.5,
        reviewCount: 0,
        status: 'active',
      });
    }
    setErrors({});
  }, [restaurant, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.cuisine?.trim()) newErrors.cuisine = 'Cuisine type is required';
    if (!formData.heroImage?.trim()) newErrors.heroImage = 'Hero image URL is required';
    if (!formData.quickSummary?.trim()) newErrors.quickSummary = 'Summary is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const id = restaurant?.id || `r${Date.now()}`;

    onSave({
      ...formData,
      id,
      photoGallery: formData.photoGallery?.filter(url => url.trim()) || [],
    } as Restaurant);

    onClose();
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      photoGallery: [...(prev.photoGallery || []), ''],
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photoGallery: prev.photoGallery?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., The Lake Restaurant"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location *</label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Dambulla"
                  className={errors.location ? 'border-destructive' : ''}
                />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cuisine *</label>
                <Input
                  value={formData.cuisine || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                  placeholder="e.g., Sri Lankan, International"
                  className={errors.cuisine ? 'border-destructive' : ''}
                />
                {errors.cuisine && <p className="text-xs text-destructive">{errors.cuisine}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Specialty</label>
                <Input
                  value={formData.specialty || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                  placeholder="e.g., Rice & Curry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Average Price ($)</label>
                <Input
                  type="number"
                  value={formData.averagePrice || 15}
                  onChange={(e) => setFormData(prev => ({ ...prev, averagePrice: parseInt(e.target.value) || 0 }))}
                  min={0}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-foreground">Status</label>
              <div className="flex items-center gap-2">
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
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Images</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hero Image URL *</label>
              <Input
                value={formData.heroImage || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className={errors.heroImage ? 'border-destructive' : ''}
              />
              {errors.heroImage && <p className="text-xs text-destructive">{errors.heroImage}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Gallery Images</label>
              {formData.photoGallery?.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newGallery = [...(formData.photoGallery || [])];
                      newGallery[index] = e.target.value;
                      setFormData(prev => ({ ...prev, photoGallery: newGallery }));
                    }}
                    placeholder="https://example.com/gallery-image.jpg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGalleryImage(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addGalleryImage} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Descriptions</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quick Summary *</label>
              <Textarea
                value={formData.quickSummary || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, quickSummary: e.target.value }))}
                placeholder="A brief summary for preview cards"
                rows={2}
                className={errors.quickSummary ? 'border-destructive' : ''}
              />
              {errors.quickSummary && <p className="text-xs text-destructive">{errors.quickSummary}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Description</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the restaurant..."
                rows={4}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {restaurant ? 'Update Restaurant' : 'Create Restaurant'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
