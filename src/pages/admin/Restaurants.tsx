import { useState } from 'react';
import { Star, DollarSign } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { RestaurantForm } from '@/components/admin/RestaurantForm';
import { useData } from '@/contexts/DataContext';
import { Restaurant } from '@/types';

export function AdminRestaurants() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, toggleRestaurantStatus } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const columns = [
    {
      key: 'heroImage',
      label: 'Image',
      render: (value: string) => (
        <img src={value} alt="" className="w-16 h-12 object-cover rounded-lg" />
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (value: string, item: Restaurant) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{item.quickSummary}</div>
        </div>
      ),
    },
    {
      key: 'cuisine',
      label: 'Cuisine',
      render: (value: string) => (
        <span className="capitalize px-2 py-1 bg-accent/10 text-accent rounded-md text-sm">
          {value}
        </span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (value: any) => (
        <span className="text-muted-foreground">
          {value?.region || 'N/A'}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Avg. Price',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingRestaurant(null);
    setIsFormOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsFormOpen(true);
  };

  const handleSave = async (restaurant: Partial<Restaurant>) => {
    try {
      if (editingRestaurant?.id) {
        await updateRestaurant(editingRestaurant.id, restaurant);
      } else {
        await addRestaurant(restaurant);
      }
      setIsFormOpen(false);
      setEditingRestaurant(null);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <DataTable
          title="Restaurants"
          data={restaurants}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={deleteRestaurant}
          onToggleStatus={toggleRestaurantStatus}
          searchPlaceholder="Search restaurants..."
        />

        <RestaurantForm
          restaurant={editingRestaurant}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}