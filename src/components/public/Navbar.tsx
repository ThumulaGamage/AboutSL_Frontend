import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MapPin, Hotel, Info, Mail, Map } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import logoGif from '@/assets/aboutsl-logo.gif';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/destinations', label: 'Destinations', icon: MapPin },
  { path: '/stay-eat', label: 'Stay & Eat', icon: Hotel },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const showTransparent = isHomePage && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      showTransparent 
        ? 'bg-transparent' 
        : 'bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoGif} 
              alt="AboutSL" 
              className={`h-12 w-auto transition-all duration-300 ${
                showTransparent ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? showTransparent
                        ? 'text-white bg-white/20'
                        : 'text-primary bg-primary/10'
                      : showTransparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      showTransparent ? 'bg-secondary' : 'bg-primary'
                    }`} />
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <div className="ml-2 pl-2 border-l border-border/50">
              <ThemeToggle showTransparent={showTransparent} />
            </div>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle showTransparent={showTransparent} />
            <button
              className={`p-2.5 rounded-lg transition-colors ${
                showTransparent 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-foreground hover:bg-muted'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className={`pt-2 border-t ${showTransparent ? 'border-white/20' : 'border-border'}`}>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? showTransparent
                          ? 'bg-white/20 text-white'
                          : 'bg-primary/10 text-primary'
                        : showTransparent
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}