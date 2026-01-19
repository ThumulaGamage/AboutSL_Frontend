import { Compass, Users, Award, Heart, Globe, Camera, TreePalm, Waves } from 'lucide-react';
import { stats } from '@/data/sampleData';

const features = [
  {
    icon: Compass,
    title: 'Expert Guides',
    description: 'Curated recommendations from local travel experts who know Sri Lanka inside out.',
    color: 'primary'
  },
  {
    icon: Users,
    title: 'Community Reviews',
    description: 'Real experiences from thousands of travelers to help you plan better.',
    color: 'secondary'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Every destination, hotel, and restaurant is verified for quality and authenticity.',
    color: 'accent'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Passionate about showcasing the beauty and culture of Sri Lanka to the world.',
    color: 'primary'
  }
];

const highlights = [
  { icon: Globe, label: 'UNESCO Sites', value: '8' },
  { icon: TreePalm, label: 'National Parks', value: '26' },
  { icon: Waves, label: 'Beaches', value: '1,340km' },
  { icon: Camera, label: 'Photo Spots', value: '500+' },
];

export function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="relative group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative p-6 rounded-2xl bg-card border border-border/50 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg overflow-hidden">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            About Us
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Your Gateway to the
            <span className="block text-gradient mt-2">Pearl of the Indian Ocean</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            AboutSL is your comprehensive guide to exploring Sri Lanka - a land where ancient history meets 
            natural beauty. We're dedicated to helping travelers discover the island's rich heritage, 
            stunning landscapes, diverse wildlife, and warm hospitality.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            From ancient UNESCO World Heritage sites to pristine tropical beaches, from misty mountain 
            tea plantations to thrilling wildlife safaris, Sri Lanka offers an incredible diversity of 
            experiences in a compact island setting.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {highlights.map((item, index) => (
            <div 
              key={item.label}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${(index + 4) * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-${feature.color}`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
