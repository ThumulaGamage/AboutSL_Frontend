import { useState } from 'react';
import { Star, DollarSign } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { HotelForm } from '@/components/admin/HotelForm';
import { useData } from '@/contexts/DataContext';
import { Hotel } from '@/types';

export function AdminHotels() {
  const { hotels, addHotel, updateHotel, deleteHotel, toggleHotelStatus } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

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
      render: (value: string, item: Hotel) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{item.quickSummary}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="capitalize px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-md text-sm">
          {value}
        </span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{value}/night</span>
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
    setEditingHotel(null);
    setIsFormOpen(true);
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setIsFormOpen(true);
  };

const handleSave = async (hotel: Partial<Hotel>) => {
  try {
    if (editingHotel?.id) {
      await updateHotel(editingHotel.id, hotel);
    } else {
      await addHotel(hotel);
    }
    setIsFormOpen(false);
    setEditingHotel(null);
  } catch (error) {
    console.error('Save error:', error);
  }
};

  return (
    <AdminLayout>
      <div className="p-8">
        <DataTable
          title="Hotels"
          data={hotels}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={deleteHotel}
          onToggleStatus={toggleHotelStatus}
          searchPlaceholder="Search hotels..."
        />

        <HotelForm
          hotel={editingHotel}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
