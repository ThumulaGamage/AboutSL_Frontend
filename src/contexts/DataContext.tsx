import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { destinationsApi, hotelsApi, restaurantsApi } from '@/services/api';
import { Destination, Hotel, Restaurant } from '@/types';
import { toast } from 'sonner';

interface DataContextType {
  destinations: Destination[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  loading: boolean;
  refreshDestinations: () => Promise<void>;
  refreshHotels: () => Promise<void>;
  refreshRestaurants: () => Promise<void>;
  addDestination: (destination: Partial<Destination>) => Promise<void>;
  updateDestination: (id: number, destination: Partial<Destination>) => Promise<void>;
  deleteDestination: (id: number) => Promise<void>;
  toggleDestinationStatus: (id: number) => Promise<void>;
  addHotel: (hotel: Partial<Hotel>) => Promise<void>;
  updateHotel: (id: number, hotel: Partial<Hotel>) => Promise<void>;
  deleteHotel: (id: number) => Promise<void>;
  toggleHotelStatus: (id: number) => Promise<void>;
  addRestaurant: (restaurant: Partial<Restaurant>) => Promise<void>;
  updateRestaurant: (id: number, restaurant: Partial<Restaurant>) => Promise<void>;
  deleteRestaurant: (id: number) => Promise<void>;
  toggleRestaurantStatus: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          refreshDestinations(),
          refreshHotels(),
          refreshRestaurants(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Refresh functions
  const refreshDestinations = async () => {
    try {
      const response = await destinationsApi.getAll();
      if (response.success && response.data) {
        setDestinations(response.data);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    }
  };

  const refreshHotels = async () => {
    try {
      const response = await hotelsApi.getAll();
      console.log('🔄 Refreshed hotels response:', response);
      console.log('🔄 Refreshed hotels data:', response.data);
      if (response.data && response.data.length > 0) {
        console.log('📸 First hotel photoGallery:', response.data[0].photoGallery);
        console.log('🛎️ First hotel amenities:', response.data[0].amenities);
        console.log('📸 PhotoGallery type:', typeof response.data[0].photoGallery);
        console.log('📸 Is Array:', Array.isArray(response.data[0].photoGallery));
      }
      if (response.success && response.data) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to load hotels');
    }
  };

  const refreshRestaurants = async () => {
    try {
      const response = await restaurantsApi.getAll();
      if (response.success && response.data) {
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Failed to load restaurants');
    }
  };

  // Destination CRUD
  const addDestination = async (destination: Partial<Destination>) => {
    try {
      const response = await destinationsApi.create(destination);
      if (response.success) {
        toast.success('Destination created successfully!');
        await refreshDestinations();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create destination');
      throw error;
    }
  };

  const updateDestination = async (id: number, updates: Partial<Destination>) => {
    try {
      const response = await destinationsApi.update(id, updates);
      if (response.success) {
        toast.success('Destination updated successfully!');
        await refreshDestinations();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update destination');
      throw error;
    }
  };

  const deleteDestination = async (id: number) => {
    try {
      const response = await destinationsApi.delete(id);
      if (response.success) {
        toast.success('Destination deleted successfully!');
        await refreshDestinations();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete destination');
      throw error;
    }
  };

  const toggleDestinationStatus = async (id: number) => {
    try {
      const response = await destinationsApi.toggleStatus(id);
      if (response.success) {
        toast.success('Destination status updated!');
        await refreshDestinations();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
      throw error;
    }
  };

  // Hotel CRUD
  const addHotel = async (hotel: Partial<Hotel>) => {
    try {
      console.log('📤 Creating hotel with data:', hotel);
      const response = await hotelsApi.create(hotel);
      console.log('📥 Response from server:', response);
      console.log('📥 Response data.photoGallery:', response.data?.photoGallery);
      console.log('📥 Response data.amenities:', response.data?.amenities);
      
      if (response.success) {
        toast.success('Hotel created successfully!');
        await refreshHotels();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create hotel');
      throw error;
    }
  };

  const updateHotel = async (id: number, updates: Partial<Hotel>) => {
    try {
      const response = await hotelsApi.update(id, updates);
      if (response.success) {
        toast.success('Hotel updated successfully!');
        await refreshHotels();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update hotel');
      throw error;
    }
  };

  const deleteHotel = async (id: number) => {
    try {
      const response = await hotelsApi.delete(id);
      if (response.success) {
        toast.success('Hotel deleted successfully!');
        await refreshHotels();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete hotel');
      throw error;
    }
  };

  const toggleHotelStatus = async (id: number) => {
    try {
      const response = await hotelsApi.toggleStatus(id);
      if (response.success) {
        toast.success('Hotel status updated!');
        await refreshHotels();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
      throw error;
    }
  };

  // Restaurant CRUD
  const addRestaurant = async (restaurant: Partial<Restaurant>) => {
    try {
      const response = await restaurantsApi.create(restaurant);
      if (response.success) {
        toast.success('Restaurant created successfully!');
        await refreshRestaurants();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create restaurant');
      throw error;
    }
  };

  const updateRestaurant = async (id: number, updates: Partial<Restaurant>) => {
    try {
      const response = await restaurantsApi.update(id, updates);
      if (response.success) {
        toast.success('Restaurant updated successfully!');
        await refreshRestaurants();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update restaurant');
      throw error;
    }
  };

  const deleteRestaurant = async (id: number) => {
    try {
      const response = await restaurantsApi.delete(id);
      if (response.success) {
        toast.success('Restaurant deleted successfully!');
        await refreshRestaurants();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete restaurant');
      throw error;
    }
  };

  const toggleRestaurantStatus = async (id: number) => {
    try {
      const response = await restaurantsApi.toggleStatus(id);
      if (response.success) {
        toast.success('Restaurant status updated!');
        await refreshRestaurants();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      destinations,
      hotels,
      restaurants,
      loading,
      refreshDestinations,
      refreshHotels,
      refreshRestaurants,
      addDestination,
      updateDestination,
      deleteDestination,
      toggleDestinationStatus,
      addHotel,
      updateHotel,
      deleteHotel,
      toggleHotelStatus,
      addRestaurant,
      updateRestaurant,
      deleteRestaurant,
      toggleRestaurantStatus,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}