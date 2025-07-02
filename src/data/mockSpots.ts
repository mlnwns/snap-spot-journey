
import { PhotoSpot } from '@/types';

export const mockPhotoSpots: PhotoSpot[] = [
  {
    id: '1',
    name: '북촌한옥마을 감성 골목',
    description: '전통 한옥과 현대가 어우러진 서울의 대표 포토스팟. 골목길 곳곳이 인스타그램 감성 넘치는 사진 배경이 됩니다.',
    address: '서울특별시 종로구 계동길 37',
    coordinates: {
      lat: 37.5814,
      lng: 126.9830
    },
    category: 'historical',
    themes: ['couple', 'vintage', 'content'],
    rating: 4.7,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['오전 9-11시', '오후 5-7시'],
    amenities: ['카페', '화장실', '주차장'],
    tags: ['한옥', '전통', '골목길'],
    tips: ['오전 일찍 가면 사람이 적어요', '한복 대여점이 근처에 많아요'],
    detailedLocation: {
      building: '북촌문화센터',
      floor: '1층 입구',
      entrance: '정문',
      landmark: '삼청동 입구에서 도보 5분'
    },
    operationInfo: {
      fee: '무료',
      hours: '24시간',
      reservation: false,
      parking: true
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 7,
      weatherSuitability: 'good'
    },
    instagramTags: ['#북촌한옥마을', '#한옥스타그램', '#서울여행', '#감성사진', '#포토필터'],
    userGenerated: false,
    verificationCount: 127,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
        username: 'seoulphoto',
        instagramUrl: 'https://instagram.com/seoulphoto'
      },
      {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
        username: 'hanok_lover',
        instagramUrl: 'https://instagram.com/hanok_lover'
      }
    ],
    cluster: [
      {
        id: '1-1',
        name: '북촌 8경 포인트',
        description: '북촌의 대표 뷰포인트에서 한옥 지붕들을 한눈에 볼 수 있는 명소',
        address: '서울특별시 종로구 계동길 31',
        coordinates: { lat: 37.5818, lng: 126.9835 },
        category: 'historical',
        themes: ['couple', 'content'],
        rating: 4.8,
        reviewCount: 234,
        images: ['https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400'],
        crowdLevel: 'medium',
        bestTime: ['오전 10-12시'],
        amenities: ['벤치'],
        tags: ['전망', '한옥'],
        tips: ['일출 시간이 가장 예뻐요']
      } as PhotoSpot,
      {
        id: '1-2',
        name: '북촌 계단길',
        description: '경사진 계단길에서 찍는 역동적인 사진이 인상적인 포토존',
        address: '서울특별시 종로구 계동길 45',
        coordinates: { lat: 37.5816, lng: 126.9828 },
        category: 'historical',
        themes: ['solo', 'friends'],
        rating: 4.5,
        reviewCount: 156,
        images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
        crowdLevel: 'low',
        bestTime: ['오후 2-4시'],
        amenities: [],
        tags: ['계단', '한옥'],
        tips: ['계단 중간에서 찍으면 더 멋져요']
      } as PhotoSpot
    ]
  },
  {
    id: '2',
    name: '이화여대 벽화마을',
    description: '알록달록한 벽화와 계단이 어우러진 감성 포토존. 드라마 촬영지로도 유명한 아기자기한 마을입니다.',
    address: '서울특별시 종로구 이화동1가 70-14',
    coordinates: {
      lat: 37.5803,
      lng: 126.9847
    },
    category: 'urban',
    themes: ['friends', 'content', 'vintage'],
    rating: 4.5,
    reviewCount: 673,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400'
    ],
    crowdLevel: 'medium',
    bestTime: ['오후 2-5시', '저녁 6-8시'],
    amenities: ['카페', '화장실'],
    tags: ['벽화', '계단', '마을'],
    tips: ['계단이 많으니 편한 신발 추천', '저녁에 가면 조명이 예뻐요'],
    detailedLocation: {
      landmark: '이화여대 정문에서 도보 10분',
      entrance: '계단 입구'
    },
    operationInfo: {
      fee: '무료',
      hours: '일출-일몰',
      reservation: false,
      parking: false
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 5,
      weatherSuitability: 'good'
    },
    instagramTags: ['#이화벽화마을', '#벽화스타그램', '#계단사진', '#드라마촬영지', '#포토필터'],
    userGenerated: false,
    verificationCount: 89,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300',
        username: 'ewha_pic',
        instagramUrl: 'https://instagram.com/ewha_pic'
      }
    ]
  },
  {
    id: '3',
    name: '서울숲 메타세쿼이아길',
    description: '높은 메타세쿼이아 나무들이 만드는 초록 터널. 자연광이 아름답게 스며드는 힐링 포토스팟입니다.',
    address: '서울특별시 성동구 뚝섬로 273 서울숲공원',
    coordinates: {
      lat: 37.5445,
      lng: 127.0374
    },
    category: 'nature',
    themes: ['solo', 'couple', 'nature'],
    rating: 4.8,
    reviewCount: 1204,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
    ],
    crowdLevel: 'low',
    bestTime: ['오전 10-12시', '오후 4-6시'],
    amenities: ['화장실', '매점', '쉼터'],
    tags: ['숲', '나무', '산책'],
    tips: ['봄, 가을이 가장 예뻐요', '강아지 산책하는 분들이 많아요'],
    detailedLocation: {
      entrance: '서울숲 정문',
      landmark: '메타세쿼이아 숲길 입구'
    },
    operationInfo: {
      fee: '무료',
      hours: '05:00-24:00',
      reservation: false,
      parking: true
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 3,
      weatherSuitability: 'good'
    },
    instagramTags: ['#서울숲', '#메타세쿼이아', '#자연사진', '#힐링스팟', '#포토필터'],
    userGenerated: false,
    verificationCount: 156,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
        username: 'forest_seoul',
        instagramUrl: 'https://instagram.com/forest_seoul'
      },
      {
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300',
        username: 'nature_lover',
        instagramUrl: 'https://instagram.com/nature_lover'
      }
    ],
    cluster: [
      {
        id: '3-1',
        name: '서울숲 벤치 포토존',
        description: '메타세쿼이아를 배경으로 한 아늑한 벤치에서의 휴식 컷',
        address: '서울특별시 성동구 뚝섬로 273 서울숲공원',
        coordinates: { lat: 37.5448, lng: 127.0378 },
        category: 'nature',
        themes: ['couple', 'solo'],
        rating: 4.6,
        reviewCount: 89,
        images: ['https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400'],
        crowdLevel: 'low',
        bestTime: ['오후 3-5시'],
        amenities: ['벤치'],
        tags: ['벤치', '휴식'],
        tips: ['책 가져가서 읽는 모습도 예뻐요']
      } as PhotoSpot
    ]
  },
  {
    id: '4',
    name: '홍대 걷고싶은거리',
    description: '젊음의 거리 홍대의 핫플레이스. 다양한 스트리트 아트와 네온사인이 만드는 도시적 감성.',
    address: '서울특별시 마포구 와우산로 홍대 걷고싶은거리',
    coordinates: {
      lat: 37.5519,
      lng: 126.9222
    },
    category: 'urban',
    themes: ['friends', 'content', 'urban', 'night'],
    rating: 4.3,
    reviewCount: 456,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['저녁 7-10시', '밤 10-12시'],
    amenities: ['카페', '화장실', '편의점'],
    tags: ['스트리트', '네온', '클럽'],
    tips: ['저녁에 가면 네온사인이 예뻐요', '주말에는 사람이 너무 많아요'],
    operationInfo: {
      fee: '무료',
      hours: '24시간',
      reservation: false,
      parking: false
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 8,
      weatherSuitability: 'fair'
    },
    instagramTags: ['#홍대', '#걷고싶은거리', '#네온사인', '#홍대밤거리', '#포토필터'],
    userGenerated: true,
    verificationCount: 45,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300',
        username: 'hongdae_night',
        instagramUrl: 'https://instagram.com/hongdae_night'
      }
    ]
  },
  {
    id: '5',
    name: '경의선숲길 연남동구간',
    description: '기존 철로 위에 조성된 선형공원. 연남동 감성 카페들과 어우러진 힙한 산책로입니다.',
    address: '서울특별시 마포구 연남동 경의선숲길',
    coordinates: {
      lat: 37.5676,
      lng: 126.9252
    },
    category: 'nature',
    themes: ['couple', 'solo', 'minimal'],
    rating: 4.6,
    reviewCount: 789,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400'
    ],
    crowdLevel: 'medium',
    bestTime: ['오후 3-6시', '저녁 7-9시'],
    amenities: ['카페', '벤치', '화장실'],
    tags: ['공원', '산책로', '감성'],
    tips: ['연남동 카페들과 함께 둘러보세요', '벚꽃 시즌이 가장 예뻐요'],
    operationInfo: {
      fee: '무료',
      hours: '24시간',
      reservation: false,
      parking: false
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 4,
      weatherSuitability: 'good'
    },
    instagramTags: ['#경의선숲길', '#연남동', '#선형공원', '#산책로', '#포토필터'],
    userGenerated: false,
    verificationCount: 92,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
        username: 'yeonnam_walk',
        instagramUrl: 'https://instagram.com/yeonnam_walk'
      }
    ]
  },
  {
    id: '6',
    name: '남산서울타워 전망대',
    description: '서울 야경을 한눈에 볼 수 있는 랜드마크. 커플들의 성지이자 서울 대표 뷰포인트입니다.',
    address: '서울특별시 용산구 남산공원길 105',
    coordinates: {
      lat: 37.5512,
      lng: 126.9882
    },
    category: 'modern',
    themes: ['couple', 'content', 'urban', 'night', 'sunset'],
    rating: 4.4,
    reviewCount: 2341,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400'
    ],
    crowdLevel: 'high',
    bestTime: ['일몰 시간', '밤 8-10시'],
    amenities: ['전망대', '화장실', '카페', '기념품점'],
    tags: ['야경', '전망', '타워'],
    tips: ['일몰 시간에 가면 최고예요', '미리 예약하는 것을 추천해요'],
    detailedLocation: {
      building: '남산서울타워',
      floor: '전망대층',
      entrance: '케이블카 또는 버스'
    },
    operationInfo: {
      fee: '성인 16,000원',
      hours: '10:00-23:00',
      reservation: true,
      parking: true
    },
    realTimeInfo: {
      isOpen: true,
      currentCrowd: 9,
      weatherSuitability: 'good'
    },
    instagramTags: ['#남산타워', '#서울야경', '#전망대', '#야경사진', '#포토필터'],
    userGenerated: false,
    verificationCount: 278,
    userPhotos: [
      {
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300',
        username: 'seoul_night',
        instagramUrl: 'https://instagram.com/seoul_night'
      },
      {
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300',
        username: 'tower_view',
        instagramUrl: 'https://instagram.com/tower_view'
      }
    ]
  }
];
