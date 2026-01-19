import { MapPin, Hotel, UtensilsCrossed, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { useData } from '@/contexts/DataContext';

export function AdminDashboard() {
  const { destinations, hotels, restaurants } = useData();

  const activeDestinations = destinations.filter(d => d.status === 'active').length;
  const activeHotels = hotels.filter(h => h.status === 'active').length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Destinations"
            value={destinations.length}
            icon={<MapPin className="w-6 h-6" />}
            subtitle={`${activeDestinations} active, ${destinations.length - activeDestinations} inactive`}
            color="primary"
          />
          <StatsCard
            title="Hotels"
            value={hotels.length}
            icon={<Hotel className="w-6 h-6" />}
            subtitle={`${activeHotels} active, ${hotels.length - activeHotels} inactive`}
            color="secondary"
          />
          <StatsCard
            title="Restaurants"
            value={restaurants.length}
            icon={<UtensilsCrossed className="w-6 h-6" />}
            subtitle={`${activeRestaurants} active, ${restaurants.length - activeRestaurants} inactive`}
            color="accent"
          />
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Content */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-green-500" />
              <h2 className="font-semibold text-foreground">Active Content</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Visible Destinations</span>
                <span className="font-semibold text-foreground">{activeDestinations}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Visible Hotels</span>
                <span className="font-semibold text-foreground">{activeHotels}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Visible Restaurants</span>
                <span className="font-semibold text-foreground">{activeRestaurants}</span>
              </div>
            </div>
          </div>

          {/* Inactive Content */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <EyeOff className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Hidden Content</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Hidden Destinations</span>
                <span className="font-semibold text-foreground">{destinations.length - activeDestinations}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Hidden Hotels</span>
                <span className="font-semibold text-foreground">{hotels.length - activeHotels}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Hidden Restaurants</span>
                <span className="font-semibold text-foreground">{restaurants.length - activeRestaurants}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <p className="text-muted-foreground text-sm">
            Use the sidebar navigation to manage your destinations, hotels, and restaurants. 
            Click on any item's status badge to toggle visibility, or use the edit button to update content.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
