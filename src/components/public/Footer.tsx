import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import logoGif from '@/assets/aboutsl-logo.gif';

interface ContactData {
  email: string[];
  phone: string[];
  address: string[];
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export function Footer() {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('/api/contact-page');
        const data = await response.json();
        if (data.success) {
          setContactData(data.data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img 
                src={logoGif} 
                alt="AboutSL" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted guide to discovering the wonders of Sri Lanka. From ancient temples to pristine beaches, we help you explore the Pearl of the Indian Ocean.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/destinations" className="text-white/70 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="/stay-eat" className="text-white/70 hover:text-white transition-colors">Hotels</a></li>
              <li><a href="/stay-eat" className="text-white/70 hover:text-white transition-colors">Restaurants</a></li>
              <li><a href="/about" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/about" className="text-white/70 hover:text-white transition-colors">Our Story</a></li>
              <li><a href="/about" className="text-white/70 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Contact - FROM API */}
          <div id="contact">
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            
            {contactData ? (
              <ul className="space-y-3">
                {/* Email - Show first email */}
                {contactData.email && contactData.email.length > 0 && (
                  <li className="flex items-center gap-3 text-white/70">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <a 
                      href={`mailto:${contactData.email[0]}`}
                      className="hover:text-white transition-colors"
                    >
                      {contactData.email[0]}
                    </a>
                  </li>
                )}
                
                {/* Phone - Show first phone */}
                {contactData.phone && contactData.phone.length > 0 && (
                  <li className="flex items-center gap-3 text-white/70">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <a 
                      href={`tel:${contactData.phone[0]}`}
                      className="hover:text-white transition-colors"
                    >
                      {contactData.phone[0]}
                    </a>
                  </li>
                )}
                
                {/* WhatsApp */}
                {contactData.whatsapp && (
                  <li className="flex items-center gap-3 text-white/70">
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                    <a 
                      href={`https://wa.me/${contactData.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {contactData.whatsapp}
                    </a>
                  </li>
                )}
                
                {/* Address - Show first line */}
                {contactData.address && contactData.address.length > 0 && (
                  <li className="flex items-start gap-3 text-white/70">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{contactData.address[0]}</span>
                  </li>
                )}
              </ul>
            ) : (
              // Fallback while loading
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5" />
                  <span>hello@aboutsl.com</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5" />
                  <span>+94 11 234 5678</span>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span>Colombo, Sri Lanka</span>
                </li>
              </ul>
            )}

            {/* Social Links - FROM API */}
            <div className="flex gap-3 mt-6">
              {contactData?.facebook && (
                <a 
                  href={contactData.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contactData?.instagram && (
                <a 
                  href={contactData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contactData?.twitter && (
                <a 
                  href={contactData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70">
            © {new Date().getFullYear()} AboutSL. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}