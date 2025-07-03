
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
  // 혼잡도를 대기 시간으로 변경
  averageWaitTime: number; // 평균 대기 시간 (분)
  waitTimeLevel: 'short' | 'medium' | 'long'; // 대기 시간 레벨
  bestTime: string[];
  amenities: string[];
  tags: string[];
  tips: string[];
  // 상세 정보
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
    // 외부 링크 정보 추가
    officialWebsite?: string;
    ticketUrl?: string;
    reservationUrl?: string;
  };
  realTimeInfo?: {
    isOpen: boolean;
    currentWaitTime: number; // 현재 예상 대기 시간
    weatherSuitability: 'good' | 'fair' | 'poor';
  };
  cluster?: PhotoSpot[];
  instagramTags?: string[];
  userGenerated?: boolean;
  verificationCount?: number;
  userPhotos?: {
    image: string;
    username: string;
    instagramUrl: string;
    profileImage?: string; // 인스타그램 프로필 이미지
    followerCount?: number; // 팔로워 수
    capturedTime?: string; // 촬영 시간대
    location?: string; // 촬영 위치
  }[];
  // 지역 정보 추가
  region: string;
  subRegion?: string;
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

export const categoryLabels: Record<SpotCategory, string> = {
  outdoor: '야외',
  indoor: '실내',
  cafe: '카페',
  nature: '자연',
  urban: '도시',
  historical: '역사',
  modern: '현대',
  rooftop: '루프탑',
  underground: '지하'
};

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
  waitTime: string[]; // 혼잡도 대신 대기 시간
  rating: number;
  sortBy: 'distance' | 'rating' | 'popularity' | 'waitTime';
  showUserGenerated: boolean;
  operationStatus: 'all' | 'open' | 'closed';
  region?: string; // 지역 필터 추가
}

export interface SpotRegistration {
  name: string;
  description: string;
  coordinates: UserLocation;
  images: File[];
  themes: SpotTheme[];
  category: SpotCategory;
  tips: string[];
  region: string; // 지역 정보 추가
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
    officialWebsite?: string;
    ticketUrl?: string;
    reservationUrl?: string;
  };
}

// 지역 데이터
export interface Region {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  subRegions?: string[];
}

export const popularRegions: Region[] = [
  {
    id: 'seoul',
    name: '서울',
    nameEn: 'Seoul',
    country: '한국',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    subRegions: ['강남구', '홍대', '명동', '북촌', '이태원', '성수동']
  },
  {
    id: 'busan',
    name: '부산',
    nameEn: 'Busan',
    country: '한국',
    coordinates: { lat: 35.1796, lng: 129.0756 },
    subRegions: ['해운대', '광안리', '감천문화마을', '태종대']
  },
  {
    id: 'jeju',
    name: '제주',
    nameEn: 'Jeju',
    country: '한국',
    coordinates: { lat: 33.4996, lng: 126.5312 },
    subRegions: ['제주시', '서귀포시', '한라산', '성산일출봉']
  },
  {
    id: 'tokyo',
    name: '도쿄',
    nameEn: 'Tokyo',
    country: '일본',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    subRegions: ['시부야', '하라주쿠', '신주쿠', '아사쿠사', '오모테산도']
  }
];
