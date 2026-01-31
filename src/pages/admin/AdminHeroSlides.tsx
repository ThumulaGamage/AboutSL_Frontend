import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, GripVertical, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface HeroSlide {
  id?: number;
  image: string;
  imagePublicId?: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  order: number;
  status: 'active' | 'inactive';
}

export function AdminHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<HeroSlide>({
    image: '',
    title: '',
    subtitle: '',
    description: '',
    badge: '',
    order: 0,
    status: 'active'
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides');
      const data = await response.json();
      if (data.success) {
        setSlides(data.data);
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast.error('Failed to load slides');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSlide(null);
    setFormData({
      image: '',
      title: '',
      subtitle: '',
      description: '',
      badge: '',
      order: slides.length,
      status: 'active'
    });
    setIsFormOpen(true);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData(slide);
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    try {
      const url = editingSlide?.id 
        ? `/api/hero-slides/${editingSlide.id}`
        : '/api/hero-slides';
      
      const method = editingSlide?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchSlides();
        setIsFormOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('Failed to save slide');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      const response = await fetch(`/api/hero-slides/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchSlides();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('Failed to delete slide');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const response = await fetch(`/api/hero-slides/${id}/status`, {
        method: 'PATCH'
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchSlides();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('Failed to toggle status');
    }
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newSlides.length) return;

    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    
    // Update order values
    const reorderedSlides = newSlides.map((slide, i) => ({
      id: slide.id!,
      order: i
    }));

    // Save new order
    fetch('/api/hero-slides/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides: reorderedSlides })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSlides(newSlides);
          toast.success('Slide order updated');
        }
      })
      .catch(error => {
        console.error('Error reordering:', error);
        toast.error('Failed to reorder slides');
      });
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Hero Slideshow
          </h1>
          <p className="text-muted-foreground">
            Manage your homepage slideshow slides
          </p>
        </div>
        <Button onClick={handleAdd} size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Slide
        </Button>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-6">
              {/* Order Controls */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  variant="ghost"
                  size="sm"
                >
                  ▲
                </Button>
                <div className="flex items-center justify-center">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                </div>
                <Button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === slides.length - 1}
                  variant="ghost"
                  size="sm"
                >
                  ▼
                </Button>
              </div>

              {/* Image */}
              <div className="w-48 h-28 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {slide.badge}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        slide.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {slide.status}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {slide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {slide.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleToggleStatus(slide.id!)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {slide.status === 'active' ? (
                    <><EyeOff className="w-4 h-4" /> Hide</>
                  ) : (
                    <><Eye className="w-4 h-4" /> Show</>
                  )}
                </Button>
                <Button
                  onClick={() => handleEdit(slide)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(slide.id!)}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground">
              No slides added yet. Click "Add New Slide" to get started.
            </p>
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSlide ? 'Edit Slide' : 'Add New Slide'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Image URL *</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="mt-2 h-32 rounded object-cover" 
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Badge *</label>
              <Input
                value={formData.badge}
                onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                placeholder="Historical Sites"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ancient Wonders"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Subtitle *</label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Discover Sigiriya Rock Fortress"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Climb the legendary Lion Rock and explore 1,500-year-old frescoes"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                onClick={() => setIsFormOpen(false)} 
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                {editingSlide ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}