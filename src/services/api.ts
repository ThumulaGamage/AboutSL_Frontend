import { 
  ApiResponse, 
  Admin, 
  LoginCredentials, 
  RegisterData,
  Destination,
  Hotel,
  Restaurant,
  ImageUploadResponse
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Token management
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('authToken');
  }
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = tokenManager.getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ==========================================
// AUTH API
// ==========================================

export const authApi = {
  register: async (data: RegisterData): Promise<ApiResponse<Admin>> => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
 login: async (credentials: LoginCredentials): Promise<ApiResponse<Admin>> => {
  const response = await apiRequest<Admin>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  console.log('Login API Response:', response);
  
  // Store token
  if (response.success && response.token) {
    console.log('✅ Storing token');
    tokenManager.setToken(response.token);
  }
  
  // ✅ FIX: Backend returns 'admin' instead of 'data'
  // Move admin to data field
  if ((response as any).admin && !response.data) {
    response.data = (response as any).admin;
  }
  
  return response;
},
  
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiRequest<null>('/auth/logout', {
      method: 'POST',
    });
    tokenManager.removeToken();
    return response;
  },
  
  getMe: async (): Promise<ApiResponse<Admin>> => {
    return apiRequest('/auth/me');
  },
};

// ==========================================
// DESTINATIONS API
// ==========================================

export const destinationsApi = {
  getAll: async (params?: {
    status?: string;
    category?: string;
    search?: string;
  }): Promise<ApiResponse<Destination[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiRequest(`/destinations${query ? `?${query}` : ''}`);
  },
  
  getById: async (id: number): Promise<ApiResponse<Destination>> => {
    return apiRequest(`/destinations/${id}`);
  },
  
  create: async (data: Partial<Destination>): Promise<ApiResponse<Destination>> => {
    return apiRequest('/destinations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: Partial<Destination>): Promise<ApiResponse<Destination>> => {
    return apiRequest(`/destinations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiRequest(`/destinations/${id}`, {
      method: 'DELETE',
    });
  },
  
  toggleStatus: async (id: number): Promise<ApiResponse<Destination>> => {
    return apiRequest(`/destinations/${id}/status`, {
      method: 'PATCH',
    });
  },
};

// ==========================================
// HOTELS API
// ==========================================

export const hotelsApi = {
  getAll: async (params?: {
    status?: string;
    category?: string;
    search?: string;
  }): Promise<ApiResponse<Hotel[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiRequest(`/hotels${query ? `?${query}` : ''}`);
  },
  
  getById: async (id: number): Promise<ApiResponse<Hotel>> => {
    return apiRequest(`/hotels/${id}`);
  },
  
  create: async (data: Partial<Hotel>): Promise<ApiResponse<Hotel>> => {
    return apiRequest('/hotels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: Partial<Hotel>): Promise<ApiResponse<Hotel>> => {
    return apiRequest(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiRequest(`/hotels/${id}`, {
      method: 'DELETE',
    });
  },
  
  toggleStatus: async (id: number): Promise<ApiResponse<Hotel>> => {
    return apiRequest(`/hotels/${id}/status`, {
      method: 'PATCH',
    });
  },
};

// ==========================================
// RESTAURANTS API
// ==========================================

export const restaurantsApi = {
  getAll: async (params?: {
    status?: string;
    cuisine?: string;
    search?: string;
  }): Promise<ApiResponse<Restaurant[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.cuisine) queryParams.append('cuisine', params.cuisine);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiRequest(`/restaurants${query ? `?${query}` : ''}`);
  },
  
  getById: async (id: number): Promise<ApiResponse<Restaurant>> => {
    return apiRequest(`/restaurants/${id}`);
  },
  
  create: async (data: Partial<Restaurant>): Promise<ApiResponse<Restaurant>> => {
    return apiRequest('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: Partial<Restaurant>): Promise<ApiResponse<Restaurant>> => {
    return apiRequest(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiRequest(`/restaurants/${id}`, {
      method: 'DELETE',
    });
  },
  
  toggleStatus: async (id: number): Promise<ApiResponse<Restaurant>> => {
    return apiRequest(`/restaurants/${id}/status`, {
      method: 'PATCH',
    });
  },
};

// ==========================================
// UPLOAD API
// ==========================================

export const uploadApi = {
  uploadImage: async (file: File): Promise<ImageUploadResponse> => {
    const token = tokenManager.getToken();
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Image upload failed');
    }
    
    return response.json();
  },
  
  uploadMultipleImages: async (files: File[]): Promise<{ images: ImageUploadResponse[] }> => {
    const token = tokenManager.getToken();
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await fetch(`${API_URL}/upload/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Images upload failed');
    }
    
    return response.json();
  },
  
  deleteImage: async (publicId: string): Promise<ApiResponse<null>> => {
    return apiRequest(`/upload/${publicId}`, {
      method: 'DELETE',
    });
  },
};