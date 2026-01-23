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
}

export function SectionNav({ sections, className = '' }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg ${className}`}>
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center gap-1 p-2 overflow-x-auto custom-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground shadow-md'
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground shadow-md'
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

  // Overview - always show if description exists
  if (destination.overview?.description) {
    sections.push({ 
      id: 'overview', 
      label: 'Overview', 
      icon: <Eye className="w-full h-full" /> 
    });
  }

  // What to See - show if highlights exist
  if (destination.whatToSee?.highlights && destination.whatToSee.highlights.length > 0) {
    sections.push({ 
      id: 'what-to-see', 
      label: 'What to See', 
      icon: <Eye className="w-full h-full" /> 
    });
  }

  // Best Time to Visit - show if season or description exists
  if (destination.bestTimeToVisit?.season || destination.bestTimeToVisit?.description) {
    sections.push({ 
      id: 'best-time', 
      label: 'Best Time', 
      icon: <Calendar className="w-full h-full" /> 
    });
  }

  // Things to Do - show if activities exist
  if (destination.thingsToDo?.activities && destination.thingsToDo.activities.length > 0) {
    sections.push({ 
      id: 'things-to-do', 
      label: 'Things to Do', 
      icon: <Mountain className="w-full h-full" /> 
    });
  }

  // Travel Tips - show if tips exist
  if (destination.travelTips?.tips && destination.travelTips.tips.length > 0) {
    sections.push({ 
      id: 'travel-tips', 
      label: 'Travel Tips', 
      icon: <Lightbulb className="w-full h-full" /> 
    });
  }

  // History & Legend - show if description exists
  if (destination.historyAndLegend?.description || 
      destination.historyAndLegend?.historicalFacts || 
      destination.historyAndLegend?.legends) {
    sections.push({ 
      id: 'history', 
      label: 'History & Legend', 
      icon: <ScrollText className="w-full h-full" /> 
    });
  }

  // Nearby Places - always show (component handles empty state)
  sections.push({ 
    id: 'nearby', 
    label: 'Nearby Places', 
    icon: <Hotel className="w-full h-full" /> 
  });

  return sections;
}