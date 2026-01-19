import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Destination, Highlight } from '@/data/sampleData';

interface DestinationFormProps {
  destination?: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (destination: Destination) => void;
}

const defaultHighlight: Highlight = {
  title: '',
  icon: '✨',
  description: '',
};

const defaultVisitInfo = {
  bestTime: '',
  timeRequired: '',
  difficulty: 'Easy',
  entryFee: '',
  hours: '',
  tips: [''],
};

export function DestinationForm({ destination, isOpen, onClose, onSave }: DestinationFormProps) {
  const [formData, setFormData] = useState<Partial<Destination>>({
    name: '',
    slug: '',
    region: '',
    category: 'cultural',
    heroImage: '',
    photoGallery: [''],
    quickSummary: '',
    fullDescription: '',
    overview: '',
    whatToSee: [''],
    thingsToDo: [''],
    historyAndLegend: '',
    highlights: [{ ...defaultHighlight }],
    visitInfo: { ...defaultVisitInfo },
    coordinates: { lat: 7.8731, lng: 80.7718 },
    rating: 4.5,
    reviewCount: 0,
    reviews: [],
    relatedHotels: [],
    relatedRestaurants: [],
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    } else {
      setFormData({
        name: '',
        slug: '',
        region: '',
        category: 'cultural',
        heroImage: '',
        photoGallery: [''],
        quickSummary: '',
        fullDescription: '',
        overview: '',
        whatToSee: [''],
        thingsToDo: [''],
        historyAndLegend: '',
        highlights: [{ ...defaultHighlight }],
        visitInfo: { ...defaultVisitInfo },
        coordinates: { lat: 7.8731, lng: 80.7718 },
        rating: 4.5,
        reviewCount: 0,
        reviews: [],
        relatedHotels: [],
        relatedRestaurants: [],
        status: 'active',
      });
    }
    setErrors({});
  }, [destination, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.region?.trim()) newErrors.region = 'Region is required';
    if (!formData.heroImage?.trim()) newErrors.heroImage = 'Hero image URL is required';
    if (!formData.quickSummary?.trim()) newErrors.quickSummary = 'Summary is required';
    if (!formData.fullDescription?.trim()) newErrors.fullDescription = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const slug = formData.name?.toLowerCase().replace(/\s+/g, '-') || '';
    const id = destination?.id || `dest-${Date.now()}`;

    onSave({
      ...formData,
      id,
      slug,
      photoGallery: formData.photoGallery?.filter(url => url.trim()) || [],
      whatToSee: formData.whatToSee?.filter(item => item.trim()) || [],
      thingsToDo: formData.thingsToDo?.filter(item => item.trim()) || [],
      visitInfo: {
        ...formData.visitInfo!,
        tips: formData.visitInfo?.tips?.filter(tip => tip.trim()) || [],
      },
    } as Destination);

    onClose();
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), { ...defaultHighlight }],
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index),
    }));
  };

  const updateHighlight = (index: number, field: keyof Highlight, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights?.map((h, i) => 
        i === index ? { ...h, [field]: value } : h
      ),
    }));
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

  const addTip = () => {
    setFormData(prev => ({
      ...prev,
      visitInfo: {
        ...prev.visitInfo!,
        tips: [...(prev.visitInfo?.tips || []), ''],
      },
    }));
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      visitInfo: {
        ...prev.visitInfo!,
        tips: prev.visitInfo?.tips?.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {destination ? 'Edit Destination' : 'Add New Destination'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Sigiriya Rock Fortress"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Region *</label>
                <Input
                  value={formData.region || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="e.g., Central Province"
                  className={errors.region ? 'border-destructive' : ''}
                />
                {errors.region && <p className="text-xs text-destructive">{errors.region}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select
                  value={formData.category || 'cultural'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="beach">Beach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex items-center gap-4 pt-6">
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
                placeholder="A brief summary for preview cards (2-3 sentences)"
                rows={2}
                className={errors.quickSummary ? 'border-destructive' : ''}
              />
              {errors.quickSummary && <p className="text-xs text-destructive">{errors.quickSummary}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Overview</label>
              <Textarea
                value={formData.overview || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                placeholder="A concise overview of the destination (3-4 sentences)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Description *</label>
              <Textarea
                value={formData.fullDescription || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                placeholder="Detailed description with multiple paragraphs..."
                rows={6}
                className={errors.fullDescription ? 'border-destructive' : ''}
              />
              {errors.fullDescription && <p className="text-xs text-destructive">{errors.fullDescription}</p>}
            </div>
          </div>

          {/* What to See */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">What to See</h3>
            
            {formData.whatToSee?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(formData.whatToSee || [])];
                    newItems[index] = e.target.value;
                    setFormData(prev => ({ ...prev, whatToSee: newItems }));
                  }}
                  placeholder="e.g., Ancient Frescoes, Lion Gate Entrance..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      whatToSee: prev.whatToSee?.filter((_, i) => i !== index),
                    }));
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData(prev => ({ ...prev, whatToSee: [...(prev.whatToSee || []), ''] }))}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          {/* Things to Do */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Things to Do</h3>
            
            {formData.thingsToDo?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(formData.thingsToDo || [])];
                    newItems[index] = e.target.value;
                    setFormData(prev => ({ ...prev, thingsToDo: newItems }));
                  }}
                  placeholder="e.g., Climb to the summit, Take photos..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      thingsToDo: prev.thingsToDo?.filter((_, i) => i !== index),
                    }));
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData(prev => ({ ...prev, thingsToDo: [...(prev.thingsToDo || []), ''] }))}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Activity
            </Button>
          </div>

          {/* History & Legend */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">History & Legend</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Historical Background & Legends</label>
              <Textarea
                value={formData.historyAndLegend || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, historyAndLegend: e.target.value }))}
                placeholder="Share the historical significance and any legends or myths associated with this destination..."
                rows={5}
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Highlights</h3>
            
            {formData.highlights?.map((highlight, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Highlight {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHighlight(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={highlight.title}
                    onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                    placeholder="Title"
                  />
                  <Input
                    value={highlight.icon}
                    onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                    placeholder="Icon (emoji)"
                  />
                </div>
                <Textarea
                  value={highlight.description}
                  onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                />
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addHighlight} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Highlight
            </Button>
          </div>

          {/* Coordinates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Location Coordinates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Latitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.coordinates?.lat || 7.8731}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: { ...prev.coordinates!, lat: parseFloat(e.target.value) || 0 },
                  }))}
                  placeholder="e.g., 7.9570"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Longitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.coordinates?.lng || 80.7718}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: { ...prev.coordinates!, lng: parseFloat(e.target.value) || 0 },
                  }))}
                  placeholder="e.g., 80.7603"
                />
              </div>
            </div>
          </div>

          {/* Visit Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Visitor Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Best Time to Visit</label>
                <Input
                  value={formData.visitInfo?.bestTime || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    visitInfo: { ...prev.visitInfo!, bestTime: e.target.value },
                  }))}
                  placeholder="e.g., Early morning (7 AM)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Time Required</label>
                <Input
                  value={formData.visitInfo?.timeRequired || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    visitInfo: { ...prev.visitInfo!, timeRequired: e.target.value },
                  }))}
                  placeholder="e.g., 3-4 hours"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Difficulty Level</label>
                <Select
                  value={formData.visitInfo?.difficulty || 'Easy'}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    visitInfo: { ...prev.visitInfo!, difficulty: value },
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Difficult">Difficult</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Entry Fee</label>
                <Input
                  value={formData.visitInfo?.entryFee || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    visitInfo: { ...prev.visitInfo!, entryFee: e.target.value },
                  }))}
                  placeholder="e.g., $30 USD"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Opening Hours</label>
                <Input
                  value={formData.visitInfo?.hours || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    visitInfo: { ...prev.visitInfo!, hours: e.target.value },
                  }))}
                  placeholder="e.g., 7:00 AM - 5:30 PM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tips & Recommendations</label>
              {formData.visitInfo?.tips?.map((tip, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tip}
                    onChange={(e) => {
                      const newTips = [...(formData.visitInfo?.tips || [])];
                      newTips[index] = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        visitInfo: { ...prev.visitInfo!, tips: newTips },
                      }));
                    }}
                    placeholder="Enter a tip..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTip(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addTip} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Tip
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {destination ? 'Update Destination' : 'Create Destination'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
