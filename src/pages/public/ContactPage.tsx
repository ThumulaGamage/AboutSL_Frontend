import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import contactHeader from '@/assets/contact.png';

interface ContactPageData {
  email: string[];
  phone: string[];
  address: string[];
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
  businessHours: Array<{ day: string; time: string }>;
  timezone: string;
}

export function ContactPage() {
  const [contactData, setContactData] = useState<ContactPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactPage = async () => {
      try {
        const response = await fetch('/api/contact-page');
        const data = await response.json();
        if (data.success) {
          setContactData(data.data);
        }
      } catch (error) {
        console.error('Error fetching contact page:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactPage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Failed to load contact page</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header with Image Only - Hardcoded */}
      <div className="relative overflow-hidden h-[300px] md:h-[500px]">
        <img
          src={contactHeader}
          alt="Contact AboutSL"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: 'forwards' }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your questions or plans..."
                  required
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-bold uppercase tracking-wider"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info - From API */}
          <div className="space-y-8">
            {/* Details */}
            <div
              className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {contactData.email && contactData.email.length > 0 && (
                  <InfoItem
                    icon={<Mail className="w-6 h-6 text-primary" />}
                    title="Email"
                    lines={contactData.email}
                  />
                )}

                {contactData.phone && contactData.phone.length > 0 && (
                  <InfoItem
                    icon={<Phone className="w-6 h-6 text-primary" />}
                    title="Phone"
                    lines={contactData.phone}
                  />
                )}

                {contactData.address && contactData.address.length > 0 && (
                  <InfoItem
                    icon={<MapPin className="w-6 h-6 text-primary" />}
                    title="Address"
                    lines={contactData.address}
                  />
                )}

                {contactData.whatsapp && (
                  <InfoItem
                    icon={<MessageCircle className="w-6 h-6 text-primary" />}
                    title="WhatsApp"
                    lines={[contactData.whatsapp]}
                  />
                )}
              </div>
            </div>

            {/* Social - From API */}
            <div
              className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Follow Us
              </h2>

              <div className="flex gap-4">
                {contactData.facebook && (
                  <SocialIcon icon={<Facebook />} href={contactData.facebook} />
                )}
                {contactData.instagram && (
                  <SocialIcon icon={<Instagram />} href={contactData.instagram} />
                )}
                {contactData.twitter && (
                  <SocialIcon icon={<Twitter />} href={contactData.twitter} />
                )}
              </div>
            </div>

            {/* Business Hours - From API */}
            <div
              className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Business Hours
              </h2>

              <div className="space-y-3">
                {contactData.businessHours.map((hour, index) => (
                  <HourRow key={index} day={hour.day} time={hour.time} />
                ))}
              </div>

              {contactData.timezone && (
                <p className="text-sm text-muted-foreground mt-4">
                  * {contactData.timezone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */

function InfoItem({ icon, title, lines }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        {lines.map((line: string, i: number) => (
          <p key={i} className="text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }: any) {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {icon}
    </a>
  );
}

function HourRow({ day, time }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{day}</span>
      <span className="font-medium">{time}</span>
    </div>
  );
}