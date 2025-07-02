
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
  // 새로운 상세 정보 추가
  detailedLocation?: {
    building?: string;
    floor?: string;
    entrance?: string;
    landmark?: string;
  };
  operationInfo?: {
    fee?: string;
    hours?: string;
    reservation?: boolean;
    parking?: boolean;
  };
  realTimeInfo?: {
    isOpen: boolean;
    currentCrowd: number;
    weatherSuitability: 'good' | 'fair' | 'poor';
  };
  cluster?: PhotoSpot[];
  instagramTags?: string[];
  userGenerated?: boolean;
  verificationCount?: number;
}

export type SpotCategory = 
  | 'outdoor' 
  | 'indoor' 
  | 'cafe' 
  | 'nature' 
  | 'urban' 
  | 'historical' 
  | 'modern'
  | 'rooftop'
  | 'underground';

export type SpotTheme = 
  | 'couple' 
  | 'solo' 
  | 'friends' 
  | 'content' 
  | 'vintage' 
  | 'minimal' 
  | 'nature' 
  | 'urban'
  | 'pet'
  | 'sunset'
  | 'night';

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
  verified: boolean;
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
  showUserGenerated: boolean;
  operationStatus: 'all' | 'open' | 'closed';
}

export interface SpotRegistration {
  name: string;
  description: string;
  coordinates: UserLocation;
  images: File[];
  themes: SpotTheme[];
  category: SpotCategory;
  tips: string[];
  detailedLocation?: {
    building?: string;
    floor?: string;
    entrance?: string;
    landmark?: string;
  };
  operationInfo?: {
    fee?: string;
    hours?: string;
    reservation?: boolean;
    parking?: boolean;
  };
}
