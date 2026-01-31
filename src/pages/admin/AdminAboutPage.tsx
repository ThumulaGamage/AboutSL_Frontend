import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  imagePublicId?: string;
  bio: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface AboutPageData {
  id?: number;
  headerImage: string;
  headerImagePublicId?: string;
  stats: Stat[];
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  values: Value[];
  teamMembers: TeamMember[];
}

export function AdminAboutPage() {
  const [formData, setFormData] = useState<AboutPageData>({
    headerImage: '',
    stats: [
      { icon: '🏖️', value: '1,340km', label: 'Coastline' },
      { icon: '🌴', value: '26', label: 'National Parks' },
      { icon: '🏛️', value: '8', label: 'UNESCO Sites' },
      { icon: '📸', value: '500+', label: 'Photo Spots' }
    ],
    storyTitle: 'Our Story',
    storyParagraph1: '',
    storyParagraph2: '',
    storyParagraph3: '',
    values: [
      { icon: 'Heart', title: 'Passion', description: 'We love Sri Lanka and want to share its beauty with the world' },
      { icon: 'Shield', title: 'Trust', description: 'All recommendations are verified and quality-assured' },
      { icon: 'Globe', title: 'Sustainability', description: 'Promoting responsible and eco-friendly tourism' },
      { icon: 'Sparkles', title: 'Excellence', description: 'Curating only the best experiences for travelers' }
    ],
    teamMembers: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAboutPage();
  }, []);

  const fetchAboutPage = async () => {
    try {
      const response = await fetch('/api/about-page');
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about page:', error);
      toast.error('Failed to load about page data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('About page updated successfully!');
        setFormData(data.data);
      } else {
        toast.error(data.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  // Team Member Functions
  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', image: '', bio: '' }]
    }));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  // Stat Functions
  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  // Value Functions
  const updateValue = (index: number, field: keyof Value, value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.map((val, i) =>
        i === index ? { ...val, [field]: value } : val
      )
    }));
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
            About Page Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your about page content, team members, and company information
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-8 max-w-5xl">
        {/* Header Image */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-lg mb-4">Header Image</h2>
          <div>
            <Input
              value={formData.headerImage}
              onChange={(e) => setFormData(prev => ({ ...prev, headerImage: e.target.value }))}
              placeholder="https://example.com/header.jpg"
            />
            {formData.headerImage && (
              <img src={formData.headerImage} alt="Header" className="mt-4 h-32 rounded object-cover" />
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-lg mb-4">Statistics (4 items)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={stat.icon}
                    onChange={(e) => updateStat(index, 'icon', e.target.value)}
                    placeholder="🏖️"
                    className="w-20"
                  />
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="1,340km"
                  />
                </div>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Coastline"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-lg mb-4">Our Story</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Section Title</label>
              <Input
                value={formData.storyTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, storyTitle: e.target.value }))}
                placeholder="Our Story"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Paragraph 1</label>
              <Textarea
                value={formData.storyParagraph1}
                onChange={(e) => setFormData(prev => ({ ...prev, storyParagraph1: e.target.value }))}
                rows={4}
                placeholder="First paragraph..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Paragraph 2</label>
              <Textarea
                value={formData.storyParagraph2}
                onChange={(e) => setFormData(prev => ({ ...prev, storyParagraph2: e.target.value }))}
                rows={4}
                placeholder="Second paragraph..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Paragraph 3</label>
              <Textarea
                value={formData.storyParagraph3}
                onChange={(e) => setFormData(prev => ({ ...prev, storyParagraph3: e.target.value }))}
                rows={4}
                placeholder="Third paragraph..."
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-lg mb-4">Our Values (4 items)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.values.map((value, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <Input
                  value={value.icon}
                  onChange={(e) => updateValue(index, 'icon', e.target.value)}
                  placeholder="Heart"
                />
                <Input
                  value={value.title}
                  onChange={(e) => updateValue(index, 'title', e.target.value)}
                  placeholder="Passion"
                />
                <Textarea
                  value={value.description}
                  onChange={(e) => updateValue(index, 'description', e.target.value)}
                  rows={2}
                  placeholder="Description..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Team Members</h2>
            <Button onClick={addTeamMember} variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </div>

          <div className="space-y-4">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="p-6 bg-muted/30 rounded-lg space-y-4 relative">
                <Button
                  onClick={() => removeTeamMember(index)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Role</label>
                    <Input
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      placeholder="Founder & CEO"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Image URL</label>
                  <Input
                    value={member.image}
                    onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                  {member.image && (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="mt-2 w-24 h-24 rounded-full object-cover" 
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <Textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                    rows={3}
                    placeholder="Brief bio about the team member..."
                  />
                </div>
              </div>
            ))}

            {formData.teamMembers.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No team members added yet. Click "Add Team Member" to get started.
              </p>
            )}
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}