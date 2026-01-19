import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { destinationsApi } from '@/services/api';
import { Destination } from '@/types';
import { toast } from 'sonner';

export function useDestinations(params?: { status?: string; category?: string; search?: string }) {
  return useQuery({
    queryKey: ['destinations', params],
    queryFn: async () => {
      const response = await destinationsApi.getAll(params);
      return response.data || [];
    },
  });
}

export function useDestination(id: number) {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      const response = await destinationsApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateDestination() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Destination>) => destinationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
      toast.success('Destination created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create destination');
    },
  });
}

export function useUpdateDestination() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Destination> }) =>
      destinationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
      toast.success('Destination updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update destination');
    },
  });
}

export function useDeleteDestination() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => destinationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
      toast.success('Destination deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete destination');
    },
  });
}