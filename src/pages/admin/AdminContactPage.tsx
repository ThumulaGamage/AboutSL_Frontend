import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
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
  headerImagePublicId?: string;
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

export function AdminContactPage() {
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

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Contact Page Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your contact information, social links, and business hours
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-8 max-w-4xl">
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

        {/* Email Addresses */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Email Addresses</h2>
            <Button onClick={addEmail} variant="outline" size="sm" className="gap-2">
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
            <h2 className="font-semibold text-lg">Phone Numbers</h2>
            <Button onClick={addPhone} variant="outline" size="sm" className="gap-2">
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
            <h2 className="font-semibold text-lg">Address Lines</h2>
            <Button onClick={addAddress} variant="outline" size="sm" className="gap-2">
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
          <h2 className="font-semibold text-lg mb-4">WhatsApp Number</h2>
          <Input
            value={formData.whatsapp}
            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="+94 77 123 4567"
          />
        </div>

        {/* Social Media */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-lg mb-4">Social Media Links</h2>
          <div className="space-y-4">
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

        {/* Business Hours */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Business Hours</h2>
            <Button onClick={addBusinessHour} variant="outline" size="sm" className="gap-2">
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
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Timezone Note</label>
            <Input
              value={formData.timezone}
              onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
              placeholder="Sri Lanka Standard Time (UTC +5:30)"
            />
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