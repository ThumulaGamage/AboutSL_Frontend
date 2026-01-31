import { useState, useEffect } from 'react';
import { Eye, Mountain, Lightbulb, Calendar, ScrollText, Hotel } from 'lucide-react';
import { Destination } from '@/types';

export interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionNavProps {
  sections: Section[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export function SectionNav({ sections, className = '', layout = 'horizontal' }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = sections[0]?.id || '';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id;
            break;
          } else if (scrollPosition >= sectionTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      setActiveSection(sectionId);
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  if (sections.length === 0) return null;

  // Vertical Layout (Sidebar)
  if (layout === 'vertical') {
    return (
      <div className={`space-y-1 ${className}`}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground shadow-md'

                
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span className="w-5 h-5 flex-shrink-0">{section.icon}</span>
            <span className="flex-1">{section.label}</span>
            {activeSection === section.id && (
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            )}
          </button>
        ))}
      </div>
    );
  }

  // Horizontal Layout (Original)
  return (
    <div className={`bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg ${className}`}>
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center gap-1 p-2 overflow-x-auto custom-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span className="w-4 h-4">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Mobile: Scrollable horizontal pills */}
      <div className="md:hidden flex items-center gap-2 p-2 overflow-x-auto custom-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="w-3.5 h-3.5">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper function to generate sections based on available content
export function generateDestinationSections(destination: Destination): Section[] {
  const sections: Section[] = [];

  if (destination.overview?.description) {
    sections.push({ 
      id: 'overview', 
      label: 'Overview', 
      icon: <Eye className="w-full h-full" /> 
    });
  }

  if (destination.whatToSee?.highlights && destination.whatToSee.highlights.length > 0) {
    sections.push({ 
      id: 'what-to-see', 
      label: 'What to See', 
      icon: <Eye className="w-full h-full" /> 
    });
  }

  if (destination.bestTimeToVisit?.season || destination.bestTimeToVisit?.description) {
    sections.push({ 
      id: 'best-time', 
      label: 'Best Time', 
      icon: <Calendar className="w-full h-full" /> 
    });
  }

  if (destination.thingsToDo?.activities && destination.thingsToDo.activities.length > 0) {
    sections.push({ 
      id: 'things-to-do', 
      label: 'Things to Do', 
      icon: <Mountain className="w-full h-full" /> 
    });
  }

  if (destination.travelTips?.tips && destination.travelTips.tips.length > 0) {
    sections.push({ 
      id: 'travel-tips', 
      label: 'Travel Tips', 
      icon: <Lightbulb className="w-full h-full" /> 
    });
  }

  if (destination.historyAndLegend?.description || 
      destination.historyAndLegend?.historicalFacts || 
      destination.historyAndLegend?.legends) {
    sections.push({ 
      id: 'history', 
      label: 'History & Legend', 
      icon: <ScrollText className="w-full h-full" /> 
    });
  }

  sections.push({ 
    id: 'nearby', 
    label: 'Nearby Places', 
    icon: <Hotel className="w-full h-full" /> 
  });

  return sections;
}