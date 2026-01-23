import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import logoGif from '@/assets/aboutsl-logo.gif';

export function Footer() {
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
            <p className="bg-black text-white text-sm leading-relaxed">
              Your trusted guide to discovering the wonders of Sri Lanka. From ancient temples to pristine beaches, we help you explore the Pearl of the Indian Ocean.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Destinations</a></li>
              <li><a href="#" className="bg-black text-whitehover:text-primary-foreground transition-colors">Hotels</a></li>
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Restaurants</a></li>
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Interactive Map</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Travel Tips</a></li>
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Best Times to Visit</a></li>
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="bg-black text-white hover:text-primary-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 bg-black text-white">
                <Mail className="w-5 h-5" />
                <span>hello@aboutsl.com</span>
              </li>
              <li className="flex items-center gap-3 bg-black text-white">
                <Phone className="w-5 h-5" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-start gap-3 bg-black text-white">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="bg-black text-white">
            © 2024 AboutSL. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}