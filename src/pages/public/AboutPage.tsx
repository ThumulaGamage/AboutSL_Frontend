import { Compass, Users, Award, Heart, Globe, Camera, Shield, Sparkles } from 'lucide-react';
import { stats } from '@/data/sampleData';
import aboutHeader from '@/assets/About.png';

const teamMembers = [
  {
    name: 'ABC',
    role: 'Founder & CEO',
    image: '',
    bio: 'Travel enthusiast with 15+ years exploring Sri Lanka'
  },
  {
    name: 'B',
    role: 'Content Director',
    image: '',
  },
  {
    name: 'C',
    role: 'Head of Partnerships',
    image: '',
  }
];

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love Sri Lanka and want to share its beauty with the world'
  },
  {
    icon: Shield,
    title: 'Trust',
    description: 'All recommendations are verified and quality-assured'
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Promoting responsible and eco-friendly tourism'
  },
  {
    icon: Sparkles,
    title: 'Excellence',
    description: 'Curating only the best experiences for travelers'
  }
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header with Image Only */}
      <div className="relative overflow-hidden h-[300px] md:h-[500px]">
        <img
          src={aboutHeader}
          alt="About AboutSL"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 bg-card rounded-xl border border-border shadow-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                AboutSL was born from a simple passion: to share the incredible beauty, rich culture, 
                and warm hospitality of Sri Lanka with travelers from around the world. What started as 
                a personal travel blog has grown into a comprehensive tourism platform trusted by thousands 
                of visitors every year.
              </p>
              <p className="mb-6">
                Sri Lanka, often called the "Pearl of the Indian Ocean," packs an incredible diversity 
                of experiences into a compact island. From the ancient rock fortress of Sigiriya to the 
                misty tea plantations of Nuwara Eliya, from thrilling wildlife safaris in Yala to the 
                colonial charm of Galle Fort – there's something magical waiting around every corner.
              </p>
              <p>
                Our mission is to make it easy for travelers to discover these hidden treasures. We 
                carefully curate every destination, hotel, and restaurant on our platform, ensuring 
                you get authentic, high-quality experiences that showcase the best of Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="p-6 bg-card rounded-xl border border-border text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate locals dedicated to showcasing the best of Sri Lanka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <div className="text-primary font-medium text-sm mb-2">{member.role}</div>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AboutSL?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card rounded-xl border border-border opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
              <Compass className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Expert Guides</h3>
              <p className="text-muted-foreground text-sm">Curated by locals who know every hidden gem</p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Real Reviews</h3>
              <p className="text-muted-foreground text-sm">Authentic experiences from real travelers</p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground text-sm">Every listing verified for quality</p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <Camera className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Stunning Visuals</h3>
              <p className="text-muted-foreground text-sm">Professional photography of every location</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}