import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BusinessHour {
  day: string;
  time: string;
}

interface ContactPageData {
  id?: number;
  headerImage: string;
  email: string[];
  phone: string[];
  address: string[];
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
  businessHours: BusinessHour[];
  timezone: string;
}

type TabType = 'contact' | 'social' | 'hours';

export function AdminContactPage() {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [formData, setFormData] = useState<ContactPageData>({
    headerImage: '',
    email: ['', ''],
    phone: ['', ''],
    address: ['', ''],
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
    businessHours: [
      { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', time: 'Closed' }
    ],
    timezone: 'Sri Lanka Standard Time (UTC +5:30)'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContactPage();
  }, []);

  const fetchContactPage = async () => {
    try {
      const response = await fetch('/api/contact-page');
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching contact page:', error);
      toast.error('Failed to load contact page data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/contact-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Contact page updated successfully!');
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

  // Email Functions
  const updateEmail = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      email: prev.email.map((e, i) => i === index ? value : e)
    }));
  };

  const addEmail = () => {
    setFormData(prev => ({
      ...prev,
      email: [...prev.email, '']
    }));
  };

  const removeEmail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      email: prev.email.filter((_, i) => i !== index)
    }));
  };

  // Phone Functions
  const updatePhone = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: prev.phone.map((p, i) => i === index ? value : p)
    }));
  };

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phone: [...prev.phone, '']
    }));
  };

  const removePhone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phone: prev.phone.filter((_, i) => i !== index)
    }));
  };

  // Address Functions
  const updateAddress = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: prev.address.map((a, i) => i === index ? value : a)
    }));
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      address: [...prev.address, '']
    }));
  };

  const removeAddress = (index: number) => {
    setFormData(prev => ({
      ...prev,
      address: prev.address.filter((_, i) => i !== index)
    }));
  };

  // Business Hours Functions
  const updateBusinessHour = (index: number, field: keyof BusinessHour, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessHours: prev.businessHours.map((h, i) =>
        i === index ? { ...h, [field]: value } : h
      )
    }));
  };

  const addBusinessHour = () => {
    setFormData(prev => ({
      ...prev,
      businessHours: [...prev.businessHours, { day: '', time: '' }]
    }));
  };

  const removeBusinessHour = (index: number) => {
    setFormData(prev => ({
      ...prev,
      businessHours: prev.businessHours.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'contact', label: 'Contact Info' },
    { id: 'social', label: 'Social Media' },
    { id: 'hours', label: 'Business Hours' },
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
              Contact Page
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage contact details
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
          {/* Contact Info Tab */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-muted-foreground">
                  Manage email addresses, phone numbers, and physical address
                </p>
              </div>

              {/* Email Addresses */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Email Addresses</h4>
                  <Button onClick={addEmail} className="gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full" size="sm">
                    <Plus className="w-4 h-4" />
                    Add Email
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.email.map((email, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        placeholder="email@example.com"
                      />
                      {formData.email.length > 1 && (
                        <Button onClick={() => removeEmail(index)} variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Phone Numbers</h4>
                  <Button onClick={addPhone} className="gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full" size="sm">
                    <Plus className="w-4 h-4" />
                    Add Phone
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.phone.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={phone}
                        onChange={(e) => updatePhone(index, e.target.value)}
                        placeholder="+94 11 234 5678"
                      />
                      {formData.phone.length > 1 && (
                        <Button onClick={() => removePhone(index)} variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Physical Address</h4>
                  <Button onClick={addAddress} className="gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full" size="sm">
                    <Plus className="w-4 h-4" />
                    Add Line
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.address.map((line, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={line}
                        onChange={(e) => updateAddress(index, e.target.value)}
                        placeholder="Address line"
                      />
                      {formData.address.length > 1 && (
                        <Button onClick={() => removeAddress(index)} variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h4 className="font-semibold mb-4">WhatsApp Number</h4>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Social Media Links</h3>
                <p className="text-muted-foreground">
                  Add links to your social media profiles
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Facebook URL</label>
                  <Input
                    value={formData.facebook}
                    onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Instagram URL</label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Twitter URL</label>
                  <Input
                    value={formData.twitter}
                    onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Hours Tab */}
          {activeTab === 'hours' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Business Hours</h3>
                <p className="text-muted-foreground">
                  Set your business operating hours
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Operating Hours</h4>
                  <Button onClick={addBusinessHour} className="gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-full" size="sm">
                    <Plus className="w-4 h-4" />
                    Add Hour
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.businessHours.map((hour, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={hour.day}
                        onChange={(e) => updateBusinessHour(index, 'day', e.target.value)}
                        placeholder="Monday - Friday"
                        className="flex-1"
                      />
                      <Input
                        value={hour.time}
                        onChange={(e) => updateBusinessHour(index, 'time', e.target.value)}
                        placeholder="9:00 AM - 6:00 PM"
                        className="flex-1"
                      />
                      {formData.businessHours.length > 1 && (
                        <Button onClick={() => removeBusinessHour(index)} variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">Timezone Note</label>
                  <Input
                    value={formData.timezone}
                    onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                    placeholder="Sri Lanka Standard Time (UTC +5:30)"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}