// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  token?: string;
}

// Admin/Auth types
export interface Admin {
  id: number;
  email: string;
  name: string;
  role: 'super-admin' | 'admin' | 'moderator';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Destination types
export interface Destination {
  id: number;
  name: string;
  slug: string;
  region: string;
  category: 'beach' | 'nature' | 'cultural' | 'wildlife';
  heroImage: string;
  heroImagePublicId?: string;
  
  overview: {
    description: string;
    images: string[];
  };
  
  whatToSee: {
    description: string;
    highlights: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    images: string[];
  };
  
  bestTimeToVisit: {
    description: string;
    season: string;
    months: string;
    weatherInfo: string;
    images: string[];
  };
  
  thingsToDo: {
    description: string;
    activities: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    images: string[];
  };
  
  travelTips: {
    description: string;
    tips: string[];
    images: string[];
  };
  
  historyAndLegend: {
    description: string;
    historicalFacts: string;
    legends: string;
    images: string[];
  };
  
  location: {
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
    nearbyCity: string;
    region: string;
  };
  
  metaDescription?: string;
  keywords?: string[];
  status: 'active' | 'inactive' | 'draft';
  publishedDate?: string;
  completeness: number;
  createdAt: string;
  updatedAt: string;
  
  // Auto-populated
  nearbyHotels?: Hotel[];
  nearbyRestaurants?: Restaurant[];
}

// Hotel types
export interface Hotel {
  id: number;
  name: string;
  slug: string;
  category: 'luxury' | 'mid-range' | 'budget';
  price: number;
  currency: string;
  heroImage: string;
  heroImagePublicId?: string;
  photoGallery?: Array<{
    url: string;
    caption: string;
    order: number;
    publicId?: string;
  }>;
  quickSummary?: string;
  fullDescription: string;
  amenities?: Array<{
    name: string;
    icon: string;
  }>;
  location: {
    region: string;
    address: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
  };
  contact?: {
    phone: string;
    email: string;
    website?: string;
  };
  nearbyDestinations?: Array<{
    destinationId: number;
    destinationName: string;
    distance: number;
    unit: string;
  }>;
  nearbyDestinationsDetails?: Array<{
    destinationId: number;
    destinationName: string;
    distance: number;
    unit: string;
    destination: Destination;
  }>;
  metaDescription?: string;
  keywords?: string[];
  status: 'active' | 'inactive' | 'draft';
  publishedDate?: string;
  completeness: number;
  createdAt: string;
  updatedAt: string;
}

// Restaurant types
export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  cuisine: string;
  price: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  heroImage: string;
  heroImagePublicId?: string;
  photoGallery?: Array<{
    url: string;
    caption: string;
    order: number;
    publicId?: string;
  }>;
  quickSummary?: string;
  fullDescription: string;
  specialty: string;
  menuHighlights?: Array<{
    name: string;
    description: string;
    price: number;
    image?: string;
  }>;
  location: {
    region: string;
    address: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
  };
  hours?: {
    [key: string]: string;
  };
  contact?: {
    phone: string;
    email: string;
  };
  metaDescription?: string;
  keywords?: string[];
  status: 'active' | 'inactive' | 'draft';
  publishedDate?: string;
  completeness: number;
  createdAt: string;
  updatedAt: string;
}

// Image upload types
export interface ImageUploadResponse {
  success: boolean;
  url: string;
  publicId: string;
}