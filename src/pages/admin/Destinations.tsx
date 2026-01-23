import { useState } from 'react';
import { Star } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { DestinationForm } from '@/components/admin/DestinationForm';
import { useData } from '@/contexts/DataContext';
import { Destination } from '@/types';

export function AdminDestinations() {
  const { destinations, addDestination, updateDestination, deleteDestination, toggleDestinationStatus } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

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
      render: (value: string, item: Destination) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{item.overview?.description}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="capitalize px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
          {value}
        </span>
      ),
    },
    {
      key: 'region',
      label: 'Region',
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
    setEditingDestination(null);
    setIsFormOpen(true);
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setIsFormOpen(true);
  };

 const handleSave = async (destination: Partial<Destination>) => {
  try {
    if (editingDestination?.id) {
      // Use the editingDestination.id instead of destination.id
      await updateDestination(editingDestination.id, destination);
    } else {
      await addDestination(destination);
    }
    
    // Close form and reset on success
    setIsFormOpen(false);
    setEditingDestination(null);
  } catch (error) {
    // Error is already handled by DataContext with toast
    console.error('Save error:', error);
  }
};

  return (
    <AdminLayout>
      <div className="p-8">
        <DataTable
          title="Destinations"
          data={destinations}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={deleteDestination}
          onToggleStatus={toggleDestinationStatus}
          searchPlaceholder="Search destinations..."
        />

        <DestinationForm
          destination={editingDestination}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
