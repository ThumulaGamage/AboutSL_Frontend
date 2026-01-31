import { Compass, Users, Award, Heart, Globe, Camera, Shield, Sparkles } from 'lucide-react';
import { stats } from '@/data/sampleData';

const teamMembers = [
  {
    name: 'ABC',
    role: 'Founder & CEO',
    image: 'data:image/jpeg;base64,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',
    bio: 'Travel enthusiast with 15+ years exploring Sri Lanka'
  },
  {
    name: 'B',
    role: 'Content Director',
    image: 'data:image/jpeg;base64,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',
    bio: 'Storyteller passionate about Sri Lankan culture'
  },
  {
    name: 'C',
    role: 'Head of Partnerships',
    image: 'data:image/jpeg;base64,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',
    bio: 'Building connections with tourism partners island-wide'
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
      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586613835259-8fd2b8d851c5?w=1920)' }}
      >
        <div className="absolute inset-0 hero-gradient opacity-85" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            About <span className="text-secondary">AboutSL</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Your trusted guide to exploring the Pearl of the Indian Ocean
          </p>
        </div>
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
