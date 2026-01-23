import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Destination } from '@/types';

interface DestinationFormProps {
  destination?: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (destination: any) => Promise<void>;
}

export function DestinationForm({ destination, isOpen, onClose, onSave }: DestinationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    category: 'cultural' as 'beach' | 'nature' | 'cultural' | 'wildlife',
    heroImage: '',
    overview: {
      description: '',
      images: [] as string[],
    },
    whatToSee: {
      description: '',
      highlights: [] as Array<{ title: string; description: string; image: string }>,
      images: [] as string[],
    },
    bestTimeToVisit: {
      description: '',
      season: '',
      months: '',
      weatherInfo: '',
      images: [] as string[],
    },
    thingsToDo: {
      description: '',
      activities: [] as Array<{ title: string; description: string; image: string }>,
      images: [] as string[],
    },
    travelTips: {
      description: '',
      tips: [] as string[],
      images: [] as string[],
    },
    historyAndLegend: {
      description: '',
      historicalFacts: '',
      legends: '',
      images: [] as string[],
    },
    location: {
      coordinates: {
        lat: 7.8731,
        lng: 80.7718,
      },
      nearbyCity: '',
      region: '',
    },
    status: 'active' as 'active' | 'inactive' | 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (destination) {
      setFormData({
        name: destination.name || '',
        region: destination.region || '',
        category: destination.category || 'cultural',
        heroImage: destination.heroImage || '',
        overview: destination.overview || { description: '', images: [] },
        whatToSee: destination.whatToSee || { description: '', highlights: [], images: [] },
        bestTimeToVisit: destination.bestTimeToVisit || { description: '', season: '', months: '', weatherInfo: '', images: [] },
        thingsToDo: destination.thingsToDo || { description: '', activities: [], images: [] },
        travelTips: destination.travelTips || { description: '', tips: [], images: [] },
        historyAndLegend: destination.historyAndLegend || { description: '', historicalFacts: '', legends: '', images: [] },
        location: destination.location || { coordinates: { lat: 7.8731, lng: 80.7718 }, nearbyCity: '', region: '' },
        status: destination.status || 'active',
      });
    } else {
      // Reset form for new destination
      setFormData({
        name: '',
        region: '',
        category: 'cultural',
        heroImage: '',
        overview: { description: '', images: [] },
        whatToSee: { description: '', highlights: [], images: [] },
        bestTimeToVisit: { description: '', season: '', months: '', weatherInfo: '', images: [] },
        thingsToDo: { description: '', activities: [], images: [] },
        travelTips: { description: '', tips: [], images: [] },
        historyAndLegend: { description: '', historicalFacts: '', legends: '', images: [] },
        location: { coordinates: { lat: 7.8731, lng: 80.7718 }, nearbyCity: '', region: '' },
        status: 'active',
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [destination, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.region?.trim()) newErrors.region = 'Region is required';
    if (!formData.heroImage?.trim()) newErrors.heroImage = 'Hero image URL is required';
    if (!formData.overview?.description?.trim()) newErrors.overview = 'Overview description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validate()) return;
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    // Include the ID if editing an existing destination
    const submitData = {
      ...formData,
      ...(destination?.id && { id: destination.id }), // ADD THIS LINE
      location: {
        ...formData.location,
        region: formData.region,
      },
    };

    await onSave(submitData);
    onClose();
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Helper functions for managing image arrays
// Helper functions for managing image arrays
type SectionWithImages = 'overview' | 'whatToSee' | 'bestTimeToVisit' | 'thingsToDo' | 'travelTips' | 'historyAndLegend';

const addImage = (section: SectionWithImages) => {
  const currentSection = formData[section];
  setFormData({
    ...formData,
    [section]: {
      ...currentSection,
      images: [...currentSection.images, ''],
    },
  });
};

const updateImage = (section: SectionWithImages, index: number, value: string) => {
  const currentSection = formData[section];
  const images = [...currentSection.images];
  images[index] = value;
  setFormData({
    ...formData,
    [section]: {
      ...currentSection,
      images,
    },
  });
};

const removeImage = (section: SectionWithImages, index: number) => {
  const currentSection = formData[section];
  const images = currentSection.images.filter((_, i) => i !== index);
  setFormData({
    ...formData,
    [section]: {
      ...currentSection,
      images,
    },
  });
};
  // Helper for managing highlights
  const addHighlight = () => {
    setFormData({
      ...formData,
      whatToSee: {
        ...formData.whatToSee,
        highlights: [...formData.whatToSee.highlights, { title: '', description: '', image: '' }],
      },
    });
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const highlights = [...formData.whatToSee.highlights];
    highlights[index] = { ...highlights[index], [field]: value };
    setFormData({
      ...formData,
      whatToSee: { ...formData.whatToSee, highlights },
    });
  };

  const removeHighlight = (index: number) => {
    const highlights = formData.whatToSee.highlights.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      whatToSee: { ...formData.whatToSee, highlights },
    });
  };

  // Helper for managing activities
  const addActivity = () => {
    setFormData({
      ...formData,
      thingsToDo: {
        ...formData.thingsToDo,
        activities: [...formData.thingsToDo.activities, { title: '', description: '', image: '' }],
      },
    });
  };

  const updateActivity = (index: number, field: string, value: string) => {
    const activities = [...formData.thingsToDo.activities];
    activities[index] = { ...activities[index], [field]: value };
    setFormData({
      ...formData,
      thingsToDo: { ...formData.thingsToDo, activities },
    });
  };

  const removeActivity = (index: number) => {
    const activities = formData.thingsToDo.activities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      thingsToDo: { ...formData.thingsToDo, activities },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {destination ? 'Edit Destination' : 'Add New Destination'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📍 Basic Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Sigiriya Rock Fortress"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Region <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g., Central Province"
                />
                {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">🏖️ Beach</SelectItem>
                    <SelectItem value="nature">🌿 Nature</SelectItem>
                    <SelectItem value="cultural">🏛️ Cultural</SelectItem>
                    <SelectItem value="wildlife">🦁 Wildlife</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">✅ Active</SelectItem>
                    <SelectItem value="inactive">❌ Inactive</SelectItem>
                    <SelectItem value="draft">📝 Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Hero Image URL <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {errors.heroImage && <p className="text-red-500 text-sm mt-1">{errors.heroImage}</p>}
              {formData.heroImage && (
                <img src={formData.heroImage} alt="Preview" className="mt-2 h-20 w-auto rounded object-cover" />
              )}
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              👁️ Overview Section
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={formData.overview.description}
                onChange={(e) => setFormData({
                  ...formData,
                  overview: { ...formData.overview, description: e.target.value }
                })}
                placeholder="Brief overview of the destination..."
                rows={3}
              />
              {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Images</label>
              {formData.overview.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('overview', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('overview', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('overview')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* What to See Section */}
          <div className="space-y-4 bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              🔍 What to See
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.whatToSee.description}
                onChange={(e) => setFormData({
                  ...formData,
                  whatToSee: { ...formData.whatToSee, description: e.target.value }
                })}
                placeholder="What visitors can see..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Highlights</label>
              {formData.whatToSee.highlights.map((highlight, index) => (
                <div key={index} className="border rounded p-3 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Highlight #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={highlight.title}
                      onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={highlight.description}
                      onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                    <Input
                      value={highlight.image}
                      onChange={(e) => updateHighlight(index, 'image', e.target.value)}
                      placeholder="Image URL (optional)"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHighlight}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Highlight
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Images</label>
              {formData.whatToSee.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('whatToSee', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('whatToSee', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('whatToSee')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* Best Time to Visit */}
          <div className="space-y-4 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📅 Best Time to Visit
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.bestTimeToVisit.description}
                onChange={(e) => setFormData({
                  ...formData,
                  bestTimeToVisit: { ...formData.bestTimeToVisit, description: e.target.value }
                })}
                placeholder="When to visit..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Season</label>
                <Input
                  value={formData.bestTimeToVisit.season}
                  onChange={(e) => setFormData({
                    ...formData,
                    bestTimeToVisit: { ...formData.bestTimeToVisit, season: e.target.value }
                  })}
                  placeholder="e.g., Winter"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Months</label>
                <Input
                  value={formData.bestTimeToVisit.months}
                  onChange={(e) => setFormData({
                    ...formData,
                    bestTimeToVisit: { ...formData.bestTimeToVisit, months: e.target.value }
                  })}
                  placeholder="Dec - Mar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Weather</label>
                <Input
                  value={formData.bestTimeToVisit.weatherInfo}
                  onChange={(e) => setFormData({
                    ...formData,
                    bestTimeToVisit: { ...formData.bestTimeToVisit, weatherInfo: e.target.value }
                  })}
                  placeholder="Dry and pleasant"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Images</label>
              {formData.bestTimeToVisit.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('bestTimeToVisit', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('bestTimeToVisit', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('bestTimeToVisit')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* Things to Do */}
          <div className="space-y-4 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              🎯 Things to Do
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.thingsToDo.description}
                onChange={(e) => setFormData({
                  ...formData,
                  thingsToDo: { ...formData.thingsToDo, description: e.target.value }
                })}
                placeholder="Activities and experiences..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Activities</label>
              {formData.thingsToDo.activities.map((activity, index) => (
                <div key={index} className="border rounded p-3 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Activity #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={activity.title}
                      onChange={(e) => updateActivity(index, 'title', e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={activity.description}
                      onChange={(e) => updateActivity(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                    <Input
                      value={activity.image}
                      onChange={(e) => updateActivity(index, 'image', e.target.value)}
                      placeholder="Image URL (optional)"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addActivity}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Activity
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Images</label>
              {formData.thingsToDo.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('thingsToDo', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('thingsToDo', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('thingsToDo')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* Travel Tips */}
          <div className="space-y-4 bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              💡 Travel Tips
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.travelTips.description}
                onChange={(e) => setFormData({
                  ...formData,
                  travelTips: { ...formData.travelTips, description: e.target.value }
                })}
                placeholder="General tips..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tips (one per line)</label>
              <Textarea
                value={formData.travelTips.tips.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  travelTips: { ...formData.travelTips, tips: e.target.value.split('\n').filter(t => t.trim()) }
                })}
                placeholder="Start early morning&#10;Wear comfortable shoes&#10;Bring water"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Images</label>
              {formData.travelTips.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('travelTips', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('travelTips', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('travelTips')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* History & Legend */}
          <div className="space-y-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📜 History & Legend
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.historyAndLegend.description}
                onChange={(e) => setFormData({
                  ...formData,
                  historyAndLegend: { ...formData.historyAndLegend, description: e.target.value }
                })}
                placeholder="Historical background..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Historical Facts</label>
              <Textarea
                value={formData.historyAndLegend.historicalFacts}
                onChange={(e) => setFormData({
                  ...formData,
                  historyAndLegend: { ...formData.historyAndLegend, historicalFacts: e.target.value }
                })}
                placeholder="Key historical facts..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Legends</label>
              <Textarea
                value={formData.historyAndLegend.legends}
                onChange={(e) => setFormData({
                  ...formData,
                  historyAndLegend: { ...formData.historyAndLegend, legends: e.target.value }
                })}
                placeholder="Local legends and stories..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section Images</label>
              {formData.historyAndLegend.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImage('historyAndLegend', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('historyAndLegend', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('historyAndLegend')}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              🗺️ Location & Coordinates
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.location.coordinates.lat}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      coordinates: { ...formData.location.coordinates, lat: parseFloat(e.target.value) || 0 }
                    }
                  })}
                  placeholder="7.8731"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.location.coordinates.lng}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      coordinates: { ...formData.location.coordinates, lng: parseFloat(e.target.value) || 0 }
                    }
                  })}
                  placeholder="80.7718"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nearby City</label>
              <Input
                value={formData.location.nearbyCity}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, nearbyCity: e.target.value }
                })}
                placeholder="e.g., Dambulla"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use Google Maps to find coordinates
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center gap-3 pt-4 border-t sticky bottom-0 bg-background pb-4">
            <p className="text-sm text-muted-foreground">
              * Required fields
            </p>
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {destination ? 'Update' : 'Create'} Destination
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}