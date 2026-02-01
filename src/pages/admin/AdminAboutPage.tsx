import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
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
  stats: Stat[];
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  values: Value[];
  teamMembers: TeamMember[];
}

type TabType = 'story' | 'stats' | 'values' | 'team';

export function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('story');
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

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const updateValue = (index: number, field: keyof Value, value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.map((val, i) =>
        i === index ? { ...val, [field]: value } : val
      )
    }));
  };

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'stats', label: 'Statistics' },
    { id: 'values', label: 'Our Values' },
    { id: 'team', label: 'Team Members' },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex h-screen">
        {/* Left Sidebar - Tabs */}
        <div className="w-64 bg-card border-r border-border p-4">
          <div className="mb-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              About Page
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage content sections
            </p>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-border">
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="w-full gap-2 px-8 py-6 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Our Story</h3>
                <p className="text-muted-foreground">
                  Edit the story section that appears on your About page
                </p>
              </div>

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
                    rows={5}
                    placeholder="First paragraph of your story..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Paragraph 2</label>
                  <Textarea
                    value={formData.storyParagraph2}
                    onChange={(e) => setFormData(prev => ({ ...prev, storyParagraph2: e.target.value }))}
                    rows={5}
                    placeholder="Second paragraph of your story..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Paragraph 3</label>
                  <Textarea
                    value={formData.storyParagraph3}
                    onChange={(e) => setFormData(prev => ({ ...prev, storyParagraph3: e.target.value }))}
                    rows={5}
                    placeholder="Third paragraph of your story..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Statistics</h3>
                <p className="text-muted-foreground">
                  Manage the 4 statistics displayed on your About page
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.stats.map((stat, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="flex gap-2">
                      <div className="w-20">
                        <label className="text-xs font-medium mb-1 block">Icon</label>
                        <Input
                          value={stat.icon}
                          onChange={(e) => updateStat(index, 'icon', e.target.value)}
                          placeholder="🏖️"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium mb-1 block">Value</label>
                        <Input
                          value={stat.value}
                          onChange={(e) => updateStat(index, 'value', e.target.value)}
                          placeholder="1,340km"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Label</label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                        placeholder="Coastline"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  Manage the 4 core values displayed on your About page
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.values.map((value, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div>
                      <label className="text-xs font-medium mb-1 block">Icon Name</label>
                      <Input
                        value={value.icon}
                        onChange={(e) => updateValue(index, 'icon', e.target.value)}
                        placeholder="Heart"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Lucide icon name (e.g., Heart, Shield, Globe, Sparkles)
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Title</label>
                      <Input
                        value={value.title}
                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                        placeholder="Passion"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Description</label>
                      <Textarea
                        value={value.description}
                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Description..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members Tab */}
          {activeTab === 'team' && (
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Team Members</h3>
                  <p className="text-muted-foreground">
                    Add and manage your team members
                  </p>
                </div>
                <Button onClick={addTeamMember} className="gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  <Plus className="w-4 h-4" />
                  Add Member
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
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground">
                      No team members added yet. Click "Add Member" to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}