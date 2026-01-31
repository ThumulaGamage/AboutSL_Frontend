import { useState } from 'react';
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

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header with Image Only */}
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

          {/* Contact Info */}
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
                <InfoItem
                  icon={<Mail className="w-6 h-6 text-primary" />}
                  title="Email"
                  lines={['hello@aboutsl.com', 'support@aboutsl.com']}
                />

                <InfoItem
                  icon={<Phone className="w-6 h-6 text-primary" />}
                  title="Phone"
                  lines={['+94 11 234 5678', '+94 77 123 4567']}
                />

                <InfoItem
                  icon={<MapPin className="w-6 h-6 text-primary" />}
                  title="Address"
                  lines={['42 Galle Road, Colombo 03', 'Sri Lanka']}
                />

                <InfoItem
                  icon={<MessageCircle className="w-6 h-6 text-primary" />}
                  title="WhatsApp"
                  lines={['+94 77 123 4567']}
                />
              </div>
            </div>

            {/* Social */}
            <div
              className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Follow Us
              </h2>

              <div className="flex gap-4">
                <SocialIcon icon={<Facebook />} />
                <SocialIcon icon={<Instagram />} />
                <SocialIcon icon={<Twitter />} />
              </div>
            </div>

            {/* Business Hours */}
            <div
              className="bg-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Business Hours
              </h2>

              <div className="space-y-3">
                <HourRow day="Monday - Friday" time="9:00 AM - 6:00 PM" />
                <HourRow day="Saturday" time="10:00 AM - 4:00 PM" />
                <HourRow day="Sunday" time="Closed" />
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                * Sri Lanka Standard Time (UTC +5:30)
              </p>
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

function SocialIcon({ icon }: any) {
  return (
    <a
      href="#"
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
