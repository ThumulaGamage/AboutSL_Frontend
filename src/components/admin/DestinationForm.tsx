import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, MapPin, Car, Hotel, Utensils, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Destination, Hotel as HotelType, Restaurant as RestaurantType } from '@/types';

interface DestinationFormProps {
  destination?: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (destination: any) => Promise<void>;
  hotels?: HotelType[]; // Pass available hotels for selection
  restaurants?: RestaurantType[]; // Pass available restaurants for selection
  destinations?: Destination[]; // Pass available destinations for nearby selection
}

export function DestinationForm({ 
  destination, 
  isOpen, 
  onClose, 
  onSave,
  hotels = [],
  restaurants = [],
  destinations = []
}: DestinationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    category: 'cultural' as 'beach' | 'nature' | 'cultural' | 'wildlife',
    heroImage: '',
    
    // Section 1: Overview
    overview: {
      description: '',
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 2: History & Legend
    historyAndLegend: {
      description: '',
      historicalFacts: '',
      legends: '',
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 3: Where is Located (NEW)
    whereIsLocated: {
      description: '',
      city: '',
      coordinates: {
        lat: 7.8731,
        lng: 80.7718,
      },
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 4: How to Go (NEW)
    howToGo: {
      description: '',
      methods: [] as Array<{
        type: 'car' | 'bus' | 'train' | 'flight' | 'taxi' | 'tuk-tuk';
        title: string;
        description: string;
        duration: string;
        distance: string;
        route: string;
        fare: string;
        tips: string;
      }>,
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 5: What to See
    whatToSee: {
      description: '',
      highlights: [] as Array<{ title: string; description: string; image: string }>,
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 6: Best Time to Visit (UPDATED - Multiple Seasons)
    bestTimeToVisit: {
      description: '',
      seasons: [] as Array<{
        name: string;
        months: string;
        weather: string;
        pros: string[];
        cons: string[];
        recommended: boolean;
      }>,
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 7: Things to Do
    thingsToDo: {
      description: '',
      activities: [] as Array<{ title: string; description: string; image: string }>,
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 8: Where to Stay (NEW)
    whereToStay: {
      description: '',
      hotels: [] as Array<{ hotelId: number; distance: number; unit: 'km' | 'm' | 'miles' }>,
    },
    
    // Section 9: Where to Eat (NEW)
    whereToEat: {
      description: '',
      restaurants: [] as Array<{ restaurantId: number; distance: number; unit: 'km' | 'm' | 'miles' }>,
    },
    
    // Section 10: Travel Tips
    travelTips: {
      description: '',
      tips: [] as string[],
      images: [] as Array<{ url: string; caption: string; publicId: string }>,
    },
    
    // Section 11: Nearby Destinations (NEW)
    nearbyDestinations: {
      description: '',
      destinations: [] as Array<{ destinationId: number; distance: number; unit: 'km' | 'm' | 'miles' }>,
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
        historyAndLegend: destination.historyAndLegend || { description: '', historicalFacts: '', legends: '', images: [] },
        whereIsLocated: destination.whereIsLocated || { description: '', city: '', coordinates: { lat: 7.8731, lng: 80.7718 }, images: [] },
        howToGo: destination.howToGo || { description: '', methods: [], images: [] },
        whatToSee: destination.whatToSee || { description: '', highlights: [], images: [] },
        bestTimeToVisit: destination.bestTimeToVisit || { description: '', seasons: [], images: [] },
        thingsToDo: destination.thingsToDo || { description: '', activities: [], images: [] },
        whereToStay: destination.whereToStay || { description: '', hotels: [] },
        whereToEat: destination.whereToEat || { description: '', restaurants: [] },
        travelTips: destination.travelTips || { description: '', tips: [], images: [] },
        nearbyDestinations: destination.nearbyDestinations || { description: '', destinations: [] },
        status: destination.status || 'active',
      });
    } else {
      // Reset form
      setFormData({
        name: '',
        region: '',
        category: 'cultural',
        heroImage: '',
        overview: { description: '', images: [] },
        historyAndLegend: { description: '', historicalFacts: '', legends: '', images: [] },
        whereIsLocated: { description: '', city: '', coordinates: { lat: 7.8731, lng: 80.7718 }, images: [] },
        howToGo: { description: '', methods: [], images: [] },
        whatToSee: { description: '', highlights: [], images: [] },
        bestTimeToVisit: { description: '', seasons: [], images: [] },
        thingsToDo: { description: '', activities: [], images: [] },
        whereToStay: { description: '', hotels: [] },
        whereToEat: { description: '', restaurants: [] },
        travelTips: { description: '', tips: [], images: [] },
        nearbyDestinations: { description: '', destinations: [] },
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
      const submitData = {
        ...formData,
        ...(destination?.id && { id: destination.id }),
      };

      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for image management
  type SectionWithImages = 'overview' | 'historyAndLegend' | 'whereIsLocated' | 'howToGo' | 'whatToSee' | 'bestTimeToVisit' | 'thingsToDo' | 'travelTips';

  const addImage = (section: SectionWithImages) => {
    const currentSection = formData[section];
    setFormData({
      ...formData,
      [section]: {
        ...currentSection,
        images: [...currentSection.images, { url: '', caption: '', publicId: '' }],
      },
    });
  };

  const updateImage = (section: SectionWithImages, index: number, field: 'url' | 'caption', value: string) => {
    const currentSection = formData[section];
    const images = [...currentSection.images];
    images[index] = { ...images[index], [field]: value };
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

  // Transport methods management
  const addTransportMethod = () => {
    setFormData({
      ...formData,
      howToGo: {
        ...formData.howToGo,
        methods: [...formData.howToGo.methods, {
          type: 'car',
          title: '',
          description: '',
          duration: '',
          distance: '',
          route: '',
          fare: '',
          tips: ''
        }],
      },
    });
  };

  const updateTransportMethod = (index: number, field: string, value: any) => {
    const methods = [...formData.howToGo.methods];
    methods[index] = { ...methods[index], [field]: value };
    setFormData({
      ...formData,
      howToGo: { ...formData.howToGo, methods },
    });
  };

  const removeTransportMethod = (index: number) => {
    const methods = formData.howToGo.methods.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      howToGo: { ...formData.howToGo, methods },
    });
  };

  // Season management (NEW)
  const addSeason = () => {
    setFormData({
      ...formData,
      bestTimeToVisit: {
        ...formData.bestTimeToVisit,
        seasons: [...formData.bestTimeToVisit.seasons, {
          name: '',
          months: '',
          weather: '',
          pros: [],
          cons: [],
          recommended: false
        }],
      },
    });
  };

  const updateSeason = (index: number, field: string, value: any) => {
    const seasons = [...formData.bestTimeToVisit.seasons];
    seasons[index] = { ...seasons[index], [field]: value };
    setFormData({
      ...formData,
      bestTimeToVisit: { ...formData.bestTimeToVisit, seasons },
    });
  };

  const removeSeason = (index: number) => {
    const seasons = formData.bestTimeToVisit.seasons.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      bestTimeToVisit: { ...formData.bestTimeToVisit, seasons },
    });
  };

  // Hotel management (NEW)
  const addHotel = () => {
    console.log('🏨 Adding hotel, current count:', formData.whereToStay.hotels.length);
    setFormData({
      ...formData,
      whereToStay: {
        ...formData.whereToStay,
        hotels: [...formData.whereToStay.hotels, { hotelId: 0, distance: 0, unit: 'km' }],
      },
    });
    console.log('🏨 After add, new count:', formData.whereToStay.hotels.length + 1);
  };

  const updateHotel = (index: number, field: string, value: any) => {
    const hotels = [...formData.whereToStay.hotels];
    hotels[index] = { ...hotels[index], [field]: value };
    setFormData({
      ...formData,
      whereToStay: { ...formData.whereToStay, hotels },
    });
  };

  const removeHotel = (index: number) => {
    const hotels = formData.whereToStay.hotels.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      whereToStay: { ...formData.whereToStay, hotels },
    });
  };

  // Restaurant management (NEW)
  const addRestaurant = () => {
    console.log('🍽️ Adding restaurant, current count:', formData.whereToEat.restaurants.length);
    setFormData({
      ...formData,
      whereToEat: {
        ...formData.whereToEat,
        restaurants: [...formData.whereToEat.restaurants, { restaurantId: 0, distance: 0, unit: 'km' }],
      },
    });
    console.log('🍽️ After add, new count:', formData.whereToEat.restaurants.length + 1);
  };

  const updateRestaurant = (index: number, field: string, value: any) => {
    const restaurants = [...formData.whereToEat.restaurants];
    restaurants[index] = { ...restaurants[index], [field]: value };
    setFormData({
      ...formData,
      whereToEat: { ...formData.whereToEat, restaurants },
    });
  };

  const removeRestaurant = (index: number) => {
    const restaurants = formData.whereToEat.restaurants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      whereToEat: { ...formData.whereToEat, restaurants },
    });
  };

  // Nearby destination management (NEW)
  const addNearbyDestination = () => {
    setFormData({
      ...formData,
      nearbyDestinations: {
        ...formData.nearbyDestinations,
        destinations: [...formData.nearbyDestinations.destinations, { destinationId: 0, distance: 0, unit: 'km' }],
      },
    });
  };

  const updateNearbyDestination = (index: number, field: string, value: any) => {
    const dests = [...formData.nearbyDestinations.destinations];
    dests[index] = { ...dests[index], [field]: value };
    setFormData({
      ...formData,
      nearbyDestinations: { ...formData.nearbyDestinations, destinations: dests },
    });
  };

  const removeNearbyDestination = (index: number) => {
    const dests = formData.nearbyDestinations.destinations.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      nearbyDestinations: { ...formData.nearbyDestinations, destinations: dests },
    });
  };

  // Highlight management (What to See)
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

  // Activity management (Things to Do)
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg border-2 border-primary/20">
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

          {/* SECTION 1: Overview */}
          <div className="space-y-4 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              1️⃣ Overview
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
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.overview.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('overview', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('overview', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 2: History & Legend */}
          <div className="space-y-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              2️⃣ History & Legend
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.historyAndLegend.description}
                onChange={(e) => setFormData({
                  ...formData,
                  historyAndLegend: { ...formData.historyAndLegend, description: e.target.value }
                })}
                placeholder="Historical background overview..."
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
                rows={3}
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
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.historyAndLegend.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('historyAndLegend', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('historyAndLegend', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 3: Where is Located (NEW) */}
          <div className="space-y-4 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" /> 3️⃣ Where is Located
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.whereIsLocated.description}
                onChange={(e) => setFormData({
                  ...formData,
                  whereIsLocated: { ...formData.whereIsLocated, description: e.target.value }
                })}
                placeholder="Describe the location..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Input
                value={formData.whereIsLocated.city}
                onChange={(e) => setFormData({
                  ...formData,
                  whereIsLocated: { ...formData.whereIsLocated, city: e.target.value }
                })}
                placeholder="e.g., Dambulla"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.whereIsLocated.coordinates.lat}
                  onChange={(e) => setFormData({
                    ...formData,
                    whereIsLocated: {
                      ...formData.whereIsLocated,
                      coordinates: { ...formData.whereIsLocated.coordinates, lat: parseFloat(e.target.value) || 0 }
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
                  value={formData.whereIsLocated.coordinates.lng}
                  onChange={(e) => setFormData({
                    ...formData,
                    whereIsLocated: {
                      ...formData.whereIsLocated,
                      coordinates: { ...formData.whereIsLocated.coordinates, lng: parseFloat(e.target.value) || 0 }
                    }
                  })}
                  placeholder="80.7718"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.whereIsLocated.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('whereIsLocated', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('whereIsLocated', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('whereIsLocated', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('whereIsLocated')}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 4: How to Go (NEW) */}
          <div className="space-y-4 bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-lg border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Car className="w-5 h-5" /> 4️⃣ How to Go
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.howToGo.description}
                onChange={(e) => setFormData({
                  ...formData,
                  howToGo: { ...formData.howToGo, description: e.target.value }
                })}
                placeholder="General transport information..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Transport Methods</label>
              {formData.howToGo.methods.map((method, index) => (
                <div key={index} className="border rounded p-4 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium">Method #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTransportMethod(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Type</label>
                      <Select
                        value={method.type}
                        onValueChange={(value) => updateTransportMethod(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">🚗 Car</SelectItem>
                          <SelectItem value="bus">🚌 Bus</SelectItem>
                          <SelectItem value="train">🚂 Train</SelectItem>
                          <SelectItem value="flight">✈️ Flight</SelectItem>
                          <SelectItem value="taxi">🚕 Taxi</SelectItem>
                          <SelectItem value="tuk-tuk">🛺 Tuk-Tuk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <Input
                        value={method.title}
                        onChange={(e) => updateTransportMethod(index, 'title', e.target.value)}
                        placeholder="e.g., By Car"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <Textarea
                        value={method.description}
                        onChange={(e) => updateTransportMethod(index, 'description', e.target.value)}
                        placeholder="Detailed instructions..."
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Duration</label>
                      <Input
                        value={method.duration}
                        onChange={(e) => updateTransportMethod(index, 'duration', e.target.value)}
                        placeholder="e.g., 4 hours"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Distance</label>
                      <Input
                        value={method.distance}
                        onChange={(e) => updateTransportMethod(index, 'distance', e.target.value)}
                        placeholder="e.g., 150 km"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Route</label>
                      <Input
                        value={method.route}
                        onChange={(e) => updateTransportMethod(index, 'route', e.target.value)}
                        placeholder="e.g., Colombo → Kandy → Sigiriya"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Fare</label>
                      <Input
                        value={method.fare}
                        onChange={(e) => updateTransportMethod(index, 'fare', e.target.value)}
                        placeholder="e.g., LKR 500"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-xs font-medium mb-1">Tips</label>
                      <Textarea
                        value={method.tips}
                        onChange={(e) => updateTransportMethod(index, 'tips', e.target.value)}
                        placeholder="Additional advice..."
                        rows={1}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTransportMethod}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Transport Method
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.howToGo.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('howToGo', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('howToGo', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage('howToGo', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addImage('howToGo')}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 5: What to See */}
          <div className="space-y-4 bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              5️⃣ What to See
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
                <div key={index} className="border rounded p-4 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-3">
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
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <Input
                        value={highlight.title}
                        onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                        placeholder="e.g., Lion's Gate and Paws"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <Textarea
                        value={highlight.description}
                        onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                        placeholder="Description of this highlight..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Image URL (optional)</label>
                      <Input
                        value={highlight.image}
                        onChange={(e) => updateHighlight(index, 'image', e.target.value)}
                        placeholder="https://..."
                      />
                      {highlight.image && (
                        <img src={highlight.image} alt="Preview" className="mt-2 h-16 w-auto rounded object-cover" />
                      )}
                    </div>
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
                    value={img.url}
                    onChange={(e) => updateImage('whatToSee', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('whatToSee', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 6: Best Time to Visit (UPDATED - Multiple Seasons) */}
          <div className="space-y-4 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              6️⃣ Best Time to Visit (Multiple Seasons)
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.bestTimeToVisit.description}
                onChange={(e) => setFormData({
                  ...formData,
                  bestTimeToVisit: { ...formData.bestTimeToVisit, description: e.target.value }
                })}
                placeholder="When to visit this destination..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Seasons</label>
              {formData.bestTimeToVisit.seasons.map((season, index) => (
                <div key={index} className="border rounded p-4 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium">Season #{index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSeason(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Season Name</label>
                        <Input
                          value={season.name}
                          onChange={(e) => updateSeason(index, 'name', e.target.value)}
                          placeholder="e.g., Dry Season (Peak)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1">Months</label>
                        <Input
                          value={season.months}
                          onChange={(e) => updateSeason(index, 'months', e.target.value)}
                          placeholder="e.g., January to April"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Weather</label>
                      <Textarea
                        value={season.weather}
                        onChange={(e) => updateSeason(index, 'weather', e.target.value)}
                        placeholder="Weather description..."
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Pros (one per line)</label>
                      <Textarea
                        value={season.pros.join('\n')}
                        onChange={(e) => updateSeason(index, 'pros', e.target.value.split('\n').filter(p => p.trim()))}
                        placeholder="Clear skies&#10;Perfect for climbing&#10;Great visibility"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Cons (one per line)</label>
                      <Textarea
                        value={season.cons.join('\n')}
                        onChange={(e) => updateSeason(index, 'cons', e.target.value.split('\n').filter(c => c.trim()))}
                        placeholder="More crowded&#10;Higher prices"
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`recommended-${index}`}
                        checked={season.recommended}
                        onCheckedChange={(checked) => updateSeason(index, 'recommended', checked)}
                      />
                      <label
                        htmlFor={`recommended-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        ⭐ Recommended Season
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSeason}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Season
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.bestTimeToVisit.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('bestTimeToVisit', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('bestTimeToVisit', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 7: Things to Do */}
          <div className="space-y-4 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              7️⃣ Things to Do
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
                <div key={index} className="border rounded p-4 mb-3 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-3">
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
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <Input
                        value={activity.title}
                        onChange={(e) => updateActivity(index, 'title', e.target.value)}
                        placeholder="e.g., Climb to the Summit"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <Textarea
                        value={activity.description}
                        onChange={(e) => updateActivity(index, 'description', e.target.value)}
                        placeholder="Description of this activity..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Image URL (optional)</label>
                      <Input
                        value={activity.image}
                        onChange={(e) => updateActivity(index, 'image', e.target.value)}
                        placeholder="https://..."
                      />
                      {activity.image && (
                        <img src={activity.image} alt="Preview" className="mt-2 h-16 w-auto rounded object-cover" />
                      )}
                    </div>
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
                    value={img.url}
                    onChange={(e) => updateImage('thingsToDo', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('thingsToDo', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

           {/* SECTION 10: Travel Tips */}
          <div className="space-y-4 bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              🔟 Travel Tips
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
              <label className="block text-sm font-medium mb-2">Images</label>
              {formData.travelTips.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage('travelTips', index, 'url', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateImage('travelTips', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="flex-1"
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
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* SECTION 8: Where to Stay (NEW) */}
          <div className="space-y-4 bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Hotel className="w-5 h-5" /> 8️⃣ Where to Stay
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.whereToStay.description}
                onChange={(e) => setFormData({
                  ...formData,
                  whereToStay: { ...formData.whereToStay, description: e.target.value }
                })}
                placeholder="Accommodation information..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Selected Hotels</label>
              
              {/* Debug info */}
              <div className="text-xs text-muted-foreground mb-2">
                Hotels in form: {formData.whereToStay.hotels.length} | Available hotels: {hotels.length}
              </div>
              
              {/* Display selected hotels */}
              {formData.whereToStay.hotels.length > 0 && (
                <div className="space-y-2 mb-3">
                  {formData.whereToStay.hotels.map((hotel, index) => {
                    const selectedHotel = hotels.find(h => h.id === hotel.hotelId);
                    console.log(`Hotel ${index}:`, { hotelId: hotel.hotelId, found: !!selectedHotel, selectedHotel });
                    return (
                      <div key={index} className="border rounded-lg p-3 bg-white dark:bg-gray-900">
                        {/* Show hotel name if selected, otherwise show selection prompt */}
                        {selectedHotel ? (
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium text-foreground">
                                {selectedHotel.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {selectedHotel.location?.region || 'Location not specified'}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHotel(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              Select a hotel below (ID: {hotel.hotelId})
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHotel(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium mb-1">Select Hotel</label>
                            <Select
                              value={hotel.hotelId > 0 ? hotel.hotelId.toString() : ""}
                              onValueChange={(value) => {
                                console.log('Hotel selected:', value);
                                updateHotel(index, 'hotelId', parseInt(value));
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose hotel" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* Show count of available hotels */}
                                {hotels.length === 0 && (
                                  <div className="px-2 py-1 text-xs text-muted-foreground">
                                    No hotels available
                                  </div>
                                )}
                                {hotels.map((h) => (
                                  <SelectItem key={h.id} value={h.id.toString()}>
                                    {h.name} ({h.status})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="text-xs text-muted-foreground mt-1">
                              {hotels.length} hotel(s) available
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-medium mb-1">Distance</label>
                              <Input
                                type="number"
                                step="0.1"
                                value={hotel.distance}
                                onChange={(e) => updateHotel(index, 'distance', parseFloat(e.target.value) || 0)}
                                placeholder="2.5"
                              />
                            </div>
                            
                            <div className="w-20">
                              <label className="block text-xs font-medium mb-1">Unit</label>
                              <Select
                                value={hotel.unit}
                                onValueChange={(value) => updateHotel(index, 'unit', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="km">km</SelectItem>
                                  <SelectItem value="m">m</SelectItem>
                                  <SelectItem value="miles">miles</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHotel}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Hotel
              </Button>
            </div>
          </div>

          {/* SECTION 9: Where to Eat (NEW) */}
          <div className="space-y-4 bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Utensils className="w-5 h-5" /> 9️⃣ Where to Eat
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.whereToEat.description}
                onChange={(e) => setFormData({
                  ...formData,
                  whereToEat: { ...formData.whereToEat, description: e.target.value }
                })}
                placeholder="Dining information..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Selected Restaurants</label>
              
              {/* Debug info */}
              <div className="text-xs text-muted-foreground mb-2">
                Restaurants in form: {formData.whereToEat.restaurants.length} | Available restaurants: {restaurants.length}
              </div>
              
              {/* Display selected restaurants */}
              {formData.whereToEat.restaurants.length > 0 && (
                <div className="space-y-2 mb-3">
                  {formData.whereToEat.restaurants.map((restaurant, index) => {
                    const selectedRestaurant = restaurants.find(r => r.id === restaurant.restaurantId);
                    console.log(`Restaurant ${index}:`, { restaurantId: restaurant.restaurantId, found: !!selectedRestaurant, selectedRestaurant });
                    return (
                      <div key={index} className="border rounded-lg p-3 bg-white dark:bg-gray-900">
                        {/* Show restaurant name if selected, otherwise show selection prompt */}
                        {selectedRestaurant ? (
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium text-foreground">
                                {selectedRestaurant.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {selectedRestaurant.cuisine} • {selectedRestaurant.location?.region || 'Location not specified'}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRestaurant(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              Select a restaurant below (ID: {restaurant.restaurantId})
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRestaurant(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium mb-1">Select Restaurant</label>
                            <Select
                              value={restaurant.restaurantId > 0 ? restaurant.restaurantId.toString() : ""}
                              onValueChange={(value) => {
                                console.log('Restaurant selected:', value);
                                updateRestaurant(index, 'restaurantId', parseInt(value));
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose restaurant" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* Show count of available restaurants */}
                                {restaurants.length === 0 && (
                                  <div className="px-2 py-1 text-xs text-muted-foreground">
                                    No restaurants available
                                  </div>
                                )}
                                {restaurants.map((r) => (
                                  <SelectItem key={r.id} value={r.id.toString()}>
                                    {r.name} ({r.status})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="text-xs text-muted-foreground mt-1">
                              {restaurants.length} restaurant(s) available
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-medium mb-1">Distance</label>
                              <Input
                                type="number"
                                step="0.1"
                                value={restaurant.distance}
                                onChange={(e) => updateRestaurant(index, 'distance', parseFloat(e.target.value) || 0)}
                                placeholder="1.2"
                              />
                            </div>
                            
                            <div className="w-20">
                              <label className="block text-xs font-medium mb-1">Unit</label>
                              <Select
                                value={restaurant.unit}
                                onValueChange={(value) => updateRestaurant(index, 'unit', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="km">km</SelectItem>
                                  <SelectItem value="m">m</SelectItem>
                                  <SelectItem value="miles">miles</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRestaurant}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Restaurant
              </Button>
            </div>
          </div>

         

          {/* SECTION 11: Nearby Destinations (NEW) */}
          <div className="space-y-4 bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg border-l-4 border-teal-500">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Compass className="w-5 h-5" /> 1️⃣1️⃣ Nearby Destinations
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.nearbyDestinations.description}
                onChange={(e) => setFormData({
                  ...formData,
                  nearbyDestinations: { ...formData.nearbyDestinations, description: e.target.value }
                })}
                placeholder="Info about nearby attractions..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nearby Destinations</label>
              {formData.nearbyDestinations.destinations.map((dest, index) => (
                <div key={index} className="border rounded p-3 mb-2 bg-white dark:bg-gray-900 flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">Select Destination</label>
                    <Select
                      value={dest.destinationId.toString()}
                      onValueChange={(value) => updateNearbyDestination(index, 'destinationId', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.filter(d => !destination || d.id !== destination.id).map((d) => (
                          <SelectItem key={d.id} value={d.id.toString()}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-24">
                    <label className="block text-xs font-medium mb-1">Distance</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={dest.distance}
                      onChange={(e) => updateNearbyDestination(index, 'distance', parseFloat(e.target.value) || 0)}
                      placeholder="15"
                    />
                  </div>
                  
                  <div className="w-20">
                    <label className="block text-xs font-medium mb-1">Unit</label>
                    <Select
                      value={dest.unit}
                      onValueChange={(value) => updateNearbyDestination(index, 'unit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">km</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                        <SelectItem value="miles">miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeNearbyDestination(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNearbyDestination}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Nearby Destination
              </Button>
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