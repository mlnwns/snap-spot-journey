
export interface PhotoSpot {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: SpotCategory;
  themes: SpotTheme[];
  rating: number;
  reviewCount: number;
  images: string[];
  distance?: number;
  crowdLevel: 'low' | 'medium' | 'high';
  bestTime: string[];
  amenities: string[];
  tags: string[];
  tips: string[];
}

export type SpotCategory = 
  | 'outdoor' 
  | 'indoor' 
  | 'cafe' 
  | 'nature' 
  | 'urban' 
  | 'historical' 
  | 'modern';

export type SpotTheme = 
  | 'couple' 
  | 'solo' 
  | 'friends' 
  | 'content' 
  | 'vintage' 
  | 'minimal' 
  | 'nature' 
  | 'urban'
  | 'pet';

export interface Review {
  id: string;
  spotId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Date;
  helpful: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface FilterOptions {
  themes: SpotTheme[];
  categories: SpotCategory[];
  distance: number;
  crowdLevel: string[];
  rating: number;
  sortBy: 'distance' | 'rating' | 'popularity';
}
